const fs = require("fs");
const https = require("https");
const util = require("util");
const {resolve}= require('path');


let people
const films = []

const readFile = util.promisify(fs.readFile)
const httpsGet = util.promisify(https.get)

function createServer(){
    return new Promise((resolve, rejects)=>{
        http
        .createServer((request, response)=>{
            response.on ('error', (err)=>{
                console.error(err)
                return rejects
            })
            response.write(`<table>
            <tr>
            <th scope="col">Numbers</th>
            <th scope="col">Name</th>
            <th scope="col">gender</th>
            <th scope="col">age</th>
            `)
        })
    })
}

const getPeople = util.promisify(https.get);
getPeople("https://ghibliapi.herokuapp.com/people").then((res) => {
  let data = [];
  const peoples =await readFile("./data/people.json")
  res.on("data", (chunk) => {
    data.push(chunk);
  });

  peopleArray.map(async (e) => {
    let filmObject = e;
    const p = await httpsGet(e.films[0], (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });
    });
    res.on("end", () => {
      const converteData = JSON.parse(Buffer.concat(data).toString());
      filmObject.image = converteData.image;
      peopleArray = JSON.parse(peoples);
      console.log(converteData.path);
      return people;
    });
  });
});

