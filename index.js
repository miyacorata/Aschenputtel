"use strct";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const dialog = electron.dialog;
// const window.jQuery = window.$ = require("jquery");

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
            webPreferences:{
                nodeIntegration:false
            }
        }
    );
    mainWindow.loadURL(
        // 'file://'+__dirname+'/index.html',
        'http://sp.pf.mbga.jp/12008305/',
        {
            userAgent:'Mozilla/5.0 (Linux; Android 6.0.1; SO-02G Build/23.5.B.0.303) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36'
        }
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

const templateMenu = [
    {
        label:'Aschenputtel',
        submenu: [
            {
                label:'モバマストップへ移動',
                accelerator:'CmdOrCtrl+M',
                click(){mainWindow.loadURL('http://sp.pf.mbga.jp/12008305/');}
            },
            {
                type:'separator'
            },
            {
                label:'終了',
                accelerator:'Alt+F4',
                click(){app.quit();}
            }
        ]
    },
    {
        label:'表示',
        submenu: [
            {
                label: '再読み込み',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow){
                  if(focusedWindow) focusedWindow.reload();
                },
            },
            {
                label:'戻る',
                accelerator:'Alt+Left',
                //click(){document.getElementById('mainWebview').goBack();}
                click(){
                    dialog.showMessageBox(
                        BrowserWindow.getFocusedWindow(),
                        {
                            title:'Error',
                            type:'info',
                            buttons:'info',
                            buttons:['OK'],
                            message:'未実装です',
                            detail:'すまんな'
                        }
                    )
                }
            },
            {
                label:'進む',
                accelerator:'Alt+Right',
                click(){
                    dialog.showMessageBox(
                        BrowserWindow.getFocusedWindow(),
                        {
                            title:'Error',
                            type:'info',
                            buttons:'info',
                            buttons:['OK'],
                            message:'未実装です',
                            detail:'すまんな'
                        }
                    )
                }
            },
            {
                type:'separator'

            },
            {
                label: '開発者ツール',
                accelerator: (process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I'),
                click(item, focusWindow) {
                    if (focusWindow) {
                        focusWindow.webContents.toggleDevTools();
                    }
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);