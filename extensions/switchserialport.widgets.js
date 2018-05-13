window.switchserialportID = 0;
(function() {    
	var valueStyle = freeboard.getStyleString("values");

	freeboard.addStyle('.widget-big-text', valueStyle + "font-size:75px;");

	freeboard.addStyle('.tw-display', 'width: 100%; height:100%; display:table; table-layout:fixed;');

	freeboard.addStyle('.tw-tr',
		'display:table-row;');

	freeboard.addStyle('.tw-tg',
		'display:table-row-group;');

	freeboard.addStyle('.tw-tc',
		'display:table-caption;');

	freeboard.addStyle('.tw-td',
		'display:table-cell;');

	freeboard.addStyle('.tw-value',
		valueStyle +
		'overflow: hidden;' +
		'display: inline-block;' +
		'text-overflow: ellipsis;');

	freeboard.addStyle('.tw-unit',
		'display: inline-block;' +
		'padding-left: 10px;' +
		'padding-bottom: 1.1em;' +
		'vertical-align: bottom;');

	freeboard.addStyle('.tw-value-wrapper',
		'position: relative;' +
		'vertical-align: middle;' +
		'height:100%;');

    var switchserialportWidget = function (settings) {
        var thisswitchserialportID = window.switchserialportID++;
		var displayElement = $('<div class="tw-display"></div>');
        var titleElement = $('<h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var switchButtonTitleElement1 = $('<div id="switchbuttontitle-' + thisswitchserialportID + '" class="tw-td"></div>');
        var switchButtonTitleElement2 = $('<div id="switchbuttontitle-' + thisswitchserialportID + '" class="tw-td"></div>');
        var switchElement = $('<div id="switchserialport-' + thisswitchserialportID + '"  class="onoffswitch tw-value"></div>');
        var switchserialportElement = switchElement;
        var warningElement = $('<div id="warning-' + thisswitchserialportID + '" class="tw-value"></div>');
		
        var switchserialportObject;
        var rendered = false;
        var sw;

		var switchserialport;
        var currentSettings = settings;
        var messageValue = "";
        var previousMessageValue = messageValue;
        
        // The datasource must be a serial port
        if (freeboard.getDatasourceType(currentSettings.serialport) !== "serialport") {
        	alert("Problem with switch serial port widget: datasource " + currentSettings.serialport + " is not a serial port");
        }
        
 		function sendData() {
			sessionStorage.setItem(currentSettings.variable1, currentSettings.value1);
			sessionStorage.setItem(currentSettings.variable2, currentSettings.value2);
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
			$(element).empty();
			
            $(displayElement).append(titleElement)
				.append($('<div class="tw-tr"></div>').append(switchButtonTitleElement1).append(switchButtonTitleElement2).append($('<div class="tw-td"></div>')))
				.append($('<div class="tw-tr"></div>')
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(switchserialportElement))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(warningElement))
					.append($('<div class="tw-value-wrapper tw-td"></div>'))
				);
            
			$(element).append(displayElement);
			
            //$(element).append(titleElement).append(switchserialportElement);
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
            if (settingName == "message") {
            	messageValue = newValue;
				if (previousMessageValue != messageValue) {
	                warningElement.html(messageValue);
	            }
	            previousMessageValue = messageValue;
            }
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
                name: "variable1",
                display_name: _t("Variable #1"),
                type: "calculated",
				description: _t("(Optional) Variable #1 to send when the serial port is switched on")
            },
            {
                name: "value1",
                display_name: _t('Value #1'),
                type: "text",
                description: _t('Value to send when the variable #1 is defined above')
            },
            {
                name: "variable2",
                display_name: _t("Variable #2"),
                type: "calculated",
				description: _t("(Optional) Variable #2 to send when the serial port is switched on")
            },
            {
                name: "value2",
                display_name: _t('Value #2'),
                type: "text",
                description: _t('Value to send when the variable #2 is defined above')
            },
            {
                name: "message",
                display_name: _t("Message"),
                type: "calculated",
				description: _t("(Optional) Message to display aside the button")
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new switchserialportWidget(settings));
        }
    });
    
}());

