// Everything related to data is here

// var userRef = firebase.database().ref().child("Users");

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function index_ready() {
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var name, email, photoUrl, uid;

	    if (user != null) {
	      // name = user.displayName;
	      email = user.email;
	      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                       // this value to authenticate with your backend server, if
	                       // you have one. Use User.getToken() instead.
	    }

       firebase.database().ref().child('Users/').child(uid).on('value', snap => {
        $('#login-bt').replaceWith([
            '<li id="user-bt"><a href="#"><span><i class="fa fa-mortar-board"></i>' + snap.child('Name').val() + '</span></a></li>'
            ].join(' '));

        $('#signup-bt').replaceWith([
            '<li id="signout-bt"><a onclick="signOut()"><span><i class="fa fa-mortar-board"></i>Sign out</span></a></li>'
            ].join(' '));
        });
	  } else {
	    // No user is signed in.
	    return;
	  }
	});
}

function notesmania_ready(){
	//alert("Jquery WORKS!!!!!!!");
    var user = firebase.auth().currentUser;
    var notesData = {};
    var name, email, photoUrl, uid;

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.

	    

	    if (user != null) {
	      // name = user.displayName;
	      email = user.email;
	      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                       // this value to authenticate with your backend server, if
	                       // you have one. Use User.getToken() instead.
	    }

	    firebase.database().ref().child('Users/').child(uid).on('value', snap => {
        $('#login-bt').replaceWith([
            '<li id="user-bt"><a href="#"><span><i class="fa fa-mortar-board"></i>' + snap.child('Name').val() + '</span></a></li>'
            ].join(' '));

        $('#signup-bt').replaceWith([
            '<li id="signout-bt"><a onclick="signOut()"><span><i class="fa fa-mortar-board"></i>Sign out</span></a></li>'
            ].join(' '));
        });
	  
      } else {
	    // No user is signed in.
	    return;
	  }
	});

    

	firebase.database().ref().child("Notes").on("child_added", snap => {
		//alert(snap.val());
		var topic = snap.child("Note_Name").val();
		var description = snap.child("Description").val();
        var course = snap.child("Course_Name").val();
		var user = snap.child("Posted_By").val();
        var teacher = snap.child("Teacher").val();
        var DateTime = snap.child("DateTime").val();
        
        firebase.database().ref().child('Users/').child(uid).on('value', snapy => {
            $('#notes-main').append([
            '<div class="blog-posts small-image">',
            '<div class="post-item">',
            '<article class="post-content">',
            '<div class="post-image main-border bot-4-border">',
            '<a href="IndividualNote.html">',
            '<img src="assets/images/blog/large/1.jpg" alt="Our Blog post image goes here">',
            '</a>', 	
            '</div>',
            '<div id="delete" class="f-right">',
            '<a class="btn btn-outlined main-border" href="Group-Finder.html" style="margin-left:8.5em;" ><i class="fa fa-pencil"></i>Download Notes</a>',
            '</div>',
            '<div class="post-item-rit">',
            '<div class="post-info-container">',
            '<div class="post-info">',
            '<h4><a href="IndividualNote.html">' + topic + '</a></h4>',
            '<ul class="post-meta">',
            '<li class="meta-user"><i class="fa fa-user"></i>By: <a href="#">' + snapy.child('Name').val() + '</a></li>',
            '<li class="meta_date"><i class="fa fa-folder-o"></i>in: <a href="#">' + course + '</a></li>',
            '<li class="meta_date"><i class="fa fa-clock-o"></i>' + DateTime + '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '<p>' + description + '<a class="more_btn main-color" href="IndividualNote.html">Read More</a></p>',
            '</div>',
            '</article>',
            '</div>',
            '<div class="xs-padding">',
            '<hr class="divider dev-style2">',
            '</div>',    
            '</div>'].join(' '));  
            });
        
        // });
	});

}

