import browser from 'webextension-polyfill';

let data = {};

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'counter') {
        let value = request.value.toString();
        data[sender.tab.id] = value;
        browser.browserAction.setBadgeText({text: value, tabId: sender.tab.id});
    }
});

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.browserAction.setBadgeText({text: ''});
    if (activeInfo.tabId in data) {
        browser.browserAction.setBadgeText({text: data[activeInfo.tabId], tabId: activeInfo.tabId});
    } else {
        browser.tabs.executeScript({file: browser.extension.getURL("dist/content.js")});
    }
});

browser.tabs.onRemoved.addListener(tabId => {
    delete data[tabId];
});

browser.browserAction.onClicked.addListener(tab => {
    browser.tabs.executeScript({file: browser.extension.getURL("dist/toggleHighlighting.js")});
});
