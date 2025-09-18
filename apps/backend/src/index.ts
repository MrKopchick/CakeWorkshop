import { serverApp } from './libs/modules/server-application/server-application.js';

await serverApp.initialize().then(app => app.start());
