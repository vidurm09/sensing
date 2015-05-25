module.exports = function(fbref, uuidgenerator){
    module = {}
    
    var fb = new fbref("https://sense-firebase.firebaseio.com")
    module.fbinstance = fb
    
    module.demoFunction = function(){
        console.log("Hello World")
    }
    
    module.getUniquePlatformID = function(){
        var id = "platform-" + uuidgenerator.v1()
        fb.child(id).set("no sensors")
        return id
    }
    
    module.getUniqueSensorID = function(platform_identifier, type, callback){
        console.log("Platform: " + platform_identifier + ". Type: " + type)
        try{
            var id = "sensor-" + uuidgenerator.v1()
            fb.child(platform_identifier).once('value', function(snapshot) {
                var exists = (snapshot.val() !== null);
                if (exists){
                    fb.child(platform_identifier).child(id).set({"type": type, "data": "none"})
                    callback(id, 200)
                } else {
                    callback("Error: Invalid Platform ID: '" + platform_identifier + "'", 500)
                }
            });
        } catch (error) {
            callback("[ERROR!] Internal server error. Check your request parameters. Description: '" + error + "'", 500)
        }
    }
    
    module.pushToPlatformSensor = function(platform, sensor, data, time, callback) {
        try{
            fb.child(platform).child(sensor).once('value', function(snapshot) {
                var exists = (snapshot.val() !== null);
                if (exists){
                    fb.child(platform).child(sensor).child("data").child(time).set(data)
                    callback("Success", 200)
                } else {
                    callback("Error: Invalid Platform/Sensor ID Combo", 500)
                }
            });
        } catch (error) {
            callback("[ERROR!] Internal server error. Check your request parameters. Description: '" + error + "'", 500)
        }
    }
    
    return module
}