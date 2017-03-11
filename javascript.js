$(document).ready(function() {

	/////////////////////////
	// ESTABLISH VARAIBLES // -----------------------------------------------------------------------------
	/////////////////////////

	var input = '';	
	var click = false;
	var userCount = 0;
	var smilesArray = ['puppies', 'kittens', 'babies', 'blep', 'smiling'];


	/////////////
	// DISPLAY // -----------------------------------------------------------------------------------------
	/////////////

	// create buttons for each string in array, with text from string, and appends them to div HTML element
	for (var i = 0; i < smilesArray.length; i++) {
		// create button with text from string in array
		var smilesBtn = $('<button>').addClass('smiles-button').attr('data-smile', smilesArray[i]).text(smilesArray[i]);
		// append button to div HTML element
        $('.buttons').append(smilesBtn);
    }

    // displays 6 gifs from API response
	function displayGifs(response) {
		// clears out any gifs that were on already display in the .gifs div, if applicable
		$('.gifs').html('');

		// Selects first 6 gifs from API and displays them to the screen
		for (i = 0; i < 6; i++) {
			// store gif URL from API response into animatedGifURL variable
			var animatedGifURL = response.data[i].images.fixed_height.url;
			// store alternate gif URL for stopped gifs in stillGifURL variable
			stillGifURL = animatedGifURL.replace('.gif', '_s.gif');
			// Appends gif to div HTML element with various gif URLs and animation states
			$('.gifs').append('<img src="' + stillGifURL + '" data-still="' + stillGifURL + '" data-animate="' + animatedGifURL + '" data-state="still" class="gif">');
		}
	}    

	// clears any text from the input field 
    function clearInput() {
    	$('#smilesInput').val('');
    }


    //////////////////////
    // EVENTS MANAGEMENT// -----------------------------------------------------------------------------------
    //////////////////////

    // click function for starting buttons
    $(".smiles-button").on("click", function() {
    	// this button will call API
    	input = $(this).attr("data-smile");
    	//console.log('input is ' + input);
    	callAPI();
    });

    // click function for submit button
    $('.submit').on('click', function(event){
    	// prevent refresh / over ride default button action
    	event.preventDefault();
    	// puts input value into variable newBtnName
    	var newBtnName = $('#smilesInput').val();
    	// will store index value of input if present in array in variable inArray, will be -1 if not present in the array
    	var inArray = $.inArray(newBtnName, smilesArray);
    	// if the input is empty
    	if (newBtnName === '') {
    		// if nothing has been input when the button is clicked, instruct to enter text
    		alert('Type into the text box to add something that makes you smile!');
    	} else{
    		// else if newBtnName contains text
	    	if (inArray < 0) {
	    		if (userCount < 5) {
	    		// change var input to the value of newBtnName
	    		input = newBtnName;
		    	// create new button with text from newBtnName on it
		    	var newBtn = $('<button>').addClass('smiles-button newBtn').attr('data-smile', newBtnName).text(newBtnName);
		    	// append the new button to the html div element
		    	$('.buttons').append(newBtn);
		    	// add newBtnName to array so buttons will not be duplicated
		    	smilesArray.push(newBtnName);
		    	// count number of buttons created by user
		    	userCount++;
		    	console.log('usercount= '+ userCount);

		    	if (userCount === 2) {
		    		alert('In case you hadn\'t noticed, seeing you smile makes me smile too!')
		    	}

		    	// clear text from input
		    	clearInput();
				// calls API with new input		    	
		    	callAPI();
		    	} else{
		    		alert('Alright maybe you should cool it there with the buttons... and the suggestions... Remember, true happiness comes from within. Maybe we should all take a moment to be thankful for the gifs we already have.');
		    	}

	    	} else{
	    		// clear text from input
	    		clearInput();
	    		// instruct user to input a different option
	    		alert('That\'s already an option!  Choose something else that makes you smile.');
	    	}
    	}
    });

    // enables the new buttons to call the API and display gifs as well.
    $('.buttons').on('click', '.newBtn', function(event){
    	// pulls button's attribute and stores into input variable
    	input = $(this).attr('data-smile');
    	// calls API with current input
    	callAPI();
    });

    // function for gifs added to HTML to be able to stop/start on click
    $('.gifs').on('click', 'img', function() {
    	// stores state attribute from clicked button into state variable
		var state = $(this).attr('data-state');
      	// if state is still, animate gif on click
	    if (state === 'still') {
	        $(this).attr('src', $(this).attr('data-animate'))
        	$(this).attr('data-state', 'animate');
      	} else{
  		// else if state is animated, stop gif on click
	        $(this).attr('src', $(this).attr('data-still'));
	        $(this).attr('data-state', 'still');
      	}
	});



    /////////////////////
    // DATA MANAGEMENT // ---------------------------------------------------------------------------------
    /////////////////////

	// calls API with current input to display 6 gifs
	function callAPI() {

		// creates URL as per giphy API documenation
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC';

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			// display 6 gifs
			displayGifs(response);

			// the first time gifs are generated, it will give you instructions to click to start/stop the gifs
			if (click === false) {
				alert('Click on a gif to start/stop it!  You can also search other gifs that make you smile!');
				click = true;
			} else{
				click = true;
				
				// if (callCount === 5) {
				// 	alert('In case you haven\'t noticed, seeing you smile makes me smile too!');
				// }
			}
		});
	}
});