(function () {
	var tailOK = false;
	var readStaticOK = false;
	csvData = [];
	
	var csvDatasource = function (settings, updateCallback) {
		var self = this;
		var currentSettings = settings;
		var csv = require("csvtojson");
		var LineByLineReader = require('line-by-line');
		// var Converter = require("csvtojson").Converter;
		// var converter = new Converter({});
		//Tail = require('tail').Tail;
		var updateTimer = undefined;
		var lastLine;

		this.updateNow = function () {
			var csvFilePath = currentSettings.datafile;
			var linesToSkip = _.isUndefined(currentSettings.skiplines) ? 0 : currentSettings.skiplines;
			
			var listVariablesToRead;
			var newData = {};
			// updateCallback(newData);
				
			
			/*if ((currentSettings.is_static) && (!readStaticOK)) {
				csv({noheader:!currentSettings.has_header})
				.fromFile(csvFilePath)
				
				// .on('json',function(jsonObj){
					// //console.log(jsonObj);
					// timeoutPlot = setTimeout(function() {
							// updateCallback(jsonObj);
						// },
						// 1
					// );		
					// //updateCallback(jsonObj);
				// });
				
				.on('csv',function(csv){
					staticData.push(csv);
				});
				sessionStorage.setItem("_readCSVOK", 1);
				sessionStorage.setItem("_csvDataHeader", currentSettings.variables_to_read);
				updateCallback(newData);
				readStaticOK = true;
			}*/
			
			// lineReader.eachLine(csvFilePath, function(line) {
				// console.log(line);
			// }).then(function (err) {
				// if (err) throw err;
				// console.log("I'm done!!");
			// });
			// lineReader.eachLine(csvFilePath, function(line, last) {
				// console.log(line);
				// // if (last) {
				    // // console.log("Fin");
				// // }
			// });
			
    		lr = new LineByLineReader(csvFilePath);
			lr.on('error', function (err) {
				console.log("Erreur");
			});
			
			lr.on('line', function (line) {
				lastLine = line;
				staticData.push(line.split(","));
			});
			
			lr.on('end', function () {
				staticData.splice(0,linesToSkip);
				sessionStorage.setItem("_readCSVOK", 1);
				var listData = JSON.parse("[" + lastLine + "]");
				
				if (currentSettings.has_header) {
					listVariablesToRead = staticData[0];
					currentSettings.variables_to_read = listVariablesToRead.join(",");
				}
				else {
					listVariablesToRead = (_.isUndefined(currentSettings.variables_to_read) ? "" : currentSettings.variables_to_read).split(",");
				}
				
				//newData = _.object(listVariablesToRead, _.range(listVariablesToRead.length).map(function () { return 0; }));
				newData = _.object(listVariablesToRead, listData);
				updateCallback(newData);
				readStaticOK = true;
			});			
		};

		this.onDispose = function () {
			if (!_.isUndefined(updateTimer)) {
				clearInterval(updateTimer);
			}
		};

		// function readFile(refreshTime) {
			// updateTimer = setInterval(function () {
				// self.updateNow();
			// }, refreshTime);
		// }
		//readFile(100);
		//self.updateNow();
		
		this.onSettingsChanged = function (newSettings) {
			currentSettings = newSettings;
			self.updateNow();
		};
	};

	freeboard.loadDatasourcePlugin({
		"type_name": "csv",
		"display_name": _t("CSV"),
		"settings": [
			{
				"name": "datafile",
				"display_name": _t("CSV File"),
				"type": "file",
				"description": _t("Click into this text input in order to select the file.")
			},
			{
				name: "has_header",
				display_name: _t("Use header for variables to read"),
				type: "boolean",
                default_value: true
			},
			{
				name: "variables_to_read",
				display_name: _t("Variables to read"),
				type: "text",
				description: _t("Name of the variables to read (separated by comma), only in case you don't use header.")
			},
            {
                name: "skiplines",
                display_name: _t('Lines to skip'),
                type: "text",
                default_value: 0,
				description: _t("Includes header.")
            }
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new csvDatasource(settings, updateCallback));
		}
	});


}());
