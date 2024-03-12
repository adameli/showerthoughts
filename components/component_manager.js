
export function componentManger(component, render) {

    let dom = document.createElement(component.tag);
    dom.id = component.selfId;
    if (Object.hasOwn(component, "clas")) dom.classList.add(component.clas);
    document.getElementById(component.parentId).append(dom);

    if (render) {
        if (Object.hasOwn(component, "type")) {
            render(dom, component.type);
            return;
        }
        if (Object.hasOwn(component, "data")) {
            render(dom, component.data);
            return;
        }
        render(dom);
    }
}