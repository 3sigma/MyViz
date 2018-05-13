window.signalgenerationID = 0;
(function() {    
    var signalgenerationWidget = function (settings) {
        var thissignalgenerationID = window.signalgenerationID++;
        var titleSelectElement = $('<h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var selectElement = $('<div id="divselectsignal-' + thissignalgenerationID + '"><select id="selectsignal-' + thissignalgenerationID + '"></select></div>');
        var titleSliderOffsetElement = $('<br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var slideroffsetElement = $('<br /><div id="slideroffset-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="slideroffset-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="slideroffset-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderAmplitudeElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var slideramplitudeElement = $('<br /><div id="slideramplitude-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="slideramplitude-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="slideramplitude-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderFrequencyElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var sliderfrequencyElement = $('<br /><div id="sliderfrequency-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="sliderfrequency-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="sliderfrequency-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderRisingTimeElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var sliderrisingtimeElement = $('<br /><div id="sliderrisingtime-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="sliderrisingtime-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="sliderrisingtime-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderFallingTimeElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var sliderfallingtimeElement = $('<br /><div id="sliderfallingtime-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="sliderfallingtime-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="sliderfallingtime-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderPercentageElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var sliderpercentageElement = $('<br /><div id="sliderpercentage-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="sliderpercentage-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="sliderpercentage-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');
        var titleSliderWidthElement = $('<br /><br /><h2 class="section-title" style="padding-bottom:7px;"></h2>');
        var sliderwidthElement = $('<br /><div id="sliderwidth-' + thissignalgenerationID + '" style="width:90%; margin-left:auto; margin-right:auto"></div>' +
        								'<input id="sliderwidth-input-' + thissignalgenerationID + '" style="margin-top:45px; width:100px"></input>' + 
        								'<button id="sliderwidth-reset-' + thissignalgenerationID + '" style="margin-top:45px; margin-left:5px;"></button>');

        var slideroffsetObject;
        var slideramplitudeObject;
        var sliderfrequencyObject;
        var sliderrisingtimeObject;
        var sliderfallingtimeObject;
        var sliderpercentageObject;
        var sliderwidthObject;
        var rendered = false;

        var currentSettings = settings;
		var signalgeneration;
		var slideroffset;
        var slideroffsetValue = currentSettings.offsetresetvalue;
		var slideramplitude;
        var slideramplitudeValue = currentSettings.amplituderesetvalue;
		var sliderfrequency;
        var sliderfrequencyValue = currentSettings.frequencyresetvalue;
		var sliderrisingtime;
        var sliderrisingtimeValue = currentSettings.risingtimeresetvalue;
		var sliderfallingtime;
        var sliderfallingtimeValue = currentSettings.fallingtimeresetvalue;
		var sliderpercentage;
        var sliderpercentageValue = currentSettings.percentageresetvalue;
		var sliderwidth;
        var sliderwidthValue = currentSettings.widthresetvalue;
        
        var arrayHeight = [4, 3, 6, 5, 4];
        var previousType = 0;
		var currentHeight;
		var first = true;
		var signalType = 0;
		
 		function sendData() {
			toSend = {};
			
			// Signal type
			toSend[currentSettings.selectvariable] = $( "#selectsignal-" + thissignalgenerationID ).val();
			sessionStorage.setItem(currentSettings.selectvariable, toSend[currentSettings.selectvariable]);
			
			// Offset
			var offsetformula = (_.isUndefined(currentSettings.offsetformula) ? "x" : currentSettings.offsetformula);
			toSend[currentSettings.offsetvariable] = eval(offsetformula.replace("x", slideroffsetValue));
			sessionStorage.setItem(currentSettings.offsetvariable, toSend[currentSettings.offsetvariable]);

			// Amplitude
			var amplitudeformula = (_.isUndefined(currentSettings.amplitudeformula) ? "x" : currentSettings.amplitudeformula);
			toSend[currentSettings.amplitudevariable] = eval(amplitudeformula.replace("x", slideramplitudeValue));
			sessionStorage.setItem(currentSettings.amplitudevariable, toSend[currentSettings.amplitudevariable]);

			// Frequency
			var frequencyformula = (_.isUndefined(currentSettings.frequencyformula) ? "x" : currentSettings.frequencyformula);
			toSend[currentSettings.frequencyvariable] = eval(frequencyformula.replace("x", sliderfrequencyValue));
			sessionStorage.setItem(currentSettings.frequencyvariable, toSend[currentSettings.frequencyvariable]);

			// Rising Time
			var risingtimeformula = (_.isUndefined(currentSettings.risingtimeformula) ? "x" : currentSettings.risingtimeformula);
			toSend[currentSettings.risingtimevariable] = eval(risingtimeformula.replace("x", sliderrisingtimeValue));
			sessionStorage.setItem(currentSettings.risingtimevariable, toSend[currentSettings.risingtimevariable]);

			// Falling Time
			var fallingtimeformula = (_.isUndefined(currentSettings.fallingtimeformula) ? "x" : currentSettings.fallingtimeformula);
			toSend[currentSettings.fallingtimevariable] = eval(fallingtimeformula.replace("x", sliderfallingtimeValue));
			sessionStorage.setItem(currentSettings.fallingtimevariable, toSend[currentSettings.fallingtimevariable]);

			// Percentage
			var percentageformula = (_.isUndefined(currentSettings.percentageformula) ? "x" : currentSettings.percentageformula);
			toSend[currentSettings.percentagevariable] = eval(percentageformula.replace("x", sliderpercentageValue));
			sessionStorage.setItem(currentSettings.percentagevariable, toSend[currentSettings.percentagevariable]);

			// Width
			var widthformula = (_.isUndefined(currentSettings.widthformula) ? "x" : currentSettings.widthformula);
			toSend[currentSettings.widthvariable] = eval(widthformula.replace("x", sliderwidthValue));
			sessionStorage.setItem(currentSettings.widthvariable, toSend[currentSettings.widthvariable]);

 		};
 		
 		function show_hide() {
 			signalType = Number($( "#selectsignal-" + thissignalgenerationID ).val());
 			if (!first) {
				currentHeight = $( "#selectsignal-" + thissignalgenerationID ).parent().parent().parent().parent().parent().height();
			}
			
			switch(signalType) {
				// Pulse
			    case 0:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.show();
			    	sliderfrequencyElement.show();
					titleSliderRisingTimeElement.hide();
					sliderrisingtimeElement.hide();
					titleSliderFallingTimeElement.hide();
					sliderfallingtimeElement.hide();
			    	titleSliderPercentageElement.show();
			    	sliderpercentageElement.show();
					titleSliderWidthElement.hide();
					sliderwidthElement.hide();
			        break;
			    // Sine
			    case 1:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.show();
			    	sliderfrequencyElement.show();
					titleSliderRisingTimeElement.hide();
					sliderrisingtimeElement.hide();
					titleSliderFallingTimeElement.hide();
					sliderfallingtimeElement.hide();
			    	titleSliderPercentageElement.hide();
			    	sliderpercentageElement.hide();
					titleSliderWidthElement.hide();
					sliderwidthElement.hide();
			        break;
			    // Trapezoid
			    case 2:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.show();
			    	sliderfrequencyElement.show();
					titleSliderRisingTimeElement.show();
					sliderrisingtimeElement.show();
					titleSliderFallingTimeElement.show();
					sliderfallingtimeElement.show();
			    	titleSliderPercentageElement.hide();
			    	sliderpercentageElement.hide();
					titleSliderWidthElement.show();
					sliderwidthElement.show();
			        break;
			    // Triangle
			    case 3:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.show();
			    	sliderfrequencyElement.show();
					titleSliderRisingTimeElement.show();
					sliderrisingtimeElement.show();
					titleSliderFallingTimeElement.show();
					sliderfallingtimeElement.show();
			    	titleSliderPercentageElement.hide();
			    	sliderpercentageElement.hide();
					titleSliderWidthElement.hide();
					sliderwidthElement.hide();
			        break;
			    // Ramp
			    case 4:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.hide();
			    	sliderfrequencyElement.hide();
					titleSliderRisingTimeElement.show();
					sliderrisingtimeElement.show();
					titleSliderFallingTimeElement.hide();
					sliderfallingtimeElement.hide();
			    	titleSliderPercentageElement.hide();
			    	sliderpercentageElement.hide();
					titleSliderWidthElement.show();
					sliderwidthElement.show();
			        break;
			    default:
			    	titleSliderOffsetElement.show();
			    	slideroffsetElement.show();
			    	titleSliderAmplitudeElement.show();
			    	slideramplitudeElement.show();
			    	titleSliderFrequencyElement.show();
			    	sliderfrequencyElement.show();
					titleSliderRisingTimeElement.show();
					sliderrisingtimeElement.show();
					titleSliderFallingTimeElement.show();
					sliderfallingtimeElement.show();
			    	titleSliderPercentageElement.show();
			    	sliderpercentageElement.show();
					titleSliderWidthElement.show();
					sliderwidthElement.show();
			} 			
			if (!first) {
				$( "#selectsignal-" + thissignalgenerationID ).parent().parent().parent().parent().parent().height(currentHeight + 150 * (arrayHeight[signalType] - arrayHeight[previousType]));
			}
			previousType = signalType;
			
            if (signalType == 4) {
            	// Ramp
            	titleSliderWidthElement.html(_t("Delay before ramp (s)"));
            }
            else {
            	// Trapezoid
            	titleSliderWidthElement.html(_t("Width (s)"));
            }
 		}
 		        
        function createSignalGeneration(mySettings) {
            if (!rendered) {
                return;
            }
	        	        
	        // Signal type
	        arrayCaptions = [_t("Pulse"), _t("Sine"), _t("Trapezoid"), _t("Triangle"), _t("Ramp")];
	        arrayValues = [0, 1, 2, 3, 4];
		
			selectElementStr = '';
			for (var i=0; i<Math.min(arrayCaptions.length, arrayValues.length); i++) {
				selectElementStr += '<option value="' + arrayValues[i]  + '">' + arrayCaptions[i] + '</option>';
			}
            document.getElementById('selectsignal-' + thissignalgenerationID).innerHTML = selectElementStr;
            
        	sendData();
        	show_hide();
			$( "#selectsignal-" + thissignalgenerationID ).change(function() {
				sendData();
				show_hide();
			});
			
			
			
            // Offset
            slideroffset = document.getElementById('slideroffset-' + thissignalgenerationID);
			noUiSlider.create(slideroffset, {
				start: [ (_.isUndefined(mySettings.offsetinitialvalue) ? 0 : mySettings.offsetinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.offsetmin) ? -10 * Math.pow(10, parseInt(mySettings.offsetresolution)) : mySettings.offsetmin * Math.pow(10, parseInt(mySettings.offsetresolution))) ],
					'max': [ (_.isUndefined(mySettings.offsetmax) ? 10 * Math.pow(10, parseInt(mySettings.offsetresolution)) : mySettings.offsetmax * Math.pow(10, parseInt(mySettings.offsetresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.offsetresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.offsetresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.offsetresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.offsetresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.offsetresolution));
							}
				})
			});
			var slideroffsetPips = document.getElementById('slideroffset-pips-' + thissignalgenerationID);
			var slideroffsetInput = document.getElementById('slideroffset-input-' + thissignalgenerationID);
			var slideroffsetReset = document.getElementById('slideroffset-reset-' + thissignalgenerationID);
			slideroffsetReset.innerHTML = mySettings.offsetresetcaption;
			
			slideroffsetReset.addEventListener('click', function(){
				slideroffset.noUiSlider.set([(_.isUndefined(mySettings.offsetresetvalue) ? 0 : mySettings.offsetresetvalue)]);
			});
			
			slideroffset.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.offsetresolution);
				slideroffsetInput.value = value;
				slideroffsetValue = value;
				sendData();
			});
			
			slideroffsetInput.addEventListener('change', function(){
				slideroffset.noUiSlider.set(this.value);
			});
			
        
            // Amplitude
            slideramplitude = document.getElementById('slideramplitude-' + thissignalgenerationID);
			noUiSlider.create(slideramplitude, {
				start: [ (_.isUndefined(mySettings.amplitudeinitialvalue) ? 0 : mySettings.amplitudeinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.amplitudemin) ? -10 * Math.pow(10, parseInt(mySettings.amplituderesolution)) : mySettings.amplitudemin * Math.pow(10, parseInt(mySettings.amplituderesolution))) ],
					'max': [ (_.isUndefined(mySettings.amplitudemax) ? 10 * Math.pow(10, parseInt(mySettings.amplituderesolution)) : mySettings.amplitudemax * Math.pow(10, parseInt(mySettings.amplituderesolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.amplituderesolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.amplituderesolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.amplituderesolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.amplituderesolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.amplituderesolution));
							}
				})
			});
			var slideramplitudePips = document.getElementById('slideramplitude-pips-' + thissignalgenerationID);
			var slideramplitudeInput = document.getElementById('slideramplitude-input-' + thissignalgenerationID);
			var slideramplitudeReset = document.getElementById('slideramplitude-reset-' + thissignalgenerationID);
			slideramplitudeReset.innerHTML = mySettings.amplituderesetcaption;
			
			slideramplitudeReset.addEventListener('click', function(){
				slideramplitude.noUiSlider.set([(_.isUndefined(mySettings.amplituderesetvalue) ? 0 : mySettings.amplituderesetvalue)]);
			});
			
			slideramplitude.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.amplituderesolution);
				slideramplitudeInput.value = value;
				slideramplitudeValue = value;
				sendData();
			});
			
			slideramplitudeInput.addEventListener('change', function(){
				slideramplitude.noUiSlider.set(this.value);
			});
        

            // Frequency
            sliderfrequency = document.getElementById('sliderfrequency-' + thissignalgenerationID);
			noUiSlider.create(sliderfrequency, {
				start: [ (_.isUndefined(mySettings.frequencyinitialvalue) ? 0 : mySettings.frequencyinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.frequencymin) ? -10 * Math.pow(10, parseInt(mySettings.frequencyresolution)) : mySettings.frequencymin * Math.pow(10, parseInt(mySettings.frequencyresolution))) ],
					'max': [ (_.isUndefined(mySettings.frequencymax) ? 10 * Math.pow(10, parseInt(mySettings.frequencyresolution)) : mySettings.frequencymax * Math.pow(10, parseInt(mySettings.frequencyresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.frequencyresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.frequencyresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.frequencyresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.frequencyresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.frequencyresolution));
							}
				})
			});
			var sliderfrequencyPips = document.getElementById('sliderfrequency-pips-' + thissignalgenerationID);
			var sliderfrequencyInput = document.getElementById('sliderfrequency-input-' + thissignalgenerationID);
			var sliderfrequencyReset = document.getElementById('sliderfrequency-reset-' + thissignalgenerationID);
			sliderfrequencyReset.innerHTML = mySettings.frequencyresetcaption;
			
			sliderfrequencyReset.addEventListener('click', function(){
				sliderfrequency.noUiSlider.set([(_.isUndefined(mySettings.frequencyresetvalue) ? 0 : mySettings.frequencyresetvalue)]);
			});
			
			sliderfrequency.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.frequencyresolution);
				sliderfrequencyInput.value = value;
				sliderfrequencyValue = value;
				sendData();
			});
			
			sliderfrequencyInput.addEventListener('change', function(){
				sliderfrequency.noUiSlider.set(this.value);
			});
        

            // RisingTime
            sliderrisingtime = document.getElementById('sliderrisingtime-' + thissignalgenerationID);
			noUiSlider.create(sliderrisingtime, {
				start: [ (_.isUndefined(mySettings.risingtimeinitialvalue) ? 0 : mySettings.risingtimeinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.risingtimemin) ? -10 * Math.pow(10, parseInt(mySettings.risingtimeresolution)) : mySettings.risingtimemin * Math.pow(10, parseInt(mySettings.risingtimeresolution))) ],
					'max': [ (_.isUndefined(mySettings.risingtimemax) ? 10 * Math.pow(10, parseInt(mySettings.risingtimeresolution)) : mySettings.risingtimemax * Math.pow(10, parseInt(mySettings.risingtimeresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.risingtimeresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.risingtimeresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.risingtimeresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.risingtimeresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.risingtimeresolution));
							}
				})
			});
			var sliderrisingtimePips = document.getElementById('sliderrisingtime-pips-' + thissignalgenerationID);
			var sliderrisingtimeInput = document.getElementById('sliderrisingtime-input-' + thissignalgenerationID);
			var sliderrisingtimeReset = document.getElementById('sliderrisingtime-reset-' + thissignalgenerationID);
			sliderrisingtimeReset.innerHTML = mySettings.risingtimeresetcaption;
			
			sliderrisingtimeReset.addEventListener('click', function(){
				sliderrisingtime.noUiSlider.set([(_.isUndefined(mySettings.risingtimeresetvalue) ? 0 : mySettings.risingtimeresetvalue)]);
			});
			
			sliderrisingtime.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.risingtimeresolution);
				sliderrisingtimeInput.value = value;
				sliderrisingtimeValue = value;
				sendData();
			});
			
			sliderrisingtimeInput.addEventListener('change', function(){
				sliderrisingtime.noUiSlider.set(this.value);
			});
        

            // FallingTime
            sliderfallingtime = document.getElementById('sliderfallingtime-' + thissignalgenerationID);
			noUiSlider.create(sliderfallingtime, {
				start: [ (_.isUndefined(mySettings.fallingtimeinitialvalue) ? 0 : mySettings.fallingtimeinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.fallingtimemin) ? -10 * Math.pow(10, parseInt(mySettings.fallingtimeresolution)) : mySettings.fallingtimemin * Math.pow(10, parseInt(mySettings.fallingtimeresolution))) ],
					'max': [ (_.isUndefined(mySettings.fallingtimemax) ? 10 * Math.pow(10, parseInt(mySettings.fallingtimeresolution)) : mySettings.fallingtimemax * Math.pow(10, parseInt(mySettings.fallingtimeresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.fallingtimeresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.fallingtimeresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.fallingtimeresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.fallingtimeresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.fallingtimeresolution));
							}
				})
			});
			var sliderfallingtimePips = document.getElementById('sliderfallingtime-pips-' + thissignalgenerationID);
			var sliderfallingtimeInput = document.getElementById('sliderfallingtime-input-' + thissignalgenerationID);
			var sliderfallingtimeReset = document.getElementById('sliderfallingtime-reset-' + thissignalgenerationID);
			sliderfallingtimeReset.innerHTML = mySettings.fallingtimeresetcaption;
			
			sliderfallingtimeReset.addEventListener('click', function(){
				sliderfallingtime.noUiSlider.set([(_.isUndefined(mySettings.fallingtimeresetvalue) ? 0 : mySettings.fallingtimeresetvalue)]);
			});
			
			sliderfallingtime.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.fallingtimeresolution);
				sliderfallingtimeInput.value = value;
				sliderfallingtimeValue = value;
				sendData();
			});
			
			sliderfallingtimeInput.addEventListener('change', function(){
				sliderfallingtime.noUiSlider.set(this.value);
			});
        

            // Percentage
            sliderpercentage = document.getElementById('sliderpercentage-' + thissignalgenerationID);
			noUiSlider.create(sliderpercentage, {
				start: [ (_.isUndefined(mySettings.percentageinitialvalue) ? 0 : mySettings.percentageinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.percentagemin) ? -10 * Math.pow(10, parseInt(mySettings.percentageresolution)) : mySettings.percentagemin * Math.pow(10, parseInt(mySettings.percentageresolution))) ],
					'max': [ (_.isUndefined(mySettings.percentagemax) ? 10 * Math.pow(10, parseInt(mySettings.percentageresolution)) : mySettings.percentagemax * Math.pow(10, parseInt(mySettings.percentageresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.percentageresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.percentageresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.percentageresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.percentageresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.percentageresolution));
							}
				})
			});
			var sliderpercentagePips = document.getElementById('sliderpercentage-pips-' + thissignalgenerationID);
			var sliderpercentageInput = document.getElementById('sliderpercentage-input-' + thissignalgenerationID);
			var sliderpercentageReset = document.getElementById('sliderpercentage-reset-' + thissignalgenerationID);
			sliderpercentageReset.innerHTML = mySettings.percentageresetcaption;
			
			sliderpercentageReset.addEventListener('click', function(){
				sliderpercentage.noUiSlider.set([(_.isUndefined(mySettings.percentageresetvalue) ? 0 : mySettings.percentageresetvalue)]);
			});
			
			sliderpercentage.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.percentageresolution);
				sliderpercentageInput.value = value;
				sliderpercentageValue = value;
				sendData();
			});
			
			sliderpercentageInput.addEventListener('change', function(){
				sliderpercentage.noUiSlider.set(this.value);
			});
        

            // Width
            sliderwidth = document.getElementById('sliderwidth-' + thissignalgenerationID);
			noUiSlider.create(sliderwidth, {
				start: [ (_.isUndefined(mySettings.widthinitialvalue) ? 0 : mySettings.widthinitialvalue) ],
				step: 1,
				range: {
					'min': [ (_.isUndefined(mySettings.widthmin) ? -10 * Math.pow(10, parseInt(mySettings.widthresolution)) : mySettings.widthmin * Math.pow(10, parseInt(mySettings.widthresolution))) ],
					'max': [ (_.isUndefined(mySettings.widthmax) ? 10 * Math.pow(10, parseInt(mySettings.widthresolution)) : mySettings.widthmax * Math.pow(10, parseInt(mySettings.widthresolution))) ]
				},
				pips: {
					mode: 'positions',
					values: [0,25,50,75,100],
					density: 4,
					stepped: true,
					format: wNumb({
					decimals: mySettings.widthresolution,
					encoder: 	function( value ){
									return value / Math.pow(10, parseInt(mySettings.widthresolution));
							}
					})
				},
				format: wNumb({
				decimals: mySettings.widthresolution,
				encoder: 	function( value ){
								return value / Math.pow(10, parseInt(mySettings.widthresolution));
							},
				decoder: 	function( value ){
								return value * Math.pow(10, parseInt(mySettings.widthresolution));
							}
				})
			});
			var sliderwidthPips = document.getElementById('sliderwidth-pips-' + thissignalgenerationID);
			var sliderwidthInput = document.getElementById('sliderwidth-input-' + thissignalgenerationID);
			var sliderwidthReset = document.getElementById('sliderwidth-reset-' + thissignalgenerationID);
			sliderwidthReset.innerHTML = mySettings.widthresetcaption;
			
			sliderwidthReset.addEventListener('click', function(){
				sliderwidth.noUiSlider.set([(_.isUndefined(mySettings.widthresetvalue) ? 0 : mySettings.widthresetvalue)]);
			});
			
			sliderwidth.noUiSlider.on('update', function( values, handle ) {
				var value = (Number(values[handle])).toFixed(currentSettings.widthresolution);
				sliderwidthInput.value = value;
				sliderwidthValue = value;
				sendData();
			});
			
			sliderwidthInput.addEventListener('change', function(){
				sliderwidth.noUiSlider.set(this.value);
			});
        

		}

        this.render = function (element) {
            rendered = true;
            $(element).append(titleSelectElement).append(selectElement).append(titleSliderOffsetElement).append(slideroffsetElement).append(titleSliderAmplitudeElement).append(slideramplitudeElement).append(titleSliderFrequencyElement).append(sliderfrequencyElement).append(titleSliderRisingTimeElement).append(sliderrisingtimeElement).append(titleSliderWidthElement).append(sliderwidthElement).append(titleSliderFallingTimeElement).append(sliderfallingtimeElement).append(titleSliderPercentageElement).append(sliderpercentageElement);
            createSignalGeneration(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.offsetinitialvalue != currentSettings.offsetinitialvalue
            	|| newSettings.offsetmin != currentSettings.offsetmin 
            	|| newSettings.offsetmax != currentSettings.offsetmax 
            	|| newSettings.offsetresolution != currentSettings.offsetresolution 
            	|| newSettings.offsetresetcaption != currentSettings.offsetresetcaption 
            	|| newSettings.offsetformula != currentSettings.offsetformula 
            	|| newSettings.offsetresetvalue != currentSettings.offsetresetvalue
            	|| newSettings.amplitudeinitialvalue != currentSettings.amplitudeinitialvalue
            	|| newSettings.amplitudemin != currentSettings.amplitudemin 
            	|| newSettings.amplitudemax != currentSettings.amplitudemax 
            	|| newSettings.amplituderesolution != currentSettings.amplituderesolution 
            	|| newSettings.amplituderesetcaption != currentSettings.amplituderesetcaption 
            	|| newSettings.amplitudeformula != currentSettings.amplitudeformula 
            	|| newSettings.amplituderesetvalue != currentSettings.amplituderesetvalue
            	|| newSettings.frequencyinitialvalue != currentSettings.frequencyinitialvalue
            	|| newSettings.frequencymin != currentSettings.frequencymin 
            	|| newSettings.frequencymax != currentSettings.frequencymax 
            	|| newSettings.frequencyresolution != currentSettings.frequencyresolution 
            	|| newSettings.frequencyresetcaption != currentSettings.frequencyresetcaption 
            	|| newSettings.frequencyformula != currentSettings.frequencyformula 
            	|| newSettings.frequencyresetvalue != currentSettings.frequencyresetvalue
            	|| newSettings.risingtimeinitialvalue != currentSettings.risingtimeinitialvalue
            	|| newSettings.risingtimemin != currentSettings.risingtimemin 
            	|| newSettings.risingtimemax != currentSettings.risingtimemax 
            	|| newSettings.risingtimeresolution != currentSettings.risingtimeresolution 
            	|| newSettings.risingtimeresetcaption != currentSettings.risingtimeresetcaption 
            	|| newSettings.risingtimeformula != currentSettings.risingtimeformula 
            	|| newSettings.risingtimeresetvalue != currentSettings.risingtimeresetvalue
            	|| newSettings.fallingtimeinitialvalue != currentSettings.fallingtimeinitialvalue
            	|| newSettings.fallingtimemin != currentSettings.fallingtimemin 
            	|| newSettings.fallingtimemax != currentSettings.fallingtimemax 
            	|| newSettings.fallingtimeresolution != currentSettings.fallingtimeresolution 
            	|| newSettings.fallingtimeresetcaption != currentSettings.fallingtimeresetcaption 
            	|| newSettings.fallingtimeformula != currentSettings.fallingtimeformula 
            	|| newSettings.fallingtimeresetvalue != currentSettings.fallingtimeresetvalue
            	|| newSettings.percentageinitialvalue != currentSettings.percentageinitialvalue
            	|| newSettings.percentagemin != currentSettings.percentagemin 
            	|| newSettings.percentagemax != currentSettings.percentagemax 
            	|| newSettings.percentageresolution != currentSettings.percentageresolution 
            	|| newSettings.percentageresetcaption != currentSettings.percentageresetcaption 
            	|| newSettings.percentageformula != currentSettings.percentageformula 
            	|| newSettings.percentageresetvalue != currentSettings.percentageresetvalue
            	|| newSettings.widthinitialvalue != currentSettings.widthinitialvalue
            	|| newSettings.widthmin != currentSettings.widthmin 
            	|| newSettings.widthmax != currentSettings.widthmax 
            	|| newSettings.widthresolution != currentSettings.widthresolution 
            	|| newSettings.widthresetcaption != currentSettings.widthresetcaption 
            	|| newSettings.widthformula != currentSettings.widthformula 
            	|| newSettings.widthresetvalue != currentSettings.widthresetvalue
            	) {
            		
                if (!_.isUndefined(slideroffset)) {
                	slideroffset.noUiSlider.destroy();
                }
                if (!_.isUndefined(slideramplitude)) {
                	slideramplitude.noUiSlider.destroy();
                }
                if (!_.isUndefined(sliderfrequency)) {
                	sliderfrequency.noUiSlider.destroy();
                }
                if (!_.isUndefined(sliderrisingtime)) {
                	sliderrisingtime.noUiSlider.destroy();
                }
                if (!_.isUndefined(sliderfallingtime)) {
                	sliderfallingtime.noUiSlider.destroy();
                }
                if (!_.isUndefined(sliderpercentage)) {
                	sliderpercentage.noUiSlider.destroy();
                }
                if (!_.isUndefined(sliderwidth)) {
                	sliderwidth.noUiSlider.destroy();
                }
                createSignalGeneration(newSettings);
            }

			currentSettings = newSettings;
            titleSelectElement.html(_t("Signal type"));
            Unit = _.isUndefined(currentSettings.unit) ? "" : " (" + currentSettings.unit + ")";
            Unit2 = _.isUndefined(currentSettings.unit2) ? "" : " (" + currentSettings.unit2 + ")";
            titleSliderOffsetElement.html(_t("Offset") + Unit);
            titleSliderAmplitudeElement.html(_t("Amplitude") + Unit2);
            titleSliderFrequencyElement.html(_t("Frequency (Hz)"));
            titleSliderRisingTimeElement.html(_t("Rising time (s)"));
            titleSliderFallingTimeElement.html(_t("Falling time (s)"));
            titleSliderPercentageElement.html(_t("Pulse width (%)"));
            titleSliderWidthElement.html(_t("Width (s)"));
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (!_.isUndefined(slideroffsetObject)) {
			    $( "#slideroffset_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.offsetresolution)) );
            }
            if (!_.isUndefined(slideramplitudeObject)) {
			    $( "#slideramplitude_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.amplituderesolution)) );
            }
             if (!_.isUndefined(sliderfrequencyObject)) {
			    $( "#sliderfrequency_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.frequencyresolution)) );
            }
             if (!_.isUndefined(sliderrisingtimeObject)) {
			    $( "#sliderrisingtime_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.risingtimeresolution)) );
            }
             if (!_.isUndefined(sliderfallingtimeObject)) {
			    $( "#sliderfallingtime_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.fallingtimeresolution)) );
            }
            if (!_.isUndefined(sliderpercentageObject)) {
			    $( "#sliderpercentage_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.percentageresolution)) );
            }
            if (!_.isUndefined(sliderwidthObject)) {
			    $( "#sliderwidth_value-" + thissignalgenerationID ).html( newValue/Math.pow(10, parseInt(currentSettings.widthresolution)) );
            }
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
            first = false;
            toReturn = 2 + 2 * arrayHeight[signalType];
            return toReturn;
        };

        this.onSettingsChanged(settings);
        
    };

    freeboard.loadWidgetPlugin({
        type_name: "signalgeneration",
        display_name: _t("Signal Generation"),
		description : _t("A Signal Generation widget."),
		external_scripts: [
			"extensions/thirdparty/nouislider.min.js",
			"extensions/thirdparty/wNumb.min.js"
		],
        settings: [
            {
                name: "selectvariable",
                display_name: _t("Variable for signal type"),
                type: "calculated",
                description: _t('Only the sine is centered around 0.<br /><hr>')
            },
            {
                name: "offsetvariable",
                display_name: _t("Variable for offset"),
                type: "calculated",
            },
            {
                name: "unit",
                display_name: _t("Unit"),
                type: "text",
            },
            {
                name: "offsetformula",
                display_name: _t("Formula for offset"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "offsetinitialvalue",
                display_name: _t("Initial value for offset"),
                type: "number",
                default_value: 0
            },
            {
                name: "offsetmin",
                display_name: _t("Min for offset"),
                type: "number",
                default_value: -10
            },
            {
                name: "offsetmax",
                display_name: _t("Max for offset"),
                type: "number",
                default_value: 10
            },
            {
                name: "offsetresolution",
                display_name: _t("Number of decimals for offset"),
                type: "number",
                default_value: 2
            },
            {
                name: "offsetresetvalue",
                display_name: _t("Reset value for offset"),
                type: "number",
                default_value: 0
            },
            {
                name: "offsetresetcaption",
                display_name: _t("Caption on reset button for offset"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "amplitudevariable",
                display_name: _t("Variable for amplitude"),
                type: "calculated",
            },
            {
                name: "unit2",
                display_name: _t("Unit"),
                type: "text",
            },
            {
                name: "amplitudeformula",
                display_name: _t("Formula for amplitude"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "amplitudeinitialvalue",
                display_name: _t("Initial value for amplitude"),
                type: "number",
                default_value: 0
            },
            {
                name: "amplitudemin",
                display_name: _t("Min for amplitude"),
                type: "number",
                default_value: -10
            },
            {
                name: "amplitudemax",
                display_name: _t("Max for amplitude"),
                type: "number",
                default_value: 10
            },
            {
                name: "amplituderesolution",
                display_name: _t("Number of decimals for amplitude"),
                type: "number",
                default_value: 2
            },
            {
                name: "amplituderesetvalue",
                display_name: _t("Reset value for amplitude"),
                type: "number",
                default_value: 0
            },
            {
                name: "amplituderesetcaption",
                display_name: _t("Caption on reset button for amplitude"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "frequencyvariable",
                display_name: _t("Variable for frequency"),
                type: "calculated",
            },
            {
                name: "frequencyformula",
                display_name: _t("Formula for frequency"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "frequencyinitialvalue",
                display_name: _t("Initial value for frequency"),
                type: "number",
                default_value: 0
            },
            {
                name: "frequencymin",
                display_name: _t("Min for frequency"),
                type: "number",
                default_value: 0
            },
            {
                name: "frequencymax",
                display_name: _t("Max for frequency"),
                type: "number",
                default_value: 10
            },
            {
                name: "frequencyresolution",
                display_name: _t("Number of decimals for frequency"),
                type: "number",
                default_value: 2
            },
            {
                name: "frequencyresetvalue",
                display_name: _t("Reset value for frequency"),
                type: "number",
                default_value: 0
            },
            {
                name: "frequencyresetcaption",
                display_name: _t("Caption on reset button for frequency"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "risingtimevariable",
                display_name: _t("Variable for rising time"),
                type: "calculated",
            },
            {
                name: "risingtimeformula",
                display_name: _t("Formula for rising time"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "risingtimeinitialvalue",
                display_name: _t("Initial value for rising time"),
                type: "number",
                default_value: 1
            },
            {
                name: "risingtimemin",
                display_name: _t("Min for rising time"),
                type: "number",
                default_value: 0
            },
            {
                name: "risingtimemax",
                display_name: _t("Max for rising time"),
                type: "number",
                default_value: 5
            },
            {
                name: "risingtimeresolution",
                display_name: _t("Number of decimals for rising time"),
                type: "number",
                default_value: 1
            },
            {
                name: "risingtimeresetvalue",
                display_name: _t("Reset value for rising time"),
                type: "number",
                default_value: 1
            },
            {
                name: "risingtimeresetcaption",
                display_name: _t("Caption on reset button for rising time"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "fallingtimevariable",
                display_name: _t("Variable for falling time"),
                type: "calculated",
            },
            {
                name: "fallingtimeformula",
                display_name: _t("Formula for falling time"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "fallingtimeinitialvalue",
                display_name: _t("Initial value for falling time"),
                type: "number",
                default_value: 1
            },
            {
                name: "fallingtimemin",
                display_name: _t("Min for falling time"),
                type: "number",
                default_value: 0
            },
            {
                name: "fallingtimemax",
                display_name: _t("Max for falling time"),
                type: "number",
                default_value: 5
            },
            {
                name: "fallingtimeresolution",
                display_name: _t("Number of decimals for falling time"),
                type: "number",
                default_value: 2
            },
            {
                name: "fallingtimeresetvalue",
                display_name: _t("Reset value for falling time"),
                type: "number",
                default_value: 1
            },
            {
                name: "fallingtimeresetcaption",
                display_name: _t("Caption on reset button for falling time"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "percentagevariable",
                display_name: _t("Variable for percentage"),
                type: "calculated",
            },
            {
                name: "percentageformula",
                display_name: _t("Formula for percentage"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "percentageinitialvalue",
                display_name: _t("Initial value for percentage"),
                type: "number",
                default_value: 50
            },
            {
                name: "percentagemin",
                display_name: _t("Min for percentage"),
                type: "number",
                default_value: 0
            },
            {
                name: "percentagemax",
                display_name: _t("Max for percentage"),
                type: "number",
                default_value: 100
            },
            {
                name: "percentageresolution",
                display_name: _t("Number of decimals for percentage"),
                type: "number",
                default_value: 1
            },
            {
                name: "percentageresetvalue",
                display_name: _t("Reset value for percentage"),
                type: "number",
                default_value: 50
            },
            {
                name: "percentageresetcaption",
                display_name: _t("Caption on reset button for percentage"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('<br /><hr>')
            },
            {
                name: "widthvariable",
                display_name: _t("Variable for width"),
                type: "calculated",
                description: _t('Width of "high" value for trapezoid or delay before ramp')
            },
            {
                name: "widthformula",
                display_name: _t("Formula for width"),
                type: "text",
                description: _t('The value really sent will be computed from the slider value. <br />Use "x" as slider value')
            },
            {
                name: "widthinitialvalue",
                display_name: _t("Initial value for width"),
                type: "number",
                default_value: 1
            },
            {
                name: "widthmin",
                display_name: _t("Min for width"),
                type: "number",
                default_value: 0
            },
            {
                name: "widthmax",
                display_name: _t("Max for width"),
                type: "number",
                default_value: 5
            },
            {
                name: "widthresolution",
                display_name: _t("Number of decimals for width"),
                type: "number",
                default_value: 1
            },
            {
                name: "widthresetvalue",
                display_name: _t("Reset value for width"),
                type: "number",
                default_value: 1
            },
            {
                name: "widthresetcaption",
                display_name: _t("Caption on reset button for width"),
                type: "text",
                default_value: _t("Reset"),
                description: _t('')
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new signalgenerationWidget(settings));
        }
    });
    
}());

