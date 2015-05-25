import requests
import json

#Create unique platformID
f = open('platformID.txt', 'r+')
r = requests.get('http://sense-backend-vmcool09.c9.io/uniquePlatform')
f.write(r.content)
f.close()

import report
import sensor
