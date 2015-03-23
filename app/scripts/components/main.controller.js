'use strict';

var app = angular.module('yaadeinApp');
var originURL = 'http://172.25.55.156:60020';

app.controller('YaadeinController', ['$scope', '$http', '$q', '$timeout', '$upload', '$location', '$routeParams', '$route', 'ngNotify', 'TickerService', 'HomeService', 'PostService', 'Lightbox',
    function ($scope, $http, $q, $timeout, $upload, $location, $routeParams, $route, ngNotify, TickerService, HomeService, PostService, Lightbox) {

    $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

    ngNotify.config({
      theme: 'pure',
      position: 'top',
      duration: 2000,
      sticky: false
    });

	$scope.appname = 'Yaadein';

	$scope.navigationItems = [
		{
			'id': 'profile',
			'class': 'fa fa-user',
			'url': '/profile/',
			'hint': 'Profile'
		},
    {
      'id': 'home',
      'class': 'fa fa-home',
      'url': '/',
      'hint': 'Home'
    },
		{
			'id': 'search',
			'class': 'fa fa-search',
			'url': '#',
			'hint': 'Search'
		},
		{
			'id': 'post',
			'class': 'fa fa-pencil-square-o',
			'url': '#',
			'hint:': 'Post a memory'
		},
		//{
			//'id': 'notifications',
			//'class': 'fa fa-bell',
			//'url': '#',
			//'hint': 'Notifications'
		//},
		{
			'id': 'signOut',
			'class': 'fa fa-sign-out',
			'url': originURL+'/logout/',
			'hint': 'Log Out'
		}
	];

	$scope.currentNavItem = $scope.navigationItems[1];
  $scope.lastNavItem = $scope.navigationItems[1];

	$scope.setCurrentNavItem = function (navItem) {
    $scope.lastNavItem = $scope.currentNavItem;
		$scope.currentNavItem = navItem;
		if ($scope.currentNavItem.id === 'search' || $scope.currentNavItem.id === 'post') {
			$('#centered').addClass('blur-back');
			$('.right-sidebar').addClass('blur-back');
		} else {
      $location.path(navItem.url);
			$('#centered').removeClass('blur-back');
			$('.right-sidebar').removeClass('blur-back');
		}
	};

	$scope.isCurrentNavItem = function (navItem) {
		return $scope.currentNavItem !== null && $scope.currentNavItem.id === navItem.id;
	};

	$scope.getCurrentNavItem = function () {
		return $scope.currentNavItem.id;
	};

  $scope.enlargeImage = function (images, index) {
    Lightbox.openModal(images, index);
  }; 

	$scope.closePost = function () {
		$('#centered').removeClass('blur-back');
		$('.right-sidebar').removeClass('blur-back');
		$('#postBox').fadeOut(300);
		$scope.setCurrentNavItem($scope.navigationItems[1]);
    $scope.clearNewPostData();
	};

	$scope.closeSearch = function () {
    $('#centered').removeClass('blur-back');
		$('.right-sidebar').removeClass('blur-back');
		$('#searchBox').fadeOut(300);
    $scope.setCurrentNavItem($scope.navigationItems[1]);
	};

  $scope.showCoverHint = function () {
    $('#cover-upload-hint').fadeIn(150);
  };

  $scope.hideCoverHint = function () {
    $('#cover-upload-hint').fadeOut(150);
  };

  $scope.addOriginToImageUrl = function (resp) {
    var results = resp.results;
    for(var i = 0; i < results.length; i += 1) {
      results[i].profile_pic = originURL + results[i].profile_pic;
      results.id;
    }
    return resp;
  };

  $scope.personSelected = function(selected) {
    $scope.setCurrentNavItem($scope.navigationItems[0])
    $location.path('/profile/' + selected.originalObject.id);
  };

	$scope.user = {};
  var LoggedUserData = HomeService.getLoggedUser();
  LoggedUserData.then(function (d) {
      $scope.user = d;
      $scope.navigationItems[0].url += $scope.user.enrolmentNo;
  });

	//Append enrolment number to profile and gallery URLs
	//$scope.navigationItems[0].url += $scope.user.enrolmentNo;

	$scope.ticks = [];
	var tickPromise = TickerService.getTicks();
	tickPromise.then(function (d) {
		$scope.ticks = d;
	});

  $scope.newPost = {
    'post_owner': $scope.user.name,
    'post_owner_enrol': $scope.user.enrolmentNo,
    'post_owner_branch': $scope.user.label,
    'post_owner_pic': $scope.user.profilePic,
    'time': '',
    'image_url': [],
    'post_text': '',
    'user_tags': [],
    'spot': []
  };

  $scope.clearNewPostData = function () {
    $scope.newPost.post_text = '';
    $scope.newPost.user_tags = [];
    $scope.newPost.image_url = [];
  };

  $scope.loadTags = function (query) {
    var defer = $q.defer();
    $http.get(originURL + '/yaadein/search/1/?q=' + query, {ignoreLoadingBar: true})
      .success(function (d) {
          defer.resolve(d.results);
    });
    return defer.promise;
  };

  $scope.loadSpots = function (query) {
    var defer = $q.defer();
    $http.get(originURL + '/yaadein/search/2/?q=' + query, {ignoreLoadingBar: true})
      .success(function (d) {
          defer.resolve(d.results);
    });
    return defer.promise;
  };

  $scope.generateThumb = function (files) {
    for (var i = 0; i < files.length; i += 1) {
      var file = files[i];
      if (file !== null) {
        console.log(i);
        if($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
          $timeout(function() {
              var fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = function (e) {
                $timeout(function() {
                  file.dataUrl = e.target.result;
                  console.log(file.dataUrl);
                });
              };
          });
        }
      }
    }
  };

  $scope.$watch('coverpic', function (photo) {
      if (photo !== null) {
        (function(file){
         $scope.uploadCover(file);
        })(photo);
      }
  });

  $scope.upload = function (files) {
    var uploadUrl = originURL + '/yaadein/user/' + $scope.user.enrolmentNo + '/';
    if ($routeParams && $routeParams.enrolmentNo) {
      uploadUrl = originURL + '/yaadein/user/' + $routeParams.enrolmentNo + '/';
    }
    //for(var i = 0; i < files.length; i += 1) {
    //var file = files[i];
    $upload.upload({
      url: uploadUrl,
      headers: {'Content-Type':'multipart/form-data'}, 
      method: 'POST',
      data: {
        post_text: $scope.newPost.post_text,
        user_tags: $scope.newPost.user_tags,
        spot: $scope.newPost.spot
      },
      file: files,
      withCredentials: true
    }).progress(function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '%' + evt.config.file.name);
    }).success(function (data, status, headers, config) {
      console.log('file' + config.file.name + 'uploaded. Response' + JSON.stringify(data));
      $scope.closePost();
      ngNotify.set('Successfully posted!', 'success');
    });
    //}
  };

  $scope.uploadCover = function (files) {
    if (files && files.length === 1) {
      $upload.upload({
        url: originURL + '/yaadein/cover/upload/',
        headers: {'Content-Type':'multipart/form-data'}, 
        method: 'POST',
        data: {
        },
        file: files,
        withCredentials: true
      }).progress(function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.file[0].name);
      }).success(function (data, status, headers, config) {
        console.log('File ' + config.file.name + ' uploaded. Response' + JSON.stringify(data));
        console.log(config);
        ngNotify.set('Cover photo updated successfully!', 'success');
        location.reload();
      });
    }
  };

  $scope.isLoggedUserPost = function (id) {
    return $scope.user.enrolmentNo === id;
  };

  $scope.deletePost = function (id) {
    var flag = PostService.deletePost(id);
    flag.then(function (d) {
        if (d === 'True') {
          ngNotify.set('Post deleted successfully!', 'success');
        } else {
          ngNotify.set('Could not delete post!', 'error');
        }
    });
  };

  //Emoji Service
  $scope.predictEmoji = function(term) {
    var emojiList = [];
    return $http.get('data/emojis.json')
      .then(function (response) {
          angular.forEach(response.data, function(item) {
            if (item.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
              emojiList.push(item);
            }
          });
      $scope.emojis = emojiList;
      return $q.when(emojiList);
   });
  };

  $scope.getEmojiTextRaw = function(item) {
    return ':' + item.name + ':';
  };

  $scope.macros = {
	'brb': 'be right back',
	'omw': 'on my way'
  };
}]);

