# Set MongoDB secret in bash
MONGO_USERNAME="mongouser"
MONGO_PASSWORD="mongopassword"

# Create Kubernetes secret
kubectl create secret generic mongodb-secret \
  --from-literal=MONGO_INITDB_ROOT_USERNAME=mongouser \
  --from-literal=MONGO_INITDB_ROOT_PASSWORD=mongopassword \
  --from-literal=MONGO_INITDB_DATABASE=calculator

# Display the secret for reference
echo "MongoDB secret created and stored in Kubernetes secret 'mongodb-secret'"
echo "Username: $MONGO_USERNAME"
echo "Password: $MONGO_PASSWORD"
echo "Database: calculator"