var axios = require('axios');
require('dotenv').config();

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

module.exports = createProject;