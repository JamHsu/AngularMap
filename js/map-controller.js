(function() {
	angular.module('AngularMapModule')
		.controller('MapController', MapController);

	MapController.$injector = ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth']
	function MapController($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

		var vm = this;
		$scope.map = { 
			center: 
			{ 
				latitude: 24, 
				longitude: 121 
			},
			zoom: 7
		};
		var fbref = new Firebase("https://hifirebase.firebaseio.com/");
  		// vm.authObj = $firebaseAuth(fbref);
		var fireRef = new Firebase("https://hifirebase.firebaseio.com/message");
		vm.messageAry = $firebaseArray(fireRef);
		vm.loginUser = {};
  		vm.authData = {};
  		vm.isLogin = false;


  		vm.addMessage = addMessage;
  		vm.loginFB = loginFB;

		function loginFB() {
    		fbref.authWithOAuthPopup("facebook", function(error, authData) {
    			if(error) {
    				console.log(error);
    			} else {
		      		vm.isLogin = true;
		      		console.log(authData);
		     		console.log("Logged in as:", authData.facebook.displayName);
		      		vm.loginUser.name = authData.facebook.displayName;
		      		vm.authData = authData;
	      		}
    	
   			}, 
   			{
  				remember: "sessionOnly",
  				scope: "email,user_likes"
			});
  		}

  		function addMessage(msg) {

  			if(vm.isLogin) {
	  			console.log(msg);
	  			// vm.messageAry.$add({text:msg});
	    		$scope.msg = "";

	    		vm.messageAry.$add({
				    text : msg,
				    name : vm.loginUser.name,
				    picture: vm.authData.facebook.cachedUserProfile.picture.data.url
			    });
    		} else {
    			alert("Please Login Facebook.");
    		}
  		}
	}

})();