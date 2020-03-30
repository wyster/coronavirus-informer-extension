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
        chrome.tabs.executeScript({file: "dist/content.js"});
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    delete data[tabId];
});

chrome.browserAction.onClicked.addListener(tab => {
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
    chrome.tabs.executeScript({code:  createOrRemoveStyleBlock});
});
