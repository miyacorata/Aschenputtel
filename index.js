"use strict";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const dialog = electron.dialog;
const shell = electron.shell;

const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
let splashWindow = null;

app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

app.on("ready", () => {
    splashWindow = new BrowserWindow(
        {
            width:400,
            height:200,
            useContentSize:true,
            transparent:true,
            frame:false,
            alwaysOnTop:true,
            skipTaskbar:true
        }
    );
    splashWindow.loadURL(
        'file://'+__dirname+'/splash.html'
    );
    mainWindow = new BrowserWindow(
        {
            width:320,
            height:600,
            useContentSize:true,
            maximizable:false,
            minWidth:320,
            minHeight:500,
            fullscreen:false,
            fullscreenable:false,
            title:'Aschenputtel',
            show:false
        }
    );
    mainWindow.loadURL(
        'file://'+__dirname+'/index.html'
    );
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.on("page-title-updated", () => {
        //event.preventDefault();
        mainWindow.setTitle('Aschenputtel');
    });
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    })
    setTimeout(() => {
        splashWindow.destroy();
    }, 4000);
});


//# MENU #//

const templateMenu = [
    {
        label:'&Aschenputtel',
        submenu: [
            {
                label:'終了',
                accelerator:'Alt+F4',
                click(){app.quit();}
            }
        ]
    },
    {
        label:'表示(&V)',
        submenu: [
            {
                label:'戻る(&B)',
                accelerator:'F4',
                click(item,focusedWindow){
                    if(focusedWindow){
                        focusedWindow.webContents.send('jump','back');
                    }
                }
            },
            {
                label:'更新(&R)',
                accelerator:'F5',
                click(item,focusedWindow){
                    if(focusedWindow){
                        focusedWindow.webContents.send('jump','reload');
                    }
                }
            },
            {
                label:'進む(&F)',
                accelerator:'F6',
                click(item,focusedWindow){
                    if(focusedWindow){
                        focusedWindow.webContents.send('jump','forward');
                    }
                }
            },
            {
                type:'separator'
            },
            {
                label:'最前面表示(&T)',
                type:'checkbox',
                accelerator:'CmdOrCtrl+T',
                click(item, focusedWindow){
                    if(focusedWindow){
                        if(focusedWindow.isAlwaysOnTop()){
                            focusedWindow.setAlwaysOnTop(false);
                        }else{
                            focusedWindow.setAlwaysOnTop(true);
                        }
                    }
                }
            },
            {
                type:'separator'
            },
            {
                label: 'アプリケーションのリセット',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow){
                    if(focusedWindow) focusedWindow.loadURL('file://'+__dirname+'/index.html');
                },
            },
            {
                label: '開発者ツール[App]',
                click(item, focusWindow) {
                    if (focusWindow) {
                        focusWindow.webContents.toggleDevTools();
                    }
                }
            },
            {
                label:'開発者ツール[Webview]',
                click(item,focusedWindow){
                    if(focusedWindow) {
                        focusedWindow.webContents.send('devtool');
                    }
                }
            }
        ]
    },
    {
        label:'移動(&J)',
        submenu:[
            {
                label:'マイスタジオ',
                accelerator:'CmdOrCtrl+1',
                click(item,focusedWindow){
                    focusedWindow.webContents.send('jump','mystudio');
                }
            },
            {
                label:'ぷちデレラ',
                accelerator:'CmdOrCtrl+2',
                click(item,focusedWindow){
                    focusedWindow.webContents.send('jump','petit');
                }
            },
            {
                label:'ガチャ',
                accelerator:'CmdOrCtrl+3',
                click(item,focusedWindow){
                    focusedWindow.webContents.send('jump','gacha');
                }
            },
            {
                label:'レッスン・特訓',
                accelerator:'CmdOrCtrl+4',
                click(item,focusedWindow){
                    focusedWindow.webContents.send('jump','lesson');
                }
            },
            {
                label:'フリートレード',
                accelerator:'CmdOrCtrl+5',
                click(item,focusedWindow){
                    focusedWindow.webContents.send('jump','freetrade');
                }
            },
            {
                type:'separator'
            },
            {
                label:'アイテム',
                submenu:[
                    {
                        label:'贈り物',
                        accelerator:'CmdOrCtrl+6',
                        click(item,focusedWindow){
                            focusedWindow.webContents.send('jump','giftbox');
                        }
                    },
                    {
                        label:'アイテム一覧',
                        accelerator:'CmdOrCtrl+7',
                        click(item,focusedWindow){
                            focusedWindow.webContents.send(
                                'link',
                                'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fitem'
                            );
                        }
                    },
                    {
                        label:'ショップ',
                        accelerator:'CmdOrCtrl+8',
                        click(item,focusedWindow){
                            focusedWindow.webContents.send(
                                'link',
                                'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fshop'
                            );
                        }
                    }
                ]
            },
            {
                label:'アイドル',
                submenu:[
                    {
                        label:'アイドル一覧',
                        accelerator:'CmdOrCtrl+9',
                        click(item,focusedWindow){
                            focusedWindow.webContents.send(
                                'link',
                                'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fcard_list'
                            );
                        }
                    },
                    {
                        label:'女子寮/トレーナールーム',
                        accelerator:'CmdOrCtrl+0',
                        click(item,focusedWindow){
                            focusedWindow.webContents.send(
                                'link',
                                'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fcard_storage'
                            );
                        }
                    }
                ]
            },
            {
                type:'separator'
            },
            {
                label:'お仕事',
                accelerator:'CmdOrCtrl+Q',
                click(item,focusedWindow){
                    focusedWindow.webContents.send(
                        'link',
                        'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fquests'
                    );
                }
            },
            {
                label:'LIVEバトル',
                accelerator:'CmdOrCtrl+W',
                click(item,focusedWindow){
                    focusedWindow.webContents.send(
                        'link',
                        'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fbattles'
                    );
                }
            },
            {
                type:'separator'
            },
            {
                label:'自分のプロフィール',
                accelerator:'CmdOrCtrl+P',
                click(item,focusedWindow){
                    focusedWindow.webContents.send(
                        'link',
                        'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fresults'
                    );
                }
            },
            {
                label:'プロダクション',
                accelerator:'CmdOrCtrl+O',
                click(item,focusedWindow){
                    focusedWindow.webContents.send(
                        'link',
                        'http://sp.pf.mbga.jp/12008305/?guid=ON&amp;url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fknights%2Fknights_top_for_member'
                    )
                }
            }
        ]
    },
    {
        label:'ヘルプ(&H)',
        submenu:[
            {
                label:'GitHub Wiki(&W)',
                accelerator:'F1',
                click(){shell.openExternal('https://github.com/miyacorata/Aschenputtel/wiki')}
            },
            {
                label:'更新の確認(&C)',
                click(){
                    dialog.showMessageBox(
                        {
                            type:'question',
                            buttons:['Yes','No'],
                            title:'Question',
                            message:'ブラウザを開いて更新を確認します',
                            detail:'はいをクリックするとブラウザでGitHubのリリースページを開きます\n更新があれば最新版をダウンロードしてください\n\n現在のバージョン : '+app.getVersion()
                        },
                        (key) => {
                            if(key === 0){
                                shell.openExternal('https://github.com/miyacorata/Aschenputtel/releases');
                            }
                        }
                    )
                }
            },
            {
                label:'Aschenputtelについて(&A)',
                click(){
                    dialog.showMessageBox(
                        BrowserWindow.getFocusedWindow(),
                        {
                            title:'About Aschenputtel',
                            type:'info',
                            buttons:'info',
                            buttons:['OK'],
                            message:'Aschenputtel',
                            detail:'モバマスPのためのモバマスブラウザ\nDevelop : @miyacorata\nVersion : '+app.getVersion()
                        }
                    )
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

