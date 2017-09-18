var CURRENT_URL = '';
function getCurrentHost() {
    return CURRENT_URL.replace(/^(.*:)\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/, '$2');
}

chrome.runtime.onInstalled.addListener(function () {
    let credentials = localStorage.getItem('credentials') || JSON.stringify([]);
    localStorage.setItem('credentials', credentials);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'getCredentials') {
        sendResponse({
            message: localStorage.getItem('credentials'),
            sender: "event_script.js"
        });
    } else if (message === 'getHost') {
        sendResponse({
            message: getCurrentHost(),
            sender: "event_script.js"
        });
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    CURRENT_URL = tab.url;
});
