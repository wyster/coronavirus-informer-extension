let data = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'counter') {
        let value = request.value.toString();
        data[sender.tab.id] = value;
        chrome.browserAction.setBadgeText({text: value, tabId: sender.tab.id});
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.browserAction.setBadgeText({text: ''});
    if (activeInfo.tabId in data) {
        chrome.browserAction.setBadgeText({text: data[activeInfo.tabId], tabId: activeInfo.tabId});
    } else {
        chrome.tabs.executeScript(activeInfo.tabId, {file: "dist/content.js"});
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    delete data[tabId];
});
