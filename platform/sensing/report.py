import requests
import time
import json

def reportData(dataType, data, units):
	print("This data is of type: " + dataType + " and is " + str(data) + " " +  units)
	f = open('platformID.txt', 'r')
	platformID = f.read()
	f.close()
	f = open('sensors.txt', 'r')
	sensorID = f.read()
	f.close()
	sensorID = sensorID.split()
	sensorID = sensorID[len(sensorID)-1]
	payload = {'time':int(time.time()), 'data':data, 'dataType':dataType, 'platformID':platformID, 'sensorID' : sensorID}
	r = requests.post('http://sense-backend-vmcool09.c9.io/report', data=payload)

