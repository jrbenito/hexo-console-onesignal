var https = require('https');
var fs = require('fs');
var url = 'https://github.com/OneSignal/OneSignal-Website-SDK/releases/download/https-integration-files/OneSignal-Web-SDK-HTTPS-Integration-Files.zip';
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) { 
		cb(err.message);
	}
  });
};

var options = {
    options: [
        {name: '-i, --install', desc: 'Download and install files'}
    ],
    usage: '<option>'
};

var log = hexo.log;

hexo.extend.console.register('onesignal', 'Manage Onesignal script/XML files', options, function(args){
    log.log('Downloading: ', 'https://github.com/OneSignal/OneSignal-Website-SDK/releases/download/https-integration-files/OneSignal-Web-SDK-HTTPS-Integration-Files.zip');

    download(url,'onesignal.zip');
    
});
