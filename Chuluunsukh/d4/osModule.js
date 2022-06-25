const os = require("os");

const local = {
  "Home directory": os.homedir(),
  "Operating System": os.type(),
  "Last Reboot": os.uptime(),
  architecture: os.arch(),
};

console.log(local);
