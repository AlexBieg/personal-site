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
		
		console.log($scope.portfolio);

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

		var href = window.location.href;
		var name = href.subsrt(href.lastIndexOf('/') + 1);

		if(name == "") {
			var newest = blogInfo[0];
			var newestDate = new Date(newest.date);
			for (var i = 1; i < $scope.blogInfo; i++) {
				anotherDate = new Date(blogInfo[i].date);
				if (newestDate < anotherDate) {
					var newest = blogInfo[i];
					var newestDate = new Date(newest.date);
				}
			}
			$scope.currPost = $sce.trustAsHtml(newest.content);
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
		return title.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	$scope.getUrl = function(title) {
		title = title.slice(0, -5);
		var url = window.location.href;
		var str = url.substr(url.lastIndexOf('/') + 1) + '$';
    	return url.replace( new RegExp(str), '' ) + title;
	}
});