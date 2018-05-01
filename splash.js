"use strict";
const electron = require('electron');
const app = electron.remote.app;

const version = app.getVersion();

document.addEventListener('DOMContentLoaded',() => {
    document.getElementById('version').innerHTML = 'Version '+version;
});