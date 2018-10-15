function setIconDisabled (disabled) {
    chrome.browserAction.setIcon({
        path: `icons/icon16${disabled ? '_disabled' : ''}.png`
    });
}

function getCredential (tab, host) {
    let
        credentials = JSON.parse(localStorage.getItem('credentials')),
        hostname = tab ? tab.url.replace(/^(.*:)\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/, '$2') : host,
        credential = credentials.filter(item => item.host === hostname)[0];
    return credential;
}

chrome.runtime.onInstalled.addListener(function () {
    let credentials = localStorage.getItem('credentials') || JSON.stringify([]);
    localStorage.setItem('credentials', credentials);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.getCredentialsForHost !== undefined) {
        let credential = getCredential(null, message.getCredentialsForHost);
        setIconDisabled(!credential);
        sendResponse({
            message: credential,
            sender: "event_script.js"
        });
    }
});

chrome.tabs.onActivated.addListener(function () {
    chrome.tabs.getSelected(null, function (tab) {
        setIconDisabled(!getCredential(tab));
    });
});
