{
    let elem = document.querySelector("#coronavirus_style");
    if (elem !== null) {
        elem.remove();
    }
    if (elem === null) {
        const css = 'coronavirus { background: red; color: white }';
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.setAttribute('id', 'coronavirus_style');
        head.appendChild(style);
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(css));
    }
}