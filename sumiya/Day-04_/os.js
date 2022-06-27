const os = require("os");

const local = {
  "Home Directory": os.homedir(),
  "operation system": os.type(),
  "Last reboot": os.uptime(),
  archtehture: os.arch(),
};

console.log(local);
