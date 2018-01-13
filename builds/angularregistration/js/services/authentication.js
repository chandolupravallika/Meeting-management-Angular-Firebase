myApp.factory('Authentication',['$rootScope','$location','$firebaseObject','$firebaseAuth',function($rootScope,$location,$firebaseObject,$firebaseAuth){
    var ref=firebase.database().ref();
    var auth=$firebaseAuth();
    var mayObject;
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var userRef=ref.child('users').child(authUser.uid);
            var userObj=$firebaseObject(userRef);
            $rootScope.currentUser=userObj;
        } else{
            $rootScope.currentUser='';
        }
    });
    
    myObject={
        login:function(user){
            auth.$signInWithEmailAndPassword(
                user.email,
                user.password
            ).then(function(user) 
                   {$location.path('/meetings');
                   }).catch(function(error){
                $rootScope.message=error.message;
            })//$signInwithEmailAndPassword
        },//login
        
        logout: function(){
            return auth.$signOut();
        },//logout
        
        requireAuth:function(){
            return auth.$requireSignIn();
        },//require Authentication
        register:function(user){
             auth.$createUserWithEmailAndPassword(
        user.email,
        user.password).then(function(regUser){
                 //the regRef is going to be a path to directory or a sub-directory in our data, so in this i am going to call users and i m gng to store all users information in this subsection.If u want to create a path to diff users data then we need to create another child.
                 var regRef=ref.child('users').child(regUser.uid).set({date:firebase.database.ServerValue.TIMESTAMP,
                                                                       regUser:regUser.uid,
                                                                       firstname:user.firstname,
                                                                       lastname:user.lastname,
                                                                       email:user.email
                                                                                    
                                                                      });//userInfo
         //   $rootScope.message=" HI  "+user.firstname + " , Thanks for registering";
                 //login in the user rightafter them we register them successfully.
                 myObject.login(user);//it gets passesd along the login method gets executed.so remove the above message to show the register msg at login page.
        }).catch(function(error){
            $rootScope.message=error.message;
        });//createUserWithEmailAndPassword
        }//register
    };//return
    
    return myObject;
}]);//factory
//Abstracting authentication into a service simplifies the way that we create our controllers.But it also allows us to get authentication information from within any of our controllers in our application.

//to make the user directly login after registering use create an object for above whole items and call that abject to navigate to login success page.