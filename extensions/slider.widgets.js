window.sliderID = 0;
(function() {    
    var sliderWidget = function (settings) {
        var thissliderID = window.sliderID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var sliderElement = $('<br /><div id="slider-' + thissliderID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        	'<input id="slider-input-' + thissliderID + '" style="margin-top:45px; width:100px"></input>' + 
        	'<button id="slider-reset-' + thissliderID + '" style="margin-top:45px; margin-left:5px;"></button>');

        var sliderObject;
        var rendered = false;

		var slider;
        var currentSettings = settings;
        var sliderValue = currentSettings.resetvalue;
        
 		function sendData() {
			// Store message in session storage
			toSend = {};
			var formula = (_.isUndefined(currentSettings.formula) ? "x" : currentSettings.formula);
			toSend[currentSettings.variable] = eval(formula.replace("x", sliderValue));
			sessionStorage.setItem(currentSettings.variable, toSend[currentSettings.variable]);
 		};
 		        
        function createSlider(mySettings) {
            if (!rendered) {
                return;
            }
            
            sliderElement.empty();
        
            slider = document.getElementById('slider-' + thissliderID);
			noUiSlider.create(slider, {
				start: [ (_.isUndefined(mySettings.initialvalue) ? 0 : mySettings.initialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.min) ? -10 * Math.pow(10, parseInt(mySettings.resolution)) : mySettings.min * Math.pow(10, parseInt(mySettings.resolution))) ],
					'max': [ (_.isUndefined(mySettings.max) ? 10 * Math.pow(10, parseInt(mySettings.resolution)) : mySettings.max * Math.pow(10, parseInt(mySettings.resolution))) ]
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
			var sliderPips = document.getElementById('slider-pips-' + thissliderID);
			var sliderInput = document.getElementById('slider-input-' + thissliderID);
			var sliderReset = document.getElementById('slider-reset-' + thissliderID);
			sliderReset.innerHTML = mySettings.resetcaption;
			
			sliderReset.addEventListener('click', function(){
				slider.noUiSlider.set([(_.isUndefined(mySettings.resetvalue) ? 0 : mySettings.resetvalue)]);
			});
			
			slider.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.resolution);
				sliderInput.value = value;
				sliderValue = value;
				sendData();
			});
			
			sliderInput.addEventListener('change', function(){
				slider.noUiSlider.set(this.value);
			});
	        
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(sliderElement);
            createSlider(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {

            if (newSettings.initialvalue != currentSettings.initialvalue 
            	|| newSettings.min != currentSettings.min 
            	|| newSettings.max != currentSettings.max 
            	|| newSettings.resolution != currentSettings.resolution 
            	|| newSettings.resetcaption != currentSettings.resetcaption 
            	|| newSettings.formula != currentSettings.formula 
            	|| newSettings.resetvalue != currentSettings.resetvalue) {
            		
                
                if (!_.isUndefined(slider)) {
                	slider.noUiSlider.destroy();
                }
                createSlider(newSettings);
                // Rafraichissement de l'envoi des données
                currentSettings.formula = newSettings.formula;
                currentSettings.variable = newSettings.variable;
                sendData();
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(sliderObject)) {
			    $( "#slider_value-" + thissliderID ).html( newValue/Math.pow(10, parseInt(currentSettings.resolution)) );
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
        type_name: "slider",
        display_name: _t("Slider"),
		description : _t("A Slider widget for serial or socket communications."),
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
                type: "calculated",
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
                type: "number",
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
                name: "resolution",
                display_name: _t("Number of decimals"),
                type: "number",
                default_value: 2
            },
            {
                name: "resetvalue",
                display_name: _t("Reset value"),
                type: "number",
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
            newInstanceCallback(new sliderWidget(settings));
        }
    });
    
}());

