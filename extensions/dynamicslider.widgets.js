window.dynamicsliderID = 0;
(function() {    
    var dynamicsliderWidget = function (settings) {
        var thisdynamicsliderID = window.dynamicsliderID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var dynamicsliderElement = $('<br /><div id="dynamicslider-' + thisdynamicsliderID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        	'<input id="dynamicslider-input-' + thisdynamicsliderID + '" style="margin-top:45px; width:100px"></input>' + 
        	'<button id="dynamicslider-reset-' + thisdynamicsliderID + '" style="margin-top:45px; margin-left:5px;"></button>');

        var dynamicsliderObject;
        var rendered = false;

		var dynamicslider;
        var currentSettings = settings;
        var initialValue = 0;
        var minRange = 0;
        var maxRange = 10;
        var previousInitialValue = initialValue;
        var previousMinRange = minRange;
        var previousMaxRange = maxRange;
        var dynamicsliderValue = currentSettings.resetvalue;
        var resetValue = dynamicsliderValue;
        
 		function sendData() {
			// Store message in session storage
			toSend = {};
			var formula = (_.isUndefined(currentSettings.formula) ? "x" : currentSettings.formula);
			toSend[currentSettings.variable] = eval(formula.replace("x", dynamicsliderValue));
			sessionStorage.setItem(currentSettings.variable, toSend[currentSettings.variable]);
 		};
 		        
        function createDynamicSlider(mySettings) {
            if (!rendered) {
                return;
            }
            
            dynamicsliderElement.empty();
        
            dynamicslider = document.getElementById('dynamicslider-' + thisdynamicsliderID);
			noUiSlider.create(dynamicslider, {
				//start: [ (_.isUndefined(mySettings.initialvalue) ? 0 : mySettings.initialvalue) ],
				start: initialValue,
				step: 1,
				range: {
					//'min': [ (_.isUndefined(mySettings.min) ? -10 * Math.pow(10, parseInt(mySettings.resolution)) : mySettings.min * Math.pow(10, parseInt(mySettings.resolution))) ],
					'min': minRange * Math.pow(10, parseInt(mySettings.resolution)),
					//'max': [ (_.isUndefined(mySettings.max) ? 10 * Math.pow(10, parseInt(mySettings.resolution)) : mySettings.max * Math.pow(10, parseInt(mySettings.resolution))) ]
					'max': maxRange * Math.pow(10, parseInt(mySettings.resolution))
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.resolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.resolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.resolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.resolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.resolution));
							}
				})
			});
			var dynamicsliderPips = document.getElementById('dynamicslider-pips-' + thisdynamicsliderID);
			var dynamicsliderInput = document.getElementById('dynamicslider-input-' + thisdynamicsliderID);
			var dynamicsliderReset = document.getElementById('dynamicslider-reset-' + thisdynamicsliderID);
			dynamicsliderReset.innerHTML = mySettings.resetcaption;
			
			dynamicsliderReset.addEventListener('click', function(){
				//dynamicslider.noUiSlider.set([(_.isUndefined(mySettings.resetvalue) ? 0 : mySettings.resetvalue)]);
				dynamicslider.noUiSlider.set(resetValue);
			});
			
			dynamicslider.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.resolution);
				dynamicsliderInput.value = value;
				dynamicsliderValue = value;
				sendData();
			});
			
			dynamicsliderInput.addEventListener('change', function(){
				dynamicslider.noUiSlider.set(this.value);
			});
	        
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(dynamicsliderElement);
            createDynamicSlider(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.resolution != currentSettings.resolution 
            	|| newSettings.resetcaption != currentSettings.resetcaption 
            	|| newSettings.formula != currentSettings.formula) {
            		
                
                if (!_.isUndefined(dynamicslider.noUiSlider)) {
                	dynamicslider.noUiSlider.destroy();
                }
                createDynamicSlider(newSettings);
                // Rafraichissement de l'envoi des données
                currentSettings.formula = newSettings.formula;
                currentSettings.variable = newSettings.variable;
                sendData();
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(dynamicsliderObject)) {
			    $( "#dynamicslider_value-" + thisdynamicsliderID ).html( newValue/Math.pow(10, parseInt(currentSettings.resolution)) );
            }
            if (settingName == "initialvalue") {
            	initialValue = newValue;
				if (previousInitialValue != initialValue) {
	                if (!_.isUndefined(dynamicslider.noUiSlider)) {
	                	dynamicslider.noUiSlider.destroy();
	                }
	                createDynamicSlider(currentSettings);
	            }
	            previousInitialValue = initialValue;
            }
            if (settingName == "min") {
            	minRange = newValue;
            	// dynamicslider.noUiSlider.updateOptions({
					// range: {
						// 'min': minRange * Math.pow(10, parseInt(currentSettings.resolution)),
						// 'max': maxRange * Math.pow(10, parseInt(currentSettings.resolution))
					// }
				// });
				if (previousMinRange != minRange) {
	                if (!_.isUndefined(dynamicslider.noUiSlider)) {
	                	dynamicslider.noUiSlider.destroy();
	                }
	                createDynamicSlider(currentSettings);
	            }
	            previousMinRange = minRange;
            }
            if (settingName == "max") {
            	maxRange = newValue;
				if (previousMaxRange != maxRange) {
	                if (!_.isUndefined(dynamicslider.noUiSlider)) {
	                	dynamicslider.noUiSlider.destroy();
	                }
	                createDynamicSlider(currentSettings);
	            }
	            previousMaxRange = maxRange;
            }
            if (settingName == "resetvalue") {
            	resetValue = newValue;
            }
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
        	// The height depends on the number or <br> or <br /> in the title
        	// Number of <br
        	var count = ((titleElement[0].innerHTML).match(/<br/g) || []).length;
            return 2 + count/3;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "dynamicslider",
        display_name: _t("DynamicSlider"),
		description : _t("A Slider widget with dynamic parameters for serial or socket communications."),
		external_scripts: [
			"extensions/thirdparty/nouislider.min.js",
			"extensions/thirdparty/wNumb.min.js"
		],
        settings: [
            {
                name: "title",
                display_name: _t("Title"),
                type: "text"
            },
            {
                name: "variable",
                display_name: _t("Variable"),
                type: "calculated"
            },
            {
                name: "formula",
                display_name: _t("Formula"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "initialvalue",
                display_name: _t("Initial value"),
                type: "calculated"
            },
            {
                name: "min",
                display_name: _t("Min"),
                type: "calculated"
            },
            {
                name: "max",
                display_name: _t("Max"),
                type: "calculated"
            },
            {
                name: "resolution",
                display_name: _t("Number of decimals"),
                type: "number",
                default_value: 2
            },
            {
                name: "resetvalue",
                display_name: _t("Reset value"),
                type: "calculated"
            },
            {
                name: "resetcaption",
                display_name: _t("Caption on reset button"),
                type: "text",
                default_value: _t("Reset")
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new dynamicsliderWidget(settings));
        }
    });
    
}());

