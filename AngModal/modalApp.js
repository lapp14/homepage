(function() {

angular.module('app', [])
	.directive('modal', modalDirective)
	.factory('actions', actionFactory)
	.controller('appCtrl', appCtrl);

	modalDirective.$inject = ['actions'];

	function modalDirective(actions) {
		
		return {
			templateUrl: 'modalContent.html',
			restrict: 'E',
			replace: true,
			scope: {},
			controller: modalCtrl
		};

		function modalCtrl($scope) {
			$scope.show = show;
			$scope.valueChange = valueChange;
			$scope.stop = actions.stop;

			$scope.showModal = false;
			$scope.model = {
				bmp: 120
			}

			$scope.button = {
				text: 'Start',
				click: btnClick
			};		

			function show() {
				$scope.showModal = !$scope.showModal;
			};

			function valueChange() {
				actions.setInterval($scope.model.bmp);
			}			

			function btnClick() {
				if(actions.isActive()) {
					$scope.button.text = 'Start';
					actions.stop();
				} else {
					$scope.button.text = 'Stop';
					actions.start();
				}
			};			
		}
	}

	function appCtrl($scope) {
 	
	};

	function actionFactory() {

		var active = false;
		var interval = 1000;
		var expected = 0;
		
		return {
			isActive,
			setInterval,
			start,
			stop
		}		

		function isActive() {
			return active;
		}

		function setInterval(bmp) {
			interval = 1000 / (bmp / 60);
			console.log('time ' + 1000 / (bmp / 60))
		}

		function stop() {
			active = false;
		}

		function start() {
			active = true;
			expected = Date.now() + interval;
			setTimeout(tick, interval);

			console.log('start is ending');
		}

		function tick() {
			var dt = Date.now() - expected;

			if(dt > interval) {
				console.log('dt > interval: ' + (dt - interval));
			}

			console.log('yeh');

			expected += interval;

			if(active) {
				setTimeout(tick, Math.max(0, interval - dt));
			}
		}
	}
})();