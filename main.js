$(document).ready(function () {

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
	};

	var addMovie = function(movie){
		this.movies.push(movie);
	};

	var removeMovie = function(id){
		this.movies.forEach(function(element, i){
			if (element.id === id) {
				this.movies.splice(i, 1);
			}
		});
	};

	var getMovie = function(id){
		this.movies.forEach(function(element, i){
			if (element.id === id) {
				return element;
			}
		});
	};

	$('#search-form').on('submit', function (event) {
		var searchText = $('#search-text').val();
		console.log(searchText);
		getMoviesFromApi(searchText);
		event.preventDefault();
	});

	function getMoviesFromApi(searchInput){
		axios.get('http://www.omdbapi.com/?s='+ searchInput + '&apikey=2bed335a')
			.then(function (response) {
				var movies = response.data.Search;
				console.log(response);
				var output = '';
				$.each(movies, function (i, movie) {
					output += `
					<div> 
						<img src="${movie.Poster}">
						<h5>${movie.Title}</h5>
						<a href="#" onclick="selectedMovie('${movie.imdbID}')">Movie Details</a>
					</div>
					`
				});
				console.log(output);
				$('#movies').html(output);
			})
			.catch(function (error) {
				console.log(error);
			})
	}

});
