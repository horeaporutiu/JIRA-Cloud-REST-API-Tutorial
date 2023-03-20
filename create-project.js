var axios = require('axios');
var dotenv = require('dotenv')
dotenv.config()
const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};

//Creates a project for a particular Jira Cloud account, and asisgns it to a user
//as defined by the leadAccountID below. Note that leadAccountID is needed. You
//can find the accountID by using the /users API request. Each account will have at
//least one user
async function createProject(projectName) {

  try {

    //lead account ID is needed so that a project is assigned to a user
    const leadAccountID = process.env.LEAD_ACCT_ID
    //baseURL needed for REST API request
    const baseUrl = 'https://' + domain + '.atlassian.net';
    const projKey = process.env.PROJECT_KEY

    //Body to pass into POST REST API Request
    const data = {
      key: projKey,
      name: projectName,
      projectTypeKey: 'software',
      "leadAccountId": leadAccountID
    };

    //Auth is our username and API Key
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    //use axios to make post request
    const response = await axios.post(`${baseUrl}/rest/api/3/project`, data, config);
    console.log(response.data)
    return response.data.key;

  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }

}

//creates an issue in Jira Cloud using REST API 
async function createIssue(projectKey, issueType, summary, description) {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const data = {
      fields: {
        project: { key: projectKey },
        summary: summary,
        description: description,
        issuetype: { name: issueType }
      }
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, config);
    return response.data.key;

  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
}

//creates an issue in Jira Cloud using REST API 
async function getUsers() {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const config = {
      method: 'get',
      url: baseUrl + '/rest/api/2/users',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.request(config);
    console.log(response)
    return response.data;

  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
}

const createProjectAndIssue = async () => {

  // const projectName = process.env.PROJECT_NAME
  // const projectKey = await createProject(projectName);
  // console.log(`Created project with key: ${projectKey}`);

  const issueType = 'Task';
  const summary = 'Horea Porutiu is awesome';
  const description = 'super awesome!'


  // const issueKey = await createIssue(projectKey, issueType, summary, description);
  // console.log(`Created issue with key: ${issueKey}`);
  // const users = await getUsers();
  // console.log('users: ')
  // console.log(users)
}

createProjectAndIssue();