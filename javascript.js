$(document).ready(function() {

var input = '';	

	// Create a 
	var smilesArray = ['puppies', 'kittens', 'babies', 'blep', 'smiling'];

	for (var i = 0; i < smilesArray.length; i++) {

		var smilesBtn = $('<button>').addClass('smiles-button').attr('data-smile', smilesArray[i]).text(smilesArray[i]);

        $('.buttons').append(smilesBtn);

    } 

    $(".smiles-button").on("click", function() {
    	// this button will call API
    	input = $(this).attr("data-smile");
    	callAPI();
    });



	// this successfully calls the giphy API upon a search or button input.
	//var input = 'funny-cat';
	//var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC';


	function callAPI() {

		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC';
		//console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response.data[1]);
			// display 6 gifs
			displayGifs(response);
		});
	}

	function displayGifs(response) {
		$('.gifs').html('');
		for (i = 0; i < 6; i++) {
			var gifURL = response.data[i].images.fixed_height.url;
			$('.gifs').append('<img src="' + gifURL + '" data-state="still" class="gif">');
			//console.log(response.data[i].embed_url);
		}

	}
});