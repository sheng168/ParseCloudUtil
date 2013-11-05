var BusStop = Parse.Object.extend("BusStop");

// Check if stopId is set, and enforce uniqueness based on the stopId column.
Parse.Cloud.beforeSave("BusStop", function(request, response) {
  if (!request.object.get("stopId")) {
    response.error('A BusStop must have a stopId.');
  } else {
    var query = new Parse.Query(BusStop);
    query.equalTo("stopId", request.object.get("stopId"));
    query.first({
      success: function(object) {
        if (object) {
          response.error("A BusStop with this stopId already exists.");
        } else {
          response.success();
        }
      },
      error: function(error) {
        response.error("Could not validate uniqueness for this BusStop object.");
      }
    });
  }
});

// request.object.existed()
