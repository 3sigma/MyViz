(function () {
	var dataObj = {};
	var dataToSend = "";
	//var isOpen = false; // Problems with native methods
	var restart = true;
	
	var localDatasource = function (settings, updateCallback) {
		var self = this;
		var item;
		var currentSettings = settings;
		var myName;
		var readSessionStorageTimeout1;
		var readSessionStorageTimeout2;
		sessionStorage.clear();
		var readSessionStorage = undefined;
		
		var updateTimer = undefined;
		
		
		// var refreshInterval;
		// var lastSentTime = 0;
		// var currentTime = new Date();
		var newData = {};
		var listVariablesToRead = (currentSettings.variables_to_read).split(",");
		listVariablesToRead.push('_rawdata');
		var listVariablesToSend = (_.isUndefined(currentSettings.variables_to_send) ? "" : currentSettings.variables_to_send).split(",");
		// Object with keys from list of variables to send, each value is 0
		var newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
		// Object with keys from list of variables to read, each value is 0
		newData = _.object(listVariablesToRead, _.range(listVariablesToRead.length).map(function () { return 0; }));
        // Add the variables to send
        $.extend(newData, newDataToSend);
        
        myName = updateCallback(newData);
        hasStarted = currentSettings.immediate_startup;
						
		function initializeDataSource(mySettings, fromUpdateNow) {
						
			// Reset connection to Serial port
			discardLocal();
			
		    local.on('data', function(data) {
			    try {
			    	// Create list [var1, var2,...] from data like var1, var2,...
			    	
			    	var arrData = "[" + data + "]";
			    	var listData = JSON.parse(arrData);
			    	
			    	// Add raw data to the object
			    	listData.push(data);
			        
			        // Create JSON object from the list of variables to read
			        newData = _.object(listVariablesToRead, listData);
			        
			        // Add the variables to send
			        $.extend(newData, newDataToSend);

			        updateCallback(newData);
			    }
			    catch(e) {
			        console.log("Parse error: ", e); //error in the above string
			    }
	        		            
		    });

		    
			//readSessionStorage();
			newData = {};
			listVariablesToRead = (currentSettings.variables_to_read).split(",");
			listVariablesToRead.push('_rawdata');
			listVariablesToSend = (_.isUndefined(currentSettings.variables_to_send) ? "" : currentSettings.variables_to_send).split(",");
			// Object with keys from list of variables to send, each value is 0
			newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
			// Object with keys from list of variables to read, each value is 0
			newData = _.object(listVariablesToRead, _.range(listVariablesToRead.length).map(function () { return 0; }));
	        // Add the variables to send
	        $.extend(newData, newDataToSend);
    
			if (tabLocalIsOpen[myName]) {
				readSessionStorageTimeout2 = setTimeout(function() {
						readSessionStorage();
					},
					currentSettings.refresh_rate
				);		
			}
		}

		this.updateNow = function () {
			if (hasStarted == true) {
				if (!tabLocalIsOpen[myName]) {
					initializeDataSource(currentSettings, true);
				}
			}
			else {
				hasStarted = true;
			}
			return;
		};

		this.stop = function() {
		};

		this.onDispose = function () {
			// Stop responding to messages
			if (!_.isUndefined(updateTimer)) {
				clearInterval(updateTimer);
			}
		};

		this.onSettingsChanged = function (newSettings) {
            if (newSettings.variables_to_read != currentSettings.variables_to_read) {
				newData = {};
            	listVariablesToRead = (newSettings.variables_to_read).split(",");
            	listVariablesToRead.push('_rawdata');
				listVariablesToSend = (_.isUndefined(newSettings.variables_to_send) ? "" : newSettings.variables_to_send).split(",");
				// Object with keys from list of variables to send, each value is 0
				newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
				// Object with keys from list of variables to read, each value is 0
				newData = _.object(listVariablesToRead, _.range(listVariablesToRead.length).map(function () { return 0; }));
		        // Add the variables to send
		        $.extend(newData, newDataToSend);
            	updateCallback(newData);
            	initializeDataSource(newSettings, false);
            }
            if (newSettings.variables_to_send != currentSettings.variables_to_send) {
				newData = {};
            	listVariablesToRead = (newSettings.variables_to_read).split(",");
            	listVariablesToRead.push('_rawdata');
				listVariablesToSend = (_.isUndefined(newSettings.variables_to_send) ? "" : newSettings.variables_to_send).split(",");
				// Object with keys from list of variables to send, each value is 0
				newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
				// Object with keys from list of variables to read, each value is 0
				newData = _.object(listVariablesToRead, _.range(listVariablesToRead.length).map(function () { return 0; }));
		        // Add the variables to send
		        $.extend(newData, newDataToSend);
            	updateCallback(newData);
            	initializeDataSource(newSettings, false);
            }
            if (newSettings.refresh_rate != currentSettings.refresh_rate) {
            	newSettings.refresh_rate = Math.max(10, newSettings.refresh_rate);
            }
            
            currentSettings = newSettings;

		};
		
		initializeDataSource(currentSettings, false);
		
		function checkSwitch(refreshTime) {
			updateTimer = setInterval(function () {
				if (tabSwitchLocal[myName] == 1) {
					self.updateNow();
				}
				else if (tabSwitchLocal[myName] == -1) {
					tabSwitchLocal[myName] = 0;
					self.stop();
				}
			}, refreshTime);
		}
		checkSwitch(100);

		readSessionStorage = function () {
			//console.log("Read session storage from ", myName);
			var currentObj = {};
        	for (var i=0; i<listVariablesToSend.length; i++) {
    			item = 'datasources["' + myName + '"]["' + listVariablesToSend[i] + '"]';
    			var sessionStorageVar = sessionStorage.getItem(item);
    			currentObj[listVariablesToSend[i]] = sessionStorageVar;
    			//console.log(item);
	        }
	        
			// Merge messages to send using jQuery
			$.extend(dataObj, currentObj);
			
			// Create CRC data
			crcValue = 0;
			for (var d in dataObj) {
				if (d != '_crc') {
					if (currentSettings.checksum == "sum") {
						crcValue += Number(dataObj[d]);
					}
					else if (currentSettings.checksum == "concat") {
						crcValue += dataObj[d];
					}
				}
			}
			
			// Convert into a string of values
			dataToSend = "";
			for (var i = 0; i < listVariablesToSend.length; i++) {
				dataToSend += _.isUndefined(dataObj[listVariablesToSend[i]]) ? "0" + currentSettings.separator : dataObj[listVariablesToSend[i]] + currentSettings.separator;
			}
			
			if (currentSettings.checksum == "none") {
				// Remove last separator
				dataToSend = dataToSend.slice(0,-(currentSettings.separator).length);
			}
			else {
				dataToSend += crcValue;
			}
			
			// Very important ! Don't forget
			dataToSend += "\r";
			//console.log(dataToSend);

			// Important not to send data immediately, otherwise it doesn't work on the Arduino Mega
	        if (restart) {
				restart = false;					
			}
			else {
				if (!_.isUndefined(local)) {
					local.write(dataToSend, function (error) {
						if (error) {
					    	console.log("Error writing to the serial port immediate: ", error);
					    }
					});
				}
			}

			if (tabLocalIsOpen[myName]) {
				readSessionStorageTimeout1 = setTimeout(function() {
						readSessionStorage();
					},
					currentSettings.refresh_rate
				);
			}
		};
		dataObj = {};
		dataToSend = "";
		//readSessionStorage();
		setTimeout(function() {
				readSessionStorage();
			},
			2000
		);		
		
	};

	freeboard.loadDatasourcePlugin({
		type_name: "local",
		display_name: _t("Local"),
		description : _t("A real-time stream datasource from Serial port."),
		// external_scripts : [
		    // "extensions/thirdparty/socket.io-1.3.5.js"
 		// ],
		settings: [
			{
				name: "variables_to_read",
				display_name: _t("Variables to read"),
				type: "text",
				"required" : true,
				description: _t("Name of the variables to read, separated by comma")
			},
			{
				name: "variables_to_send",
				display_name: _t("Variables to send"),
				type: "text",
				"required" : false,
				description: _t("Name of the variables to send, separated by comma")
			},
			{
				name: "refresh_rate",
				display_name: _t("Refresh rate for sending data"),
				type: "text",
				"required" : false,
				default_value: 2000,
				suffix: _t("milliseconds"),
				description: _t("Refresh rate for sending data ( >= 10 ms). Data will be sent even if control values are not changed.<br>The dashboard must be reloaded if the refresh rate is modified.")
			},
			{
				name: "separator",
				display_name: _t("Separator"),
				type: "text",
				"required" : true,
				description: _t("Separator character for received and (optionally) sent values")
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new localDatasource(settings, updateCallback));
		}
	});


}());
