const os = require("os");

const local = {
  "Home D": os.homedir(),
  "ope sys": os.type(),
  "Last reboot": os.uptime(),
  arch: os.arch(),
};

console.log(local);
