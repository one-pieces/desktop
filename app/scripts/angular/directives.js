'use strict';

app
.directive('toggle', function() {
	return {
		restrict: 'A',
		link : function(scope, element, attrs, ctrl) {
			element.bind('click', function() {
				$(attrs.toggle).toggle(attrs.toggleSpeed);
			});
		}
	}
})
.directive('hide', function() {
	return {
		restrict: 'A',
		link : function(scope, element, attrs, ctrl) {
			element.bind('click', function() {
				$(attrs.hide).hide(attrs.hideSpeed);
			});
		}
	}
})
.directive('sortable', function() {
	return {
		restrict: 'A',
		link : function(scope, element, attrs, ctrl) {
			$(element).sortable({
				items: attrs.sortable
			});
			$(element.parent).disableSelection();
		}
	}
})
.directive('draggableIn', function() {
	return {
		restrict: 'A',
		link : function(scope, element, attrs, ctrl) {
			$(element).draggable({
				containment: attrs.draggableIn
			});
		}
	}
})
.directive('firstWindows', function() {
	return {
		restrict: 'A',
		link : function(scope, element, attrs, ctrl) {
			element.bind('click', function() {
				$('.window').css('z-index','1000');
				$(attrs.firstWindows).css('z-index','3000');
				// var id = attrs.firstWindows.slice(1);
				// $('.open-app').removeClass('selected');
				// $('.app-' + id).addClass('selected');
			});
		}
	}
})
.directive('datepicker', function() {
	return {
		restrict: 'EA',
		link: function(scope, element, attrs, ctrl) {
			$(element).datepicker();
		}
	}
});