function bookworms_ready() {
    var user = firebase.auth().currentUser;

    var booksData = {};
    var name, email, photoUrl, uid;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.

        

    
        // name = user.displayName;
        email = user.email;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.

        // alert(email);

        firebase.database().ref().child('Users/').child(uid).on('value', snap => {
        $('#login-bt').replaceWith([
            '<li id="user-bt"><a href="#"><span><i class="fa fa-mortar-board"></i>' + snap.child('Name').val() + '</span></a></li>'
            ].join(' '));

        $('#signup-bt').replaceWith([
            '<li id="signout-bt"><a onclick="signOut()"><span><i class="fa fa-mortar-board"></i>Sign out</span></a></li>'
            ].join(' '));
        });
      
      } else {
        // No user is signed in.
        // return;
      }
    });

    firebase.database().ref().child("Books").on("child_added", snap => {
        //alert(snap.val());
        var book = snap.child("Book_Name").val();
        var author = snap.child("Author").val();
        var course = snap.child("Course_Name").val();
        var edition = snap.child("Edition").val();
        var price = snap.child("Price").val();
        var condition = snap.child("Condition").val();
        var user = snap.child("Username").val();
        var image = snap.child("ImageURL").val();
        var user = snap.child("Posted_By").val();

        // firebase.storage().ref().child('Books_Images/' + image).getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"

        // firebase.database().ref().child('Users').child(user).on('value', snapshot => {
            $('#books-main').append([
            '<div class="col-md-4 shop-item">',
            '<div class="item-box">',
            '<div class="item-img">',
            '<img alt="" src='+ image +'>',
            '</div>',
            '<h3 class="item-title"><a onclick="bookDetails()">'+ book + '</a></h3>',
            '<div class="item-price">Rs. '+ price +'</div>',
            '</div>',
            '</div>',
            '</div>'].join(' '));
        // });
    });
}

function bookDetails () {
    window.location.href = "IndividualBook.html";
}

function groupfinder_ready(user) {
    // alert(moment().format('DD-MM-YYYY hh:mm:ss A'));
    var groupData = {};
    var name, email, photoUrl, uid;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.

        

        if (user != null) {
          // name = user.displayName;
          email = user.email;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        }

        firebase.database().ref().child('Users/').child(uid).on('value', snap => {
        $('#login-bt').replaceWith([
            '<li id="user-bt"><a href="#"><span><i class="fa fa-mortar-board"></i>' + snap.child('Name').val() + '</span></a></li>'
            ].join(' '));

        $('#signup-bt').replaceWith([
            '<li id="signout-bt"><a onclick="signOut()"><span><i class="fa fa-mortar-board"></i>Sign out</span></a></li>'
            ].join(' '));
        });

      } else {
        // No user is signed in.
        return;
      }
    });

    firebase.database().ref().child("Groups").on("child_added", snap => {
        //alert(snap.val());
        var group = snap.child("Group_Name").val();
        var location = snap.child("Place").val();
        var subject = snap.child("Course_Name").val();
        var description = snap.child("Description").val();
        var user = snap.child("Posted_By").val();
        var DateTime = snap.child("DateTime").val();
        var Taught_By = snap.child("Taught_By").val();

        // alert(group);

        firebase.database().ref().child('Users').child(user).on('value', snapshot => {
            $('#groups-main').append([
            '<div class="post-item">',
            '<article class="post-content">',
            '<div class="post-image main-border bot-4-border">',
            '<img src="assets/images/blog/large/4.png" alt="Our Blog post image goes here">',
            '</div>',
            '<div class="post-item-rit">',
            '<div class="post-info-container">',
            '<div class="post-info">',
            '<h4><a href="">'+group+'</a></h4>',
            '<ul class="post-meta">',
            '<li class="meta-user"><i class="fa fa-user"></i>Posted By: <a href="#">'+snapshot.child('Name').val()+'</a></li>',
            '<li class="meta-user"><i class="fa fa-user"></i>Taught By: <a href="#">'+Taught_By+'</a></li>',
            '<li class="meta_date"><i class="fa fa-clock-o"></i>' + DateTime + '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '<p>' + description + '</p>',
            '</div>',
            '</article>',
            '</div>',
            '<div class="xs-padding">',
            '<hr class="divider dev-style2">',
            '</div>'].join(' '));  
        });

    });
}

// Function to add new books
function new_group(){
    var grp = $('#Group_Name').val();
    var loc = $('#Place').val();
    var sbj = $('#Course_Name').val();
    var desc = $('#Description').val();
    var tb = $('#Taught_By').val();

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

    // alert(grp + loc + sbj + desc);

    var groupData = {
        Group_Name: grp,
        Place: loc,
        Course_Name: sbj,
        Description: desc,
        Posted_By: email,
        DateTime: moment().format('DD-MM-YYYY hh:mm:ss A'),
        Taught_By: tb
    };

    // Get a key for a new Post.
    var newGroupKey = firebase.database().ref().child('Groups').push().key;

    // alert(newBooksKey);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/Groups/' + newGroupKey] = groupData;
    // updates['/user-groups/' + uid + '/' + 'groupid'] = newGroupKey;

    firebase.database().ref().update(updates);
}

