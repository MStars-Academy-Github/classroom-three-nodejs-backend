const os = require('os')
function osModule(){
    console.log(`Your Operating System :  ${os.cpus()[0].model} ${os.release()} ${os.freemem()} of your ${os.totalmem()} is free`);
    
}
module.exports = osModule