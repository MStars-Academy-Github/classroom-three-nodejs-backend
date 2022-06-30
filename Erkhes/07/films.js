const jsonFile = `C:/Users/user/Desktop/classroom-three-nodejs-backend/Erkhes/07/data/film.json`;
const fs = require("fs");
function serveFilms(req, res) {
//   res.setHeader("Content-type", "text/html");
  const content = JSON.parse(res?.map((film)=>{
      return `<div>${film.title}</div>`
  }))
  content != undefined ?  fs.createReadStream(jsonFile)
    .on("error", () => {
      console.error("err");
    })
    .pipe(res?.map((film)=>{
        return `<div>${film.title}</div>`
    })) : ''
}
serveFilms()
module.exports = serveAnimalJson;
