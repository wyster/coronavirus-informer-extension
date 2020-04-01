import browser from 'webextension-polyfill';
import findAndReplaceDOMText from 'findandreplacedomtext';

const NON_CONTIGUOUS_PROSE_ELEMENTS = {
    // Other misc. elements that are not part of continuous inline prose:
    br:1, li: 1, summary: 1, dt:1, details:1, rp:1, rt:1, rtc:1,
    // Media / Source elements:
    script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
    // Input elements
    input:1, textarea:1, select:1, option:1, optgroup:1, button:1,

};
const timeout = 100;
const keywordsRegexp = /coronavirus|covid|коронавирус/uig;

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

findAndReplaceDOMText(document, {
    preset: 'prose',
    find: keywordsRegexp,
    forceContext() {
        return true;
    },
    replace(portion, match) {
        data.counter++;
        if (isNotContiguousElement(portion.node)) {
            return match;
        }
        const node = document.createElement('coronavirus');
        node.innerText = match;
        return node;
    }
});

function isNotContiguousElement(node) {
    const hasOwn = {}.hasOwnProperty;
    return hasOwn.call(NON_CONTIGUOUS_PROSE_ELEMENTS, node.parentNode.nodeName.toLowerCase());
}