function mygroups(){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    
    $('#groups-main').remove();
    $('#groups-main-rem').append(['<div id="groups-main" class="row">', '</div>'].join(' '));
    
    firebase.database().ref().child('user-groups/' + uid).on("value", snaps => {
        //alert(snap.val());

        var groupid = snaps.child("groupid").val();

        firebase.database().ref().child('Groups/' + groupid).on("value", snap => {

            var group = snap.child("name").val();
            var location = snap.child("location").val();
            var subject = snap.child("subject").val();
            var description = snap.child("description").val();
            var user = snap.child("user").val();
                
            
            
    //        alert(user);
             
                // var username = snapshot.child(user).child("Name").val();
            // var username = firebase.auth().uid;
            // alert(username); 
            // firebase.database().ref().child('Users').child(user).on('value', snapshot => {
                
                 $('#groups-main').append([
                '<div class="col-md-6 service-item service-right">',
                '<div class="box-content">',
                '<div class="service-icon">',
                '<i class="li_study"></i>',
                '</div>',
                '<div class="service-content">',
                '<h4>' + group + '</h4>',
                '<p>Location : ' + location + '</p>',
                '<p>Subject : ' + subject + '</p>',
                '<p>'+ description + '</p>',
                '</div>',
                '</div>',
                '</div>'].join(' '));  

            // }); 
        });
     });
}

// Function to add new books
function new_book(){
    var book = $('#bookname').val();
    var auth = $('#author').val();
    var ed = $('#edition').val();
    var cor = $('#course').val();
    var pr = $('#price').val();
    // var img = $('#file').val();
    var con = $('input[name=radioName]:checked', '#booksForm').val()

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

    var newBooksKey = firebase.database().ref().child('Books').push().key;

    var metadata = {
        name: newBooksKey
    }

    // var reader = new FileReader();
    // var dlURL;
    var file = document.querySelector('input[type=file]').files[0];
    

    // var imgURL = reader.readAsDataURL(file);
    // alert(file);
    var uploadTask = firebase.storage().ref().child('Books_Images/').child(newBooksKey).put(file, metadata);

    uploadTask.on('state_changed', function(snapshot){
        var dlURL = uploadTask.snapshot.downloadURL;
      
        
              var booksData = {
                Book_Name: book,
                Posted_By: uid,
                Author: auth,
                Edition: ed,
                Course_Name: cor,
                Condition: con,
                Price: pr,
                ImageURL: dlURL
            };

            // Get a key for a new Post.


            // alert(newBooksKey);

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/Books/' + newBooksKey] = booksData;
            // updates['/user-books/' + uid + '/' + 'bookid'] = newBooksKey;

            firebase.database().ref().update(updates);
    });


    // alert(dlURL);

    
}

function mybooks(){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    
    $('#books-main').remove();
    $('#books-main-rem').append(['<div id="books-main" class="row">', '</div>'].join(' '));
    
    firebase.database().ref().child('user-books/' + uid).on("value", snaps => {
        //alert(snap.val());

        var bookid = snaps.child("bookid").val();

        firebase.database().ref().child('Books/' + bookid).on("value", snap => {

            var book = snap.child("name").val();
            var author = snap.child("author").val();
            var course = snap.child("course").val();
            var edition = snap.child("edition").val();
            var price = snap.child("price").val();
            var condition = snap.child("condition").val();
            var user = snap.child("user").val();
            
            
            
    //        alert(user);
             
                // var username = snapshot.child(user).child("Name").val();
            // var username = firebase.auth().uid;
            // alert(username); 
            // firebase.database().ref().child('Users').child(user).on('value', snapshot => {
                
                $('#books-main').append([
                '<div class="col-md-4 project-item">',
                '<div class="project-thumb">',
                '<img src="images/projects/project_1.jpg" alt="">',
                '<div class="overlay-b">',
                '<div class="overlay-inner">',
                '<a href="images/projects/project_1.jpg" class="fancybox fa fa-expand" title=""></a>',
                '</div>',   
                '</div>',
                '</div>',
                '<div class="box-content project-detail">',
                '<h2><a href="project-details.html">' + book + '</a></h2>',
                '<p>Author : ' + author + ' </p>',
                '<p>Edition : ' + edition + ' </p>',
                '<p>Course : ' + course + ' </p>',
                '<p>Course : ' + condition + ' </p>',
                '<p>Rs. ' + price + ' </p><button class="mainBtn" style="">Buy Now </button>',
                '</div>',
                '</div>'].join(' '));  

            // }); 
        });
     });
}

