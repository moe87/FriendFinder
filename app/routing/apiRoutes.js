var friendsData = require("../data/friends");

module.exports = function(app) {

	app.post("/api/survey", function(req, res) {
		var totalscores = [];
		var total = 0;

		var userData = req.body;
		for(var i=0; i<friendsData.length; i++) {
			var fscores = friendsData[i].scores;
			for(var j=0; j<fscores.length; j++) {
				total += Math.abs(fscores[j] - userData.scores[j]);
			}
			totalscores[i] = total;
			total = 0;
		}
		
		var index = totalscores.indexOf(Math.min.apply(Math, totalscores));
		res.json(friendsData[index]);

		friendsData.push(userData);
	});
};