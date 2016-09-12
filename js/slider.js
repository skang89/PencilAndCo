//for all slides under .slider
$(".slider").each(function(){
	//traget the current slider
	var $this = $(this);
	//get the .slide-group
	var $group = $this.find(".slide-group");
	//jquery object to hold all the slides within .slide-group
	var $slides = $this.find(".slide");
	//create an array to house the slider buttons
	var buttonsArray = [];
	//index number of the current slide
	var currentIndex = 0;
	//used to store the time
	var timeout;

	//setting up the slider move function

	//creates the slide from old to new
	function move(newIndex) {
		//function-level scope variables that are used to control the left and right slide movements
		var animateLeft, animateRight;
		//used to reset timer after slides move, call each time to reset the time
		advance();
		//script checks if the slider is currently animating or if current slide is showing
		if ($group.is(":animated") || currentIndex === newIndex) {
			//states that nothing should be done
			return;
		}

		//references each of the buttons were stored in

		//removes class from item
		buttonsArray[currentIndex].removeClass("active");
		//add class to new item
		buttonsArray[newIndex].addClass("active");

		//if the new item has a higher index number, then the slider moves from right to left. if the item has a lower index number, then moves from left to right

		//if new item is more than current item
		if (newIndex > currentIndex) {
			//set new slide to move from right to left
			slideLeft = "100%";
			//animate the current group to the left
			animateLeft = "-100%";
		}
		else {
			//set slide to move from left to right
			slideLeft = "-100%";
			//animate the current group to the right
			animateLeft = "100%";
		}

		//new slide is positioned left or right of the current slide. its display property is set to block so it becomes visible

		//position new slide to the left (if less) or right (if more) of current slide
		$slides.eq(newIndex).css({
			left: slideLeft,
			display: "block"
		});
		//animate slides and hides previous slide
		$group.animate({left: animateLeft}, function() {
			$slides.eq(currentIndex).css({display: "none"});
			//sets the position of the new slide
			$slides.eq(newIndex).css({left: 0});
			//sets position of group of slides
			$group.css({left: 0});
			//sets currentIndex to new image
			currentIndex = newIndex;
		});
	}

	//sets a timer between slides
	function advance() {
		//clear timer stored in timeout
		clearTimeout(timeout);
		//start timer to run an anoonymous function every 4 seconds
		timeout = setTimeout(function() {
			//if statement - if not the last slide move to the next slide
			if(currentIndex < ($slides.length - 1)) {
				move(currentIndex + 1);
			}
			else {
				//move back to the start
				move(0);
			}
		}, 4000); //set time per slide (in milliseconds)
	}

	//process each slide
	$.each($slides, function(index) {
		//create a button element for each button
		var $button = $("<button type='button' class='slide-btn'>&bull;</button>");
		//if index is the current index
		if(index === currentIndex) {
			//add the active class
			$button.addClass("active");
		}
		//create event handler for the button
		$button.on("click", function() {
			//calls the move function
			move(index);
		}).appendTo($this.find(".slide-buttons")); //add to the html place holder
		//buttons are added to the button container and to the button array
		buttonsArray.push($button);
	});

	//call advance to move it
	advance();
});








