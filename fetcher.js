const request = require('request');
const fs = require('fs');

const getFilesizeInBytes = function(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

const fetcher = function(url, path) {
  request(url, (error, response, body) => {
    fs.writeFile(path, body, err => {
      if (err) {
        console.error(err);
        return;
      }
      if (response.statusCode !== 200) {
        console.error(`Failed to download. Status Code: ${response.statusCode}`);
        return;
      }
      const size = getFilesizeInBytes(path);
      console.log(`Downloaded and saved ${size} Bytes to ${path}`);
    });
  });
};

const arr = process.argv.slice(2);
const url = arr[0];
const path = arr[1];

fetcher(url, path);