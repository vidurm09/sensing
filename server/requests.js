module.exports = function(app, firebase){
    app.get("/", function(req, res){
        res.send('Hello World');
        firebase.demoFunction()
    })
    app.post('/report',function(req,res){
        var time=req.body.time;
        var data=req.body.data;
        var platform=req.body.platformID;
        var sensor=req.body.sensorID;
        console.log("Time:" + time + ", Data:" + data + ", Platform:" + platform + ", Sensor:" + sensor);
        firebase.pushToPlatformSensor(platform, sensor, data, time, function(body, status){
            res.status(status).send(body)
        })
    });
    app.get("/uniquePlatform", function(req,res) {
        res.send(firebase.getUniquePlatformID()) 
    });
    app.get("/uniqueSensor", function(req, res){
        var p=req.query.platformID;
        var s=req.query.sensorType;
        firebase.getUniqueSensorID(p, s, function(response, code){
            res.status(code).send(response)
        })
    });
}
