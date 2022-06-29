const http = require('http')
const fs = require('fs');
const { table } = require('console');
http.createServer((request, response) => {
    // response.writeHead(200);
    response.setHeader("Content-type", "text/html");

    fs.readFile('./data/film.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('error');
        } else {
            const films = JSON.parse(data)
            films.shift()
            // response.write(
            //    ` <table>
            //         ${films.map((film, i) => {
            //             return (<td>

            //                 <tr>{i + 1}</tr>
            //                 <tr>{film.title}</tr>
            //                 <tr><img src={film.image} alt="" /></tr>
            //             </td>

            //             )
            //         }
            //         )}
            //     </table>`

            // )

        }
        fs.createReadStream(data)
             .on("error", () => {
                 console.error("err");
             })
             .pipe(
         //          ` <table>
         //     ${films.map((film, i) => {
         //         return (<td>

         //             <tr>{i + 1}</tr>
         //             <tr>{film.title}</tr>
         //             <tr><img src={film.image} alt="" /></tr>
         //         </td>

         //         )
         //     }
         //     )}
         // </table>`
         data
         );
    })



    response.end()




}).listen(3002)