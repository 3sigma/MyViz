window.textinputID = 0;
(function() {    
    var textinputWidget = function (settings) {
        var thistextinputID = window.textinputID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var textinputElement = $('<br /><div id="textinput-' + thistextinputID + '" style="width:90%; margin-left:auto; margin-right:auto">' +
        	'<input id="textinput-input-' + thistextinputID + '" style="margin-top:0px; width:100px"></input>' + 
        	'<button id="textinput-reset-' + thistextinputID + '" style="margin-top:0px; margin-left:5px;"></button></div>');

        var textinputObject;
        var rendered = false;

        var currentSettings = settings;
        var textinputValue = currentSettings.resetvalue;
        
        var arrayVariable;
        if (!Array.isArray(currentSettings.variable)) {
        	arrayVariable = [currentSettings.variable];
        }
        else {
        	arrayVariable = currentSettings.variable;
        }
        

 		function sendData() {
			// Store message in session storage
			for (var i = 0; i < arrayVariable.length; i++) {
				toSend = {};
				var formula = (_.isUndefined(currentSettings.formula) ? "x" : currentSettings.formula);
				if ($.isNumeric(textinputValue)) {
					toSend[arrayVariable[i]] = eval(formula.replace("x", textinputValue));
				}
				else {
					toSend[arrayVariable[i]] = textinputValue;
				}
				//console.log(arrayVariable);
				sessionStorage.setItem(arrayVariable[i], toSend[arrayVariable[i]]);
			}
 		};
 		        
        function createTextInput(mySettings) {
            if (!rendered) {
                return;
            }
            
            //textinputElement.empty();
        
            textinput = document.getElementById('textinput-' + thistextinputID);
			var textinputInput = document.getElementById('textinput-input-' + thistextinputID);
			var textinputReset = document.getElementById('textinput-reset-' + thistextinputID);
			textinputReset.innerHTML = mySettings.resetcaption;
			textinputInput.value = mySettings.initialvalue;
			
			textinputReset.addEventListener('click', function(){
				textinputValue = (_.isUndefined(mySettings.resetvalue) ? 0 : mySettings.resetvalue);
				textinputInput.value = textinputValue;
				sendData();
			});
			
			textinputInput.addEventListener('change', function(){
				if ($.isNumeric(this.value)) {
					this.value = Math.min(mySettings.max,Math.max(mySettings.min, this.value));
					textinputValue =this.value;
				}
				else {
					textinputValue =this.value;
				}
				sendData();
			});
	        
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(textinputElement);
            createTextInput(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {

            if (newSettings.initialvalue != currentSettings.initialvalue 
            	|| newSettings.min != currentSettings.min 
            	|| newSettings.max != currentSettings.max 
            	|| newSettings.resetcaption != currentSettings.resetcaption 
            	|| newSettings.formula != currentSettings.formula 
            	|| newSettings.variable != currentSettings.variable 
            	|| newSettings.resetvalue != currentSettings.resetvalue) {
            		
                
        		if (!Array.isArray(newSettings.variable)) {
		        	arrayVariable = [newSettings.variable];
		        }
		        else {
		        	arrayVariable = newSettings.variable;
		        }
		        
                createTextInput(newSettings);
                // Rafraichissement de l'envoi des données
                currentSettings.formula = newSettings.formula;
                currentSettings.variable = newSettings.variable;
                sendData();
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(textinputObject)) {
			    $( "#textinput-input-" + thistextinputID ).html( newValue );
            }
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
        	// The height depends on the number or <br> or <br /> in the title
        	// Number of <br
        	var count = ((titleElement[0].innerHTML).match(/<br/g) || []).length;
            return 1 + count/3;
        };

        this.onSettingsChanged(settings);
        
        sendData();
    };

    freeboard.loadWidgetPlugin({
        type_name: "textinput",
        display_name: _t("Text Input"),
		description : _t("A Text Input widget for serial, socket or http communications."),
		// external_scripts: [
		// ],
        settings: [
            {
                name: "title",
                display_name: _t("Title"),
                type: "text"
            },
            {
                name: "variable",
                display_name: _t("Variable"),
                type: "calculated",
                multi_input: "true"
            },
            {
                name: "formula",
                display_name: _t("Formula"),
                type: "text",
                description: _t('The value really sent will be computed from the textinput value. <br />Use "x" as textinput value')
            },
            {
                name: "initialvalue",
                display_name: _t("Initial value"),
                type: "text",
                default_value: 0
            },
            {
                name: "min",
                display_name: _t("Min"),
                type: "number",
                default_value: -10
            },
            {
                name: "max",
                display_name: _t("Max"),
                type: "number",
                default_value: 10
            },
            {
                name: "resetvalue",
                display_name: _t("Reset value"),
                type: "text",
                default_value: 0
            },
            {
                name: "resetcaption",
                display_name: _t("Caption on reset button"),
                type: "text",
                default_value: _t("Reset")
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new textinputWidget(settings));
        }
    });
    
}());

