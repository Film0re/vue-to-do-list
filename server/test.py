#Create an array of 10 json objects, each wit hthe fields of a string status
#and a Date object startTime, a Date object endTime, and a string description

import json
import datetime
import random

#Create a list of 10 json objects
jsonList = []

#Create 10 json objects
for i in range(10):
    #Create a json object
    jsonObj = {}
    #Create a string status
    status = ""
    #Randomly choose a status
    if (random.randint(0,1) == 0):
        status = "success"
    else:
        status = "failure"
    #Create a Date object startTime
    startTime = datetime.datetime.now()
    #Create a Date object endTime
    endTime = datetime.datetime.now()
    #Create a string description
    description = "This is a description"
    #Add the fields to the json object
    jsonObj["status"] = status
    jsonObj["startTime"] = startTime
    jsonObj["endTime"] = endTime
    jsonObj["description"] = description
    #Add the json object to the list
    jsonList.append(jsonObj)

#Convert the list to a json object

print("hi")
#save to a file called data.json
with open('data.json', 'w') as outfile:
    json.dump(jsonList, outfile, default=str, indent=4)