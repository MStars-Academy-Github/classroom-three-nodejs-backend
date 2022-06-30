http.createServer(function (request, response) {
  if (request.url === "/ghibli=films") {
    fs.readFile("./data/films.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        let films = JSON.parse(data);
        response.write(
          ` <table>
                <tr>
                  <th scope="col">Numbers</th>
                  <th scope="col">Titles</th>
                  <th scope="col">Images</th>
                </tr>
                
               
                ${films.map(
                  (e, i) =>
                    ` <tr><td>${i + 1}</td><td>${e.title}</td><td><img src=${
                      e.image
                    }></td> </tr>`
                )}
               
              </table>`
        );
        response.end();
      }
    });
  }
});
