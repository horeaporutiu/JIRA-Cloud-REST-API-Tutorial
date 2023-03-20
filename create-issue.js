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
const createIssueCaller = async () => {

  const issueType = 'Task';
  const summary = 'Horea Porutiu is awesome';
  const description = 'super awesome!'
  const projectKey = 'INC'

  const issueKey = await createIssue(projectKey, issueType, summary, description);
  console.log(`Created issue with key: ${issueKey}`);
}

createIssueCaller();