$(document).ready(function () {
	// a class for movieList properties and methods
	function MovieList(){
		var movieList = {};

		movieList.movies = [];
		movieList.addMovie = addMovie;
		movieList.removeMovie = removeMovie;
		movieList.getMovie = getMovie;
		movieList.getMoviesBySearch = getMoviesBySearch;

		return movieList;
	}
	// a function for instantiation one movie object (a factory method)
	function Movie(poster, title, type, year, imdbID) {
		var movie = {};

		movie.Poster = poster;
		movie.Title = title;
		movie.Type = type;
		movie.year = year;
		movie.imdbID = imdbID;

		return movie;
	}
	// this methods provides in insensitive case search functionality and creates divs according to the search result
	var getMoviesBySearch = function(searchInput){
		var searchRegex = new RegExp(searchInput, 'i');// i indicates for insensitive case
		// returns a filtered array by the input title
		var movies = filterSearch(this.movies, function(element){
			return element['Title'].search(searchRegex); 
		});

		var output = '';
		// if the length of the array is 0 that means there are no movies in the array
		if (movies.length !== 0) {
			//looping through the array while creating a new div and appending it to the output variable
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
										<p class="text-medium">${movie.year}</p>
										<p class="card-link text-medium">
										<a class="info-link" href="https://www.imdb.com/title/${movie.imdbID}">Movie Details</a>
										</p>
									</div>
								</div>
							</div>
						`
			});
			$('.cards').html(output); // the result will be a number of divs depending on the returned array's length
		} else {
			// if the array is empty return not found
			$('.cards').html('<div style="width: 180px;margin-left: 500px;"> <h1>No Movies Found</h1> </div>');
		}
		$('.info-link').css('color', '#D25852'); //changing the color of the links (Movie Details) to teh default dark color
		$('#search-text').val('') // emptying the input search field
	};
	// this method creates a movie instance
	var createMovie = function(poster, title, type, year, imdbID){
		var movie = Movie(poster, title, type, year, imdbID);
		return movie;
	};

	// this method adds a movie to the movies array
	var addMovie = function(movie){
		this.movies.push(movie);
	};
	//this method removes a movie by its ID
	var removeMovie = function(id){
		this.movies.forEach(function(element, i){
			if (element.imdbID === id) {
				this.movies.splice(i, 1);
			}
		});
	};

	//this method returns a movie by its ID
	var getMovie = function(id){
		this.movies.forEach(function(element, i){
			if (element.imdbID === id) {
				return element;
			}
		});
	};
	// creating an object of the MovieList class
	var movieList = MovieList();
	// when clicking on the logo it will navigate to the home page
	$('.home-btn').on('click', function () {
		$('.cards').slideUp(function () {
			$('#img-header').slideDown();
		})
	});
	// when pressing enter after typing the movie name in input:
	$('#search-form').on('submit', function (event) {
		var searchText = $('#search-text').val(); // assigning the value of the input to this variable
		if (validateSearch(searchText)) { // validating the search value with validateSearch() method
			// sliding the image up and showing the results
			 $('#img-header').slideUp(function () {
			 	// if the online is selected the result will be from the API
				if ($('#online-btn').prop("checked")){
					getMoviesFromApiBySearch(searchText);
				}
				 // if the local is selected the result will be from the local movies array
				 if ($('#local-btn').prop("checked")){
					movieList.getMoviesBySearch(searchText);
				}
				$('.cards').slideDown();
			});
		} else {
			alert('Please add a proper movie title !') //if the validation fails, it will display this message as an alert
		}
		event.preventDefault();
	});


	function getMoviesFromApiBySearch(searchInput){
		//the API call using the url with the search input
		axios.get('http://www.omdbapi.com/?s='+ searchInput + '&apikey=2bed335a')
			.then(function (response) {
				if (response !== undefined) { //checking if the response from the server is undefined or not
					var movies = response.data.Search; //an array that will hold the returned search result
					// adding all of the movies to local movies list array by using the movieList instance
					movies.forEach(function(element){
						movieList.addMovie(element);
					});

					var output = '';
					//looping through the array while creating a new div and appending it to the output variable
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
										<p class="text-medium">${movie.Year}</p>

										<p  class="card-link text-medium">
										<a class="info-link" id="${movie.imdbID}" href="https://www.imdb.com/title/${movie.imdbID}" >Movie Details</a>
										</p>
									</div>
								</div>
							</div>
						`;
					});
					$('.cards').html(output); // setting .cards div to be the resulted divs
					$('.info-link').css('color', '#D25852');
					$('#search-text').val('') //clearing the input text value
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
      $('.info-link').css('color', '#D25852');

    } else {
      $( "body" ).addClass( "light" );
      $('.cards *').css('background-image', 'linear-gradient(to right, #F4F8FB, #F4F8FB)'); 
      $('.navigation a li').css('color', 'black')
      $('.center h3').css('color', 'black');
      $( ".inner-switch" ).html('<i class="fa fa-moon-o fa-2x" aria-hidden="true"></i>');
      $('.radio-btns').css('color', 'black');
      $('.info-link').css('color', 'black');

    }
});
	// to validate the search input if it has whitespaces or its length is less 3
	function validateSearch(searchText){
		if (!/^ *$/.test(searchText) && searchText.length >= 3) {
			return true;
		} 
		return false;
	}
	//filter fucntion but its customized to be used with .search() function
	function filterSearch(array, func) {
	    var arr = [];
	    for (var i = 0 ; i < array.length; i++){
	        if (func(array[i]) >= 0){ //if it returns a positive number which indicates an index it will push otherwise it will not
	            arr.push(array[i]);
	        }
	    }
	    return arr;		
	}
});