app.controller('HomeController', ['$scope', '$http', 'HomeService', 
    function ($scope, $http, HomeService) {

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('ProfileController', ['$routeParams', '$scope', '$http', 'UserService',
	function ($routeParams, $scope, $http, UserService) {

	$scope.currentUser = {};
	var userPromise = UserService.getUser($routeParams.enrolmentNo);
	userPromise.then(function (d) {
			$scope.currentUser = d;

      //Add originURL to image URLs
      $scope.currentUser.profilePic = originURL + $scope.currentUser.profilePic;
      $scope.currentUser.coverPic = originURL + $scope.currentUser.coverPic;

      var posts = $scope.currentUser.posts_data;
      for (var i = 0; i < posts.length; i += 1) {
        posts[i].post_owner_pic = originURL + posts[i].post_owner_pic;
        for (var j = 0; j < posts[i].image_url.length; j += 1) {
          posts[i].image_url[j] = originURL + posts[i].image_url[j];
        }
      }
	});

  $scope.isLoggedUserProfile = function () {
    return $scope.user.enrolmentNo === $scope.currentUser.enrolmentNo;
  };

	$scope.addToFeed = function () {
		$http.get('http://beta.json-generator.com/api/json/get/CHdvIym')
			.success(function (ds) {
				for(var i = 0; i < ds.length; i += 1) {
					$scope.posts.push(ds[i]);
				}
		});
	};

}]);

app.controller('GalleryController', ['$routeParams', '$scope', 'dataUserService',
	function ($routeParams, $scope, UserService) {

	$scope.currentUser = {};
	var userData = UserService.getUser($routeParams.enrolmentNo);
	userData.then(function (d) {
    $scope.currentUser = d;
	});

}]);

app.controller('HashtagController', ['$routeParams', '$scope', '$http', 'HashtagService', 
	function ($routeParams, $scope, $http, HashtagService) {

  $scope.hash = $routeParams.hashtag;  
	$scope.posts = [];
	var dataPromise = HashtagService.getHashtaggedPosts($routeParams.hashtag);
	dataPromise.then(function (d) {

    //Add originURL to image URLs
    for(var i = 0; i < d.posts_data.length; i += 1) {
      d.posts_data[i].post_owner_pic = originURL + d.posts_data[i].post_owner_pic;
      for(var j = 0; j < d.posts_data[i].image_url.length; j += 1) {
        d.posts_data[i].image_url[j] = originURL + d.posts_data[i].image_url[j];
      }
    }
    $scope.posts = d.posts_data;
  });

}]);

app.controller('PostController', ['$routeParams', '$scope', '$q', '$http', 'PostService',  
   function ($routeParams, $scope, $q, $http, PostService) {

   $scope.post = {};
   var postData = PostService.getPost($routeParams.postId);
   postData.then(function (d) {

     //Add originURL to image URLs
     for(var j = 0; j < d.image_url.length; j += 1) {
      d.image_url[j] = originURL + d.image_url[j];
     }

     d.post_owner_pic = originURL + d.post_owner_pic;
     $scope.post = d;
   });

}]);
