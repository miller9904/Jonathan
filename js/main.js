// Jonathan's API

var Jonathan = {
	
	init: function () {
		WinJS.UI.processAll().done(function () {
			var appBar = document.getElementById("appBar");
			var recognizer = new Jonathan.speechRecognizer();
			
			
			var appBarOpen = function (event) {
				console.log('beforeshow event fired');
				recognizer.startRecording();
			}
			
			var appBarClose = function (event) {
				console.log('beforehide event fired');
				recognizer.stopRecording();
				recognizer.recognize().then(function (resolved, rejected) {
					if (resolved !== null) {
						document.getElementById('textInput').value = resolved;
					}
				});
			}
			
			appBar.addEventListener('beforeshow', appBarOpen);
			appBar.addEventListener('beforehide', appBarClose);
		});
		
		document.getElementById('textInput').value = '';
	},
	
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
	
	insertHTML: function (response /* HTML string */) {
		//TODO: Write code to respond.
		var content = document.getElementById('content');
		WinJS.UI.Animation.exitContent(output, null).done(function () {
	        content.innerHTML = '';
	        content.innerHTML = response;
	        return WinJS.UI.Animation.enterContent(output, null);
	    });
	},
	
	// Speech Recognition
	// ***********************************************************************************************
	speechRecognizer: function () {
		// TODO: add ASR speech recognition code
		// This is an object constructor
		
		console.log('Initializing speechRecognizer object');
		
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
      		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			var audio_context = new AudioContext();
			var recorder;
			
			var startUserMedia = function (stream) {
				var input = audio_context.createMediaStreamSource(stream);
			    console.log('Media stream created.');
			    
			    input.connect(audio_context.destination);
			    console.log('Input connected to audio context destination.');
			    
			    recorder = new Recorder(input, {workerPath: 'js/recorder.js/recorderWorker.js'});
			    console.log('Recorder initialised.');
				
				// Hack for a Firefox bug that stops input after a few seconds
				window.source = audio_context.createMediaStreamSource(stream);
  				source.connect(audio_context.destination);
			}
			
			navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      			console.log('No live audio input: ' + e);
    		});
		} catch (e) {
			var appBar = document.getElementById('appBar').winControl;
			appBar.disabled = true;
			console.log('Error setting up audio: ' + e);
			Jonathan.insertHTML = 'Sorry, but it looks like your browser can\'t accept speech input.  You can still type in the text box below.';
		}
		
		this.listenForActivationKeyword = function () {
			// Add PocketSphinx keyword spotter
			var keywordEvent = new Event('keywordSpotted');
			
			
		}
		
		this.startRecording = function () {
			recorder.record();
			console.log('Recording started...');
		}
		
		this.stopRecording = function () {
			recorder.stop();
			console.log('Recording stopped.');
		}
		
		this.recognize = function () {
			//TODO: Add code
			// This is the function that sends the request to the ASR engine and returns the results
			return new Promise(function (resolve, reject) {
				recorder.exportWAV(function(audio) {
					var xhr = new XMLHttpRequest();
					
					xhr.onReadyStateChange = function (event) {
						if (xhr.readyState == 4) {
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
								console.log('request to http://seccominc.majolu.com/Jonathan/NuanceASR.php was successful');
								recorder.clear();
								resolve(xhr.responseText);
							} else {
								console.log('request to the speech server returned error status ' + xhr.status);
								reject(xhr.status);
							}
						}
					}
					
					xhr.open('post', 'http://seccominc.majolu.com/Jonathan/NuanceASR.php');
					xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhr.send(audio);
				});
			
			});
		}
	},
	//************************************************************************************************
	
	// Generates a five character random string for the speech recognition animation
	randChars: function () {
		var chars = ["a","b","c","d","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
		return chars[Math.floor(Math.random() * chars.length + 0)] + chars[Math.floor(Math.random() * chars.length + 0)] + chars[Math.floor(Math.random() * chars.length + 0)] + chars[Math.floor(Math.random() * chars.length + 0)] + chars[Math.floor(Math.random() * chars.length + 0)];
	},
	
	// Predefined action patterns
	speechIntents: {
		TAKE_NOTE:       "TAKE_NOTE",
		SET_ALARM:       "SET_ALARM",
		SET_TIMER:       "SET_TIMER",
		MUSIC:           "MUSIC",
		ANSWER_QUESTION: "ANSWER_QUESTION"
	}
	
}

var createEvalTool = function () {
	var evalTool = document.createElement('div');
	evalTool.innerHTML = '<textbox style="width: 100px; height: 80px;" id="evalTB"></textbox><br\><button onclick="eval(document.getElementById(\"evalTB\").value)">Run Code </button>';
	evalTool.style.border = '1px solid black';
	evalTool.style.padding = '10px';
	evalTool.style.top = "80px";
	evalTool.style.right = "40px";
	evalTool.style.position = "absolute";
	document.body.appendChild(evalTool);
}