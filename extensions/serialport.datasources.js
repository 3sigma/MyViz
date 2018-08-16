(function () {
	var dataObj = {};
	var dataToSend = "";
	//var isOpen = false; // Problems with native methods
	var restart = true;
	var com = require('serialport');
	
	var serialportDatasource = function (settings, updateCallback) {
		var self = this;
		var item;
		var currentSettings = settings;
		var myName;
		var readSessionStorageTimeout1;
		var readSessionStorageTimeout2;
		sessionStorage.clear();
		var readSessionStorage = undefined;
		
		var updateTimer = undefined;
		var serialPort;
		var delayed = ((!_.isUndefined(currentSettings.variable_delayed)) && (sessionStorage.getItem(currentSettings.variable_delayed) != 0) && (sessionStorage.getItem(currentSettings.variable_delayed) != null));
		var delayedData = [];
		var timeLastReceived = 0;
		var toClose = false;
		var timeoutReceive;
		var timeoutValue = _.isUndefined(currentSettings.timeout) ? 0 : currentSettings.timeout;
		
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
        //console.log("myName", myName);
        tabSerialPortIsOpen[myName] = false;
        hasStarted = currentSettings.immediate_startup;
				
		var readSessionStorage = function () {
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
					if ((currentSettings.checksum == "sum") || (currentSettings.checksum == "sumtwice")) {
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
			else if (currentSettings.checksum == "sumtwice") {
				dataToSend += crcValue + currentSettings.separator + crcValue;
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
				if (!_.isUndefined(serialPort)) {
					serialPort.write(dataToSend, function (error) {
						if (error) {
					    	console.log("Error writing to the serial port "  + myName + " immediate: ", error);
					    }
					});
				}
			}

			if (tabSerialPortIsOpen[myName]) {
				readSessionStorageTimeout1 = setTimeout(function() {
						readSessionStorage();
					},
					currentSettings.refresh_rate
				);
			}
		};
		
		function discardSerialport() {
			sessionStorage.setItem(currentSettings.switchoff_variable1, currentSettings.switchoff_value1);
			sessionStorage.setItem(currentSettings.switchoff_variable2, currentSettings.switchoff_value2);
			readSessionStorage();
			// Disconnect datasource serial port
			//if (serialPort) {
				// serialPort.close(function (error) {
					// if ( error ) {
						// console.log('Failed to close: ', error);
					// } 
					// else {
						// tabSerialPortIsOpen[myName] = false;
						// serialPort = undefined;
					// }
				// });			
			// }
			function closeSerialPort() {
				if (!_.isUndefined(serialPort)) {
			    	serialPort.on('data', function(data) {
				        // We do nothing 
				    });
				}
				serialPort.close(function (error) {
					if ( error ) {
						console.log('Failed to close '  + myName + ': ', error);
						setTimeout(function() {
								closeSerialPort();
							},
							1000
						);		
					} 
					else {
						serialPort = undefined;
						console.log('Serial port '  + myName + ' closed');
						tabSerialPortIsOpen[myName] = false;
					}
				});			
			}
			if (!_.isUndefined(serialPort)) {
				closeSerialPort();
			}
			
	    	if (delayed) {
	    		for (var i = 0; i < delayedData.length; i++) {
	    			//console.log(delayedData[i]);
				    try {
				    	// Create list [var1, var2,...] from data like var1, var2,...
				    	//console.log(data);
				    							    	
				    	var arrData = "[" + delayedData[i] + "]";
				    	var listData = JSON.parse(arrData);
				    	//console.log(listData);
				    	
				    	// Add raw data to the object
				    	listData.push(delayedData[i]);
				        
				        // Create JSON object from the list of variables to read
				        newData = _.object(listVariablesToRead, listData);
				        
				        // Add the variables to send
				        $.extend(newData, newDataToSend);
	
						//console.log(newData);
						setTimeout(updateCallback, 1, newData);
				        //updateCallback(newData);
				    }
				    catch(e) {
				        console.log("Parse error: ", e); //error in the above string
				    }
	    		}
	    		delayedData = [];
	    	}
	    	toClose = false;
		}
		
		function connectToSerialport(port, baudrate) {
		    serialPort = new com.SerialPort(port, {
		        baudrate: baudrate,
		        parser: com.parsers.readline('\r\n'),
		        // Pour la lecture de "packs" d'octets, voir plus bas
		        // dans serialPort.on('data', function(data)...
		        //parser: com.parsers.byteDelimiter([13, 10]),
		    },false);
		    
			serialPort.open(function (err) {
				if (err) {
			        console.log('Error opening port '  + myName + ': ', err.message);
					// Allows to design the dashboard even if the is not serial port communication
			        //updateCallback(_.object(listVariablesToRead,Array(4)));
			        alert('Error: ' + err.message);
			        tabSerialPortIsOpen[myName] = false;
				}
			});						
		}

		function initializeDataSource(mySettings, fromUpdateNow) {
            delayed = ((!_.isUndefined(currentSettings.variable_delayed)) && (sessionStorage.getItem(currentSettings.variable_delayed) != 0) && (sessionStorage.getItem(currentSettings.variable_delayed) != null));
            
						
			// Reset connection to Serial port
			discardSerialport();
		    if ((currentSettings.immediate_startup) || (tabSwitchSerialPort[myName] == 1) || (fromUpdateNow == true)) {
				tabSwitchSerialPort[myName] = 0;
				console.log("Open port " + myName);
				tabSerialPortIsOpen[myName] = true; // Needed to avoid a double open by updateNow
				restart = true;
				connectToSerialport(mySettings.port, mySettings.baudrate);

			    serialPort.on('open',function(error) {
					sessionStorage.setItem(currentSettings.variable1, currentSettings.value1);
					sessionStorage.setItem(currentSettings.variable2, currentSettings.value2);
			    	tabSerialPortIsOpen[myName] = true;
			        console.log('Port '  + myName + ' open');
			        timeLastReceived = 0;
			    });
			
			    serialPort.on('data', function(data) {
			    	if (timeoutValue > 0) {
						var date = new Date();
						var currentTime = date.getTime();
						if ((timeLastReceived > 0) && (currentTime < timeLastReceived + timeoutValue)) {
							clearTimeout(timeoutReceive);
						}
				    	timeLastReceived = currentTime;
				    	
				    	if (timeLastReceived > 0) {
				    		timeoutReceive = setTimeout(function(){ toClose = true; }, timeoutValue);
				    	}
				    }
			    	
			    	if (delayed) {
			    		//console.log(data);
			    		delayedData.push(data);
			    	}
			    	else {
					    try {
					    	// Create list [var1, var2,...] from data like var1, var2,...
					    	//console.log(data);
					    	
					    	// Ci-dessous, la partie globalement commentée permet
					    	// de lire des données sous la forme de "packs" d'octets.
					    	// Pour l'instant, ça a été testé (et encore, pas complètement)
					    	// avec uniquement un seul entier 32 bits, envoyé depuis une carte
					    	// Arduino avec une série de Serial.write des 4 octets.
					    	// Nécessite d'utiliser un com.parsers.byteDelimiter([13, 10]) plus haut
					    	/*console.log(data.length);
					    	
						    var bytes = "";
						    for(var i = 0; i < data.length - 2; i++) {
						        var bytes = data[i].toString(16) + bytes;
						    }
					    	console.log(bytes);
						    var buf = Buffer.from(bytes, 'hex');
					    	console.log(buf);
					    	console.log(buf.readInt32BE(0));*/
					    	
					    	var arrData = "[" + data + "]";
					    	var listData = JSON.parse(arrData);
					    	//console.log(listData);
					    	
					    	// Add raw data to the object
					    	listData.push(data);
					        
					        // Create JSON object from the list of variables to read
					        newData = _.object(listVariablesToRead, listData);
					        
					        // Add the variables to send
					        $.extend(newData, newDataToSend);
		
							//console.log(newData);
					        updateCallback(newData);
					    }
					    catch(e) {
					        console.log("Parse error: ", e); //error in the above string
					    }
		        	}
			    });
	
			    serialPort.on('close',function() {
			        console.log('Port '  + myName + ' closed');
			        tabSerialPortIsOpen[myName] = false;
			    });
			
			    serialPort.on('error',function(err) {
			        console.log('Error: ', err.message);
					// Allows to design the dashboard even if the is not serial port communication
			        //updateCallback(_.object(listVariablesToRead,Array(4)));
			        alert('Error: ' + err.message);
			        tabSerialPortIsOpen[myName] = false;
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
        
				if (tabSerialPortIsOpen[myName]) {
					readSessionStorageTimeout2 = setTimeout(function() {
							readSessionStorage();
						},
						currentSettings.refresh_rate
					);		
				}
			}
			
		
		}

		this.updateNow = function () {
			if (hasStarted == true) {
				if (!tabSerialPortIsOpen[myName]) {
					initializeDataSource(currentSettings, true);
				}
			}
			else {
				hasStarted = true;
			}
			return;
		};

		this.stop = function() {
			discardSerialport();
		};

		this.onDispose = function () {
			// Stop responding to messages
			if (!_.isUndefined(updateTimer)) {
				clearInterval(updateTimer);
			}
		    if (serialPort) {
		    	serialPort.on('data', function(data) {
			        // We do nothing 
			    });
				discardSerialport();
			}
		};

		this.onSettingsChanged = function (newSettings) {
            if ((newSettings.port != currentSettings.port)
            	|| (newSettings.baudrate != currentSettings.baudrate)) {
            	initializeDataSource(newSettings, false);
            }
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
            
            if (newSettings.timeout != currentSettings.timeout) {
            	timeoutValue = _.isUndefined(newSettings.timeout) ? 0 : newSettings.timeout;
            }
            
            currentSettings = newSettings;

		};
		
		initializeDataSource(currentSettings, false);
		
		function checkSwitch(refreshTime) {
			updateTimer = setInterval(function () {
				if (tabSwitchSerialPort[myName] == 1) {
					self.updateNow();
				}
				else if (tabSwitchSerialPort[myName] == -1) {
					tabSwitchSerialPort[myName] = 0;
					self.stop();
				}
				if (toClose) {
					discardSerialport();
				}
			}, refreshTime);
		}
		checkSwitch(100);

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
		type_name: "serialport",
		display_name: _t("Serialport"),
		description : _t("A real-time stream datasource from Serial port."),
		// external_scripts : [
		    // "extensions/thirdparty/socket.io-1.3.5.js"
 		// ],
		settings: [
			{
				name: "port",
				display_name: _t("Port"),
				type: "option",
				"required" : true,
				description: "",
                options: comDescription
			},
			{
				name: "baudrate",
				display_name: _t("Baudrate"),
				type: "number",
				"required" : true,
				description: ""
			},
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
			},
			{
				name: "checksum",
				display_name: _t("Checksum method"),
                type: "option",
                description: _t("If values are sent, a checksum will be automatically added in variable '_crc', computed from the other values."),
                options: [
                    {
                        name: _t("None"),
                        value: "none"
                    },
                    {
                        name: _t("Sum"),
                        value: "sum"
                    },
                    {
                        name: _t("Sum, twice"),
                        value: "sumtwice"
                    },
                    {
                        name: _t("String concatenation"),
                        value: "concat"
                    }
                ]
			},
            {
                name: "variable_delayed",
                display_name: _t("Delayed capture variable"),
                type: "calculated",
				description: _t("(Optional) When this variable is different from 0, the data are buffered until the port is switched off. They are available after.")
            },
			{
				name: "immediate_startup",
				display_name: _t("Immediate startup"),
				type: "boolean",
                default_value: true,
                description: _t("Define whether or not you want to start the communication when the dashboard is loaded.")
			},
            {
                name: "variable1",
                display_name: _t("Switch On Variable #1"),
                type: "calculated",
				description: _t("(Optional) Variable #1 to send when the serial port is switched on")
            },
            {
                name: "value1",
                display_name: _t('Switch On Value #1'),
                type: "text",
                description: _t('Value to send when the switch on variable #1 is defined above')
            },
            {
                name: "switchoff_variable1",
                display_name: _t("Switch Off Variable #1"),
                type: "calculated",
				description: _t("(Optional) Variable #1 to send when the serial port is switched off")
            },
            {
                name: "switchoff_value1",
                display_name: _t('Switch Off Value #1'),
                type: "text",
                description: _t('Value to send when the switch off variable #1 is defined above')
            },
            {
                name: "variable2",
                display_name: _t("Switch On Variable #2"),
                type: "calculated",
				description: _t("(Optional) Variable #2 to send when the serial port is switched on")
            },
            {
                name: "value2",
                display_name: _t('Switch On Value #2'),
                type: "text",
                description: _t('Value to send when the switch on variable #2 is defined above')
            },
            {
                name: "switchoff_variable2",
                display_name: _t("Switch Off Variable #2"),
                type: "calculated",
				description: _t("(Optional) Variable #2 to send when the serial port is switched off")
            },
            {
                name: "switchoff_value2",
                display_name: _t('Switch Off Value #2'),
                type: "text",
                description: _t('Value to send when the switch off variable #2 is defined above')
            },
            {
                name: "timeout",
                display_name: _t("Timeout"),
				type: "text",
				"required" : false,
				suffix: _t("milliseconds"),
				description: _t("(Optional) Port is closed when no data has been received during this timeout period.")
            }
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new serialportDatasource(settings, updateCallback));
		}
	});


}());
