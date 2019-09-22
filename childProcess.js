const { exec, execFile, spawn } = require('child_process');

const execProcess = (cmd, args) => {
  function cb(error, stdout, stderr) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  }

  if (args) {
    execFile(cmd, args, cb);
  } else {
    exec(cmd, cb);
  }
}

const spawnProcess = (cmd, args) => {
  const s_process = spawn(cmd, args);
  let fullData = '';
  let dataChunks = '';

  s_process.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
  
  s_process.stdout.on('data', data => {
    fullData += data;
    dataChunks += 1;
    console.log(`stderr: ${data}`);
  });

  s_process.stdout.on('end', () => {
    console.log(`end: ${fullData}`);
    console.log(`chunks: ${dataChunks}`);
  });

  s_process.stdout.on('close', code => {
    console.log(`child process exited with code ${code}`);
  })
}

//execProcess('node', ['-v']);
spawnProcess('curl', ['https://nodejs.org/en/']);