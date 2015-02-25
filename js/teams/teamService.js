var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

	this.addNewGame = function(gameObj) {
		var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
		if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
			gameObj.won = true;
		} else {
			gameObj.won = false;
		}

		return $http.post(url, gameObj);

	}

	this.getTeamData = function(team) {
		var url = 'https://api.parse.com/1/classes/' + team;
		return $http.get(url).then(function(data){
			var results = data.data.results;
			var wins = 0;
			var losses = 0;
			for(var i = 0; i < results.length; i++) {
				if(results[i].won === true) {
					wins++;
				} else {
					losses++;
				}
			} 
			results.wins = wins;
			results.losses = losses;

			return results;
		});
	};

});







// $http.get = function (url) {
// 	var deferred = $q.defer();

// 	var xhr = new XMLHTTPRequest();
// 	xhr.open('GET', url, true);
// 	xhr.send();
// 	xhr.onreadystatechange = function () {
// 		// are we done?
// 		if (xhr.readyState === 4) {
// 			deferred.resolve(xhr.responseText);
// 		}
// 	};

// 	return deferred.promise;
// };

