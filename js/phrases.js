// Jonathan's premade responses
var phrases = {
	// Returns a random number between min (inclusive) and max (exclusive)
	get: function(phrases) {
	  return phrases[Math.floor(Math.random() * phrases.length + 0)];
	},
	
	NAME: [
		"I'm Jonathan, your personal assistant.",
		"I'm your personal assistant.",
		"Hi, I'm Jonathan.",
		"Hi, My name is Jonathan."
	],
	
	UNDERSTAND_ERROR: [
		"I'm sorry, I can't understand what you said.",
		"What?",
		"What was that you said?",
		"I can't understand.  Sorry.",
		"Could you rephrase that?"
	],
	
	//Easter Egg Responses
	
	WHERE_DO_YOU_LIVE: [
		"I'll give you a hint: I'm surrounded by silicon.",
		"Up in the cloud."
	],
	
	WHO_MADE_YOU: [
		"Two nerds.  They're still teaching me stuff.",
		"Geeks.  Can't you tell?"
	],
	
	BEST_FOOD: [
		"Well, I can't say that I know.",
		"Hard to say.  What's yours?"
	],
	
	WORST_FOOD: [
		"I hate tag soup.",
		"My least favorite food is tag soup, but if you like it, that's fine."
	]
}