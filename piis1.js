let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?');

let personalMovieDB = {
    count: numberOfFilms,
    movies: []
}

for (let i = 0; i < 2; i++) {
    let lastFilm;
    do {
        lastFilm = prompt('Один из последних просмотренных фильмов?');
    } while (!lastFilm || lastFilm.length >= 50 || lastFilm == ' ');

    let filmEsteem;
    do {
        filmEsteem = prompt('На сколько вы его оцените?');
    } while (!filmEsteem || filmEsteem.length >= 50 || filmEsteem == ' ');

    personalMovieDB.movies[lastFilm] = filmEsteem;
    personalMovieDB.movies.push({ title: lastFilm, rating: filmEsteem });

}

alert(JSON.stringify(personalMovieDB));
