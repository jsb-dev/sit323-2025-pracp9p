# Following this submission, I ended up moving this script to a one-time job that I can apply to the deployment,
# this streamlined the subsequent deployment to GCP for 10.1P

# Read in values and decode them
MONGO_USERNAME=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_ROOT_USERNAME}' | base64 --decode)
MONGO_PASSWORD=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_ROOT_PASSWORD}' | base64 --decode)
MONGO_DATABASE=$(kubectl get secret mongodb-secret -o jsonpath='{.data.MONGO_INITDB_DATABASE}' | base64 --decode)

# Set default values if any variable is empty, helped when debugging the secret config to determine which passed
MONGO_USERNAME=${MONGO_USERNAME:-"mongouser"}
MONGO_PASSWORD=${MONGO_PASSWORD:-"mongopassword"}
MONGO_DATABASE=${MONGO_DATABASE:-"defaultdb"}

# Log Credentials for reference
echo "MongoDB credentials:"
echo "Username: $MONGO_USERNAME"
echo "Password: $MONGO_PASSWORD"
echo "Database: $MONGO_DATABASE"

# Wait for MongoDB to start, gives pod a chance to spin up if they haven't already
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
