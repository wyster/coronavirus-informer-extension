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
    const createOrRemoveStyleBlock = `{
let elem = document.querySelector("#coronavirus_style"); 
if (elem !== null) {
    elem.remove();
} else {
    var css = 'coronavirus { background: red; color: white }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.setAttribute('id', 'coronavirus_style');
    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
}
}`;
    browser.tabs.executeScript({code:  createOrRemoveStyleBlock});
});
