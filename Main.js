'use strict';
require('babel-register');
require('babel-polyfill');
const Cluster = require('cluster');
const Logger = require('winston2');
const App = require('./app/App').default;
const OS = require('os');

/**
 * Starts the app among multiple workers using node cluster.
 * @param {Function} startFunc The function to run on each workers.
 */
var initializeCluster = function(startFunc) {
    if (Cluster.isMaster) {
        let cpuCount = OS.cpus().length;

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
        startFunc();
    }
};

initializeCluster(function() {
    const app = new App();

    Logger.info('Worker %d running!', Cluster.worker.id);

    app.listen(app.get('port'), function() {
        Logger.info('Express server listening on port ' + app.get('port'));
    });
});