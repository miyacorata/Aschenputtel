"use strict";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const dialog = electron.dialog;
const shell = electron.shell;

const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on("window-all-closed", () => {
    if(process.platform != "darwin") {
        app.quit();
    }
});

app.on("ready", () => {
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
        }
    );
    mainWindow.loadURL(
        'file://'+__dirname+'/index.html'
    );
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS('body::-webkit-scrollbar{display: none;}');
    });
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.on("page-title-updated", () => {
        //event.preventDefault();
        mainWindow.setTitle('Aschenputtel');
    });
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
                label: '開発者ツール(App)',
                accelerator: (process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I'),
                click(item, focusWindow) {
                    if (focusWindow) {
                        focusWindow.webContents.toggleDevTools();
                    }
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
                            detail:'モバマスPのためのモバマスブラウザ\nDevelop : @miyacorata'
                        }
                    )
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

