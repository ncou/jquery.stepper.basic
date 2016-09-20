// jquery.stepper.js
// ------------------------------------------------------
// Author: NCOU
;(function (root, $, undefined) {

	var pluginName = "stepper";
	var defaults = {
		selectorProgressBar: '.stepper-progress',
		selectorInputNumber: '.stepper-number',
		classNameChanging: 'is-changing',
		decimals: 0,
		unit: '%',
		initialValue: null,
		min: 0,
		max: 100,
		stepSize: 1
	};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		return this.init();
	}

	Plugin.prototype = {

		init: function () {

			// local variable
			this.curDown = false;
			this.mouseDownX = 0;
			this.mouseDownValue = 0;

			// Cache elements
			this.$el = $(this.element);
			this.$input = this.$el.find(this.options.selectorInputNumber);
			this.$progress = this.$el.find(this.options.selectorProgressBar);

			this.min = this.$input.attr('min') || this.options.min;
			this.max = this.$input.attr('max') || this.options.max;

			this.initialValue = this.getValue() || this.options.initialValue || this.max;

			this.setValue(this.initialValue);

			// Bind events
			this.$input.on('keydown', this.onKeyPress.bind(this) );
			this.$input.on('paste input', this.onChange.bind(this) );
			this.$el.on('mousedown', this.onMouseDown.bind(this) );
			$(document).on('mouseup', this.onMouseUp.bind(this) );
			$(document).on('mousemove', this.onMouseMove.bind(this) );

			return this;
		},

		onMouseDown: function (e) {

			this.mouseDownX = e.clientX;
			this.mouseDownValue = this.getValue();

			this._changeStart();

			return this;
		},

		onMouseUp: function (e) {

			this._changeEnd();

			return this;
		},

		onMouseMove: function (e) {

			if (this.curDown === true) {
				var t = e.clientX - this.mouseDownX;
				this.setValue(this.mouseDownValue + t * this.options.stepSize);
			}

			return this;
		},

		onChange: function (e) {
		    this._updateProgress(this.getValue());

			return this;
		},

		onKeyPress: function (e) {
			// key press == 'Enter' we exit the input field
			if (e.keyCode === 13) {
			  this.setValue(this.getValue());
              this.$input.blur();
            }
		},

		getValue: function () {
			return parseFloat(this.$input.val()) || 0;
		},

		setValue: function (amount) {
			var value;

		    value = Math.max(Math.min(amount, this.max), this.min);
		    value = this._roundValue(value);

		    var n = value;
		    n = n.toFixed(this.options.decimals);

		    n += this.options.unit;
		    this.$input.val(n);

		    this._updateProgress(value);

		    return this;
		},

		_updateProgress: function (v) {
			var r = this._valueToPercent(v) / 100;
		    this.$progress.css("transform", "scaleX(" + r + ")");

		    this.$input.trigger("change");
		},

		_percentToValue: function (v) {
		    return this.min + v / 100 * (this.max - this.min);
		},

		_valueToPercent: function (v) {
			var t = (v - this.min) / (this.max - this.min) * 100;
			return Math.max(Math.min(t, 100), 0);
		},

		_roundValue: function (v) {
			var nbrDecimals = 2;

			var t = Math.pow(10, nbrDecimals);
			return Math.round(v * t) / t
		},

		_changeStart: function() {
			this.curDown = true;
			this.$el.addClass(this.options.classNameChanging);
		},

		_changeEnd: function() {
			this.curDown = false;
			this.$el.removeClass(this.options.classNameChanging);
		},
		
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( ! $.data(this, "plugin-" + pluginName)) {
				$.data(this, "plugin-" + pluginName,
					new Plugin( this, options ));
				}
		});
	};

})(window, jQuery);
