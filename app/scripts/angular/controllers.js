'use strict';

app
.controller('WelcomeCtrl', function($scope){
	$scope.username = 'Xiaolong';
})
.controller('LoginCtrl', function($scope){

})
.controller('DesktopCtrl', function($scope){
	$scope.subMenuItems = [{
		id: 'settings',
		title: 'Settings',
		page: 'settings.html',
		icon: 'fa-cogs'
		// width:
		// height:
		// resizable:
	},{
		id: 'users',
		title: 'Users',
		page: 'users.html',
		icon: 'fa-users'
	},{
		icon: 'fa-file-image-o'
	},{
		icon: 'fa-sign-out'
	}];
	$scope.navApps = [];

	$scope.openApp = function(id, title, page, icon, width, height, resizable) {
		$('.window').css('z-index', '1000');
		for (var i=0; i < $scope.navApps.length; i++) {
			$scope.navApps[i].isSelected = false;
		}
		var app = {
			id: id, 
			title: title, 
			page: page, 
			icon: icon,
			width: width, 
			height: height, 
			resizable: resizable,
			isSelected: true
		};
		var test = $scope.navApps.some(function(item) {
			return item.id == app.id;
		});
		if (test) {
			$('#'+id).effect('bounce', {times:3}, 300);
		} else {
			$scope.navApps.push(app);
			$scope.createWindows(id, title, page, icon, width, height, resizable);
		}
	};

	$scope.tocApp = function(index, value) {
		for (var i=0; i < $scope.navApps.length; i++) {
			if (i != index) {
				$scope.navApps[i].isSelected = false;
			}
		}
		$scope.navApps[index].isSelected = value || !$scope.navApps[index].isSelected;
	}

	$scope.createWindows = function(id, title, page, icon, width, height, resizable) { 
    $('#'+id).css("width", width);
		$('#'+id).css("height", height);
    
    $(".window-content-"+id).load('window/' + page);
    
    //alert(resizable);
    
    if(resizable == true){
    	$( ".window" ).resizable();
    }
    $( "#"+id ).position({
               my: "center center",
               at: "center center",
               of: ".content"
            });
	};

	$scope.closeWindows = function(index) {
		var id = $scope.navApps[index].id;
		$('#'+id).hide(300, function(){$(this).detach();});
		$('.app-'+id).hide(300, function(){$(this).detach();$scope.navApps.splice(index, 1);});
	}

	$scope.minWindows = function(id) {
		$('.app-'+id).removeClass('selected');
		
		$( "#"+id ).position({
               my: "center center",
               at: "center center",
               of: ".content"
            });
            
            $('#'+id).hide(300);
	}

	$scope.maxWindows = function (id){
		$('#'+id).css("top", "");
		$('#'+id).css("left", "");
		$('#'+id).css("width", "");
		$('#'+id).css("height", "");
		$('#'+id).toggleClass('max');
		$( "#"+id ).position({
               my: "center center",
               at: "center center",
               of: ".content"
            });
	}
});