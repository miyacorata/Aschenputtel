"use strict";
const packager = require('electron-packager');
const packages = require('./package.json');

packager(
    {
        name:packages['name'],
        dir:'./',
        out:'../'+packages['name']+'-v'+packages['version']+'/',
        icon:'./icon.ico',
        platform:'win32',
        arch:'x64,ia32',
        version:'1.8.2',
        overwrite:true,
        asar:true,
        appVersion:packages['version'],
        appCopyright:'(c) 2018 '+packages['author'],
        win32metadata:{
            CompanyName:'MiyanojiRapid',
            FileDescription:packages['name'],
            OriginalFilename:packages['name']+'.exe'
        }
    }, function(err,appPaths){
        if(err)console.log(err);
        console.log("Build Done : "+appPaths);
    }
);