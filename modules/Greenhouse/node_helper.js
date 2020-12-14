var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({
	start: function () {
		console.log("Greenhouse helper started...");
	},
	getData: function (junk) {
		var self = this;
		var result;
		var theurl = "http://localhost:5000/temp";
		request({ url: theurl, method: "GET" }, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				//console.log(JSON.stringify(data));
				result = body;
				self.sendSocketNotification("GREENHOUSE_DATA_RESULT", result);
			} else {
				console.log("Greenhouse: The URL is not correct..." + theurl);
			}
		});
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "GET_GREENHOUSE_DATA") {
			this.getData(payload);
		}
	}
});
