const fs = require('fs');

var SignInLog = (user) => {

  let date = new Date().toISOString();
  let log = '\n' + user.username + " logged in with " + "'" + user.email + "'" + " at " + date;

  fs.appendFileSync('./BackEnd/log_files/login.log', log);
}

var signUpLog = (username, email) => {

  let date = new Date().toISOString();
  let log = '\n' + username + " logged in with " + email + " at " + date;

  fs.appendFileSync('./BackEnd/log_files/register.log', log);
}

var deleteAccountLog = (id, username, email) => {

  let date = new Date().toISOString();
  let log = `Account with ID: ${id}, email: ${email} with username: ${username} deleted on - ${date}.`;

  fs.appendFileSync('./BackEnd/log_files/deletedAccounts.log', log);
}

module.exports = {
  SignInLog,
  signUpLog,
  deleteAccountLog
}
