$(document).ready(function () {
// Poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
// Title: "Joker"
// Type: "movie"
// Year: "2019"

// imdbID: "tt7286456"
// var regex = new RegExp("ReGeX" + testVar + "ReGeX");
// ...
// string.replace(regex, "replacement");
// Update
// Per some of the comments, it's important to note that you may want to escape the variable
// if there is potential for malicious content (e.g. the variable comes from user input)



	function MovieList(){
		var movieList = {};

		movieList.movies = [];
		movieList.addMovie = addMovie;
		movieList.removeMovie = removeMovie;
		movieList.getMovie = getMovie;
		movieList.getMoviesBySearch = getMoviesBySearch;
		return movieList;
	}

	function Movie(poster, title, type, year, imdbID) {
		var movie = {};

		movie.Poster = poster;
		movie.Title = title;
		movie.Type = type;
		movie.year = year;
		movie.imdbID = imdbID;

		return movie;
	}
//var regexstring = "whatever";
// var regexp = new RegExp(regexstring, "gi");
// var str = "whateverTest";
// var str2 = str.replace(regexp, "other");
// document.write(str2);
// Then you can construct regexstring in any way you want.
	var getMoviesBySearch = function(searchInput){
		var searchRegex = new RegExp(searchInput, 'i')
		return filterSearch(this.movies, function(element){
			return element['Title'].search(searchRegex);
		});
	}

	var createMovie = function(poster, title, type, year, imdbID){
		var movie = Movie(poster, title, type, year, imdbID);
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

	var movieList = MovieList();

	$('#search-form').on('submit', function (event) {
		var searchText = $('#search-text').val();
		console.log(searchText);
		getMoviesFromApiBySearch(searchText);
		event.preventDefault();
	});

	function getMoviesFromApiBySearch(searchInput){
		axios.get('http://www.omdbapi.com/?s='+ searchInput + '&apikey=2bed335a')
			.then(function (response) {
				var movies = response.data.Search;
				console.log(response);

				movies.forEach(function(element){
					movieList.addMovie(element);
				});
				console.log(movieList.movies);
				console.log(movieList.getMoviesBySearch(searchInput));

				var output = '';
				$.each(movies, function (i, movie) {
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
				$('.cards').html(output);
			})
			.catch(function (error) {
				console.log(error);
			})
	}

    $('.navigation a li').css('color', '#D25852') //to fix the colors of the navigation buttons

	$( ".inner-switch" ).on("click", function() {

    if( $( "body" ).hasClass( "light" )) {
      $( "body" ).removeClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #041124, #040e1d, #020a17, #01060f, #000103)');
      $('.navigation a li').css('color', '#D25852')
      $( ".inner-switch" ).html('<i class="fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>');

    } else {
      $( "body" ).addClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #F4F8FB, #F4F8FB)'); 
      $('.navigation a li').css('color', 'black')
      $( ".inner-switch" ).html('<i class="fa fa-moon-o fa-2x" aria-hidden="true"></i>');

    }
});

	function filterSearch(array, func) {
	    var arr = [];
	    for (var i = 0 ; i < array.length; i++){
	        if (func(array[i]) >= 0){
	            arr.push(array[i]);
	        }
	    }
	    return arr;		
	}


});
