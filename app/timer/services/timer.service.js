"use strict";

angular.module("timer")

	.factory("timerService", function ( $window, $timeout ) {

		var time;

		var me = {};

		var leadingZero = function (num) {
			return (num < 10) ? "0" + num : + num;
		};

		var updateTimer = function() {
			var seconds = time,
				minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60;
			var	hours = Math.floor(seconds / 3600);
			seconds -= hours * 3600;
			me.timeStr = leadingZero(hours) + " : " + leadingZero(minutes) + " : " + leadingZero(seconds);
		};

		var tick = function () {

			if (time <= 0) {
				$window.alert("time is up");
				return;
			}
			time -= 1;
			updateTimer();
			$timeout(tick, 1000);

		};

		return {

			startTimer: function (duration) {

				time = duration * 60;
				time -= 1;

				updateTimer();

				$timeout(tick, 1000);

			},

			timeStr: function () {
				return me.timeStr;
			}

		};

	});