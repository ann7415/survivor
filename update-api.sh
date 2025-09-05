echo "API check and synchronization only..."

check_container_running() {
    local container_name=$1
    if docker-compose ps | grep -q "$container_name.*Up"; then
        return 0
    else
        return 1
    fi
}

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed"
    exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
    echo "docker-compose.yml file not found in the current directory"
    exit 1
fi

echo "Checking container status..."
docker-compose ps

if check_container_running "backend"; then
    echo "Backend container is running"
else
    echo "Backend container is not started"
    echo "Starting backend container..."
    docker-compose up -d backend
    echo "Waiting for backend service to start..."
    sleep 10
fi

check_api_ready() {
    local max_attempts=10
    local attempt=1

    echo "Checking API availability..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s --max-time 5 http://localhost:5000/api/startups > /dev/null 2>&1; then
            echo "API accessible at http://localhost:5000"
            return 0
        fi

        echo "Attempt $attempt/$max_attempts - API not ready yet..."
        sleep 2
        ((attempt++))
    done

    echo "API not accessible after $max_attempts attempts"
    return 1
}

if ! check_api_ready; then
    echo "Attempting to restart backend container..."
    docker-compose restart backend
    sleep 10

    if ! check_api_ready; then
        echo "Unable to access API. Check logs with:"
        echo "   docker-compose logs backend"
        exit 1
    fi
fi

echo ""
echo "Starting database synchronization..."

echo "Authenticating with the API..."
TOKEN_RESPONSE=$(curl -s --max-time 10 -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@jeb.com","password":"admin123"}')

if [ $? -ne 0 ] || [ -z "$TOKEN_RESPONSE" ]; then
    echo "Error connecting to the API"
    echo "Check if /api/auth/login endpoint is accessible"
    exit 1
fi

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
if [ -z "$TOKEN" ]; then
    TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
fi
if [ -z "$TOKEN" ]; then
    TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
    echo "Unable to retrieve authentication token"
    echo "API response:"
    echo "$TOKEN_RESPONSE"
    exit 1
fi

echo "Authentication token retrieved"

echo "Starting synchronization..."
SYNC_RESPONSE=$(curl -s --max-time 30 -X POST http://localhost:5000/api/sync/all \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")

CURL_EXIT_CODE=$?

if [ $CURL_EXIT_CODE -ne 0 ]; then
    echo "Error during synchronization (code: $CURL_EXIT_CODE)"
    exit 1
fi

echo "Synchronization completed"
if [ -n "$SYNC_RESPONSE" ]; then
    echo "Sync response: $SYNC_RESPONSE"
fi

echo ""
echo "Running verification test..."
sleep 3  # Let DB update

STARTUPS_RESPONSE=$(curl -s --max-time 10 -X GET http://localhost:5000/api/startups)
CURL_EXIT_CODE=$?

if [ $CURL_EXIT_CODE -ne 0 ] || [ -z "$STARTUPS_RESPONSE" ]; then
    echo "Error during verification test"
    exit 1
fi

STARTUP_COUNT_ID=$(echo $STARTUPS_RESPONSE | grep -o '"id"' | wc -l)
STARTUP_COUNT_BRACKET=$(echo $STARTUPS_RESPONSE | grep -o '{' | wc -l)

if [ $STARTUP_COUNT_ID -gt $STARTUP_COUNT_BRACKET ]; then
    STARTUP_COUNT=$STARTUP_COUNT_ID
else
    STARTUP_COUNT=$STARTUP_COUNT_BRACKET
fi

echo "Number of startups detected: $STARTUP_COUNT"

if [ $STARTUP_COUNT -gt 2 ]; then
    echo "Validation test successful! Database contains $STARTUP_COUNT startups"
else
    echo "Warning: Database contains only $STARTUP_COUNT startup(s)"
    echo "Full API response:"
    echo "$STARTUPS_RESPONSE"
fi

echo ""
echo "API synchronization completed!"
echo "API available at: http://localhost:5000"

# Useful commands:
# View backend logs: docker-compose logs backend
# Restart backend: docker-compose restart backend
# Test API: curl http://localhost:5000/api/startups
