function reloadStyles() {
    safari.extension.removeContentStyleSheets();
    styleStorage.each(function(key, data){
        console.log('['+key+']', 'Domains:', data.domains.join(', '));
        safari.extension.addContentStyleSheet(data.styles, data.domains);
    });
}

function handleCommand(event) {
    switch (event.command) {
    case 'manage-user-css':
        var currentWindow = safari.application.activeBrowserWindow;
        var manageURL = safari.extension.baseURI + 'manage/manage.html';
        currentWindow.openTab('foreground').url = manageURL;
        break;
    }
}

function handleMessage(event) {
    switch (event.name) {
    case 'reloadStyles':
        reloadStyles();
        break;
    }
}

safari.application.addEventListener('command', handleCommand, false);
safari.application.addEventListener('message', handleMessage, false);
reloadStyles();