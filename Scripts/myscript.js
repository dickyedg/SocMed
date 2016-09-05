var username;
var email;
var description;
var photo;
var indexpost = 0;
var like = [];

$(document).ready(function(){
(function showUp(){
/*localStorage.removeItem("user");
		localStorage.removeItem("email");
		localStorage.removeItem("description");
*/
var path = window.location.pathname;
var page = path.split("/").pop();
var stringg = "Profile.html";
console.log(page);
if(page == stringg){
	document.getElementById("photo").innerHTML = "<img src=\"../Image/" + localStorage.photo + "\" alt=\"profilepicture\">";
	document.getElementById("user").innerHTML = "Nama : " + localStorage.username;
	document.getElementById("email").innerHTML = "Email : " + localStorage.email;
	document.getElementById("description").innerHTML = "Deskripsi: " + localStorage.description; 
}


if(sessionStorage.login){
	var x = document.getElementsByClassName("nav navbar-nav");
		x[0].innerHTML = "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" id=\"sembunyi\">Menu<span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"Home.html\">Home</a></li><li><a href=\"Profile.html\">Profile</a></li><li><a href=\"#\" onclick=\"logout()\">Logout</a></li></ul></li>";
		document.getElementById("content").style.display = "initial";
		var d = new Date();
		var date = d.toDateString();
			$.getJSON("post.json", function(json) {
			$.each(json, function(index,value){
				var isi="<div id=\"post" +indexpost + "\" style=\"border-bottom:1px solid #000000\"><br><p><strong>" + value.username + "</strong><br><img src=\"../Image/" + value.username + ".png\" width=\"50\" height=\"50\"><br><br>"+ value.post + "</p><br>" + date + "<br><button onclick=\"likes(" + indexpost + ")\">Like this</button><br><p id=\"likepost" + indexpost+ "\">Total Like: " + value.like + "</p></div>";
				document.getElementById("posts").innerHTML += isi;
				var toInt = parseInt(value.like);
				like.push(toInt);
				indexpost += 1;
				
			});
		});
		
		if(localStorage.pos){
		/*localStorage.removeItem("pos");
		localStorage.removeItem("like");
		*/
		
			var pict = document.getElementById("profilepicture").src;
			var slist1 = localStorage.pos.split(';');
			var slist2 = localStorage.like.split(';');	

			for(var i=0;i<slist1.length;i++){
				var isi = "<div id=\"post" +indexpost + "\" style=\"border-bottom:1px solid #000000\"><br><p><strong>" + username + "</strong><br><img src=\"" + pict + "\" width=\"50\" height=\"50\"><br><br>"+ slist1[i] + "</p><br>" + date + "<br><button onclick=\"likes(" + indexpost + ")\">Like this</button><br><p id=\"likepost" + indexpost+ "\">Total Like: " + slist2[i] + "</p></div>";
				document.getElementById("posts").innerHTML += isi;
				var toInt = parseInt(slist2[i].like);
				like.push(toInt);
				indexpost += 1;
			}
		}
		
}
})()

});


function submit(){
					var login=false;
					$.ajax({
						url: "users.xml", 
						dataType: "xml",
						success: function(data){
							user = $("#username").val();
							pass = $("#password").val();
							$(data).find('user').each(function(){
							if(user == $(this).find('username').text() && pass==$(this).find('password').text()){
							username = $(this).find('name').text();
							name = $(this).find('username').text();
							email = $(this).find('email').text();
							description = $(this).find('description').text();
							photo = $(this).find('photo').text();
							var x = document.getElementsByClassName("nav navbar-nav");
							x[0].innerHTML = "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" id=\"sembunyi\">Menu<span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a href=\"Home.html\">Home</a></li><li><a href=\"Profile.html\">Profile</a></li><li><a href=\"#\" onclick=\"logout()\">Logout</a></li></ul></li>";
							document.getElementById("continue").style.display = "none";
							var d = new Date();
							var date = d.toDateString();
							$.getJSON("post.json", function(json) {
							$.each(json, function(index,value){
							var isi="<div id=\"post" +indexpost + "\" style=\"border-bottom:1px solid #000000\"><br><p><strong>" + value.username + "</strong><br><img src=\"../Image/" + value.username + ".png\" width=\"50\" height=\"50\"><br><br>"+ value.post + "</p><br>" + date + "<br><button onclick=\"likes(" + indexpost + ")\">Like this</button><br><p id=\"likepost" + indexpost+ "\">Total Like: " + value.like + "</p></div>";
							document.getElementById("posts").innerHTML += isi;
							var toInt = parseInt(value.like);
							like.push(toInt);
							indexpost += 1;
								});
							});
							document.getElementById("content").style.display = "initial";
							sessionStorage.setItem('login',true);
							login=true;
							}
							localStorage.setItem("name", name);
							localStorage.setItem("username",username);
							localStorage.setItem("email",email);
							localStorage.setItem("description",description);
							localStorage.setItem("photo",photo);
							
							
						});
						if(!login){
								alert("Username dan password salah!");
							}
						},
						error: function(xhr){
							alert(xhr.status);
						}
					});
				
}

function likes(index){
	var getId = "likepost" + index;
	var likenow = like[index] + 1;
	like[index] = likenow;
	/*for (var i = 0; i < likess.length; i++) {
	if(i === index){  //look for match with name
       persons[i].age += 2;  //add two
       break;  //exit loop since you found the person
   }
}


localStorage.setItem("likess", JSON.stringify(likess));
*/
	document.getElementById(getId).innerHTML = "Total Likes: " + likenow;		
}

function PostThis(){
	var d = new Date();
	var date = d.toDateString();
	var pict = localStorage.photo;
	var val = $("#postingan").val();
	var isi = "<div id=\"post" +indexpost + "\" style=\"border-bottom:1px solid #000000\"><br><p><strong>" + localStorage.name + "</strong><br><img src=\"../Image/"+ pict +"\" width=\"50\" height=\"50\"><br><br>"+ val + "</p><br>" + date + "<br><button onclick=\"likes(" + indexpost + ")\">Like this</button><br><p id=\"likepost" + indexpost+ "\">Total Like: " + 0 + "</p></div>";
	like.push(0);
	indexpost +=1;
	document.getElementById("posts").innerHTML += isi;
	document.getElementById("postingan").value = "";
	
		if (localStorage.pos) {
			localStorage.setItem('pos',localStorage.pos+';'+val);
			localStorage.setItem('like',localStorage.like+';'+like[like.length-1]);
		}else{
			localStorage.setItem('pos',val);
			localStorage.setItem('like',like[like.length-1]);
		}
	/*
	if (localStorage.pos) {
		localStorage.setItem('post',localStorage.pos+';'+isi);
	}else{
		localStorage.setItem('post',isi);
	}
	*/
}

function logout(){
	var x = document.getElementsByClassName("nav navbar-nav");
	x[0].innerHTML =  "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" id=\"sembunyi\">Sign In <span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><label>Username: <input id=\"username\" type=\"text\" size=\"25\"></label><label>Password: <input id=\"password\" type=\"password\" size=\"25\"></label><button id=\"submit\" onclick=\"submit()\">Submit</button></li></ul></li>";
	document.getElementById("continue").style.display = "initial";
	document.getElementById("content").style.display = "none";
	sessionStorage.removeItem('login');
	localStorage.removeItem("username");
							localStorage.removeItem("email");
							localStorage.removeItem("description");
							localStorage.removeItem("photo");
}