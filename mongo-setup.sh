#!/bin/bash

# Load environment variables from Kubernetes secrets
MONGO_USERNAME=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_ROOT_USERNAME}' | base64 --decode)
MONGO_PASSWORD=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_ROOT_PASSWORD}' | base64 --decode)
MONGO_DATABASE=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_DATABASE}' | base64 --decode)

# Set default values if any variable is empty
MONGO_USERNAME=${MONGO_USERNAME:-"mongouser"}
MONGO_PASSWORD=${MONGO_PASSWORD:-"mongopassword"}
MONGO_DATABASE=${MONGO_DATABASE:-"defaultdb"}

echo "MongoDB credentials:"
echo "Username: $MONGO_USERNAME"
echo "Password: $MONGO_PASSWORD"
echo "Database: $MONGO_DATABASE"

# Wait for MongoDB to start
echo "Waiting for MongoDB to start..."
sleep 10

# Create the database and user in MongoDB
mongosh --eval "
use $MONGO_DATABASE;
db.createUser({
  user: '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_DATABASE' }]
});
"

echo "MongoDB setup complete!"