if [ -f "Backend/JebIncubator.Api/.env" ]; then
    echo "Loading environment variables from Backend/JebIncubator.Api/.env"
    export $(grep -v '^#' Backend/JebIncubator.Api/.env | xargs)
else
    echo ".env file not found at Backend/JebIncubator.Api/.env"
fi

if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "ADMIN_EMAIL and/or ADMIN_PASSWORD environment variables are not set."
    echo "Available environment variables:"
    env | grep ADMIN || echo "   No ADMIN_* variables found"
    exit 1
fi
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

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
