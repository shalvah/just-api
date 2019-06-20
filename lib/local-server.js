'use strict';

const EventEmitter = require('events');

module.exports = class LocalServer extends EventEmitter {

    constructor() {
        super();
        this.child = null;
    }

    start() {
        console.log('Starting local server via `npm start`');

        const spawn = require('cross-spawn');
        this.child = spawn('npm', ['start'], {cwd: process.cwd() });

        this.child.stdout.setEncoding('utf8');
        this.child.stderr.setEncoding('utf8');

        let logged;
        this.child.stdout.on('data', (data) => {
            if (logged) {
                return;
            }
            this.emit('start');
            console.log(data);
            logged = true;
        });
        this.child.stderr.on('data', (data) => {
            console.log(data);
        });
        this.child.on('error', (err) => {
            console.log(`Failed to run npm start: ${err}.`);
            process.exit(1);
        });

        this.child.on('close', (code) => {
            console.log(`npm start exited with code ${code}`);
        });

    }

    stop() {
        console.log(`Stopping ${this.child.pid}`);
        this.child.kill();
        console.log(`Exited`);
        process.exit(process.exitCode || 0);
    }

};