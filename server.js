var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

http.createServer(function(request, response) {
    var action, form, formData, msg, publicPath, urlData, stringMsg;

	if(request.url === "/index"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url === "/"){
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url =="/example"){
		sendFileContent(response, "example.html", "text/html");
	}
	else if(request.url =="/post"){
		sendFileContent(response, "post.html", "text/html");
	}
	else if(request.url =="/video"){
		sendFileContent(response, "video.html", "text/html");
	}
  else if(request.url == "/login"){
    sendFileContent(response, "testlogin.html", "text/html");
  }
	else if(request.url == "/post1"){
    sendFileContent(response, "post1.html", "text/html");
  }
		else if(request.url == "/post2"){
    sendFileContent(response, "post2.html", "text/html");
  }
		else if(request.url == "/post3"){
    sendFileContent(response, "post3.html", "text/html");
  }	else if(request.url == "/post4"){
    sendFileContent(response, "post4.html", "text/html");
  }
	else if(request.url == "/mylist"){
    sendFileContent(response, "mylist.html", "text/html");
  }
	else if(request.url == "/success"){
		formData = '';
		
		console.log("call success");
				  return request.on('data', function(data) {
          formData += data;
						console.log(formData);
													          return request.on('end', function() {
            var user;
            user = qs.parse(formData);
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
	MongoClient.connect(dbUrl, function(err, db) {
		  if (err) throw err;
   var dbo = db.db("db");
   var query = stringMsg;
	dbo.collection("customers").find(query).toArray(function(err, result){
		var stringMsg = JSON.stringify(result);
				response.end(stringMsg);
	});
  dbo.collection("customers").find(query).toArray(function(err, result) {
		  if (err) throw err;
    console.log(result);
    db.close();
   });
}); 
																		});
});
  }
	else if(request.url == "/signupsite"){
    sendFileContent(response, "signup.html", "text/html");
  }
	else if(request.url == "/signup"){
				formData = '';
		        return request.on('data', function(data) {
          formData += data;
							          return request.on('end', function() {
            var user;
						var idnumber = Math.floor((Math.random()*100000)+1);
            user = qs.parse(formData);
            user.id = idnumber;
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
  MongoClient.connect(dbUrl, function(err, db) {
		  if (err) throw err;
   var dbo = db.db("db");
   var myobj = stringMsg;
		response.end("sign up success");
  dbo.collection("customers").insertOne(myobj, function(err, response) {
		  if (err) throw err;
		console.log("insert 1 item")
    db.close();
  });
}); 
						});
  });
	}
	else if(request.url == "/addlist"){
						formData = '';
		        return request.on('data', function(data) {
          formData += data;
					 return request.on('end', function() {
						var post;
            post = qs.parse(formData);
            msg = JSON.stringify(post);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
  MongoClient.connect(dbUrl, function(err, db) {
		  if (err) throw err;
   var dbo = db.db("db");
   var myobj = stringMsg;
		response.end("sucess");
  dbo.collection("falist").insertOne(myobj, function(err, response) {
		  if (err) throw err;
		console.log(response);
    db.close();
  });
}); 
						});
  });
	}
		else if(request.url == "/showlist"){
		formData = '';
		
		console.log("call success");
				  return request.on('data', function(data) {
          formData += data;
						console.log(formData);
													          return request.on('end', function() {
            var id;
						id = formData;
	MongoClient.connect(dbUrl, function(err, db) {
		  if (err) throw err;
   var dbo = db.db("db");
   var query = { myid: id };
  dbo.collection("falist").find(query).toArray(function(err, result) {
		  if (err) throw err;
    console.log(result);
		var stringMsg = JSON.stringify(result);
		response.end(stringMsg);
    db.close();
   });
}); 
																		});
});
  }
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
 	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
  	else if(/^\/[a-zA-Z0-9\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
    }
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
	}else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(5678)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}
