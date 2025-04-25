//adding two click event listeners

console.log("app.js loaded");

document.querySelector('#dark-mode-toggle').onclick = () => {
    document.documentElement.classList.toggle('dark')
}

document.querySelector('#dark-mode-toggle-mb').onclick = () => {
    document.documentElement.classList.toggle('dark')
}