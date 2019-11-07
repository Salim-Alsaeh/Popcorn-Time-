
function MovieList(){
	var movieList = {};

	movieList.movies = [];
	movieList.addMovie = addMovie;
	movieList.removeMovie = removeMovie;
	
	return movieList;
}

function Movie(id, name, genre, description, year) {
	var movie = {};

	movie.id = id;
	movie.name = name;
	movie.imageUrl = "";
	movie.genre = genre;
	movie.description = description;
	movie.year = year;

	return movie;
}

var createMovie = function(id, name, genre, description, year){
	var movie = Movie(id, name, genre, description, year);
	return movie;
}

var addMovie = function(movie){
	this.movies.push(movie);
}

var removeMovie = function(id){
	this.movies.forEach(function(element, i){
		if (element.id === id) {
			this.movies.splice(i, 1);
		}
	});
}

var getMovie = function(id){
	this.movies.forEach(function(element, i){
		if (element.id === id) {
			return element;
		}
	});
}




