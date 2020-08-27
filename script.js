		function login(){
			var formDiv = document.getElementById("login-form");
			formDiv.classList.remove("login-hidden");
		}
		
		function hideLogin(){
			var formDiv = document.getElementById("login-form");
			formDiv.classList.add("login-hidden");
		}
		
		function getAllPosts(){
			
			var request = new XMLHttpRequest();
			request.addEventListener("load", getAllPosts);
  			request.open("GET", "http://localhost:3000/getAllPosts", true);
			request.send();
			
			document.getElementById("receptiPrikaz").innerHTML = this.response;
			
			/*var myObj = JSON.parse(this.response);
			document.getElementById("receptiPrikaz").innerHTML = myObj.name;*/
			
			/*for(var i=0; i<this.response.length; i++){
				console.log(this.response[i]);
			}*/
			
            /*for(let index = 0; index < this.response.rows.length; index++) {
                var newRow = $("<tr>");
                var cols = "";
                var firstname = '';
                var lastname = '';
                var gender = '';
                cols += '<td> '+ this.response.rows[index].firstname +'</td>';
                cols += '<td> '+ this.response.rows[index].lastname +'</td>';
                cols += '<td> '+ this.response.rows[index].gender+'</td>';                
                newRow.append(cols);
                $("#tableData .tbody").append(newRow); 
        	}*/
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