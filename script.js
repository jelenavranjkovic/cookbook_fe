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


		function getCommentsForRecipes(id){
					window.location.href = "recipe_detail.html?id=" + id;
				}

		function onRecipeDetailLoad() {
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

									var datum = komentar[i].date;
									var a = new Date(datum);
									var godina = a.getFullYear();
									var mesec = a.getMonth() + 1;
									var dan = a.getDate();
									var sat = a.getHours() + 2;
									var minut = a.getMinutes();
									if(minut < 10){
											minut = '0' + minut;

									}
									var fullDatum = dan + '.' + mesec +  '.' + godina +  ' ' + sat +  ':' + minut;
									console.log(fullDatum);

									divDate.innerHTML = fullDatum;
									divContent.innerHTML = komentar[i].content;

									var divUser = document.createElement('div');
									divUser = komentar[i].user_id;
									if(divUser == 1){
										divUser = "pera";
									}
									if(divUser == 2){
										divUser = "mika";
									}
									if(divUser == 3){
										divUser = "zika";
									}
									divContainer.append(divUser);

									divContainer.append(divDate);
									divContainer.append(divContent);
									divContainer.append(divButton);

									if (localStorage.getItem('userId') != null && localStorage.getItem('level') == 3) {
										var divButtonDelete = document.createElement('div');
										var buttonDeleteHtml = '<button class=blogButton onclick=deleteComment(' + komentar[i].id + ')>Obriši komentar</button>';
										divButtonDelete.innerHTML = buttonDeleteHtml;
										divContainer.append(divButtonDelete);
									}

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
									var divNewCommentStyle = document.getElementById('newCommentStyle');
									divNewCommentStyle.classList.remove('hiddenButton');
								}
						}
					}
					request.open("GET", "http://localhost:3000/post/id/" + id, true);
					request.send();
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
						var divButton = document.createElement('div');

						var buttonHtml = '<button class=blogButton onclick=getCommentsForRecipes(' + posts[i].id + ')>Čitaj više &Gt;</button>';
						divButton.innerHTML = buttonHtml;

						divTitle.innerHTML = posts[i].title;
						divContent.innerHTML = posts[i].content;

						divContainer.append(divTitle);
						divContainer.append(divContent);
						divContainer.append(divButton);

						recipeDiv.append(divContainer);

						divTitle.classList.add('titleStyle');
						divContent.classList.add('contentStyle');
						divContainer.classList.add('containerStyle');
						recipeDiv.classList.add('recipeDivStyle');
					}
					if(localStorage.getItem('userId') != null && localStorage.getItem('level') == 3) {
						var button = document.getElementById('blogButton');
						button.classList.remove('hiddenButton');
						var input = document.getElementById('newPostTitle');
						input.classList.remove('hiddenButton');
						var input2 = document.getElementById('newPostContent');
						input2.classList.remove('hiddenButton');
						var divNewPostStyle = document.getElementById('newPostStyle');
						divNewPostStyle.classList.remove('hiddenButton');
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

							var datum = komentar[i].date;
							var a = new Date(datum);
							var godina = a.getFullYear();
							var mesec = a.getMonth() + 1;
							var dan = a.getDate();
							var sat = a.getHours() + 2;
							var minut = a.getMinutes();
							if(minut < 10){
									minut = '0' + minut;

							}
							var fullDatum = dan + '.' + mesec +  '.' + godina +  ' ' + sat +  ':' + minut;
							console.log(fullDatum);

							divDate.innerHTML = fullDatum;
							divContent.innerHTML = komentar[i].content;

							var divUser = document.createElement('div');
							divUser = komentar[i].user_id;
							if(divUser == 1){
								divUser = "pera";
							}
							if(divUser == 2){
								divUser = "mika";
							}
							if(divUser == 3){
								divUser = "zika";
							}
							divContainer.append(divUser);

							divContainer.append(divDate);
							divContainer.append(divContent);
							divContainer.append(divButton);

							if (localStorage.getItem('userId') != null && localStorage.getItem('level') == 3) {
								var divButtonDelete = document.createElement('div');
								var buttonDeleteHtml = '<button class=blogButton onclick=deleteComment(' + komentar[i].id + ')>Obriši komentar</button>';
								divButtonDelete.innerHTML = buttonDeleteHtml;
								divContainer.append(divButtonDelete);
							}

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
							var divNewCommentStyle = document.getElementById('newCommentStyle');
							divNewCommentStyle.classList.remove('hiddenButton');
						}
				}
			}
			request.open("GET", "http://localhost:3000/post/id/" + id, true);
			request.send();
		}

		function deleteComment(id) {
			console.log(id);
			var request = new XMLHttpRequest();
	  	request.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200){
					location.reload();
				}
			}
			var body = {id : id};
			request.open("DELETE", "http://localhost:3000/comment", true);
			request.setRequestHeader('Content-Type', 'application/json')
			request.send(JSON.stringify(body));
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

						var buttonHtml = '<button class=blogButton onclick=getCommentsForPosts(' + posts[i].id + ')>Čitaj više &Gt;</button>';
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
						var divNewPostStyle = document.getElementById('newPostStyle');
						divNewPostStyle.classList.remove('hiddenButton');
					}
				}
		  };
			request.open("GET", "http://localhost:3000/getAllPosts/type/BLOG", true);
			request.send();

		}

		function createPost(type){
			var title = document.getElementById("newPostTitle").value;
			var content = document.getElementById("newPostContent").value;
			var creator = localStorage.getItem('userId');

			var requestBody = {type : type, title: title, content: content, creator: creator};
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 201){
					location.reload();
					document.getElementById('newPostTitle').value = '';
					document.getElementById('newPostContent').value = '';
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
						document.getElementById('newCommentInput').value = '';
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

		function logout() {
			window.localStorage.clear();
  		window.location.reload(true);
  		window.location.replace('/');
			window.location.href = "index.html"
		}
