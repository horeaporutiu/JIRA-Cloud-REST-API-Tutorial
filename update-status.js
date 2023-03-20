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

const main = async () => {
  //add issueKey you want to update. This should be the Key of the project and then a number,
  // i.e. TEST-1, or INC-1755 as shown below
  const issueKey = 'INC-1755'
  //statusID corresponds to " 11 == "To Do", 21=="In Progress", 31=="In Review", 41=="Done"
  //for more info on statusID use the `get-transtions.js` file to see all available transitions
  // since we are hard coding `31` below this means we will update the issue to In Review
  const statusID = '31'
  const update = await updateStatus(issueKey, statusID);
  console.log(update)
}

main();

