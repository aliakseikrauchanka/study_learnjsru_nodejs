var childProcess = require('child_process');

var child = childProcess.fork('./child.js');

setTimeout(() => {
    child.send('C:/Windows/system32/calc.exe');
}, 2000);

child.on('message', message => {
    console.log(`Received ${message} from child process`);
});

child.on('close', () => {
    console.log('Child process is closed');
});
