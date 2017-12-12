var appRouter = function(app) {
	app.get("/admin/directory/v1/users", function(req, res) {
		var fs = require('fs');

		fs.readFile('Users.txt', 'utf8', function(err, data) {  
		    if (err) throw err;
		    res.send(JSON.parse(data));
		});    
	});
		app.get("/admin/directory/v1/rango", function(req, res) {
		var totalusers = 100000;
		var maxResults = 100;
		var startUser = 0;
		var endUser = 0;
 		if((req.query.maxResults) && (!isNaN(parseFloat(req.query.maxResults))))
		{
			maxResults = Math.min(Math.max( parseInt(req.query.maxResults), 100), 500);
		}
		if((req.query.pageToken) && (!isNaN(parseFloat(req.query.pageToken))))
		{
			startUser = Math.min(parseInt(req.query.pageToken), totalusers);
		}
		endUser = Math.min(startUser + maxResults, totalusers); 
		
		
    		res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
		res.write(' { "kind": "admin#directory#users", "etag": "\\"asdfasdgregrtsussdfgsdfg\\"", "users": [ ');   
		
            for(i=startUser; i<endUser; i++)
			{
				res.write('{ "kind": "admin#directory#user",  "id": "');
				res.write(i.toString());
				res.write('", "etag": "\\"cCp_kEtRu66enfbKyanZyrFQNAw/g6Za93vYw2GHoKCbWeBs1zvR37Y\\"", "primaryEmail": "GoogleUser');
				res.write(i.toString());
				res.write('@testdomain.com", "name": { "givenName": "Google", "familyName": "GoogleUser');
				res.write(i.toString());
				res.write('" }, "isAdmin": false, "isDelegatedAdmin": false,  "creationTime": "2017-12-11T16:22:56.000Z",  "customerId": "1234567",  "orgUnitPath": "/",  "isMailboxSetup": false  }');
				if (i < endUser - 1)
				{
					res.write(',');
				}
			}
			if(endUser < totalusers)
			{
				res.write('], "nextPageToken": ' + endUser.toString() + '}');

			}
			else
			{
				res.write(']}');
			}
		res.end();
	});
}

module.exports = appRouter;
