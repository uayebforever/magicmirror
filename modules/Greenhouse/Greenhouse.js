Module.register("Greenhouse", {
	// Default module config.
	defaults: {
		text: "32°C",
		url: "http://localhost:5000/data"
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		var temp = document.createElement("div");
		var desc = document.createElement("div");

		temp.className = "large bright";
		desc.className = "medium dimmed";

		desc.innerHTML = "Greenhouse";

		temp.innerHTML = this.temp + "°C";

		wrapper.appendChild(temp);
		wrapper.appendChild(desc);
		return wrapper;
	},

	// register update on startup
	start: function () {
		var self = this;
		this.temp = 0;
		setInterval(function () {
			self.getData();
		}, 1000); //perform every 1000 milliseconds.
	},

	// Request the current temperature data.
	getData: function () {
		// Log.warn("Requesting teemps");
		this.sendSocketNotification("GET_GREENHOUSE_DATA", this.config);
	},

	socketNotificationReceived: function (notification, payload) {
		Log.warn(notification);
		if (notification === "GREENHOUSE_DATA_RESULT") {
			// Parsing the JSON data to an array.
			// payload = JSON.parse(payload.body);

			// Show it all!
			Log.warn("Parsed greenhouse temps: " + JSON.stringify(payload));

			this.temp = payload;
			this.updateDom();
		}
	}
});
