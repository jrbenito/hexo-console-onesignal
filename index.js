var log = hexo.log;
var request = require('request');
var fs = require('fs');

var url = 'https://github.com/OneSignal/OneSignal-Website-SDK/releases/download/https-integration-files/OneSignal-Web-SDK-HTTPS-Integration-Files.zip';
var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  request
    .get(url)
    .on('response', function(response) {
        log.log("HTTP request: ",response.statusCode);
    })
    .on('error', function(err) {
        log.log("Download error: ", err);
        fs.unlink();
        if (cb) {
            cb(err.message);
        }
    })
    .pipe(file.on('finish', function() {
                    file.close(cb);  // close() is async, call cb after close completes.
                })
    );
};

var unzip = function(err, cb) {
    if (err) {
        log.log("Can´t unzip and install files");
    } else {
        log.log("Unzipping...");
    }
}

var options = {
    options: [
        {name: '-i, --install', desc: 'Download and install files'}
    ],
    usage: '<option>'
};

hexo.extend.console.register('onesignal', 'Manage Onesignal script/XML files', options, function(args){
    log.log('Downloading: ', 'https://github.com/OneSignal/OneSignal-Website-SDK/releases/download/https-integration-files/OneSignal-Web-SDK-HTTPS-Integration-Files.zip');

    download(url,'onesignal.zip',unzip);
    
});
