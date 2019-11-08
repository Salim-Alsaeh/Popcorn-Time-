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
					// output += `
					// <div>
					// 	<img src="${movie.Poster}">
					// 	<h5>${movie.Title}</h5>
					// 	<a href="#" onclick="selectedMovie('${movie.imdbID}')">Movie Details</a>
					// </div>
					// `
					output += `
						<div class="card">
							<div class="card-image-container">
								<img src="${movie.Poster}">
							</div>
							<div class="card-content">
								<p class="card-title text-medium">
								 ${movie.Title}
								</p>
								<div class="card-info">
									<p class="text-medium">120 mins</p>
									<p class="card-link text-medium"><a onclick="selectedMovie('${movie.imdbID}') href="#">Movie Details</a></p>
								</div>
							</div>
						</div>
					`
				});
				console.log(output);
				$('.cards').html(output);
			})
			.catch(function (error) {
				console.log(error);
			})
	}


	$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "light" )) {
      $( "body" ).removeClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #041124, #040e1d, #020a17, #01060f, #000103)');

      $( ".inner-switch" ).text( "OFF" );
    } else {
      $( "body" ).addClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, white, white)');
      
      $( ".inner-switch" ).text( "ON" );
    }
});

});
