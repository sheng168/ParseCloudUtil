exports.log = log;
function log(request) {
    console.log('master:' + request.master);
    console.log('object:' + request.object);
    console.log('user:' + request.user);
}

/*
 * set userField of request.object to request.user
 * if using master key, request.user will be undefined
 */
exports.audit = audit;
function audit(request, userField) {
    var obj = request.object;

    if (request.user) {
        obj.set(userField, request.user);
    } else if (request.master) {
        // allow from console or using master key
        console.log('master setting it to ' + obj.get(userField));
        if (! obj.get(userField)) {
            var user = new Parse.User();
            user.id = 'master';
            obj.set(userField, user);
        }
    } else {
        //    	console.log('should not be here');
        console.log('user not log in; remove field');
        // user not log in
        obj.unset(userField);
    }
}
