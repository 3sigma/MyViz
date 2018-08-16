(function () {
	var dataObj = {};
	var websocketDatasource = function (settings, updateCallback) {
		var self = this;
		var currentSettings = settings;
		var myName;
		var ws;
		var newMessageCallback;
		var refreshInterval;
		//var parse = require('fast-json-parse');
		
		var listVariablesToSend = (_.isUndefined(currentSettings.variables_to_send) ? "" : currentSettings.variables_to_send).split(",");
		// Object with keys from list of variables to send, each value is 0
		var newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
		// Make variables visible to other widgets
		myName = updateCallback(newDataToSend);
				
		function onNewMessageHandler(msg) {
			//console.log("msg.data: ", msg.data);
        	newData = JSON.parse(msg.data);
        	//newData = parse(msg.data);
			//console.log("newData: ", newData);
			        
	        // Add the variables to send
	        $.extend(newData, newDataToSend);
			        
            updateCallback(newData);
		}

		function discardSocket() {
			// Disconnect datasource websocket
			if (ws) {
				ws.close();
			}
		}
		
		function connectToServer(url) {
			//ws = new WebSocket(url);
			
	        // See https://github.com/joewalnes/reconnecting-websocket
	        ws = new ReconnectingWebSocket(url);
	        ws.reconnectDecay = 1;
	        ws.timeoutInterval = 15000;
	        
			ws.onopen = function() {
				console.info("Connected to server at: %s", url);
				// The part below is a must in order to close properly
				// the websocket when the MyViz window is closed
				win.on('close', function() {
				    ws.onclose = function () {}; // disable onclose handler first
				    ws.close();
				    this.close(true);
				});
			};
			
            ws.onclose = function()
            { 
            	console.info("Connection is closed...");
            };
	        
		}

		function initializeDataSource() {	        
			// Reset connection to server
			discardSocket();
			connectToServer(currentSettings.host);

			newMessageCallback = onNewMessageHandler;
			ws.onmessage = newMessageCallback;
		}

		this.updateNow = function () {
			initializeDataSource();
			return;
		};

		this.stop = function() {
			discardSocket();
		};

		this.onDispose = function () {
			// Stop responding to messages
			newMessageCallback = function(msg) {
				return;
			};
			discardSocket();
		};

		this.onSettingsChanged = function (newSettings) {
            if ((newSettings.host != currentSettings.host )) {
            	currentSettings = newSettings;
            	initializeDataSource();
            }
            else if (newSettings.variables_to_send != currentSettings.variables_to_send) {
            	// In case the list is not empty, remove extra commas and spaces
            	listVariablesToSend = (_.isUndefined(newSettings.variables_to_send) ? "" : newSettings.variables_to_send).split(",");
            	newDataToSend = _.object(listVariablesToSend, _.range(listVariablesToSend.length).map(function () { return 0; }));
            }
            
            currentSettings = newSettings;
		};
		
		initializeDataSource();


 		function sendData(data) {
 			//console.log("data: ", JSON.stringify(data));
        	// Send data
			if ((!_.isUndefined(ws)) && (ws.readyState === 1)) {
				ws.send(JSON.stringify(data));
			}
		}
		
		function readSessionStorage() {
			//console.log("Read session storage from ", myName);
			//var t0 = performance.now();
			
			var currentObj = {};
        	for (var i=0; i<listVariablesToSend.length; i++) {
    			item = 'datasources["' + myName + '"]["' + listVariablesToSend[i] + '"]';
    			var sessionStorageVar = sessionStorage.getItem(item);
    			if (sessionStorageVar != "undefined") {
	    			currentObj[listVariablesToSend[i]] = sessionStorageVar;
	    		}
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
			$.extend(dataObj, {'_crc':crcValue});
			
			sendData(dataObj);
			
			// var t1 = performance.now();
			// console.log("Call to function took " + (t1 - t0) + " milliseconds.");


			setTimeout(function() {
					readSessionStorage();
				},
				currentSettings.refresh_rate
			);		
		}
		readSessionStorage();
		
	};

	freeboard.loadDatasourcePlugin({
		type_name: "websocket",
		display_name: "Websocket",
		description : _t("A real-time stream datasource from Websocket servers."),
		external_scripts : [ "extensions/thirdparty/reconnecting-websocket.js" ],
		settings: [
			{
				name: "host",
				display_name: _t("Host"),
				type: "text",
				"required" : true,
				description: _t("Include ws:// or http:// ,...")
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
				default_value: 500,
				suffix: _t("milliseconds"),
				description: _t("Refresh rate for sending data. Data will be sent even if control values are not changed")
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
                        name: _t("String concatenation"),
                        value: "concat"
                    }
                ]
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new websocketDatasource(settings, updateCallback));
		}
	});


}());
