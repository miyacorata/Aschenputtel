var style = document.createElement('style');
style.textContent = `
*::-webkit-scrollbar{
    display: none;
}
.area-slide{
    overflow-y:scroll!important;
}
`;

document.addEventListener("DOMContentLoaded", () => {
    document.head.appendChild(style);
});
