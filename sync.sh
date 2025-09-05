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