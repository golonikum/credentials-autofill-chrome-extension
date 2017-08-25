chrome.runtime.onInstalled.addListener(function () {
    let credentials = localStorage.getItem('credentials') || JSON.stringify([]);
    localStorage.setItem('credentials', credentials);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    sendResponse({
        message: message === 'getCredentials' ? localStorage.getItem('credentials') : '',
        sender: "event_script.js"
    });
});
