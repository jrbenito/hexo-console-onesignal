var options = {
    options: [
        {name: '-i, --install', desc: 'Download and install files'}
    ],
    usage: '<option>'
};

var log = hexo.log;

hexo.extend.console.register('onesignal', 'Manage Onesignal script/XML files', options, function(args){
    log.log('onesignal', 'teste log');
});
