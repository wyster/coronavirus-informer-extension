import browser from 'webextension-polyfill';
import findAndReplaceDOMText from 'findandreplacedomtext';

const timeout = 100;

let sendTimeout;
let data = new Proxy(
    {
        counter: 0
    },
    {
        set(obj, prop, value) {
            if (prop === 'counter') {
                clearTimeout(sendTimeout);
                sendTimeout = setTimeout(() => {
                    browser.runtime.sendMessage({action: 'counter', value: data.counter});
                }, timeout);
            }

            return Reflect.set(...arguments);
        }
    });

findAndReplaceDOMText(document.body, {
    preset: 'prose',
    find: /coronavirus|covid|коронавирус/ui,
    replace(portion, match) {
        data.counter++;
        const node = document.createElement('coronavirus');
        node.innerText = match;
        return node;
    }
});