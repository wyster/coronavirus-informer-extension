chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'counter') {
        chrome.browserAction.setBadgeText({text: request.value.toString()});
    }
});
