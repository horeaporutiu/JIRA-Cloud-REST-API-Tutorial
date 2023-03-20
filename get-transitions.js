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

//List the transitions of a given issue using the Jira Cloud REST API
async function getTransitions(issueKey) {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';


    const config = {
      method: 'get',
      url: baseUrl + '/rest/api/2/issue/' + issueKey + '/transitions',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    console.log(config)
    const response = await axios.request(config);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
}

const main = async () => {
  //add issueKey you want to look for here. This should be the Key of the project and then a number,
  // i.e. TEST-1, or INC-1755 as shown below
  const issueKey = 'INC-1755'
  const transitions = await getTransitions(issueKey);
  console.log(transitions)
}

main();

