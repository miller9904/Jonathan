// Jonathan's API

var Jonathan = {
	
	// Avatar related code
	avatar: {
		// Methods of animation
		animationMethods: {
			FRACTIONALIZE:   "FRACTIONALIZE",  // Cuts the outer circle into multiple parts and spins them
			SPEAK:           "SPEAK",          // Rotates the inner line 90 degrees, widens it, and and then flexes it's vertical height like a mouth
			ROTATE_INNER:    "ROTATE_INNER"    // Rotates the inner line
		},
		
		// Function that animates Jonathan's avatar
		animateAvatar: function(method /* a constant inside Jonathan.avatar.animationMethods */) {
			//TODO: Add code to manipulate the avatar.
		}
	},
	
	processQuery: function(query) {
		//TODO: Write code to send the string to the NLP engine.
	},
	
	respond: function (response /* Object with information about how to respond */) {
		//TODO: Write code to respond.
	},
	
	// ASR related code
	speechRecognizer: function () {
		// TODO: add ASR speech recognition code
		// This is an object constructor
	},
	
	// Predefined action patterns
	speechIntents: {
		TAKE_NOTE:       "TAKE_NOTE",
		SET_ALARM:       "SET_ALARM",
		SET_TIMER:       "SET_TIMER",
		ANSWER_QUESTION: "ANSWER_QUESTION",
		FREE_FORM:       "FREE_FORM"
	}
	
}