// Function to add new notes
function new_notes(){
    var lec = $('#Topic').val();
    var cor = $('#Course_Name').val();
    var des = $('#Description').val();

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

    var notesData = {
        Topic: lec,
        userid: uid,
        Description: des,
        Course_Name: cor
    };

    // Get a key for a new Post.
    var newNotesKey = firebase.database().ref().child('Notes').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/Notes/' + newNotesKey] = notesData;
    // updates['/user-notes/' + uid + '/' + 'noteid'] = newNotesKey;

    firebase.database().ref().update(updates);
}


function mynotes(){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      // name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    
    $('#notes-main').remove();
    $('#notes-main-rem').append(['<div id="notes-main" class="row">', '</div>'].join(' '));
    
    firebase.database().ref().child('user-notes/' + uid).on("value", snaps => {
		//alert(snap.val());

        var noteid = snaps.child("noteid").val();

        // alert(noteid);

        firebase.database().ref().child('Notes/' + noteid).on("value", snap => {

    		var topic = snap.child("topic").val();
            var description = snap.child("description").val();
            var course = snap.child("course").val();
            var user = snap.child("user").val();
        
			// var username = snapshot.child(user).child("Name").val();
		  // var username = firebase.auth().uid;
    		// alert(username);	
            // firebase.database().ref().child('Users').child(user).on('value', snapshot => {
                
                $('#notes-main').append([
                '<div class="post-masonry col-md-4 col-sm-6">',
                '<div class="blog-thumb">',
                '<img src="images/blog/blog-1.jpg" alt="">',
                '<div class="overlay-b">',
                '<div class="overlay-inner">',
                '<a href="blog-single.html" class="fa fa-link"></a>',
                '</div>', 	
                '</div>',
                '</div>',
                '<div class="blog-body">',
                '<div class="box-content">',
                '<h3 class="post-title"><a href="blog-single.html">' + topic + '</a></h3>',
                '<span class="blog-meta">' +  user + '</span>',
                '<p>' + description + '</p>',
                '<button class="mainBtn" style="">View Note </button>',
                '</div>',
                '</div>',
                '</div>'].join(' '));  
            
//            <a class="btn btn-outlined main-border" href="Group-Finder.html" style="margin-left:8.5em;" ><i class="fa fa-pencil"></i>Delete Note</a>
            // });
        });
     });
}

function newUser() {//uid, username, picture, title, body) {
  // A post entry.

//    var username = $('#username-up').val();
    var full_name = $('#fname').val();
    var phone = $('#phone').val();
    var pass = $('#pass').val();
    var useremail = $('#email').val();
    var uni_y = $('#University_Year').val();
    var uni = $('#University').val();
    var gen= $('input[name=Gender]:checked', '#GenderCheck').val()

    firebase.auth().createUserWithEmailAndPassword(useremail, pass).then(function(user) {
        uid = user.uid;
        
        var userData = {
            Name: full_name,
            Phone_Number: phone,
//            email: useremail,
            University_Name: uni,
            University_Year: uni_y
        };
        
        var updates = {};
        updates['/Users/' + uid] = userData;
        
        firebase.database().ref().update(updates);
    });
}

function loginUser () {
   // alert('Works');
   var loginemail = $('#login-email').val().trim(' ');
   var loginpass = $('#login-pass').val().trim(' ');

   // alert(loginemail);
   // alert(loginpass);

    firebase.auth().signInWithEmailAndPassword(loginemail, loginpass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });

    // window.location.href = "index.html";
    
   var user = firebase.auth().currentUser;
   var name, email, photoUrl, uid;

   if (user != null) {
//      name = user.displayName;
     email = user.email;
     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
   }
    
    firebase.database().ref().child('Users/').child(uid).on('value', snap => {
        $('#login-bt').replaceWith([
            '<li id="user-bt"><a href="#"><span><i class="fa fa-mortar-board"></i>' + snap.child('Name').val() + '</span></a></li>'
            ].join(' '));

        $('#signup-bt').replaceWith([
            '<li id="signout-bt"><a onclick="signOut()"><span><i class="fa fa-mortar-board"></i>Sign out</span></a></li>'
            ].join(' '));
    });

    
}

function signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
       $('#user-bt').replaceWith([
            '<li id="login-bt"><a href="Login.html"><span> <i class="fa fa-mortar-board"></i>Login</span></a></li>'
            ].join(' '));

        $('#signou-bt').replaceWith([
            '<li id="signup-bt"><a href="Registration.html"><span><i class="fa fa-mortar-board"></i>Sign up</span></a></li>'
            ].join(' '));

        // window.location.href = "index.html";

    }, function(error) {
      // An error happened.

    });
}