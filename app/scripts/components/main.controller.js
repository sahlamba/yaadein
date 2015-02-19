'use strict';

var app = angular.module('yaadeinApp');
var originURL = 'http://172.25.55.156:60007';

app.controller('YaadeinController', ['$scope', '$http', '$upload', 'dataTicker', function ($scope, $http, $upload, dataTicker) {

	$scope.appname = 'Yaadein';

	$scope.navigationItems = [
		{
			'id': 'default',
			'class': 'icon icon-three-bars'
		},
		{
			'id': 'search',
			'class': 'icon icon-search-1'
		},
		{
			'id': 'post',
			'class': 'icon icon-compose'
		},
		{
			'id': 'notifications',
			'class': 'icon icon-store'
		},
		{
			'id': 'signOut',
			'class': 'icon icon-power'
		}
	];

	$scope.currentNavItem = $scope.navigationItems[0];

	$scope.setCurrentNavItem = function (navItem) {
		$scope.currentNavItem = navItem;
	};

	$scope.isCurrentNavItem = function (navItem) {
		return $scope.currentNavItem !== null && $scope.currentNavItem.id === navItem.id;
	};

	$scope.getCurrentNavItem = function () {
		return $scope.currentNavItem.id;
	};

	$scope.closePost = function () {
		$('#postBox').fadeOut(300);
		$scope.currentNavItem = $scope.navigationItems[0];
	};

	$scope.moreOptions = [
		{
			'id': 'home',
			'name': 'Home',
			'navItem': 'default',
			'iconClass': 'icon icon-torsos-all',
			'url': '/'
		},
		{
			'id': 'profile',
			'name': 'Profile',
			'navItem': 'default',
			'iconClass': 'icon icon-torso',
			'url': '/profile/'
		},
		{
			'id': 'gallery',
			'name': 'Gallery',
			'navItem': 'default',
			'iconClass': 'icon icon-device-camera',
			'url': '/gallery/'
		},
		{
			'id': 'settings',
			'name': 'Settings',
			'navItem': 'default',
			'iconClass': 'icon icon-settings-1',
			'url': '/settings/'
		},
	];

	$scope.user = {
		'name': 'Sahil Lamba',
		'enrolmentNo': 13114068,
		'label': 'B.Tech. ME II Year',
		'profilePic': 'images/users/1.jpg',
		'coverPic': 'images/cover.png'
	};

	//Append enrolment number to profile and gallery URLs
	$scope.moreOptions[1].url += $scope.user.enrolmentNo.toString();
	$scope.moreOptions[2].url += $scope.user.enrolmentNo.toString();

	$scope.ticks = [];
	var tickPromise = dataTicker.getTicks();
	tickPromise.then(function (d) {
		$scope.ticks = d;
	});

	$scope.isLoading = false;

	$scope.addToTicker = function () {
		$scope.isLoading = true;
		$http.get('http://beta.json-generator.com/api/json/get/HByxuXv')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.ticks.push(ds[i]);
				}
		});
		$scope.isLoading = false;
	};

	$scope.selectedObject = {};

	$scope.usersList = [];
	$http.get('data/users.json')
		.success(function (ds) {
			for(var i = 0; i < ds.length; i += 1) {
				$scope.usersList.push(ds[i]);
			}
	});

  $scope.newPost = {
    'post_owner': $scope.user.name,
    'post_owner_enrol': $scope.user.enrolmentNo.toString(),
    'post_owner_branch': $scope.user.label,
    'post_owner_pic': $scope.user.profilePic,
    'time': '',
    'image_url': [],
    'post_text': ''
  };

  $scope.$watch('files', function () {
      $scope.upload($scope.files);
  });

  $scope.upload = function (files) {
    if (files && files.length) {
      console.log($scope.newPost.post_text);
      for(var i = 0; i < files.length; i += 1) {
        var file = files[i];
        $upload.upload({
          url: originURL + '/yaadein/post/' + $scope.newPost.post_owner_enrol + '/',
          //url: 'https://angular-file-upload-cors-srv.appspot.com/upload', 
          fields: {
            'post_text': $scope.newPost.post_text
          },
          file: file
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file' + config.file.name + 'uploaded. Response' + JSON.stringify(data)); 
        });
      }
    }
  };

}]);

app.controller('HomeController', ['$scope', '$http', 'dataPosts', function ($scope, $http, dataPosts) {


	$scope.posts = [];
	var dataPromise = dataPosts.getPosts();
	dataPromise.then(function (d) {
		$scope.posts = d;
	});

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('ProfileController', ['$routeParams', '$scope', '$http', 'dataPosts', 'dataUsers', 
	function ($routeParams, $scope, $http, dataPosts, dataUsers) {

	$scope.posts = [];
	var dataPromise = dataPosts.getPosts();
	dataPromise.then(function (d) {
		$scope.posts = d;
	});

	$scope.currentUser = {};
	var userPromise = dataUsers.getUser($routeParams.enrolmentNo);
	userPromise.then(function (d) {
			$scope.currentUser = d;
      $scope.currentUser.profilePic = originURL + $scope.currentUser.profilePic;
      $scope.currentUser.coverPic = originURL + $scope.currentUser.coverPic;
      $scope.user.profilePic = $scope.currentUser.profilePic;
      var posts = $scope.currentUser.posts_data;
      for (var i = 0; i < posts.length; i += 1) {
        posts[i].post_owner_pic = originURL + posts[i].post_owner_pic;
        for (var j = 0; j < posts[i].image_url.length; j += 1) {
          posts[i].image_url[j] = originURL + posts[i].image_url[j];
        }
      }
      console.log(d);
	});

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('GalleryController', ['$routeParams', '$scope', 'dataUsers', 
	function ($routeParams, $scope, dataUsers) {

	$scope.currentUser = {};
	var userPromise = dataUsers.getUsers();
	userPromise.then(function (d) {
		for(var i = 0; i < d.length; i += 1) {
			if(d[i].enrolmentNo === parseInt($routeParams.enrolmentNo)) {
				$scope.currentUser = d[i];
				break;
			}
 		}
	});

	

}]);

app.controller('SettingsController', ['$scope', function ($scope) {
}]);
