		function login(){
			var formDiv = document.getElementById("login-form");
			formDiv.classList.remove("login-hidden");
		}

		function hideLogin(){
			var formDiv = document.getElementById("login-form");
			formDiv.classList.add("login-hidden");
			document.getElementById('poruka').innerHTML = '';
			document.getElementById('login-form-username').value = '';
			document.getElementById('login-form-password').value = '';
		}

		function getAllRecipes(){
			var request = new XMLHttpRequest();
		  request.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
					var posts = JSON.parse(this.response);
					var recipeDiv = document.getElementById('receptiPrikaz');
					for(var i = 0; i < posts.length; i++) {
						console.log(posts[i]);
						
						var divTitle = document.createElement('div');
						var divContent = document.createElement('div');
						var divContainer = document.createElement('div');
						
						divTitle.innerHTML = 'Title:' + posts[i].title;
						divContent.innerHTML = 'Content: ' + posts[i].content;
						
						divContainer.append(divTitle);
						divContainer.append(divContent);
						
						recipeDiv.append(divContainer);
						
						divTitle.classList.add('titleStyle');
						divContent.classList.add('contentStyle');
						divContainer.classList.add('containerStyle');
						recipeDiv.classList.add('recipeDivStyle');
					}
				}
		  };
			request.open("GET", "http://localhost:3000/getAllPosts/type/RECIPE", true);
			request.send();
		}

		function getAllBlogs(){
			var request = new XMLHttpRequest();
		  request.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
					var posts = JSON.parse(this.response);
					var blogDiv = document.getElementById('blogPrikaz');
					for(var i = 0; i < posts.length; i++) {
						console.log(posts[i]);
						var divTitle = document.createElement('div');
						var divContent = document.createElement('div');
						var divContainer = document.createElement('div');
						
						divTitle.innerHTML = 'Title:' + posts[i].title;
						divContent.innerHTML = 'Content: ' + posts[i].content;
						
						divContainer.append(divTitle);
						divContainer.append(divContent);
						
						blogDiv.append(divContainer);
						
						divTitle.classList.add('titleStyle');
						divContent.classList.add('contentStyle');
						divContainer.classList.add('containerStyle');
						blogDiv.classList.add('blogDivStyle');
					}
				}
		  };
			
			request.open("GET", "http://localhost:3000/getAllPosts/type/BLOG", true);
			request.send();
		}

		function tryLogin(){
			var username = document.getElementById("login-form-username").value;
			var password = document.getElementById("login-form-password").value;

			var requestBody = {username : username, password : password};

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){

					/*var serverResponse = JSON.parse(xhttp.response);
					document.getElementById("poruka").innerHTML = serverResponse.Message; //ne prikazuje*/

					hideLogin();

				} else {
					document.getElementById("poruka").innerHTML = "Pogrešno ime ili lozinka. Molimo Vas pokušajte ponovo."
				}
			};
				xhttp.open("POST", "http://localhost:3000/login", true);
				xhttp.setRequestHeader('Content-Type', 'application/json')
				xhttp.send(JSON.stringify(requestBody));
		}
