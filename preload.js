var style = document.createElement('style');
style.textContent = 'body::-webkit-scrollbar{display: none;}';

document.addEventListener("DOMContentLoaded", () => {
    document.head.appendChild(style);
});
