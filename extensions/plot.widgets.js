window.plotID = 0;
(function() {    
    var plotWidget = function (settings) {
        var self = this;
        if (window.plotID == 0) {
        	pausePlot = Array();
        	explorePlot = Array();
        }
        var thisplotID = "plot-" + window.plotID++;
        numberOfPlotWindows++;
	    var pause = false;
	    var resume = false;
	    var yvalueLength = 0;
	    var y2valueLength = 0;
        
		pausePlot.push( function() {
			if (!pause) {
				pause = true;
				$("#pauseresume-" + thisplotID).removeClass("icon-pause");
				$("#pauseresume-" + thisplotID).addClass("icon-play");
				$("#labelpauseresume-" + thisplotID).html(_t("Play"));
				$("#explore-" + thisplotID).removeClass("icon-search");
				$("#labelexplore-" + thisplotID).html("");
			}
			else {
				pause = false;
				resume = true;
				$("#pauseresume-" + thisplotID).removeClass("icon-play");
				$("#pauseresume-" + thisplotID).addClass("icon-pause");
				$("#labelpauseresume-" + thisplotID).html(_t("Pause"));
				$("#explore-" + thisplotID).addClass("icon-search");
				$("#labelexplore-" + thisplotID).html(_t("Pause and Explore"));
			}
		});
		
		explorePlot.push( function() {
			if (!pause) {
				window.titleToShare = titleElement.html();
				window.dataToShare = plotdata;
				var child_window = window.open("flotpopup.html");
				pause = true;
				$("#pauseresume-" + thisplotID).removeClass("icon-pause");
				$("#pauseresume-" + thisplotID).addClass("icon-play");
				$("#labelpauseresume-" + thisplotID).html(_t("Play"));
				$("#explore-" + thisplotID).removeClass("icon-search");
				$("#labelexplore-" + thisplotID).html("");
			}
		});
		
        var titleElement = $('<h2 class="section-title"></h2>');
        var plotElement = $('<div id="' + thisplotID + '" style="width: 100%; height:350px"></div>');
        var legendXElement = $('<div id="legendX-' + thisplotID + '" style="width: 100%; text-align:center; height:15px"></div>');
        var pauseElement = $('<div id="pause-' + thisplotID + '"><ul style="margin-top:-5px" class="board-toolbar horizontal"><li><i id="pauseresume-' + thisplotID + '" class="icon-pause icon-white"></i>&nbsp;<label id="labelpauseresume-' + thisplotID + '" data-bind="click: pausePlot[' + (window.plotID - 1) +']" style="color: #B88F51; margin-top:1px">' + _t("Pause") + '</label></li><li><i id="explore-' + thisplotID + '" class="icon-search icon-white"></i>&nbsp;<label id="labelexplore-' + thisplotID + '" data-bind="click: explorePlot[' + (window.plotID - 1) +']" style="color: #B88F51; margin-top:1px">' + _t("Pause and Explore") + '</label></li></ul></div>');
		//var legendElement = $('<div id="chartLegend"></div>');

        var plotObject;
        var opts;
        var options;
        var rendered = false;
        var plotCreated = false;
	    var plotdata = [];
	    var newValue;
	    
	    var initialDate = new Date();
	    var xData, yData;
	    var yDataArray = [];
	    var yDataArray2 = [];
	    var ymin, ymax;
	    var y2min, y2max;
	    var last_ymin, last_ymax, center;
	    var mean_y = 0;
	    var last_y2min, last_y2max, center2;
	    var mean_y2 = 0;
	    var lastDate = initialDate;
	    var last_xData = initialDate;
	    var lastPlot = -1000000;
	    var nbPoints = 0;
	    var xData_min = 0;
	    var timeoutPlot;
	    var columnsExtracted = false;
	    var isCSV = false;
	    var columns_to_extract;

        var currentSettings = settings;
	    var legendX;
	    var legendArray = (_.isUndefined(currentSettings.legendStr) || !currentSettings.include_legend ? [] : (currentSettings.legendStr).split(","));
	    var offset_y = (_.isUndefined(currentSettings.offset_y) ? "0" : currentSettings.offset_y);
	    var offset_y2 = (_.isUndefined(currentSettings.offset_y2) ? "0" : currentSettings.offset_y2);
        
        function setYaxisRange(mySettings) {
            if ((_.isUndefined(mySettings.y_axis_min_range)) || ((mySettings.y_axis_min_range).indexOf(",") === -1)) {
            	y_axis_min_range_array = [-10,10];
            }
            else {
            	y_axis_min_range_array = ((mySettings.y_axis_min_range).split(",")).map(parseFloat);
           	}
        	ymin = Math.min.apply(null, y_axis_min_range_array);
        	ymax = Math.max.apply(null, y_axis_min_range_array);
	    	offset_y = (_.isUndefined(mySettings.offset_y) ? "0" : mySettings.offset_y);
	    	center = (ymin + ymax)/2;
	    	if (offset_y == "mean_value") {
	    		mean_y = center;
	    	}
	    	else {
	    		mean_y = 0;
	    	}
        	last_ymin = ymin;
        	last_ymax = ymax;
        }

        function setY2axisRange(mySettings) {
            if ((_.isUndefined(mySettings.y2_axis_min_range)) || ((mySettings.y2_axis_min_range).indexOf(",") === -1)) {
            	y2_axis_min_range_array = [-10,10];
            }
            else {
            	y2_axis_min_range_array = ((mySettings.y2_axis_min_range).split(",")).map(parseFloat);
           	}
        	y2min = Math.min.apply(null, y2_axis_min_range_array);
        	y2max = Math.max.apply(null, y2_axis_min_range_array);
	    	offset_y2 = (_.isUndefined(mySettings.offset_y2) ? "0" : mySettings.offset_y2);
        	center2 = (y2min + y2max)/2;
	    	if (offset_y2 == "mean_value") {
	    		mean_y2 = center2;
	    	}
	    	else {
	    		mean_y2 = 0;
	    	}
        	last_y2min = y2min;
        	last_y2max = y2max;
        }

        function createPlot(mySettings) {
            if (!rendered) {
                return;
            }
            
            legendX = (_.isUndefined(mySettings.legendX) ? "" : mySettings.legendX);
            var legendXById = document.getElementById('legendX-' + thisplotID);
            if (legendX == "") {
            	legendXElement.empty();
            }
            else {
            	legendXById.innerHTML = legendX;
            }

            plotElement.empty();

	        //plotdata = [{ label: "", yaxis:1, data: [[0,0],[0.2,0.1], [0.4,0.3]] },{ label: "", yaxis:2, data: [[0,0],[0.2,0.2], [0.4,0.1]] }];
	        //plotdata = [{ yaxis:1, data: [] },{ yaxis:2, data: [] }];
	        
        	options = {
	            series: {
	                lines: {
	                    show: true
	                },
	                points: {
	                    show: false
	                }
	            },
	            grid: {
	                hoverable: true,
	                clickable: true
	            },
	            xaxis: { 
	                min: 0,
	                max: (_.isUndefined(mySettings.time_window) ? 10 : mySettings.time_window),
	                show: true
	            },
	            yaxes: [{ 
			                min: ymin,
			                max: ymax,
			                position: "left"
	            		},
	            		{ 
			                min: y2min,
			                max: y2max,
			                position: "right"
	            		}
	            ],
	            legend: {
	                position: "se",
	                backgroundColor: "#fff",
	                //container: $("#chartLegend"),
	                //noColumns: legendArray.length
	            },
				selection: {
					mode: "xy"
				}
	        };
	        
	        yvalueLength = (_.isUndefined(mySettings.value) ? 0 : mySettings.value.length);
	        y2valueLength = (_.isUndefined(mySettings.y2value) ? 0 : mySettings.y2value.length);
	        
	        plotObject = $.plot("#" + thisplotID, plotdata, options);
            
	        plotObject.resize(function () {
			});
	        
			$("#" + thisplotID).bind("plotselected", function (event, ranges) {
	
				// clamp the zooming to prevent eternal zoom
	
				if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
					ranges.xaxis.to = ranges.xaxis.from + 0.00001;
				}
	
				if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
					ranges.yaxis.to = ranges.yaxis.from + 0.00001;
				}
				if (y2valueLength > 0) {
					if (ranges.y2axis.to - ranges.y2axis.from < 0.00001) {
						ranges.y2axis.to = ranges.y2axis.from + 0.00001;
					}
				}
	
				// do the zooming
	
				if (y2valueLength > 0) {
					plotObject = $.plot("#" + thisplotID, plotdata,
						$.extend(true, {}, options, {
							xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
							yaxes: [
									{ min: ranges.yaxis.from, max: ranges.yaxis.to },
									{ min: ranges.y2axis.from, max: ranges.y2axis.to }
									]
						})
					);
				}
				else {
					plotObject = $.plot("#" + thisplotID, plotdata,
						$.extend(true, {}, options, {
							xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
							yaxes: [
									{ min: ranges.yaxis.from, max: ranges.yaxis.to }
									]
						})
					);
				}
	
			});

	        $("<div id='tooltip'></div>").css({
	            position: "absolute",
	            display: "none",
	            border: "1px solid #fdd",
	            padding: "2px",
	            "background-color": "#fee",
	            opacity: 0.80
	        }).appendTo("body");
	
	        $("#" + thisplotID).bind("plothover", function (event, pos, item) {
	            if (item) {
	                var x = item.datapoint[0].toFixed(3),
	                    y = item.datapoint[1].toFixed(2);
	                
	                $("#tooltip").html("x = " + x + "<br>" + item.series.label + " = " + y)
	                    .css({top: item.pageY+5, left: item.pageX+5})
	                    .fadeIn(200);
	            } else {
	                $("#tooltip").hide();
	            }
	        });
	
	        $("#" + thisplotID).bind("plotclick", function (event, pos, item) {
	            if (item) {
	                plotObject.highlight(item.series, item.datapoint);
	            }
	        });
	        
			$("#" + thisplotID).bind('dblclick', function (event) {
				// Unzoom
				if (y2valueLength > 0) {
					plotObject = $.plot("#" + thisplotID, plotdata,
						$.extend(true, {}, options, {
							xaxis: { min: opts.xaxes[0].min, max: opts.xaxes[0].max },
							//yaxis: { min: opts.yaxes[0].min, max: opts.yaxes[0].max }
							yaxes: [
									{ min: opts.yaxes[0].min, max: opts.yaxes[0].max },
									{ min: opts.yaxes[1].min, max: opts.yaxes[1].max }
									]
						})
					);
				}
				else {
					plotObject = $.plot("#" + thisplotID, plotdata,
						$.extend(true, {}, options, {
							xaxis: { min: opts.xaxes[0].min, max: opts.xaxes[0].max },
							//yaxis: { min: opts.yaxes[0].min, max: opts.yaxes[0].max }
							yaxes: [
									{ min: opts.yaxes[0].min, max: opts.yaxes[0].max }
									]
						})
					);
				}
			});
			
			plotCreated = true;
        }

        this.render = function (element) {
            rendered = true;
            $(element).append(titleElement).append(plotElement).append(legendXElement).append(pauseElement);
            // if (currentSettings.pausable) {
            	// $(element).append(titleElement).append(plotElement).append(pauseElement);
           	// }
           	// else {
           		// $(element).append(titleElement).append(plotElement);
           	// }
           	if (!currentSettings.pausable) {
           		$("#pause-" + thisplotID).hide();
           	}
            setYaxisRange(currentSettings);
            setY2axisRange(currentSettings);
            createPlot(currentSettings);
        };

        this.onSettingsChanged = function (newSettings) {
            if (newSettings.time_window != currentSettings.time_window 
            	|| newSettings.xaxis != currentSettings.xaxis
            	|| newSettings.legendX != currentSettings.legendX
            	|| newSettings.x_stop != currentSettings.x_stop
            	|| newSettings.time != currentSettings.time
            	|| newSettings.value != currentSettings.value
            	|| newSettings.y2value != currentSettings.y2value
            	|| newSettings.height != currentSettings.height
            	|| newSettings.y_axis_min_range != currentSettings.y_axis_min_range
            	|| newSettings.offset_y != currentSettings.offset_y
            	|| newSettings.y2_axis_min_range != currentSettings.y2_axis_min_range
            	|| newSettings.offset_y2 != currentSettings.offset_y2
            	|| newSettings.pausable != currentSettings.pausable) {
            	plotCreated = false;
            	plotdata = [];
	           	if (newSettings.pausable) {
	           		$("#pause-" + thisplotID).show();
	           	}
	           	else {
	           		$("#pause-" + thisplotID).hide();
	           	}
                setYaxisRange(newSettings);
                setY2axisRange(newSettings);
                createPlot(newSettings);
            }
            if (newSettings.legendStr != currentSettings.legendStr
            		|| newSettings.include_legend != currentSettings.include_legend) {
            	plotCreated = false;
                legendArray = (_.isUndefined(newSettings.legendStr) || !newSettings.include_legend ? [] : (newSettings.legendStr).split(","));
                //rendered = false;
                plotdata = [];
                yDataArray = [];
                mean_y = 0;
                yDataArray2 = [];
                mean_y2 = 0;
                createPlot(newSettings);
            }
            
			currentSettings = newSettings;

            titleElement.html(newSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValueArg) {
            if (!_.isUndefined(plotObject) && plotCreated) {
	        	if (!columnsExtracted) {
	        		columns_to_extract = [];
		 			for (var i=0; i<(currentSettings.value).length; i++) {
						elems = currentSettings.value[i].split('"');
						if (freeboard.getDatasourceType(elems[1]) == "csv") {
							isCSV = true;
							array_variables_to_read = freeboard.getDatasourceSettings(elems[1]).variables_to_read.split(",");
							columns_to_extract.push(array_variables_to_read.indexOf(elems[3]));
						}
						columnsExtracted = true;
					}
	        	}
            	if ((isCSV) && (sessionStorage.getItem("_readCSVOK")) == 1) {
            		plotdata = [];
            		var columns = [];
            		var arrayDataToPlot = [];
					const arrayColumn = (arr, n) => arr.map(x => x[n]);
					Array.prototype.combine = function(arr) {
					    return this.map(function(v,i) {
					        return [v, arr[i]];
					    });
					};
            		timeColumn = arrayColumn(staticData, 0);
            		for (var i = 0; i < columns_to_extract.length; i++) {
		        		//plotdata = [{ label: "", yaxis:1, data: [[0,0],[0.2,0.1], [0.4,0.3]] },{ label: "", yaxis:2, data: [[0,0],[0.2,0.2], [0.4,0.1]] }];
			        	//plotdata.data = [[0,0],[0.2,0.1], [0.4,0.3]];
			        	//console.log("plotdata.data before: ", plotdata.data);
						columns.push(arrayColumn(staticData, columns_to_extract[i]));
						arrayDataToPlot.push(timeColumn.combine(columns[i]));
						plotdata.push({ label: legendArray[i], yaxis:1, data: arrayDataToPlot[i] });
            		}
		        	
		        	dataToplot = [plotdata];
		        	plotObject.setData(plotdata);
		        	
		        	opts = plotObject.getOptions();
		        	opts.xaxes[0].min = plotObject.getAxes().xaxis.datamin;
		        	opts.xaxes[0].max = plotObject.getAxes().xaxis.datamax;
		        	opts.yaxes[0].min = plotObject.getAxes().yaxis.datamin;
		        	opts.yaxes[0].max = plotObject.getAxes().yaxis.datamax;
		        	
		        	staticData = [];
		        	plotObject.setupGrid();
		        	plotObject.draw();
		        	sessionStorage.setItem("_readCSVOK", 0);
		       	}
	        	else if (!isCSV) {
	            	if (settingName == "time") {
	            		xData = Number(newValueArg);
	            		newValue = [];
	            	}
		        	else {
		        		// If we receive the left axis value and if there are values to come for the right axis
		        		// we wait for these values
		        		if ((settingName == "value") && (y2valueLength > 0)) {
		        			newValue = newValueArg;
		        		}
		        		else {
		        			// if there is a right axis, we add the new values from this axis
		        			if (y2valueLength > 0) {
		        				newValue = newValue.concat(newValueArg);
		        			}
		        			else {
		        				newValue = newValueArg;
		        			}
		        			
				        	// If multiple values, extends plotdata
				        	for (var i=plotdata.length; i<newValue.length; i++) {
								if (i < yvalueLength) {
				        			plotdata.push({ label: legendArray[i], yaxis:1, data: [] });
				        		}
				        		else {
				        			plotdata.push({ label: legendArray[i] + _t(" (right axis)"), yaxis:2, data: [] });
				        		}
				        	}
				        	
				        	for (var i=0; i<newValue.length; i++) {
				        		
				        		if (!_.isUndefined(newValue[i])) {
				                	yData = Number(newValue[i]);
				                	if (i < yvalueLength) {
				                		yDataArray.push(yData);
				                		mean_y += yData;
				                	}
				                	else {
				                		yDataArray2.push(yData);
				                		mean_y2 += yData;
				                	}
					                if (currentSettings.xaxis == "seconds_from_start") {
					                	xData = (new Date() - initialDate)/1000;
					                }
					                
					                // First point of a new serie
						            if ((!_.isUndefined(xData)) && (!_.isUndefined(yData))) {
						            	if ((xData < last_xData) && (xData != -100)) { // xData == -100: corrupted value
						            		if (i===0) {
						            			plotdata = [{ label: legendArray[i], yaxis:1, data: [] }];
						           			}
						           			else {
						           				if (i < yvalueLength) {
						           					plotdata.push({ label: legendArray[i], yaxis:1, data: [] });
								        		}
								        		else {
								        			plotdata.push({ label: legendArray[i] + _t(" (right axis)"), yaxis:2, data: [] });
								        		}
						           			}
						            		yDataArray = [];
						            		mean_y = 0;
						            		yDataArray2 = [];
						            		mean_y2 = 0;
						            		lastPlot = -1000000;
						            		nbPoints = 0;
						            	}
						            	// If time is not corrupted
						            	if (xData != -100) {
							            	last_xData = xData;
							            	lastDate = ((new Date()).getTime()) / 1000;
							            	if ((_.isUndefined(currentSettings.x_stop)) || ((currentSettings.x_stop).indexOf("inf") >= 0)) {
								            	(plotdata[i].data).push([xData, yData]);
								           	}
								           	else {
								           		if ((xData >= Number(currentSettings.x_stop) - Number(currentSettings.time_window)) && (xData <= Number(currentSettings.x_stop))) {
								           			(plotdata[i].data).push([xData, yData]);
								           		}
								           	}
								           	nbPoints++;
								            
								            // Remove old data out of time window
								            if (!pause) {
								            	if ((_.isUndefined(currentSettings.x_stop)) || ((currentSettings.x_stop).indexOf("inf") >= 0)) {
										            while (((xData - ((plotdata[i].data)[0])[0]) > Number(currentSettings.time_window)) || (nbPoints > 500)) {
										            	nbPoints--;
										            	(plotdata[i].data).shift();
								           				if (i < yvalueLength) {
										            		shifted = yDataArray.shift();
										            		mean_y -= shifted;
										            	}
										            	else {
										            		shifted = yDataArray2.shift();
										            		mean_y2 -= shifted;
										            	}
											        }
											    }
									        }
								            last_ymin = Math.min.apply(null, yDataArray);
								            last_ymax = Math.max.apply(null, yDataArray);
								            last_y2min = Math.min.apply(null, yDataArray2);
								            last_y2max = Math.max.apply(null, yDataArray2);
								            
							                plotObject.setData(plotdata);
							                
						                	opts = plotObject.getOptions();
							                var nbData = (plotdata[i].data).length;
							                if (offset_y == "mean_value") {
							                	center = mean_y / (nbData * yvalueLength);
							                }
							                if (offset_y2 == "mean_value") {
							                	center2 = mean_y2 / (nbData * y2valueLength);
							                }
							                
							                if ((_.isUndefined(currentSettings.x_stop)) || ((currentSettings.x_stop).indexOf("inf") >= 0)) {
								                opts.xaxes[0].max = ((plotdata[i].data)[nbData-1])[0];
								            	if (nbPoints == 500) {
								            		xData_min = ((plotdata[i].data)[0])[0];
								            	}
								            	else {
								            		xData_min = Math.max(0, opts.xaxes[0].max - Number(currentSettings.time_window));
								            	}
								                opts.xaxes[0].min = xData_min;
								            }
								            else {
								            	opts.xaxes[0].min = Number(currentSettings.x_stop) - Number(currentSettings.time_window);
								            	opts.xaxes[0].max = Number(currentSettings.x_stop);
								            }
							                
							                if (offset_y == "mean_value") {
								                opts.yaxes[0].min = Math.min(center + ymin, last_ymin + ymin);
								                opts.yaxes[0].max = Math.max(center + ymax, last_ymax + ymax);
							                }
							                else {
								                if (last_ymin < opts.yaxes[0].min) {
								                	opts.yaxes[0].min = center - 1.5 * (center - last_ymin);
								                }
								                else if (last_ymin > (opts.yaxes[0].min / 2)) {
								                	opts.yaxes[0].min = Math.min(last_ymin, ymin);
								                }
								                
								                if (last_ymax > opts.yaxes[0].max) {
								                	opts.yaxes[0].max = center + 1.5 * (last_ymax - center);
								                }
								                else if (last_ymax < (opts.yaxes[0].max / 2)) {
								                	opts.yaxes[0].max = Math.max(last_ymax, ymax);
								                }
							                }
							                
							                if (offset_y2 == "mean_value") {
								                opts.yaxes[1].min = Math.min(center2 + y2min, last_y2min + y2min);
								                opts.yaxes[1].max = Math.max(center2 + y2max, last_y2max + y2max);
								            }
							                else {
								                if (last_y2min < opts.yaxes[1].min) {
								                	opts.yaxes[1].min = center2 - 1.5 * (center2 - last_y2min);
								                }
								                else if (last_y2min > (opts.yaxes[1].min / 2)) {
								                	opts.yaxes[1].min = Math.min(last_y2min, y2min);
								                }
								                
								                if (last_y2max > opts.yaxes[1].max) {
								                	opts.yaxes[1].max = center2 + 1.5 * (last_y2max - center2);
								                }
								                else if (last_y2max < (opts.yaxes[1].max / 2)) {
								                	opts.yaxes[1].max = Math.max(last_y2max, y2max);
								                }
								            }
							                
							                // Max plot frequency: 50 ms * number of plot windows
							                plotRefreshPeriod = (_.isUndefined(currentSettings.refreshperiod) ? 50/1000 : currentSettings.refreshperiod / 1000);
							                // clearTimeout(timeoutPlot);
											// timeoutPlot = setTimeout(function() {
									                // plotObject.setupGrid();
									                // plotObject.draw();
												// },
												// 1000
											// );		
							                if ((lastDate - lastPlot) > (plotRefreshPeriod * numberOfPlotWindows - 0.01)) {
							                	if (!pause) {
									                plotObject.setupGrid();
									                plotObject.draw();
									            }
								                lastPlot = lastDate;
								            }
								        }
						            }
						        }
						    }
						}
					}
				}
            }
        };

        this.onDispose = function () {
        };

        this.getHeight = function () {
        	H = Number(currentSettings.height);
        	plotElement.height(H * 60 - 42);
            return H;
        };

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "plot",
        display_name: _t("Plot"),
        "external_scripts" : [
            "extensions/thirdparty/flot/jquery.flot.js",
            "extensions/thirdparty/flot/jquery.flot.time.js",
            "extensions/thirdparty/flot/jquery.flot.resize.js",
            "extensions/thirdparty/flot/jquery.flot.selection.js",
            "extensions/thirdparty/flot/jquery.flot.crosshair.js",
            "extensions/thirdparty/flot/jquery.flot.axislabels.js",
            "extensions/thirdparty/flot/jquery.flot.cursors.js"
        ],
        settings: [
            {
                name: "title",
                display_name: _t("Title"),
                type: "text"
            },
            {
                name: "xaxis",
                display_name: _t("X axis"),
                type: "option",
                options: [
                    {
                        name: _t("Seconds from start"),
                        value: "seconds_from_start"
                    },
                    {
                        name: _t("Column of datasource"),
                        value: "datasource_column"
                    }
                ],
                description: _t('When choosing "Seconds from start", the data are timestamped when they are received')
            },
            {
                name: "time",
                display_name: _t("Time (X axis)"),
                type: "calculated",
                description: _t('Fill only if you chose "Column of datasource" above.')
            },
			{
				name: "legendX",
				display_name: _t("Legend on X axis"),
				type: "text"
			},
            {
                name: "x_stop",
                display_name: _t("X stop value"),
                type: "text",
                description: _t('X value at which the plot should stop. Put "inf" for continuous plot.')
            },
            {
                name: "time_window",
                display_name: _t("Time Window"),
                type: "text",
                suffix: _t("seconds"),
                default_value: 10,
                description: _t("Maximum length of sliding time window. It will be automatically decreased so that it does not display more than 500 points.")
            },
            {
                name: "value",
                display_name: _t("Left Y axis values"),
                type: "calculated",
                multi_input: "true",
                required: "true"
            },
            {
                name: "y_axis_min_range",
                display_name: _t("Left Y axis minimum range"),
                type: "text",
                default_value: "-10,10",
                description: _t("Two values separated by a comma. This range will be automatically extended if necessary, but it will not be reduced.")
            },
            {
                name: "offset_y",
                display_name: _t("Offset"),
                type: "option",
                options: [
                    {
                        name: _t("0"),
                        value: "0"
                    },
                    {
                        name: _t("Mean value"),
                        value: "mean_value"
                    }
                ]
            },
            {
                name: "y2value",
                display_name: _t("Right Y axis values"),
                type: "calculated",
                multi_input: "true"
            },
            {
                name: "y2_axis_min_range",
                display_name: _t("Right Y axis minimum range"),
                type: "text",
                default_value: "-10,10",
                description: _t("Two values separated by a comma. This range will be automatically extended if necessary, but it will not be reduced.")
            },
            {
                name: "offset_y2",
                display_name: _t("Offset"),
                type: "option",
                options: [
                    {
                        name: _t("0"),
                        value: "0"
                    },
                    {
                        name: _t("Mean value"),
                        value: "mean_value"
                    }
                ]
            },
			{
				name: "include_legend",
				display_name: _t("Include Legend"),
				type: "boolean"
			},
			{
				name: "legendStr",
				display_name: _t("Legend"),
				type: "text",
				description: _t("Comma-separated for multiple plots, left variables first, then right variables")
			},
            {
                name: "height",
                display_name: _t("Height Blocks"),
                type: "number",
                default_value: 3,
                description: _t("A height block is around 60 pixels")
            },
            {
                name: "pausable",
                display_name: _t("Pausable"),
				type: "boolean",
                default_value: false
            },
            {
                name: "refreshperiod",
                display_name: _t("Refresh Period"),
				type: "number",
				suffix: _t("milliseconds"),
                default_value: 50,
                description: _t("Increase this value in case of rendering problems with multiple plots.")
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new plotWidget(settings));
        }
    });
    
}());

