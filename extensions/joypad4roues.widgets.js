window.joypad4rouesID = 0;
window.switchbuttonID = 0;
(function() {    
    var joypad4rouesWidget = function (settings) {
        var self = this;
        var thisjoypad4rouesID = window.joypad4rouesID++;
        var thisswitchbuttonID = window.switchbuttonID++;
        var titleElement = $('<h2 class="section-title"></h2>');
        var joypad4rouesElement = $('<div id="joypad4roues-' + thisjoypad4rouesID + '" style="margin-left: 50px;"></div>' +
        							'Rotation active ou non:<br />' +
        							'<div id="switchbutton-' + thisswitchbuttonID + '" class="onoffswitch"></div><br />' +
        							'<span id="value1_legend-' + thisjoypad4rouesID + '"></span>' +
        							'<span id="value1-' + thisjoypad4rouesID + '"></span><br />' +
        							'<span id="value2_legend-' + thisjoypad4rouesID + '"></span>' +
        							'<span id="value2-' + thisjoypad4rouesID + '"></span><br />' +
        							'<div id="switchbutton-' + thisswitchbuttonID + '" class="onoffswitch"></div>');

        var joypad4rouesObject;
        var switchbuttonObject;
        var rendered = false;

		var joypad4roues;
		var switchbutton;
        var currentSettings = settings;
        var vxref = 0;
        var vyref = 0;
        var xiref = 0;
        
 		function sendData() {
        	// Send data
			if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
				var vxref2 = vxref;
				vyref = 0;
				// console.log("vxref: ", vxref2);
				// console.log("vyref: ", 0);
				// console.log("xiref: ", xiref);
				$("#value1-" + thisjoypad4rouesID).html(vxref.toFixed(0));
				$("#value2-" + thisjoypad4rouesID).html(xiref.toFixed(0));
			}
			else {
				var vxref2 = vxref * Math.cos((xiref * Math.PI / 180)/2);
				vyref = vxref * Math.sin((xiref * Math.PI / 180)/2);
				xiref = 0;
				// console.log("vxref: ", vxref2);
				// console.log("vyref: ", vyref);
				// console.log("xiref: ", 0);
				$("#value1-" + thisjoypad4rouesID).html(vxref2.toFixed(0));
				$("#value2-" + thisjoypad4rouesID).html(vyref.toFixed(0));
			}
			toSend = {};
			toSend[currentSettings.variablevxref] = parseInt(vxref2.toFixed(0));
			//socket.emit(event, JSON.stringify(toSend));
			sessionStorage.setItem(currentSettings.variablevxref, toSend[currentSettings.variablevxref]);
			toSend = {};
			toSend[currentSettings.variablevyref] = parseInt(vyref.toFixed(0));
			//socket.emit(event, JSON.stringify(toSend));
			sessionStorage.setItem(currentSettings.variablevyref, toSend[currentSettings.variablevyref]);
			toSend = {};
			toSend[currentSettings.variablexiref] = parseInt(xiref.toFixed(0));
			//socket.emit(event, JSON.stringify(toSend));
			sessionStorage.setItem(currentSettings.variablexiref, toSend[currentSettings.variablexiref]);
		}
        
        function createjoypad4roues(mySettings) {
            if (!rendered) {
                return;
            }
            
            joypad4rouesElement.empty();
            
        	var checkedStr = '';
        	// Initialement, la rotation est activée
       		checkedStr = 'checked="checked"';

			var switchbuttonElementStr = '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + thisswitchbuttonID + '-onoff" ' + checkedStr + '><label class="onoffswitch-label" for="' + thisswitchbuttonID + '-onoff"><div class="onoffswitch-inner"><span class="on">ON</span><span class="off">OFF</span></div><div class="onoffswitch-switch"></div></label>';
            document.getElementById('switchbutton-' + thisswitchbuttonID).innerHTML = switchbuttonElementStr;
            
			$( "#" + thisswitchbuttonID + "-onoff" ).change(function() {
	            $("#value1_legend-" + thisjoypad4rouesID).html("Consigne vitesse longitudinale (cm/s): ");
				if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
		            $("#value2_legend-" + thisjoypad4rouesID).html("Consigne vitesse de rotation (deg/s): ");
		        }
		        else {
		        	$("#value2_legend-" + thisjoypad4rouesID).html("Consigne vitesse de translation (cm/s): ");
		        }
			});
            $("#value1_legend-" + thisjoypad4rouesID).html("Consigne vitesse longitudinale (cm/s): ");
			if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
	            $("#value2_legend-" + thisjoypad4rouesID).html("Consigne vitesse de rotation (deg/s): ");
	        }
	        else {
	        	$("#value2_legend-" + thisjoypad4rouesID).html("Consigne vitesse de translation (cm/s): ");
	        }
            
			$("#value1-" + thisjoypad4rouesID).html(vxref.toFixed(0));
			$("#value2-" + thisjoypad4rouesID).html(xiref.toFixed(0));
	                
            var joypad4roues = Raphael('joypad4roues-' + thisjoypad4rouesID, 170, 170);
			joypad4roues.image("./img/joypad_fond.png", 5, 5, 160, 160);
			joypad4roues.image("./img/joypad_exclusion.png", 0, 0, 170, 170);
			var joypad4roues_manette = joypad4roues.image("./img/joypad_centre.png", 0, 0, 170, 170);
			
			// Send data at the creation
			sendData();
			
			cart2pol = function(x,y) {
				var r, theta;
				r = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
				theta = -Math.atan2(y,x);
				return {r: r, theta: theta};
			};
      
			pol2cart = function (r,theta) {
				var x, y;
				x = r*Math.cos(-theta);
				y = r*Math.sin(-theta);
				return {x: x, y: y};
			};

			dragger = function () {
				this.ox = this.attr("x");
				this.oy = this.attr("y");
			};
      
			move = function (dx, dy) {
				var att, pol, r, theta, cart;
				pol = cart2pol(this.ox + dx,this.oy + dy);
				if (pol.r < 65) {
					att = {x: this.ox + dx, y: this.oy + dy};
					this.attr(att);
				}
				else {
					cart = pol2cart(65, pol.theta);
					att = {x: cart.x, y:  cart.y};
					this.attr(att);
				}
				 	
				vxref_calc = pol.r;
				vxref_calc = Math.min(vxref_calc,70);
				vxref_calc = Math.max(vxref_calc-30,0);
				vxref_calc = vxref_calc*0.5/40;
				xiref_calc = (pol.theta*180/Math.PI);
				// Only in rotation mode
				if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
					if (xiref_calc<0) {
						xiref_calc = 90;
						vxref_calc = -vxref_calc;
					}
				}
				
				vxref = 100*(vxref_calc.toFixed(2));				
				xiref = -(180. - 2. * xiref_calc);
				sendData();
				
			};
			 
			up = function () {
				att = {x: 0, y: 0};
				this.animate(att,1000,"backOut");
				vxref = 0;
				xiref = 0;
				$("#value1-" + thisjoypad4rouesID).html(vxref.toFixed(0));
				$("#value2-" + thisjoypad4rouesID).html(xiref.toFixed(0));
				sendData();
				
			};

			joypad4roues_manette.drag(move, dragger, up);
	        
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(joypad4rouesElement);
            createjoypad4roues(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
            return 5;
        };

        this.onSettingsChanged(settings);        
    };

    freeboard.loadWidgetPlugin({
        type_name: "joypad4roues",
        display_name: "Joypad 4 roues",
		"external_scripts": [
			"extensions/thirdparty/raphael.2.1.0.min.js"
			//"extensions/thirdparty/socket.io-1.3.5.js"
		],
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
			// {
				// name: "datasourcename",
				// display_name: _t("Datasource"),
                // type: "text",
				// description: _t("You *must* create first a datasource with the same name")
			// },
            {
                name: "variablevxref",
                display_name: _t("Variable vxref"),
                type: "calculated",
				description: _t("Variable correspondant à la consigne de vitesse longitudinale")
            },
            {
                name: "variablevyref",
                display_name: _t("Variable vyref"),
                type: "calculated",
				description: _t("Variable correspondant à la consigne de vitesse latérale")
            },
             {
                name: "variablexiref",
                display_name: _t("Variable xiref"),
                type: "calculated",
				description: _t("Variable correspondant à la consigne de vitesse de rotation")
            }
       ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new joypad4rouesWidget(settings));
        }
    });
    
}());

