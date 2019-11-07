
function MovieList(){
	var movieList = {};
	movieList.movies = [];
	movieList.addMovie = addMovie;
	movieList.removeMovie = removeMovie;
}

function Movie(id, name, genre, description, year) {
	var movie = {};

	movie.id = id;
	movie.name = name;
	movie.genre = genre;
	movie.description = description;
	movie.year = year;

	return movie;
}




