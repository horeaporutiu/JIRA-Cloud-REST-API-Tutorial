# JIRA CLOUD REST API TUTORIAL

This is the best tutorial out there. It will teach you basics of how to use JIRA Cloud REST APIs. 
You will need a free Atlassian account to make REST API calls to JIRA Cloud. 

# Video

[![](https://user-images.githubusercontent.com/10428517/227070350-22134bbb-d288-4800-a5ac-996258db223e.png)](https://www.youtube.com/watch?v=yRglBW7YnjA)

# Steps
1. [Clone the Repo](#step-1-clone-the-repo)
2. [Install dependencies](#step-2-create-ibm-cloud-services)
3. [Add Env Variables](#step-3-Add-env-variables)
4. [Run the App](#step-4-Run-the-app)

## Step 1. Clone the Repo

Git clone this repo onto your computer in the destination of your choice:
```
git clone https://github.com/horeaporutiu/JIRA-Cloud-REST-API-Tutorial.git
```
then cd into the jira-cloud-tutorial folder:
```
cd JIRA-Cloud-REST-API-Tutorial
```
## Step 2. Install Dependencies

Run `npm install` to install dependencies. Make sure to have Node.js installed! 

## Step 3. Add Env Variables

Rename your `.sample.env` to `.env` and fill out the necessary env variables! See below for details

#### Filling out .env

> ATLASSIAN_USERNAME=horeaporutiu@gmail.com
* This should just be your email, at least it was for me
> ATLASSIAN_API_KEY=ADD-YOUR-API-KEY-HERE
* Click on your account icon in top-right corner -> `Manage account` -> `Security` -> `Create and manage API token` under `API token`. From there click on `Create API token` and add it here.
> LEAD_ACCT_ID=557058:f9bcdb25-24a5-4501-927c-588
* First, run the `get-users.js` file to see your account id. The resulting JSON should give you your ID. 
This is needed to assign the project to a user.
> DOMAIN=horeaporutiu
* This will be the `https://<your-domain>.atlassian.net` your-domain part of the URL. For example my URL is 
`https://horeaporutiu.atlassian.net/` so my domain is `horeaporutiu`
> PROJECT_KEY=TEST22
* This can be anything
> PROJECT_NAME=TestProject22
* This can be anything.

Save the file and run `source .env` or another command to execute the newest contents of the .env file.

## Step 4. Run The App

Run `node app.js` to try it out! Check out the logs for results. See troubleshooting section below for help.

Have fun! Feel free to alter `app.js` for it to make sense for you. Check out all of the other files 
to see the details of the REST API calls!

# Troubleshooting
If you run `node app.js` and get the following error:

```
error: 
{
  projectName: 'A project with that name already exists.',
  projectKey: "Project 'TestProject223' uses this project key."
}
```

Make sure you change your env variable for PROJECT_NAME and then run `source .env` or another command 
to make execute the newest contents of the .env file.
