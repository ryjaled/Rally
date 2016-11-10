(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		document.getElementById("capturePhoto").onclick = function() {
			//alert("here");
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				quality : 50,

				destinationType : destinationType.DATA_URL
			});
		}



	};

	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message) {

		alert('Failed because: ' + message);

	}

	})();


(function() {

//barcode scanner

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	function onDeviceReady() {


		document.getElementById("barcodeScanner").onclick = function(){
			//alert("here");
			cordova.plugins.barcodeScanner.scan(
		 function (result) {
				 alert("We got a barcode\n" +
							 "Result: " + result.text + "\n" +
							 "Format: " + result.format + "\n" +
							 "Cancelled: " + result.cancelled);
		 },
		 function (error) {
				 alert("Scanning failed: " + error);
		 },
		 {
				 "preferFrontCamera" : true, // iOS and Android
				 "showFlipCameraButton" : true, // iOS and Android
				 "prompt" : "Place a barcode inside the scan area", // supported on Android only
				 "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
				 "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
		 }
	);



	}
	} ;

	})();





(function() {


	document.getElementById("geolocationdata").onclick = function(){
		alert("here!");
		 navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 6000});
	}


	var onSuccess = function(position) {
		 alert('Latitude: '          + position.coords.latitude          + '\n' +
					 'Longitude: '         + position.coords.longitude         + '\n' +
					 'Altitude: '          + position.coords.altitude          + '\n' +
					 'Accuracy: '          + position.coords.accuracy          + '\n' +
					 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
					 'Heading: '           + position.coords.heading           + '\n' +
					 'Speed: '             + position.coords.speed             + '\n' +
					 'Timestamp: '         + position.timestamp                + '\n');

 };

 // onError Callback receives a PositionError object
 //
 function onError(error) {
		 alert('code: '    + error.code    + '\n' +
					 'message: ' + error.message + '\n');
 }
google.maps.event.addDomListener(window, 'load', onSuccess);


})();






(function() {




		document.getElementById("geolocationdatawatch").onclick = function(){
			alert("here!");
			 navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000});
		}


		var onSuccess = function(position) {
			var element = document.getElementById('geolocationwatch');
			 element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
													 'Longitude: ' + position.coords.longitude     + '<br />' +
													 '<hr />'      + element.innerHTML;

	 };

	 // onError Callback receives a PositionError object
	 //
	 function onError(error) {
			 alert('code: '    + error.code    + '\n' +
						 'message: ' + error.message + '\n');
	 }




})();



(function (global) {
    "use strict";

    function onDeviceReady() {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
    }

    function onOnline() {
        loadMapsApi();
    }

    function onResume() {
        loadMapsApi();
    }

    function loadMapsApi() {
        		if (navigator.connection.type === Connection.NONE || (global.google !== undefined && global.google.maps)) {
            return;
        }

        //TODO: Add your own Google maps API key to the URL below.
        $.getScript('https://maps.googleapis.com/maps/api/js?sensor=true&callback=onMapsApiLoaded');
    }

    global.onMapsApiLoaded = function () {
        // Maps API loaded and ready to be used.
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        });
    };

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);
