# DownloadPortal

Website for the Download project

# Setting up a box application

In order to run this you'll need the ability to authenticate against the box API (https://developer.box.com/reference) using Server Authentication (JWT).

1. Go to the developer console (https://ucdavis.app.box.com/developers/console) and create a new application

2. Go to the configuration tab of your new application and set the following:

	* Authentication Method: OAuth 2.0 with JWT (Server Authentication)
	* Application Access: Application (not Enterprise)
	* Application Scopes: Read and write all files and folders stored in Box
	* Advanced Features: None
	* Add and Manage Public Keys: Click "Generate a Public/Private Keypair" and then save the file that is downloaded

3. Your auth configuration file has values for the settings in this project (appsettings.js)

4. Get a Box admin to approve your application.  Send them the ClientID which they need to look up the app.

5. Finally, now your app can authenticate but doesn't have access to anything by default.  What you need to do is find out the user account "login" (email) of the applicaiton (app-user).  
I did it by getting the admin/enterprise access token and then calling `GET https://api.box.com/2.0/folders/0` with the Authentication header set to `bearer TOKEN`.
Then look under "owned by" and grab the login property.  Go to box and invite it to whatever folder you want and set permissions and you should be good to go.
