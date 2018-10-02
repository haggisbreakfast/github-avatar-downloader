var secrets = require('./secrets');
var request = require('request');
var fs = require('fs');
// file into
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

  request(options, function (err, res, body) {
    var parsedBody = JSON.parse(body);
    parsedBody.forEach(function (element) {
      cb(err, element);
    });

  });
};

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function (err, result) {
  var url = result.avatar_url;
  var filePath = "avatar/" + result.login + ".jpg";
  downloadImageByURL(url, filePath);
});