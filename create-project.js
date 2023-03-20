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

async function createProject(projectName) {

  try {


    const leadAccountID = process.env.LEAD_ACCT_ID
    const baseUrl = 'https://' + domain + '.atlassian.net';
    const projKey = process.env.PROJECT_KEY

    const data = {
      key: projKey,
      name: projectName,
      projectTypeKey: 'software',
      "leadAccountId": leadAccountID
    };
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.post(`${baseUrl}/rest/api/3/project`, data, config);
    console.log(response.data)
    return response.data.key;

  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }

}

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

const createProjectAndIssue = async () => {
  const issueType = 'Task';
  const summary = 'Horea Porutiu is awesome';
  const description = 'super awesome!'
  const projectName = process.env.PROJECT_NAME
  const projectKey = await createProject(projectName);
  console.log(`Created project with key: ${projectKey}`);
  const issueKey = await createIssue(projectKey, issueType, summary, description);
  console.log(`Created issue with key: ${issueKey}`);
}

createProjectAndIssue();