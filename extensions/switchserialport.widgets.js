window.switchserialportID = 0;
(function() {    
    var switchserialportWidget = function (settings) {
        var thisswitchserialportID = window.switchserialportID++;
        var titleElement = $('<h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var switchElement = $('<div id="switchserialport-' + thisswitchserialportID + '" class="onoffswitch"></div>');
        var switchserialportElement = switchElement;
		
        var switchserialportObject;
        var rendered = false;
        var sw;

		var switchserialport;
        var currentSettings = settings;
        
        // The datasource must be a serial port
        if (freeboard.getDatasourceType(currentSettings.serialport) !== "serialport") {
        	alert("Problem with switch serial port widget: datasource " + currentSettings.serialport + " is not a serial port");
        }
        
 		function sendData() {
			sessionStorage.setItem(currentSettings.variable, currentSettings.value);
 		};
 		
        function createSwitchSerialPort(mySettings) {
            if (!rendered) {
                return;
            }
            
            switchserialportElement.empty();
            
            sendData();
            
            var style = (_.isUndefined(mySettings.style) ? "switch" : mySettings.style);
            // console.log(style);
            // console.log(style == "switch");
            
        	switchserialportElement = switchElement;
        	var checkedStr = '';
        	if (mySettings.initialstate) {
        		checkedStr = 'checked="checked"';
        	}

			var switchserialportElementStr = '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + thisswitchserialportID + '-serialportonoff" ' + checkedStr + '><label class="onoffswitch-label" for="' + thisswitchserialportID + '-serialportonoff"><div class="onoffswitch-inner"><span class="on">' + mySettings.ontext + '</span><span class="off">' + mySettings.offtext + '</span></div><div class="onoffswitch-switch"></div></label>';
            document.getElementById('switchserialport-' + thisswitchserialportID).innerHTML = switchserialportElementStr;
            
			$( "#" + thisswitchserialportID + "-serialportonoff" ).change(function() {
				if (($( "#" + thisswitchserialportID + "-serialportonoff" )).prop("checked")) {
					tabSwitchSerialPort[currentSettings.serialport] = 1;
				}
				else {
					tabSwitchSerialPort[currentSettings.serialport] = -1;
				}
			});
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(switchserialportElement);
            createSwitchSerialPort(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            if ((newSettings.style != currentSettings.style)
            	|| (newSettings.ontext != currentSettings.ontext)
            	|| (newSettings.offtext != currentSettings.offtext)
            	|| (newSettings.caption != currentSettings.caption)) {
                createSwitchSerialPort(newSettings);
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
        };

        this.onDispose = function () {
			tabSwitchSerialPort[currentSettings.serialport] = -1;
        };

        this.getHeight = function () {
            return 1;
        };

        this.onSettingsChanged(settings);
        
        
		function checkIsOpen(refreshTime) {
			updateTimer = setInterval(function () {
				if (tabSerialPortIsOpen[currentSettings.serialport] == true) {
					($( "#" + thisswitchserialportID + "-serialportonoff" )).prop("checked", true);
				}
				else {
					($( "#" + thisswitchserialportID + "-serialportonoff" )).prop("checked", false);
				}
			}, refreshTime);
		}
		checkIsOpen(500);
    };

    freeboard.loadWidgetPlugin({
        type_name: "switchserialport",
        display_name: _t("Switch Serial Port"),
		description : _t("A Switchbutton widget for serial communications."),
        settings: [
            {
                name: "title",
                display_name: _t("Title"),
                type: "text"
            },
			{
				name: "serialport",
				display_name: _t("Serial datasource"),
                type: "text",
				description: _t("Datasource name corresponding to the serial port to switch. You *must* create first a datasource with the same name")
			},
            {
                name: "ontext",
                display_name: _t('"ON" text'),
                type: "text",
                default_value: "ON"
            },
            {
                name: "offtext",
                display_name: _t('"OFF" text'),
                type: "text",
                default_value: "OFF"
            },
            {
                name: "initialstate",
                display_name: _t("Initial state"),
                type: "boolean",
                default_value: false
            },
            {
                name: "variable",
                display_name: _t("Variable"),
                type: "calculated",
				description: _t("(Optional) Variable to send when the serial port is switched on")
            },
            {
                name: "value",
                display_name: _t('Value'),
                type: "text",
                description: _t('Value to send when the variable is defined above')
            },
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new switchserialportWidget(settings));
        }
    });
    
}());

