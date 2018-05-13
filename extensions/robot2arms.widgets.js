window.robot2armsID = 0;
window.switchbuttonID = 0;
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

    var robot2armsWidget = function (settings) {
        var self = this;
        var thisrobot2armsID = window.robot2armsID++;
        var thisswitchbuttonID = window.switchbuttonID++;
		var displayElement = $('<div class="tw-display"></div>');
        var titleElement = $('<h2 class="section-title"></h2>');
        var robot2armsElement = $('<div id="robot2arms-' + thisrobot2armsID + '" style="margin-left: 0px;"></div>');
        var switchButtonTitleElement = $('<div id="switchbuttontitle-' + thisswitchbuttonID + '" class="tw-td"> Mode continu:</div>');
        var switchButtonElement = $('<div id="switchbutton-' + thisswitchbuttonID + '" class="onoffswitch tw-value"></div>');
        var cartesianTitleElement = $('<div id="cartesiantitle-' + thisswitchbuttonID + '" class="tw-td"><strong>Consignes cartésiennes (cm):</strong></div>');
        var angularTitleElement = $('<div id="angulartitle-' + thisswitchbuttonID + '" class="tw-td"><strong>Consignes articulaires (deg):</strong></div>');
        var valueElement1 = $('<div id="value1-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement2 = $('<div id="value2-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement3 = $('<div id="value3-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement4 = $('<div id="value4-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement5 = $('<div id="value5-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement6 = $('<div id="value6-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement7 = $('<div id="value7-' + thisrobot2armsID + '" class="tw-value"></div>');
        var valueElement8 = $('<div id="value8-' + thisrobot2armsID + '" class="tw-value"></div>');

        var robot2armsObject;
        var switchbuttonObject;
        var rendered = false;

		var robot2arms;
		var switchbutton;
        var currentSettings = settings;
        var thetaref1_deg;
        var thetaref2_deg;
		var xref;				
		var yref;
		// var configuration = _.isUndefined(currentSettings.configuration) ? 0 : currentSettings.configuration;
		var configuration = 0;
        
 		function sendData(update) {
 			update = update || false;
        	// Send data
			$("#value1-" + thisrobot2armsID).html("xref: " + xref.toFixed(1));
			$("#value2-" + thisrobot2armsID).html("yref: " + yref.toFixed(1));
			$("#value3-" + thisrobot2armsID).html("theta1ref: " + thetaref1_deg.toFixed(1));
			$("#value4-" + thisrobot2armsID).html("theta2ref: " + thetaref2_deg.toFixed(1));
			
			sessionStorage.setItem('xref', xref.toFixed(2));
			sessionStorage.setItem('yref', yref.toFixed(2));
			
			if (update == true) {
				toSend = {};
				toSend[currentSettings.variablethetaref1] = parseInt((thetaref1_deg * 10).toFixed(0));
				sessionStorage.setItem(currentSettings.variablethetaref1, toSend[currentSettings.variablethetaref1]);
				
				toSend = {};
				toSend[currentSettings.variablethetaref2] = parseInt((thetaref2_deg * 10).toFixed(0));
				sessionStorage.setItem(currentSettings.variablethetaref2, toSend[currentSettings.variablethetaref2]);
			}
			
			if (($( "#" + thisswitchbuttonID + "-onoff" )).prop("checked")) {
				toSend = {};
				toSend[currentSettings.variablethetaref1] = parseInt((thetaref1_deg * 10).toFixed(0));
				sessionStorage.setItem(currentSettings.variablethetaref1, toSend[currentSettings.variablethetaref1]);
				
				toSend = {};
				toSend[currentSettings.variablethetaref2] = parseInt((thetaref2_deg * 10).toFixed(0));
				sessionStorage.setItem(currentSettings.variablethetaref2, toSend[currentSettings.variablethetaref2]);

				toSend = {};
				toSend[currentSettings.variablemode] = 1;
				sessionStorage.setItem(currentSettings.variablemode, toSend[currentSettings.variablemode]);
			}
			else {
				toSend = {};
				toSend[currentSettings.variablemode] = 0;
				sessionStorage.setItem(currentSettings.variablemode, toSend[currentSettings.variablemode]);
			}
			
		}
        
        function createrobot2arms(mySettings) {
            if (!rendered) {
                return;
            }
            
			var entre_axe_bras1 = 126;
			var entre_axe_bras2 = 115;
			var px_to_cm = 21. / 126;
			var cm_to_px = 126 / 21.;
			var L1 = entre_axe_bras1 * px_to_cm;
			var L2 = entre_axe_bras2 * px_to_cm;
			
			if (configuration == 0) {
		        thetaref1_deg = 90;
		        thetaref2_deg = 0;
		        var thetaref1 = (90 - thetaref1_deg) * Math.PI / 180;
		        var thetaref2 = thetaref2_deg * Math.PI / 180;
				xref = (L1 + L2) * Math.sin(thetaref1);				
				yref = (L1 + L2) * Math.cos(thetaref1);
			}
			else if (configuration == 1) {
		        thetaref1_deg = 80;
		        thetaref2_deg = 0;
		        var thetaref1 = (90 - thetaref1_deg) * Math.PI / 180;
		        var thetaref2 = thetaref2_deg * Math.PI / 180;
				xref = (L1 + L2) * Math.sin(thetaref1);				
				yref = (L1 + L2) * Math.cos(thetaref1);
			}
			else {
		        thetaref1_deg = 100;
		        thetaref2_deg = 0;
		        var thetaref1 = (90 - thetaref1_deg) * Math.PI / 180;
		        var thetaref2 = thetaref2_deg * Math.PI / 180;
				xref = (L1 + L2) * Math.sin(thetaref1);				
				yref = (L1 + L2) * Math.cos(thetaref1);
			}

            robot2armsElement.empty();
                        
        	var checkedStr = '';
        	// Initialement, le mode continu est activé
       		checkedStr = 'checked="checked"';

			var switchbuttonElementStr = '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' + thisswitchbuttonID + '-onoff" ' + checkedStr + '><label class="onoffswitch-label" for="' + thisswitchbuttonID + '-onoff"><div class="onoffswitch-inner"><span class="on">ON</span><span class="off">OFF</span></div><div class="onoffswitch-switch"></div></label>';
            document.getElementById('switchbutton-' + thisswitchbuttonID).innerHTML = switchbuttonElementStr;
            
			$("#value1-" + thisrobot2armsID).html("xref: " + xref.toFixed(2));
			$("#value2-" + thisrobot2armsID).html("yref: " + yref.toFixed(2));
			$("#value3-" + thisrobot2armsID).html("theta1ref: " + thetaref1_deg.toFixed(2));
			$("#value4-" + thisrobot2armsID).html("theta2ref: " + thetaref2_deg.toFixed(2));
			
			$("#value5-" + thisrobot2armsID).html("x: ");
			$("#value6-" + thisrobot2armsID).html("y: ");
			$("#value7-" + thisrobot2armsID).html("theta1: ");
			$("#value8-" + thisrobot2armsID).html("theta2: ");
	        
			if (configuration == 0) {
            	var robot2arms = Raphael('robot2arms-' + thisrobot2armsID, 600, 300);
				var decalage_x = 260;
			}
			else if (configuration == 1) {
				var robot2arms = Raphael('robot2arms-' + thisrobot2armsID, 300, 300);
				var decalage_x = 15;
			}
			else {
				var robot2arms = Raphael('robot2arms-' + thisrobot2armsID, 300, 300);
				var decalage_x = 260;
            }
            
			var decalage_haut_bras1 = 130;
			var x_axe1_bras1_init = decalage_x;
			var x_axe2_bras1_init = decalage_x;
			var x_axe1_bras2_init = decalage_x;
			var x_axe2_bras2_init = decalage_x;
			var y_axe1_bras1_init = decalage_haut_bras1 + 150 - 13;
			var y_axe2_bras1_init = y_axe1_bras1_init - entre_axe_bras1;
			var y_axe1_bras2_init = y_axe2_bras1_init;
			var y_axe2_bras2_init = y_axe2_bras1_init - entre_axe_bras2;
			
			if (configuration == 0) {
				robot2arms.image("./img/workspace_Hori.png", x_axe1_bras2_init - 252 + 5, y_axe1_bras2_init - entre_axe_bras2 - 5, 504, 252);
			}
			else if (configuration == 1) {
				robot2arms.image("./img/workspace_Inf90.png", x_axe1_bras2_init - 5, y_axe1_bras2_init - entre_axe_bras2 - 5, 252, 252);
			}
			else {
				robot2arms.image("./img/workspace_Sup90.png", x_axe1_bras2_init - 252 + 5, y_axe1_bras2_init - entre_axe_bras2 - 5, 252, 252);
			}
			var robot2arms_bras1 = robot2arms.image("./img/X-Arm_MyViz_Bras1.png", x_axe1_bras1_init - 12, y_axe2_bras1_init - 13, 24, 150);
			var robot2arms_bras2 = robot2arms.image("./img/X-Arm_MyViz_Bras2.png", x_axe1_bras2_init - 12, y_axe1_bras2_init - entre_axe_bras2, 24, 126);
			
			angle_bras1 = 90 - thetaref1_deg;
			//robot2arms_bras1.rotate(angle_bras1, x_axe1_bras1_init, y_axe1_bras1_init);
			robot2arms_bras1.transform("r" + angle_bras1 + "," + x_axe1_bras1_init + "," + y_axe1_bras1_init);
			translate_x_bras2 = entre_axe_bras1 * Math.sin(angle_bras1 * Math.PI / 180);
			translate_y_bras2 = entre_axe_bras1 * (1 - Math.cos(angle_bras1 * Math.PI / 180));
			
			var x_axe1_bras2 = x_axe1_bras2_init + translate_x_bras2;
			var y_axe1_bras2 = y_axe1_bras2_init + translate_y_bras2;
			//robot2arms.circle(x_axe1_bras2, y_axe1_bras2, entre_axe_bras2);
			
			angle_bras2_bras1 = thetaref2_deg;
			// robot2arms_bras2.rotate(angle_bras1 + angle_bras2_bras1, x_axe1_bras2, y_axe1_bras2);
			// robot2arms_bras2.translate(translate_x_bras2, translate_y_bras2);
			robot2arms_bras2.transform("r" + (angle_bras1 + angle_bras2_bras1) + "," + x_axe1_bras2 + "," + y_axe1_bras2 + "t" + translate_x_bras2 + "," + translate_y_bras2);
			var x_axe2_bras2 = x_axe2_bras2_init + translate_x_bras2 + entre_axe_bras2 * Math.sin((angle_bras1 + angle_bras2_bras1) * Math.PI / 180);
			var y_axe2_bras2 = y_axe2_bras2_init + translate_y_bras2 + entre_axe_bras2 * (1 - Math.cos((angle_bras1 + angle_bras2_bras1) * Math.PI / 180));
			//robot2arms.circle(x_axe2_bras2, y_axe2_bras2, 20);
			
			var robot2arms_manette = robot2arms.image("./img/joypad_centre.png", x_axe2_bras2 - 50, y_axe2_bras2 - 50, 100, 100);
			
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
			
			update_robot = function() {
				robot2arms_bras1.transform("r" + (90 - thetaref1_deg) + "," + x_axe1_bras1_init + "," + y_axe1_bras1_init);
				translate_x_bras2 = entre_axe_bras1 * Math.sin((90 - thetaref1_deg) * Math.PI / 180);
				translate_y_bras2 = entre_axe_bras1 * (1 - Math.cos((90 - thetaref1_deg) * Math.PI / 180));
				
				x_axe1_bras2 = x_axe1_bras2_init + translate_x_bras2;
				y_axe1_bras2 = y_axe1_bras2_init + translate_y_bras2;
				robot2arms_bras2.transform("r" + (90 - thetaref1_deg - thetaref2_deg) + "," + x_axe1_bras2 + "," + y_axe1_bras2 + "t" + translate_x_bras2 + "," + translate_y_bras2);
			};

			dragger = function () {
				this.ox = this.attr("x");
				this.oy = this.attr("y");
			};
      
			move = function (dx, dy) {
				var att, pol, r, theta, cart;
				 					
				xref = (this.ox + dx + 50 - x_axe1_bras1_init) * px_to_cm;				
				yref = -(this.oy + dy + 50 - y_axe1_bras1_init) * px_to_cm;
				
				pol = cart2pol(xref, yref);
				if (pol.r >= L1 + L2) {
					cart = pol2cart(L1 + L2, pol.theta);
					xref = cart.x;
					yref = cart.y;
				}
				
				// if (Math.abs(yref) >= Math.abs(xref)) {
					// // xref^2 + yref^2 est forcément inférieur à (L1 + L2)^2
					// yref = Math.min(yref, Math.sqrt(Math.pow(L1 + L2, 2) - Math.pow(xref, 2)));
				// }
				// else {
					// // xref^2 + yref^2 est forcément inférieur à (L1 + L2)^2
					// xref = -Math.min(Math.abs(xref), Math.sqrt(Math.pow(L1 + L2, 2) - Math.pow(yref, 2)));
				// }
				
				if (configuration == 1) {
					// xref > 0
					xref = Math.max(xref, 0);
				}
				else if (configuration == 2) {
					// xref < 0
					xref = Math.min(xref, 0);
				}
				
				// yref > 0
				yref = Math.max(yref, 0);
				
	            // Calcul des consignes en coordonnées articulaires
	            to_acos = (Math.pow(xref, 2) + Math.pow(yref, 2) - Math.pow(L1, 2) - Math.pow(L2, 2)) / (2 * L1 * L2);
	            to_acos = Math.min(1, Math.max(-1, to_acos));
	            thetaref2 = Math.acos(to_acos);
	            thetaref1 = Math.atan2(yref, xref) - Math.atan2(L2 * Math.sin(thetaref2), L1 + L2 * Math.cos(thetaref2));
            
            	thetaref1_deg = thetaref1 * 180 / Math.PI;
            	thetaref2_deg = thetaref2 * 180 / Math.PI;
            	if (configuration == 0) {
	            	if ((thetaref1_deg > 10) && (thetaref1_deg < 170)) {
						att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
						this.attr(att);
						
						update_robot();
						
						sendData();
	            	}
	            	else {
	            		// On regarde d'abord ce que ça donne avec theta2ref de signe opposé
	            		thetaref2 = -thetaref2;
	            		thetaref1 = Math.atan2(yref, xref) - Math.atan2(L2 * Math.sin(thetaref2), L1 + L2 * Math.cos(thetaref2));
		            	thetaref1_deg = thetaref1 * 180 / Math.PI;
		            	thetaref2_deg = thetaref2 * 180 / Math.PI;
		            	if ((thetaref1_deg > 10) && (thetaref1_deg < 170)) {
							att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
							this.attr(att);
							
							update_robot();
							
							sendData();
		            	}
	            	}
				}
            	else if (configuration == 1) {
	            	if ((thetaref1_deg > 10) && (thetaref1_deg < 80)) {
						att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
						this.attr(att);
						
						update_robot();
						
						sendData();
	            	}
	            	else {
	            		// On regarde d'abord ce que ça donne avec theta2ref de signe opposé
	            		thetaref2 = -thetaref2;
	            		thetaref1 = Math.atan2(yref, xref) - Math.atan2(L2 * Math.sin(thetaref2), L1 + L2 * Math.cos(thetaref2));
		            	thetaref1_deg = thetaref1 * 180 / Math.PI;
		            	thetaref2_deg = thetaref2 * 180 / Math.PI;
		            	if ((thetaref1_deg > 10) && (thetaref1_deg < 80)) {
							att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
							this.attr(att);
							
							update_robot();
							
							sendData();
		            	}
	            	}
				}
            	else {
	            	if ((thetaref1_deg > 100) && (thetaref1_deg < 170)) {
						att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
						this.attr(att);
						
						update_robot();
						
						sendData();
	            	}
	            	else {
	            		// On regarde d'abord ce que ça donne avec theta2ref de signe opposé
	            		thetaref2 = -thetaref2;
	            		thetaref1 = Math.atan2(yref, xref) - Math.atan2(L2 * Math.sin(thetaref2), L1 + L2 * Math.cos(thetaref2));
		            	thetaref1_deg = thetaref1 * 180 / Math.PI;
		            	thetaref2_deg = thetaref2 * 180 / Math.PI;
		            	if ((thetaref1_deg > 100) && (thetaref1_deg < 170)) {
							att = {x: xref * cm_to_px - 50 + x_axe1_bras1_init, y: -yref * cm_to_px - 50 + y_axe1_bras1_init};
							this.attr(att);
							
							update_robot();
							
							sendData();
		            	}
	            	}
				}
			};
			 
			up = function () {
				// att = {x: 0, y: 0};
				// this.animate(att,1000,"backOut");
				// xref = 0;
				// yref = 0;
				// $("#value1-" + thisrobot2armsID).html(xref.toFixed(0));
				// $("#value2-" + thisrobot2armsID).html(yref.toFixed(0));
				// sendData();
				
				sendData(true);
			};

			robot2arms_manette.drag(move, dragger, up);
	        
        }

        this.render = function (element) {
            rendered = true;
            
			$(element).empty();
			
            $(displayElement).append(titleElement).append(robot2armsElement)
				.append($('<div class="tw-tr"></div>').append(switchButtonTitleElement).append(cartesianTitleElement).append($('<div class="tw-td"></div>')).append(angularTitleElement).append($('<div class="tw-td"></div>')))
				.append($('<div class="tw-tr"></div>')
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(switchButtonElement))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement1))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement2))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement3))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement4))
				)
				.append($('<div class="tw-tr"></div>')
					.append($('<div class="tw-value-wrapper tw-td"></div>'))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement5))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement6))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement7))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement8))
				);
            
			$(element).append(displayElement);

            createrobot2arms(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.configuration != currentSettings.configuration) {
            	createrobot2arms(newSettings);
            }
            
			currentSettings = newSettings;
            titleElement.html(currentSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
        	if (settingName == "configurationData") {
        		configurationData = Number(newValue);
        		if (configurationData != configuration) {
        			configuration = configurationData;
        			currentSettings.configuration = configuration;
        			createrobot2arms(currentSettings);
        		}
            }
            else if (settingName == "variablex") {
				$("#value5-" + thisrobot2armsID).html("x: " + (Number(newValue)).toFixed(2));
			}
            else if (settingName == "variabley") {
				$("#value6-" + thisrobot2armsID).html("y: " + (Number(newValue)).toFixed(2));
			}
            else if (settingName == "variabletheta1") {
				$("#value7-" + thisrobot2armsID).html("theta1: " + (Number(newValue)).toFixed(2));
			}
            else if (settingName == "variabletheta2") {
				$("#value8-" + thisrobot2armsID).html("theta2: " + (Number(newValue)).toFixed(2));
			}
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
            return 6.5;
        };

        this.onSettingsChanged(settings);        
    };

    freeboard.loadWidgetPlugin({
        type_name: "robot2arms",
        display_name: _t("Robot 2 arms"),
		"external_scripts": [
			"extensions/thirdparty/raphael.2.1.0.min.js"
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
				name: "configuration",
				display_name: _t("Configuration"),
                type: "option",
                description: _t(""),
                options: [
                    {
                        name: _t("Horizontal"),
                        value: 0
                    },
                    {
                        name: _t("Vertical, theta1 < 90 deg"),
                        value: 1
                    },
                    {
                        name: _t("Vertical, theta1 > 90 deg"),
                        value: 2
                    }
                ]
			},
            {
                name: "configurationData",
                display_name: _t("Configuration"),
                type: "calculated",
				description: _t("Configuration d'orientation du bras")
            },
            {
                name: "variablethetaref1",
                display_name: _t("Variable thetaref1"),
                type: "calculated",
				description: _t("Variable correspondant à l'angle de consigne de l'axe 1")
            },
            {
                name: "variablethetaref2",
                display_name: _t("Variable thetaref2"),
                type: "calculated",
				description: _t("Variable correspondant à l'angle de consigne de l'axe 2")
            },
            {
                name: "variabletheta1",
                display_name: _t("Variable theta1"),
                type: "calculated",
				description: _t("Variable correspondant à l'angle mesuré de l'axe 1")
            },
            {
                name: "variabletheta2",
                display_name: _t("Variable theta2"),
                type: "calculated",
				description: _t("Variable correspondant à l'angle mesuré de l'axe 2")
            },
            {
                name: "variablex",
                display_name: _t("Variable abscisse"),
                type: "calculated",
				description: _t("Variable correspondant à l'abscisse mesurée")
            },
            {
                name: "variabley",
                display_name: _t("Variable ordonnée"),
                type: "calculated",
				description: _t("Variable correspondant à l'ordonnée mesurée")
            },
            {
                name: "variablemode",
                display_name: _t("Variable mode"),
                type: "calculated",
				description: _t("Variable correspondant au mode (continu ou non)")
            }
       ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new robot2armsWidget(settings));
        }
    });
    
}());

