(function () {

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

    var textdoubleWidget = function (settings) {

        var self = this;

        var currentSettings = settings;
		var displayElement = $('<div class="tw-display"></div>');
		var titleElement1 = $('<h2 class="section-title tw-title tw-td"></h2>');
		var titleElement2 = $('<h2 class="section-title tw-title tw-td"></h2>');
        var valueElement1 = $('<div class="tw-value"></div>');
        var valueElement2 = $('<div class="tw-value"></div>');
        var unitsElement1 = $('<div class="tw-unit"></div>');
        var unitsElement2 = $('<div class="tw-unit"></div>');

		function updateValueSizing1()
		{
			if(!_.isUndefined(currentSettings.units1) && currentSettings.units1 != "") // If we're displaying our units
			{
				valueElement1.css("max-width", (displayElement.innerWidth() - unitsElement1.outerWidth(true)) + "px");
			}
			else
			{
				valueElement1.css("max-width", "100%");
			}
		}

		function updateValueSizing2()
		{
			if(!_.isUndefined(currentSettings.units2) && currentSettings.units2 != "") // If we're displaying our units
			{
				valueElement2.css("max-width", (displayElement.innerWidth() - unitsElement2.outerWidth(true)) + "px");
			}
			else
			{
				valueElement2.css("max-width", "100%");
			}
		}

        this.render = function (element) {
			$(element).empty();

			$(displayElement)
				.append($('<div class="tw-tr"></div>').append(titleElement1).append(titleElement2))
				.append($('<div class="tw-tr"></div>')
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement1).append(unitsElement1))
					.append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement2).append(unitsElement2))
				);

			$(element).append(displayElement);

			updateValueSizing1();
			updateValueSizing2();
        };

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;

			var shouldDisplayTitle1 = (!_.isUndefined(newSettings.title1) && newSettings.title1 != "");
			var shouldDisplayTitle2 = (!_.isUndefined(newSettings.title2) && newSettings.title2 != "");
			var shouldDisplayUnits1 = (!_.isUndefined(newSettings.units1) && newSettings.units1 != "");
			var shouldDisplayUnits2 = (!_.isUndefined(newSettings.units2) && newSettings.units2 != "");

			if(shouldDisplayTitle1)
			{
				titleElement1.html((_.isUndefined(newSettings.title1) ? "" : newSettings.title1));
				titleElement1.attr("style", null);
			}
			else
			{
				titleElement1.empty();
				titleElement1.hide();
			}

			if(shouldDisplayTitle2)
			{
				titleElement2.html((_.isUndefined(newSettings.title2) ? "" : newSettings.title2));
				titleElement2.attr("style", null);
			}
			else
			{
				titleElement2.empty();
				titleElement2.hide();
			}

			if(shouldDisplayUnits1)
			{
				unitsElement1.html((_.isUndefined(newSettings.units1) ? "" : newSettings.units1));
				unitsElement1.attr("style", null);
			}
			else
			{
				unitsElement1.empty();
				unitsElement1.hide();
			}

			if(shouldDisplayUnits2)
			{
				unitsElement2.html((_.isUndefined(newSettings.units2) ? "" : newSettings.units2));
				unitsElement2.attr("style", null);
			}
			else
			{
				unitsElement2.empty();
				unitsElement2.hide();
			}

			var valueFontSize = 30;

			valueElement1.css({"font-size" : valueFontSize + "px"});
			valueElement2.css({"font-size" : valueFontSize + "px"});

			updateValueSizing1();
			updateValueSizing2();
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "value1") {
                valueElement1.text(newValue);
            }
            else if (settingName == "value2") {
                valueElement2.text(newValue);
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
        type_name: "textdouble_widget",
        display_name: _t("Double Text"),
        //"external_scripts" : [
        //],
        settings: [
            {
                name: "title1",
                display_name: _t("Title variable #1"),
                type: "text"
            },
            {
                name: "title2",
                display_name: _t("Title variable #2"),
                type: "text"
            },
            {
                name: "value1",
                display_name: _t("Value variable #1"),
                type: "calculated"
            },
            {
                name: "value2",
                display_name: _t("Value variable #2"),
                type: "calculated"
            },
            {
                name: "units1",
                display_name: _t("Units variable #1"),
                type: "text"
            },
            {
                name: "units2",
                display_name: _t("Units variable #2"),
                type: "text"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new textdoubleWidget(settings));
        }
    });

}());
