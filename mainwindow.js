document.addEventListener('DOMContentLoaded',() => {
    const webview = document.getElementById('webview');
    const reloadButton = document.getElementById('reload');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const mystudioButton = document.getElementById('mystudio');

    reloadButton.addEventListener('click',() => {
        webview.reload();
    });
    /*document.body.addEventListener('keydown',(e) => {
        if(e.key == 'R')webview.reload();
    });*/
    backButton.addEventListener('click',() => {
        webview.goBack();
    });
    /*backButton.addEventListener('keypress',(e) => {
        if(e.key === 'F4')webview.goBack();
    });*/
    forwardButton.addEventListener('click',() => {
        webview.goForward();
    });
    /*forwardButton.addEventListener('keypress',(e) => {
        if(e.key === 'F6')webview.goForward();
    });*/
    mystudioButton.addEventListener('click',() => {
        webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fmypage');
    })
});
