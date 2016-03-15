'use strict';
require("babel-register");
const Cluster = require('cluster');
const Logger = require('winston2');
const App = require('./app/App').default;

if (Cluster.isMaster) {
    let cpuCount = require('os').cpus().length;

    if (process.env.NODE_ENV === 'production') {
        Logger.info('Running in production mode!');
    } else {
        Logger.info('Running in development mode!');
        cpuCount = 1;
    }

    for (let i = 0; i < cpuCount; i++) {
        Cluster.fork();
    }

    Cluster.on('exit', function(worker) {
        Logger.info('Worker %d died :(', worker.id);
        Cluster.fork();
    });
} else {
    const app = new App();

    Logger.info('Worker %d running!', Cluster.worker.id);

    app.listen(app.get('port'), function() {
        Logger.info('Express server listening on port ' + app.get('port'));
    });
}