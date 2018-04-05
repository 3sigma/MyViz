window.switchbuttonID = 0;
(function() {    
    var switchbuttonWidget = function (settings) {
        var thisswitchbuttonID = window.switchbuttonID++;
        var titleElement = $('<h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var switchbuttonElement = $('<div id="switchbutton-' + thisswitchbuttonID + '" class="onoffswitch"></div>');

        var switchbuttonObject;
        var rendered = false;

		var switchbutton;
        var currentSettings = settings;

 		function sendData() {
			// Store message in session storage
			toSend = {};
			if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
				if (_.isUndefined(currentSettings.yesvalue)) {
					toSend[currentSettings.variable] = 1;
				}
				else {
					toSend[currentSettings.variable] = currentSettings.yesvalue;
				}
			}
			else {
				if (_.isUndefined(currentSettings.novalue)) {
					toSend[currentSettings.variable] = 0;
				}
				else {
					toSend[currentSettings.variable] = currentSettings.novalue;
				}
			}
			sessionStorage.setItem(currentSettings.variable, toSend[currentSettings.variable]);
 		};
 		
        function createSwitchButton(mySettings) {
            if (!rendered) {
                return;
            }
            
            
            //switchbuttonElement.empty();
        	var checkedStr = '';
        	if (mySettings.initialstate) {
        		checkedStr = 'checked="checked"';
        	}

			var switchbuttonElementStr = '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + thisswitchbuttonID + '-onoff" ' + checkedStr + '><label class="onoffswitch-label" for="' + thisswitchbuttonID + '-onoff"><div class="onoffswitch-inner"><span class="on">' + mySettings.yestext + '</span><span class="off">' + mySettings.notext + '</span></div><div class="onoffswitch-switch"></div></label>';
            document.getElementById('switchbutton-' + thisswitchbuttonID).innerHTML = switchbuttonElementStr;
            
        	// Send data at the creation...
        	sendData();
        	// ... and on changes
			$( "#" + thisswitchbuttonID + "-onoff" ).change(function() {
				sendData();
			});
							        
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(switchbuttonElement);
            createSwitchButton(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {

            if ((newSettings.yestext != currentSettings.yestext)
            	|| (newSettings.notext != currentSettings.notext)) {
                createSwitchButton(newSettings);
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(switchbuttonObject)) {
			    $( "#switchbutton_value-" + thisswitchbuttonID ).html( newValue/Math.pow(10, parseInt(currentSettings.resolution)) );
            }
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
            return 1;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "switchbutton",
        display_name: _t("Switch button"),
		description : _t("A Switchbutton widget for serial, socket or http communications."),
        settings: [
            {
                name: "title",
                display_name: _t("Title"),
                type: "text"
            },
			// {
				// name: "datasourcename",
				// display_name: _t("Datasource"),
                // type: "text",
				// description: _t("You *must* create first a datasource with the same name")
			// },
            {
                name: "variable",
                display_name: _t("Variable"),
                type: "calculated",
            },
            {
                name: "yestext",
                display_name: _t('"YES" text'),
                type: "text",
                default_value: "YES",
                description: _t("Corresponding value is defined below")
            },
            {
                name: "yesvalue",
                display_name: _t('"YES" value'),
                type: "text",
                default_value: "1",
                description: _t('Value corresponding to "YES" position')
            },
            {
                name: "notext",
                display_name: _t('"NO" text'),
                type: "text",
                default_value: "NO",
                description: _t("Corresponding value is defined below")
            },
            {
                name: "novalue",
                display_name: _t('"NO" value'),
                type: "text",
                default_value: "0",
                description: _t('Value corresponding to "NO" position')
            },
            {
                name: "initialstate",
                display_name: _t("Initial state"),
                type: "boolean",
                default_value: true
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new switchbuttonWidget(settings));
        }
    });
    
}());

