// Jonathan's API

var Jonathan = {
	
	init: function () {
		
		angular.module('Jonathan', ['ngMaterial']);  // This is simply to make the UI work.  We aren't using AngularJS for anything else.
		
		// WebSocket communications unit
		/*var server = new WebSocket('ws://localhost:8080/endpoint');
		
		server.onmessage = function (event) {
			// handle messages from the server
			var message = JSON.parse(event.data);
			var cardData = '';
			console.log(message);  // For testing purposes
			
			if (message.header) {
				cardData = '<div class="cardHeader">' + message.header + '</div><br/><br/>';
			}
			
			cardData += message.body;
			
			Jonathan.cards.pushCard(message.appName, cardData);
		} */// Disabled for testing
	
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
			//Jonathan.insertHTML = 'Sorry, but it looks like your browser can\'t accept speech input.  You can still type in the text box below.';
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
	
	cards: {
		list: [
		
		
		],
		
		pushCard: function (appName, data) {
			var cardContainer = document.getElementsByClassName('cardContainer')[0];
			
			if (Jonathan.cards.list.indexOf(appName) == -1) {
				var card = document.createElement('material-card');
				card.id = appName + 'Card';
				card.innerHTML = data;
				cardContainer.appendChild(card);
				Jonathan.cards.list.push(appName);
			} else {
				document.getElementById(appName + 'Card').innerHTML = data;
			}
			
		}
	}
	
}