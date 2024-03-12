
export function buttonEffect(buttonDom) {
    buttonDom.addEventListener("mouseenter", (e) => {
        e.currentTarget.classList.add("pulse-button");
    })
    buttonDom.addEventListener("mouseleave", (e) => {
        e.currentTarget.classList.remove("pulse-button");
    })
}