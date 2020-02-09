var app = (function()
{
	// Application object.
	var app = {};

	// History of enter/exit events.
	var mRegionEvents = [];

	// Nearest ranged beacon.
	var mNearestBeacon = null;

	// Timer that displays nearby beacons.
	var mNearestBeaconDisplayTimer = null;

	// Background flag.
	var mAppInBackground = false;

	// Background notification id counter.
	var mNotificationId = 0;

	var xhr = new XMLHttpRequest();

	// Mapping of region event state names.
	// These are used in the event display string.
	var mRegionStateNames =
	{
		'CLRegionStateInside': 'Enter',
		'CLRegionStateOutside': 'Exit'
	};

	// Here monitored regions are defined.
	var mRegions =
	[
		{
			id: 'region1',
			uuid: 'CF53BD6E-6736-116A-4ED1-775E7CC76F26',
			major: 17530,
			minor: 15645
		},
		{
			id: 'region2',
			uuid: 'ED2CD8CC-77E2-8C17-46C0-FFE992515160',
			major: 63281,
			minor: 18160
		}
	];

	// Region data is defined here. Mapping used is from
	// TODO: Update with major/minor for your own beacons.
	var mRegionData =
	{
		'region1': 'ICE',
		'region2': 'SIMONE'
	};


	// Start App
	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
		document.addEventListener('pause', onAppToBackground, false);
		document.addEventListener('resume', onAppToForeground, false);
	};

	function onDeviceReady()
	{
		startMonitoringAndRanging();
	}

	function onAppToBackground()
	{
		mAppInBackground = true;
	}

	function onAppToForeground()
	{
		mAppInBackground = false;
	}


	// monitoring functions
	function startMonitoringAndRanging()
	{
		function onDidDetermineStateForRegion(result)
		{
			saveRegionEvent(result.state, result.region.identifier);
			newRegionEvent();
		}
		function onError(errorMessage)
		{
			console.log('Monitoring beacons did fail: ' + errorMessage);
		}

		// Request permission from user to access location info.
		cordova.plugins.locationManager.requestAlwaysAuthorization();

		// Create delegate object that holds beacon callback functions.
		var delegate = new cordova.plugins.locationManager.Delegate();
		cordova.plugins.locationManager.setDelegate(delegate);

		// Set delegate functions.
		delegate.didDetermineStateForRegion = onDidDetermineStateForRegion;

		// Start monitoring and ranging beacons.
		startMonitoringAndRangingRegions(mRegions, onError);
	}

	function startMonitoringAndRangingRegions(regions, errorCallback)
	{
		// Start monitoring and ranging regions.
		for (var i in regions)
		{
			startMonitoringAndRangingRegion(regions[i], errorCallback);
		}
	}

	function startMonitoringAndRangingRegion(region, errorCallback)
	{
		// Create a region object.
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
			region.id,
			region.uuid,
			region.major,
			region.minor);

		// Start ranging.
		cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(errorCallback)
			.done();

		// Start monitoring.
		cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
			.fail(errorCallback)
			.done();
	}

	// Event Saver Functions
	function saveRegionEvent(eventType, regionId)
	{
		// Save event.
		mRegionEvents.push(
		{
			type: eventType,
			time: getTimeNow(),
			regionId: regionId
		});

		// Truncate if more than ten entries.
		if (mRegionEvents.length > 10)
		{
			mRegionEvents.shift();
		}
	}

	// Event Handler Methods
	function newRegionEvent()
	{
		if (mAppInBackground){
			sendPushNotification();
		}
		else{
			displayEventMessage();
		}
	}

	function sendPushNotification(){
		// Set notification title.
			var event = mRegionEvents[mRegionEvents.length - 1];
			if (!event) { return; }
			checkStateThenCall(event);

			// Create notification.
			cordova.plugins.notification.local.schedule({
    			id: ++mNotificationId,
    			title: "Region Event title" });
	}

	function displayEventMessage()
	{
		if (mRegionEvents.length <= 0)
		{
			var element = $(
				'<li>'
				+ '<strong>'
				+	'No Beacon Events to display'
				+ '</strong>'
				+ '</li>'
				);
			$('#events').append(element);

		}else{
			$('#events').empty();
			var event = mRegionEvents[mRegionEvents.length - 1];
			 checkStateThenCall(event);
		}
	}

	function checkStateThenCall(event)
	{
		if (mRegionStateNames[event.type] == 'Enter'){
			sendOpenRequest();
		}else{
			console.log( mRegionStateNames[event.type])
			$('#events').empty();
			var element = $(
				'<li>'
				+ '<strong>'
				+	'You are not in range of any beacons'
				+ '</strong>'
				+ '</li>'
				);
			$('#events').append(element);
		}
		
	}

	// Api Calls
	function sendOpenRequest(){
		xhr.onreadystatechange = function () {
		    if (this.readyState != 4) return;

		    if (this.status == 200) {
		        var data = JSON.parse(this.responseText);
		        console.table(data)

		        // Clear list.
				$('#events').empty();

		        var element = $(
					'<li>'
					+ '<strong>' + data.function + '</strong> '
					+ data.time
					+ '</li>'
				);

				$('#events').append(element);
		    }
		};
	xhr.open('GET', 'http://192.168.15.24:1300/hello', true);
	xhr.send();
	}


	// helper Methods
	function getTimeNow()
	{
		function pad(n)
		{
			return (n < 10) ? '0' + n : n;
		}

		function format(h, m, s)
		{
			return pad(h) + ':' + pad(m)  + ':' + pad(s);
		}

		var d = new Date();
		return format(d.getHours(), d.getMinutes(), d.getSeconds());
	}

	return app;

})();

app.initialize();
