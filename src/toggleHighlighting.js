{
    let identity  = 'coronavirus_style';
    let elem = document.querySelector(`#${identity}`);
    if (elem !== null) {
        elem.remove();
    }
    if (elem === null) {
        const css = 'coronavirus { background: red; color: white }';
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.setAttribute('id', identity);
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
}