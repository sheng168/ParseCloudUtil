exports.check = function unique(request, response, fields) {
	console.log('master:' + request.master);
	console.log('object:' + request.object);
	console.log('user:' + request.user);

	var className = request.object.className;
	console.log('class:' + className);

	var query = new Parse.Query(className);

	for ( var i in fields) {
		console.log(i + ':' + fields[i] + ':' + request.object.get(fields[i]));
		query.equalTo(fields[i], request.object.get(fields[i]));
	}

	query.first({
		success : function(object) {
			if (object) {
				if (object.id == request.object.id) {
					response.success();
				} else {
					response.error(object.id + " already exists with same values.");
				}
			} else {
				response.success();
			}
		},
		error : function(error) {
			response.error("Could not validate uniqueness for this object.");
		}
	});
};

// request.object.existed()
