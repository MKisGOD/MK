var app = angular.module('newsApp', ['ui.router', 'ng.post', 'news.controller', 'news.service', 'news.directive']);
//配置路由，
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('index', {
		//url+#/index
		url: '/index',
		templateUrl: 'template/index.html',
		controller: 'indexCtrl'
	}).state('index.list', {
		//国内最新
		url: '/list',
		templateUrl: 'template/newsList.html',
		controller: 'listCtrl'
	}).state('index.secondlist', {
		//游戏焦点
		url: '/secondlist',
		templateUrl: 'template/secondList.html',
		controller: 'secondListCtrl'
	}).state('index.thirdlist', {
		//国际焦点
		url: '/thirdlist',
		templateUrl: 'template/thirdList.html',
		controller: 'thirdListCtrl'
	}).state('detail', {
		//新闻的详细内容
		url: '/detail/:channelId/:id',
		templateUrl: 'template/detail.html',
		controller: 'detailCtrl'
	})
	$urlRouterProvider.when('', '/index/list');
}])
//设置api的路径
app.value('apiUrl','');
app.value('apiUrl','http://localhost/毕业设计/news/webroot/news/js/newsApi.js');
console.log(json);
var news = json;
console.log(news);
app.value('apiUrl2','http://localhost/毕业设计/news/webroot/news/js/newsApi2.js');
var news2 = json;
console.log(news2)
app.value('apiUrl3','http://localhost/毕业设计/news/webroot/news/js/newsApi3.js');
var news3 = json;
console.log(news3)
//设置api请求的方法，发布时候用jsonp，get只是请求用来请求测试的json文件～
//app.value('apiMethod','get');
//测试数据