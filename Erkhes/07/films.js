function serveFilm(req, res){
    const films = JSON.parse(data)
    films.shift()
    res.write(
    films.map(film=>{
        return(
            `<tr>${film.title}</tr>`
            )
    })
    )
}
module.exports = serveFilm