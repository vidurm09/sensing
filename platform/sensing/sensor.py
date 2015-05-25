import requests
import json

def uniqueSensor(sensorType):
	f = open('platformID.txt', 'r+')
	platformID = f.read()
	print(platformID)
	f.close()
	f = open('sensors.txt', 'r+')
	if(f.read != ""):
		exists = False
		#NEED TO IMPLEMENT MULTIPLE SENSORS
		#for line in f:
		#	lineArr = line.split()
		#	exists = (lineArr[0] == sensorType)
		if(not exists):
			f.close()
			f = open('sensors.txt', 'a')
			package = {'platformID':platformID,'sensorType':sensorType}
			r = requests.get('http://sense-backend-vmcool09.c9.io/uniqueSensor', params=package)
			print(r.content)
			f.write(sensorType + ' = ' + r.content)
