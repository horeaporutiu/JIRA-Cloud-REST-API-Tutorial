var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};

//List the transitions of a given issue using the Jira Cloud REST API
async function updateStatus(issueKey, statusID) {

  try {

    const baseUrl = 'https://' + domain + '.atlassian.net';

    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };

    //Body to pass into POST REST API Request
    const data = {
      transition: {
        id: statusID
      }
    };

    //use axios to make post request
    const response = await axios.post(`${baseUrl}` + `/rest/api/2/issue/` + issueKey +
      `/transitions`, data, config);

    //if you see that you get status of 204, that means the update worked!
    console.log(response.status)
    return response.status;
  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
}

module.exports = updateStatus;
