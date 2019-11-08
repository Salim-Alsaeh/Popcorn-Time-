$(document).ready(function () {

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
	// this methods provides in insensitive case search functionality
	var getMoviesBySearch = function(searchInput){
		var searchRegex = new RegExp(searchInput, 'i') // i indicates for insensitive case
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
			if (element.imdbID === id) {
				this.movies.splice(i, 1);
			}
		});
	};

	var getMovie = function(id){
		this.movies.forEach(function(element, i){
			if (element.imdbID === id) {
				return element;
			}
		});
	};

	var movieList = MovieList();

	$('.home-btn').on('click', function () {
		$('.cards').slideUp(function () {
			$('#img-header').slideDown();
		})
	});
	
	$('#search-form').on('submit', function (event) {
		var searchText = $('#search-text').val();
		if (validateSearch(searchText)) {
			$('#img-header').slideUp(function () {
				getMoviesFromApiBySearch(searchText);
				$('.cards').slideDown();
			});
		} else {
			alert('Please add a proper movie title !')
		}
		event.preventDefault();
	});

	function getMoviesFromApiBySearch(searchInput){
		axios.get('http://www.omdbapi.com/?s='+ searchInput + '&apikey=2bed335a')
			.then(function (response) {
				if (response !== undefined) {
					var movies = response.data.Search;
					console.log(response);

					movies.forEach(function(element){
						movieList.addMovie(element);
					});
			
					var output = '';
					$.each(movieList.getMoviesBySearch(searchInput), function (i, movie) {
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
					$('#search-text').val('')
				}
			})
			.catch(function (error) {
				alert('Error occurred please try again later')
			})
	}

    $('.navigation a li').css('color', '#D25852'); //to fix the colors of the navigation buttons
    $('.center h3').css('color', '#D25852');
	$('.radio-btns').css('color', '#D25852');

	// dark and light them implementation
	$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "light" )) {
      $( "body" ).removeClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #041124, #040e1d, #020a17, #01060f, #000103)');
      $('.navigation a li').css('color', '#D25852')
      $('.center h3').css('color', '#D25852');
      $( ".inner-switch" ).html('<i class="fa fa-lightbulb-o fa-2x" aria-hidden="true"></i>');
      $('.radio-btns').css('color', '#D25852');

    } else {
      $( "body" ).addClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #F4F8FB, #F4F8FB)'); 
      $('.navigation a li').css('color', 'black')
      $('.center h3').css('color', 'black');
      $( ".inner-switch" ).html('<i class="fa fa-moon-o fa-2x" aria-hidden="true"></i>');
      $('.radio-btns').css('color', 'black');

    }
});
	// to validate the search input if it has whitespaces or its length is less 3
	function validateSearch(searchText){
		if (!/^ *$/.test(searchText) && searchText.length >= 3) {
			return true;
		} 
		return false;
	}

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
