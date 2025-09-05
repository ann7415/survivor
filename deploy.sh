#!/bin/bash

echo "🚀 Deploying Survivor application with DB synchronization..."

# Check that Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker."
    exit 1
fi

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down --remove-orphans

# Clean up orphaned images (optional)
echo "🧹 Cleaning up orphaned images..."
docker system prune -f

# Build and start new containers
echo "🔧 Building and starting containers..."
docker-compose up --build -d

# Wait until services are ready
echo "⏳ Waiting for services to start..."
sleep 15

# Check container status
echo "📋 Container status:"
docker-compose ps

# Function to check if the API is ready
check_api_health() {
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:5000/health > /dev/null 2>&1 || curl -s http://localhost:5000/api/startups > /dev/null 2>&1; then
            echo "✅ API is ready!"
            return 0
        fi
        
        echo "⌛ Attempt $attempt/$max_attempts - API not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    echo "❌ API is not accessible after $max_attempts attempts"
    return 1
}

# Verify that the API is accessible
echo "🔝 Checking API availability..."
if ! check_api_health; then
    echo "❌ Unable to connect to the API. Check logs with:"
    echo "   docker-compose logs backend"
    exit 1
fi

# Database synchronization
echo "🔄 Synchronizing database..."

# Step 1: Connect and retrieve the token
echo "🔑 Connecting to the API..."

# Load environment variables from backend .env file
if [ -f "Backend/JebIncubator.Api/.env" ]; then
    echo "📋 Loading environment variables from Backend/JebIncubator.Api/.env"
    export $(grep -v '^#' Backend/JebIncubator.Api/.env | xargs)
else
    echo "⚠️  .env file not found at Backend/JebIncubator.Api/.env"
fi

if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "❌ ADMIN_EMAIL and/or ADMIN_PASSWORD environment variables are not set."
    echo "📋 Available environment variables:"
    env | grep ADMIN || echo "   No ADMIN_* variables found"
    exit 1
fi
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

if [ $? -ne 0 ]; then
    echo "❌ Error while connecting to the API"
    exit 1
fi

# Extract token (assuming JSON response contains 'token' or 'access_token')
TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
if [ -z "$TOKEN" ]; then
    # Try with 'access_token' if 'token' does not exist
    TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
    echo "❌ Could not retrieve authentication token"
    echo "API response: $TOKEN_RESPONSE"
    exit 1
fi

echo "✅ Authentication token retrieved"

# Step 2: Synchronize all data
echo "🔄 Synchronizing data..."
SYNC_RESPONSE=$(curl -s -X POST http://localhost:5000/api/sync/all \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json")

if [ $? -ne 0 ]; then
    echo "❌ Error during synchronization"
    exit 1
fi

echo "✅ Synchronization completed"
echo "Response: $SYNC_RESPONSE"

# Step 3: Test to verify synchronization worked
echo "🧪 Running verification test..."
sleep 3  # Wait a bit for sync to take effect

STARTUPS_RESPONSE=$(curl -s -X GET http://localhost:5000/api/startups)
if [ $? -ne 0 ]; then
    echo "❌ Error during verification test"
    exit 1
fi

# Count number of startups (simple method)
STARTUP_COUNT=$(echo $STARTUPS_RESPONSE | grep -o '"id"' | wc -l)

echo "📊 Number of startups found: $STARTUP_COUNT"

if [ $STARTUP_COUNT -gt 2 ]; then
    echo "✅ Test successful! Database contains more than 2 startups"
else
    echo "⚠︝ Warning: Database contains only $STARTUP_COUNT startup(s)"
    echo "Full response: $STARTUPS_RESPONSE"
fi

echo ""
echo "🎉 Deployment and synchronization completed!"
echo "🌝 Angular frontend available at: http://localhost:4200"
echo "⚙︝  C# backend API available at: http://localhost:5000"
echo ""
echo "📜 To view real-time logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop the application:"
echo "   docker-compose down"
