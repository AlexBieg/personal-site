var app = angular.module("app", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url : '/',
		templateUrl : 'templates/home.html',
		controller : 'HomeController',
	});

	$stateProvider.state('about', {
		url : '/about',
		templateUrl : 'templates/about.html',
		controller : 'AboutController',
	});

	$stateProvider.state('portfolio', {
		url : '/portfolio',
		templateUrl : 'templates/portfolio.html',
		controller : 'PortfolioController',
	});
	$stateProvider.state('blog', {
		url : '/blog/:name',
		templateUrl : 'templates/blog.html',
		controller : 'BlogController',
	});

	$urlRouterProvider.when('', '/');
});

app.controller("HomeController", function($scope, $http) {
	$http.get("home/homeDescription.txt").then(function(response) {
		$scope.homeParagraphs = response.data.split("::");
	});
});

app.controller("AboutController", function($scope, $http) {
	$http.get("about/about.txt").then(function(response) {
		$scope.aboutParagraphs = response.data.split("::");
	});
});

app.controller("PortfolioController", function($scope, $http) {
	$http.get('portfolio/portfolio.csv').then( function(data) {
		$scope.portfolio = Papa.parse(data.data, {
			header: true
		}).data;

		$scope.portfolio.forEach(function(d) {
			$http.get(d.description).then(function(response) {
				d.description = response.data;
			})
		});
	});
});

app.controller("BlogController", function($scope, $http, $sce) {
	$http.get('posts/get-posts.php').then( function(data) {
		$scope.blogInfo = data.data;
		for (var i = 0; i < $scope.blogInfo.length; i++) {
			$scope.blogInfo[i].orderDate = new Date($scope.blogInfo[i].date);
		}

		$scope.sortedBlog = $scope.blogInfo.sort(function (a, b) {
			return b.orderDate - a.orderDate;
		});

		console.log($scope.sortedBlog)

		var href = window.location.href;
		var name = href.substr(href.lastIndexOf('/') + 1);

		if(name == "") {
			$scope.currPostContent = $sce.trustAsHtml($scope.sortedBlog[0].content);
		} else {
			$scope.blogInfo.forEach(function(post) {
				if (name + ".html" == post.title) {
					$scope.currPost = $sce.trustAsHtml(post.content);
				}
			})
		}
	});

	$scope.formatTitle = function(title) {
		title = title.slice(0, -5);
		title = title.replace(/-/g, " ");
		return title.replace(/\w\S*/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
	}

	$scope.getUrl = function(title) {
		title = title.slice(0, -5);
		var url = window.location.href;
		var str = url.substr(url.lastIndexOf('/') + 1) + '$';
    	return url.replace( new RegExp(str), '' ) + title;
	}
});
