# Similarly to mongo-setup.sh, I moved this to a job which could be applied to the deployment,
# automating the process and bringing everything over to yaml

# Set MongoDB secret in bash
MONGO_USERNAME="mongouser"
MONGO_PASSWORD="mongopassword"

# Create Kubernetes secret
kubectl create secret generic mongodb-secret \
  --from-literal=MONGO_INITDB_ROOT_USERNAME=mongouser \
  --from-literal=MONGO_INITDB_ROOT_PASSWORD=mongopassword \
  --from-literal=MONGO_INITDB_DATABASE=calculator
# I noticed that I never configured the connection string as a secret since I had it hardcoded 
# through development, I address this in the next submission for better security

# Display the secret for reference
echo "MongoDB secret created and stored in Kubernetes secret 'mongodb-secret'"
echo "Username: $MONGO_USERNAME"
echo "Password: $MONGO_PASSWORD"
echo "Database: calculator"
