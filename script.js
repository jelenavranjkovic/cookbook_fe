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

						divTitle.innerHTML = posts[i].title;
						divContent.innerHTML = posts[i].content;

						divContainer.append(divTitle);
						divContainer.append(divContent);

						recipeDiv.append(divContainer);

						divTitle.classList.add('titleStyle');
						divContent.classList.add('contentStyle');
						divContainer.classList.add('containerStyle');
						recipeDiv.classList.add('recipeDivStyle');
					}
					if(localStorage.getItem('userId') != null && localStorage.getItem('level') == 3) {
						var button = document.getElementById('createRecipeButton');
						button.classList.remove('hiddenButton');
						var input = document.getElementById('newPost');
						input.classList.remove('hiddenButton');
					}
				}
		  };
			request.open("GET", "http://localhost:3000/getAllPosts/type/RECIPE", true);
			request.send();
		}

		function getCommentsForPosts(id){
			window.location.href = "blog_detail.html?id=" + id;
		}

		function onBlogDetailLoad() {
			const urlParams = new URLSearchParams(window.location.search);
			const id = urlParams.get('id');
			var request = new XMLHttpRequest();
		  request.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
						var blogDetails = JSON.parse(this.response);
						console.log(blogDetails);
						document.getElementById('title').innerHTML = blogDetails.title;
						document.getElementById('content').innerHTML = blogDetails.content;
						var komDiv = document.getElementById('komentarPrikaz');
						var komentar = blogDetails.comments;
						for(var i = 0; i < komentar.length; i++) {
							var divDate = document.createElement('div');
							var divContent = document.createElement('div');
							var divContainer = document.createElement('div');
							var divButton = document.createElement('div');
							divDate.innerHTML = komentar[i].date;
							divContent.innerHTML = komentar[i].content;

							divContainer.append(divDate);
							divContainer.append(divContent);
							divContainer.append(divButton);

							komDiv.append(divContainer);

							divDate.classList.add('titleStyle');
							divContent.classList.add('contentStyle');
							divContainer.classList.add('containerStyle');

							komDiv.classList.add('blogDivStyle');
						}
						if (localStorage.getItem('userId') != null) {
							var button = document.getElementById('newCommentButton');
							button.classList.remove('hiddenButton');
							var input = document.getElementById('newCommentInput');
							input.classList.remove('hiddenButton');
						}
				}
			}
			request.open("GET", "http://localhost:3000/post/id/" + id, true);
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
						var divButton = document.createElement('div');

						var buttonHtml = '<button onclick=getCommentsForPosts(' + posts[i].id + ')>Read more &Gt;</button>';
						divButton.innerHTML = buttonHtml;

						divTitle.innerHTML = posts[i].title;
						divContent.innerHTML = posts[i].content;

						divContainer.append(divTitle);
						divContainer.append(divContent);
						divContainer.append(divButton);

						blogDiv.append(divContainer);

						divTitle.classList.add('titleStyle');
						divContent.classList.add('contentStyle');
						divContainer.classList.add('containerStyle');
						blogDiv.classList.add('blogDivStyle');
					}

					if(localStorage.getItem('userId') != null && localStorage.getItem('level') == 3) {
						var button = document.getElementById('blogButton');
						button.classList.remove('hiddenButton');
						var input = document.getElementById('newPostTitle');
						input.classList.remove('hiddenButton');
						var input2 = document.getElementById('newPostContent');
						input2.classList.remove('hiddenButton');
					}
				}
		  };
			request.open("GET", "http://localhost:3000/getAllPosts/type/BLOG", true);
			request.send();

		}

		function createPost(type){ //NE RADI KOD ZA OVU FUNKCIJU, PROVERI
			var title = document.getElementById("newPostTitle").value;
			var content = document.getElementById("newPostContent").value;
			var creator = localStorage.getItem('userId');

			var requestBody = {type : type, title: title, content: content, creator: creator}; // sta ovde dodati??

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 201){
					location.reload();
				}
			};
			xhttp.open("POST", "http://localhost:3000/post", true);
			xhttp.setRequestHeader('Content-Type', 'application/json')
			xhttp.send(JSON.stringify(requestBody));
		}

		function createComm() {
				var comment = document.getElementById('newCommentInput').value;
				var userId = localStorage.getItem('userId');
				console.log(comment);
				console.log(userId);
				var body = {content: comment, userId: userId};
				console.log(body);
				const urlParams = new URLSearchParams(window.location.search);
				const id = urlParams.get('id');
				console.log(id);
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function(){
					if(this.readyState == 4 && this.status == 201){
						location.reload();
					}
				};
				xhttp.open("POST", "http://localhost:3000/post/id/" + id + "/createComment", true);
				xhttp.setRequestHeader('Content-Type', 'application/json')
				xhttp.send(JSON.stringify(body));
		}

		function tryLogin(){
			var username = document.getElementById("login-form-username").value;
			var password = document.getElementById("login-form-password").value;

			var requestBody = {username : username, password : password};

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){

					var serverResponse = JSON.parse(xhttp.response);
					/*document.getElementById("poruka").innerHTML = serverResponse.Message; //ne prikazuje*/

					hideLogin();
					localStorage.setItem('userId', serverResponse.id);
					localStorage.setItem('username', serverResponse.username);
					localStorage.setItem('level', serverResponse.level);
					window.location.href = "index.html"

				} else {
					document.getElementById("poruka").innerHTML = "Pogrešno ime ili lozinka. Molimo Vas pokušajte ponovo."
				}
			};
			xhttp.open("POST", "http://localhost:3000/login", true);
			xhttp.setRequestHeader('Content-Type', 'application/json')
			xhttp.send(JSON.stringify(requestBody));
		}
