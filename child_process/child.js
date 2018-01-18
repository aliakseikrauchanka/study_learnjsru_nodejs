var childProcess = require('child_process');

process.on('message', message => {
    console.log(`Received message ${message} from parent`);
    childProcess.exec(message, err => {
        process.send(!err ? 'success' : 'fail');
        process.exit();
    });
});
