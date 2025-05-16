# sit323-2025-prac9p

This is my submission for a calculator microservice configured with persistent storage and container orchestration. It consists of a Node.js server, containerised, and orchestrated with Docker and K8s. 

## My Approach

This task presented significant challenges in my development environment due to unclosed instances of previous submissions eating up the CURL requests I made. This lead to confusing symptoms which were stressful to troubleshoot, but once I caught on I was able to enforce a more structured approach to the deployment.

Building off of the last submission, this task required additional configuration to enable database transactions with a standalone instance of MongoDB. Persistent storage had to be configured and a basic backup CronJob was included to backup the database volume.

Configuring the database connection proved the most difficult due to the multiple references to the database secrets requiring consisting reading-in across the stack. Once I reconciled the secret values to be searched consistently, I was able to focus more on orchestrating and interacting with the deployment. To ensure that no previous pods or deployments were affecting my new deployment, I constructed a comprehensive steplist to purge the previous nodes and apply the new deployment configuration. I also rebuilt the docker image to account for any adjustments to the server file. The steps were as follows:

### Before Deploying

1) kubectl delete pv --all

2) kubectl delete pvc --all

3) kubectl delete pod --all

4) kubectl delete secret --all

5) kubectl delete service mongodb

6) kubectl delete deployment calculator-deployment

7) docker build -t jsbdevdocker/calculator_microservice:latest -f ./Dockerfile ./calculator_microservice

8) docker push jsbdevdocker/calculator_microservice:latest

These steps ensured that the available resources and ports were fresh, allowing me to apply the deployment manifest:

### Deployment Steps

(first time only)

1) chmod +x mongo-secret.sh

2) chmod +x mongo-setup.sh

(each time thereafter)

3) ./mongo-secret.sh

4) kubectl get secret mongodb-secret -o yaml
	
5) [verify credentials config]

6) kubectl apply -f mongo-storage.yaml

7) kubectl apply -f mongo-deployment.yaml

8) kubectl get pods -l app=mongodb

	[wait for ready]

9) ./mongo-setup.sh

10) kubectl apply -f deployment.yaml

11) kubectl apply -f mongo-backup.yaml

(for testing)

12) kubectl port-forward svc/mongodb 27017:27017

13) kubectl port-forward svc/calculator-service 3000:3000

14) mongosh "mongodb://mongouser:mongopassword@localhost:27017/admin"

15) db.stats()

Looking specifically at the deployment, I had to ensure that secrets were configured before invoking anything that would read them in. I stored the secrets and setup instructions as shell scripts to ensure consistency. I appended the deployment and backup manifests before testing, which required port-forwarding of the server and mongodb instance. Logging in with administrative privileges, I was now in a position where I could perform a basic query to pull up its stats (screenshots in submission file).

## Conclusion

This task presented unique challenges that required careful thought of how I was cleaning up my deployment before adjusting it. There was lengthy research required to construct the deployment manifests in accordance with my approach to troubleshooting, which may have resulted in some unnecessary configurations. Despite this, I have successfully deployed the app, made requests to its different endpoints, and logged the database collections to show that the connection is facilitated and storage persists.
