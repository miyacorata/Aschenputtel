"use strict";

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const dialog = electron.remote.dialog;
const shell = electron.remote.shell;

document.addEventListener('DOMContentLoaded',() => {
    //toolbar
    const webview = document.getElementById('webview');
    const reloadButton = document.getElementById('reload');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const mystudioButton = document.getElementById('mystudio');
    const petitButton = document.getElementById('petit');
    const gachaButton = document.getElementById('gacha');
    const lessonButton = document.getElementById('lesson');
    const freetradeButton = document.getElementById('freetrade');
    const giftboxButton = document.getElementById('giftbox');

    reloadButton.addEventListener('click',() => {
        webview.executeJavaScript('location.reload();');
    });
    backButton.addEventListener('click',() => {
        webview.executeJavaScript('history.back();');
    });
    forwardButton.addEventListener('click',() => {
        webview.executeJavaScript('history.forward();');
    });
	mystudioButton.addEventListener('click', () => {
		webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fmypage');
	});

    petitButton.addEventListener('click', () => {
        webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fpetit_cg');
    });
    gachaButton.addEventListener('click',() => {
        webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fgacha');
    });
    lessonButton.addEventListener('click',() => {
        webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fcard_str');
    });
    freetradeButton.addEventListener('click',() => {
		webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fauction%2Fauction_top');
    });
    giftboxButton.addEventListener('click',() => {
		webview.loadURL('http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fpresent%2Frecieve');
    });

    //newwindow
    webview.addEventListener("new-window",(e) => {
		dialog.showMessageBox(
			{
				type: 'question',
				buttons: ['Yes', 'No'],
				title: 'Question',
				message: '外部リンクに移動しますか？',
				detail: 'はいをクリックするとブラウザでリンクを開きます\n(UserAgentはデフォルトのものになります)'
			},
			(key) => {
				if (key === 0) {
					shell.openExternal(e.url);
				}
			}
		);
    });

    //pageload-failed
    webview.addEventListener("did-fail-load",(e) =>{
		dialog.showMessageBox(
			{
				type: 'error',
				buttons: ['OK'],
				title: 'Failed to load',
				message: '読み込みに失敗しました',
				detail: 'ネットワーク接続などを確認してください' + '\n\nCode : ' + e.errorCode + '\nDetail : ' + e.errorDescription
			}
		);
    });

    //if404,500,503
	webview.addEventListener("did-get-response-details", (e) => {
		if (Math.floor(e.httpResponseCode / 100) >= 4) {
			var message = 'OK';
			var detail = '';
			switch (e.httpResponseCode) {
				case 403:
					message = 'アクセスが拒否されました';
					detail = '公開されていないページにアクセスしている可能性があります。';
					break;
				case 404:
					message = '読み込み先のページが存在しません';
					detail = 'リンク切れの状態である可能性があります。';
					break;
				case 500:
					message = 'サーバー内部でエラーが発生しています';
					detail = 'これはゲームサーバー側のエラーであり、こちら側に問題はありません。';
					break;
				case 503:
					message = 'サーバーが一時的に応答できなくなっています';
					detail = '所謂鯖落ちか、サーバーがメンテナンス中である可能性があります。';
					break;
				default:
					message = '何らかのエラーが発生しています';
					detail = 'HTTP Status Code : ' + e.httpResponseCode;
			}
			dialog.showMessageBox(
				{
					type: 'error',
					buttons: ['OK'],
					title: 'Error ' + e.httpResponseCode,
					message: message,
					detail: detail
				}
			);
		}

	});

});

//shortcutkeys
ipcRenderer.on('devtool',() => {
    document.getElementById('webview').openDevTools();
});

ipcRenderer.on('jump',(item,page) => {
    var button = document.getElementById(page);
    if(button)button.click();
    else console.log('[Error!] No such element. - '+page);
});

ipcRenderer.on('link',(item,url) => {
    if(url.match(/^https?(:\/\/sp\.pf\.mbga\.jp\/12008305\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/)){
        webview.loadURL(url);
    }
});
