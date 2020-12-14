Module.register("Greenhouse", {
	// Default module config.
	defaults: {
		text: "32°C",
		url: "http://localhost:5000/data"
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		Log.info(this.temps);
		for (const [key, value] of Object.entries(this.temps)) {
			Log.info(key);
			Log.info(value);
			var tempWrapper = document.createElement("span");
			tempWrapper.style = "display: inline-block; padding-right: 30px;";
			var temp = document.createElement("div");
			temp.className = "medium bright";
			temp.innerHTML = value;
			var desc = document.createElement("div");
			desc.className = "light small dimmed";
			desc.innerHTML = key;
			tempWrapper.appendChild(temp);
			tempWrapper.appendChild(desc);
			wrapper.appendChild(tempWrapper);
		}
		return wrapper;
	},

	// register update on startup
	start: function () {
		var self = this;
		this.temps = { Greenhouse: 0, "Front Porch": 0 };
		setInterval(function () {
			self.getData();
		}, 10000); //perform every 1000 milliseconds.
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

			this.temps = JSON.parse(payload);
			this.updateDom();
		}
	}
});
