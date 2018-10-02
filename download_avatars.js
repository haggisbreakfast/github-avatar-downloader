// require files
var secrets = require('./secrets');
var request = require('request');
var fs = require('fs');
// assigning command line argument variables
var inputOne = process.argv[2];
var inputTwo = process.argv[3];


// welcome msg
console.log('Welcome to the GitHub Avatar Downloader!');

//
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }

  };
  // add conditionals should arguments not be provided on command line
  if (inputOne === undefined || inputTwo === undefined) {
    console.log("There is an error with your arguments!");
    return false;
  }

  request(options, function (err, res, body) {
    // parse data body
    var parsedBody = JSON.parse(body);
    // loop over parsed data
    parsedBody.forEach(function (element) {
      cb(err, element);
    });
  });
};
// get images from each URL
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(inputOne, inputTwo, function (err, result) {
  var url = result.avatar_url;
  // file path for avatar images stored
  var filePath = "avatar/" + result.login + ".jpg";
  downloadImageByURL(url, filePath);
});