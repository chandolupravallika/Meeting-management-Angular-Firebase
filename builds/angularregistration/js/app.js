var myApp=angular.module("myApp",['ngRoute','firebase']
    );

//we can check Authentication event by adding myApp.run
//add the dependencies for it.

myApp.run(['$rootScope','$location',function($rootScope,$location){
    $rootScope.$on('$routeChangeError',function(event,next,previous,error){
        if(error=='AUTH_REQUIRED'){
            $rootScope.message='Sorry, you must log in to access that page';
            $location.path('/login');
        }//Auth required
    });//routeChaneError
}]);//run

myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/login',{
            templateUrl:'views/login.html',
            controller:'RegistrationController'
        }).
        when('/register',{
            templateUrl:'views/register.html',
            controller:'RegistrationController'
        }).
        when('/checkins/:uId/:mId',{
            templateUrl:'views/checkins.html',
            controller:'CheckInsController'
        }).
        when('/checkins/:uId/:mId/checkinsList',{
            templateUrl:'views/checkinslist.html',
            controller:'CheckInsController'
        }).
        when('/meetings',{
            templateUrl:'views/meetings.html',
            controller:'MeetingsController',
        resolve:{
                currentAuth: function(Authentication){
                    return Authentication.requireAuth();
                }//currentAuth
            }//resolve
        }).
        otherwise({
            redirectTo:'/meetings'
        });
}]);
//correct way to including dependencies is by including them as array
//regardless of users login r out if we can access the success page. To prevent this we use configuration object "resolve".

//resolve is going to be a map of dependencies that the router service will wait to be resolved before going on.If the promises are resolved then everything will be fine and the user will be able to see this page.
//But if any of the promises are rejected, it will generate an event called route ChangeError
//$on-listens on events of a given type
//$location service sends the users back to that path