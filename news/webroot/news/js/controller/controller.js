;
//控制器
(function() {
	var app = angular.module('news.controller', []);
	app.controller('indexCtrl', ['$scope', '$rootScope', '$http', 'cookie', '$window',
		function($scope, $rootScope, $http, cookie, $window) {
			$scope.tabs = [{
				name: '国内最新',
				id: 1,
				url: '#/index/list'
			}, {
				name: '国际焦点',
				id: 2,
				url: '#/index/secondlist'
			}, {
				name: '全部新闻',
				id: 3,
				url: '#/index/thirdlist'
			}];
			$rootScope.id = 1;
			$scope.toggleTab = function(id, url) {
				console.log(id);
				$rootScope.id = id;
				$window.location.href = url;
			}
		}
	]);
	app.controller('listCtrl', ['$scope','$rootScope', '$http', 'swiperImg', 'apiUrl', function($scope, $rootScope, $http, swiperImg, apiUrl) {
		//全局测试
		$rootScope.testmk = 123;
		//默认显示轮播图
		$scope.isShowSwiper = true;
		//默认加载第一页
		$scope.page = 1;
		//默认显示loading
		$scope.nextpage = 1;
		//设置可以点击几次下一页，测试用,点两次
		$scope.isShow = false;
		//默认设置排序列表不出现
		$scope.sortList = false;
		//设置开始最新新闻排序
		$scope.switchCp = false;
		$scope.type = 'pubDate';
		//设置chanelId传给详细页面
		$scope.channelId = 'list1';
		//渲染到视图的新闻数据数组
		$rootScope.news = [];
		//轮播图的三张图片
		$scope.swiperImg = [];
		var load = function() {
				$http.jsonp(apiUrl, {
					params: {
						page: $scope.page,
						channelId: 'list1',
						channelName: '国内最新',
						callback: 'JSON_CALLBACK'
					}
				}).success(function(data) {
					//测试数据
					data = json;

					$scope.isShow = true;
					console.log(data);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news);
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				}).error(function(data) {
					//测试数据
					data = json;

					$scope.isShow = true;
					console.log(data.showapi_res_body.pagebean.currentPage);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news);
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				})
			}
			//第一次进来的时候自执行加载数据
		load();
		//默认搜索内容
		$scope.searchName = '';
		//搜索框默认的状态
		$scope.isSearch = false;
		$scope.search = function() {
			$scope.isSearch = true;
			console.log($rootScope.news)
		}
		
		$scope.changese = function() {
			console.log($scope.newsSearch)
			$rootScope.newsSearch = $scope.newsSearch
		}

		$scope.cancelSearch = function() {
			$scope.isSearch = false;
			$scope.searchName = '';
			$rootScope.newsSearch = $rootScope.news;
		}
		
		$scope.datesort1 = function(){
			if($scope.switchCp != false)
			{
				$rootScope.news.reverse();
				console.log("最新")
			}
			else
			console.log("已经最新")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		$scope.datesort2 = function(){
			if($scope.switchCp != true)
			{
				$rootScope.news.reverse();
				console.log("最久")
			}
			else
			console.log("已经最久")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		
		//加载更多的函数
		$scope.loadMore = function() {
			if($scope.nextpage<3){
			$scope.isShow = false;
			$scope.page++;
			load();
			$scope.nextpage++;
			}
		}

	}]);

app.controller('secondListCtrl', ['$scope', '$http', '$rootScope', 'swiperImg', 'apiUrl2', function($scope, $http, $rootScope, swiperImg, apiUrl) {
		//全局测试
		$rootScope.testmk = 'sec';
		//默认显示轮播图
		$scope.isShowSwiper = true;
		$rootScope.id = 2;
		//默认加载第一页
		$scope.page = 1;
		//默认显示loading
		$scope.nextpage = 1;
		//设置可以点击几次下一页，测试用,点两次
		$scope.isShow = false;
		//设置chanelId传给详细页面
		$scope.channelId = 'list2';
		//轮播图的三张图片
		$scope.swiperImg = [];
		$rootScope.news = [];
		var load = function() {
				$http.jsonp(apiUrl, {
					params: {
						page: $scope.page,
						channelId: 'list2',
						channelName: '国际焦点',
						callback: 'JSON_CALLBACK'
					}
				}).success(function(data) {
					//测试数据，发布时删除
					data = json;

					$scope.isShow = true;
					console.log(data);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news)
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				}).error(function(data) {
					//测试数据，发布时删除
					data = json;

					$scope.isShow = true;
//					console.log(apiUrl)
					console.log(data);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news)
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				})
			}
			//第一次进来的时候自执行加载数据
		load();
		//默认搜索内容
		$scope.searchName = '';
		//搜索框默认的状态
		$scope.isSearch = false;
		$scope.search = function() {
			$scope.isSearch = true;
		}
		
		$scope.changese = function() {
			console.log($scope.newsSearch)
			$rootScope.newsSearch = $scope.newsSearch
		}
		
		$scope.cancelSearch = function() {
			$scope.isSearch = false;
			$scope.searchName = '';
			$rootScope.newsSearch = $rootScope.news;
		}
		
		$scope.datesort1 = function(){
			if($scope.switchCp != false)
			{
				$rootScope.news.reverse();
				console.log("最新")
			}
			else
			console.log("已经最新")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		$scope.datesort2 = function(){
			if($scope.switchCp != true)
			{
				$rootScope.news.reverse();
				console.log("最久")
			}
			else
			console.log("已经最久")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		
		//加载更多的函数
		$scope.loadMore = function() {
			if($scope.nextpage<3){
			$scope.isShow = false;
			$scope.page++;
			load();
			$scope.nextpage++;
			}
		}
	}]);

app.controller('thirdListCtrl', ['$scope', '$rootScope', '$http', 'swiperImg', 'apiUrl3', function($scope, $rootScope, $http, swiperImg, apiUrl) {
		//全局测试
		$rootScope.testmk = 'tri';
		//默认显示轮播图
		$scope.isShowSwiper = true;
		//默认加载第一页
		$scope.page = 1;
		//默认显示loading
		$scope.nextpage = 1;
		//设置可以点击几次下一页，测试用
		$scope.isShow = false;
		//默认设置排序列表不出现
		$scope.sortList = false;
		$scope.type = 'pubDate';
		//设置chanelId传给详细页面
		$scope.channelId = 'list3';
		//渲染到视图的新闻数据数组
		$rootScope.news = [];
		//轮播图的三张图片
		$scope.swiperImg = [];
		var load = function() {
				$http.jsonp(apiUrl, {
					params: {
						page: $scope.page,
						channelId: 'list3',
						channelName: '全部新闻',
						callback: 'JSON_CALLBACK'
					}
				}).success(function(data) {
					//测试数据，发布时删除
					data = json;

					$scope.isShow = true;
					console.log(data);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news)
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				}).error(function(data) {
					//测试数据，发布时删除
					data = json;
//					console.log("API接口:"+apiUrl);
					$scope.isShow = true;
					console.log(data);
					$rootScope.news = $rootScope.news.concat(data.showapi_res_body.pagebean.contentlist);
					console.log($rootScope.news);
					$rootScope.newsSearch = $rootScope.news;
					//用swiperImg自定义服务获取三张图片
					$scope.swiperImg = swiperImg.get($rootScope.news);
				})
			}
			//第一次进来的时候自执行加载数据
		load();
		//默认搜索内容
		$scope.searchName = '';
		//搜索框默认的状态
		$scope.isSearch = false;
		$scope.search = function() {
			$scope.isSearch = true;
		}
		
		$scope.changese = function() {
			console.log($scope.newsSearch)
			$rootScope.newsSearch = $scope.newsSearch
		}
		
		$scope.cancelSearch = function() {
			$scope.isSearch = false;
			$scope.searchName = '';
			$rootScope.newsSearch = $rootScope.news;
		}
		
		$scope.datesort1 = function(){
			if($scope.switchCp != false)
			{
				$rootScope.news.reverse();
				console.log("最新")
			}
			else
			console.log("已经最新")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		$scope.datesort2 = function(){
			if($scope.switchCp != true)
			{
				$rootScope.news.reverse();
				console.log("最久")
			}
			else
			console.log("已经最久")
			console.log($scope.switchCp)
			console.log($rootScope.news);
		}
		
		//加载更多的函数
		$scope.loadMore = function() {
			if($scope.nextpage<3){
			$scope.isShow = false;
			$scope.page++;
			load();
			$scope.nextpage++;
			}
		}

	}]);


//-------------------------//
	

	//新闻详细页的控制器
	app.controller('detailCtrl', ['$scope', '$rootScope', '$http', '$state', 'apiUrl', function($scope, $rootScope, $http, $state, apiUrl) {
		//是否显示放大图片
		$scope.isShowGallery = false
			//获取id，视图下一页逻辑需要的数据
		$scope.id = parseInt($state.params.id);
		//获取channelId，根据频道取对应的新闻数据
		$scope.channelId = $state.params.channelId;
		//默认加载loading等待数据回调后消失
		$scope.isShow = false;
		$scope.showGallery = function(isshow, url) {
			$scope.isShowGallery = isshow;
			console.log(url);
			$scope.imgUrl = "background-image:url(" + url + ")";
		}
		console.log($state.params)
		console.log($state)
		$scope.isShow = true;
		$scope.new = $rootScope.newsSearch[$state.params.id];
//		$http.jsonp(apiUrl, {
//			params: {
//				page: 1,
//				channelId: $scope.channelId,
//				//channelName: '国内最新',
//				channelName: '',
//				callback: 'JSON_CALLBACK'
//			}
//		}).success(function(data) {
//			//测试数据
//			data = json;
//
//			console.log(data);
//			$scope.isShow = true;
//			$scope.allNum = data.showapi_res_body.pagebean.allNum;
////			$scope.new = data.showapi_res_body.pagebean.contentlist[$state.params.id];
////			$scope.new = $rootScope.news[$state.params.id];
//			console.log($scope.new)
//		}).error(function(data) {
//			//测试数据
//			data = json;
//
//			console.log(data);
//			console.log($rootScope.news)
//			console.log($rootScope.testmk)
//			$scope.isShow = true;
//			$scope.allNum = data.showapi_res_body.pagebean.allNum;
//			$scope.new = $rootScope.newsSearch[$state.params.id];
//			console.log($scope.new)
//		})
	}]);
})();