from flask import Blueprint
from flask import request
import json 
import csv


users = Blueprint('users', __name__)


#Listing Users
@users.route('/')
def userList():
    arr = []
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            arr.append(row)
    
    return json.dumps({'arr':arr,'message':'all users listed'}) if len(arr) > 0 else json.dumps({'arr':[],'message':'No user found'})


@users.route('/',methods=['POST'])
def createUser():
    #collect user details
    name = request.json['name']
    mobile = request.json['mobile']
    email = request.json['email']
    #current id
    id = 0
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            id = (row['id'])
    newId = int(id)+1

    #writing new data in csv file
    with open('data/users.csv','a') as csvfile:
        fieldnames = ['id','name','mobile','email']
        writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
        # writer.writeheader()
        writer.writerow({'id':newId,'name':name,'mobile':mobile,'email':email})
        return json.dumps({'message':'User Details Saved Successfully !','id':newId})


#find specific user 
@users.route('/<user_id>')
def showSpecificUser(user_id):
    #match user specific id and return data
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['id']) == int(user_id):
                return json.dumps({'arr':[row],'message':'user found'})
    return json.dumps({'arr':[],'message':'user not found'})


#find specific address:
@users.route('/<user_id>/address')
def findSpecificUserAddress(user_id):
    address = []
    with open('data/addresses.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['user_id']) == int(user_id):
                address.append(row)
            
    return json.dumps({'arr':address,'message':'address received'}) if len(address) > 0 else json.dumps({'arr':[],'message':'address not found'})


#write address for specific user:
@users.route('/<user_id>',methods=['POST'])
def createAddressForSpecificUser(user_id):

    #collecting data from json input
    add_1 = request.json['add_1']
    add_2 = request.json['add_2']
    city = request.json['city']
    pincode = request.json['pincode']

    #check for user is present
    isPresent = False
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['id']) == int(user_id):
                isPresent = True
                break
            
    if isPresent:
            #check for possible id from existing address id
            id = 0
            with open('data/addresses.csv') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    id = row['add_id']
            newId = int(id)+1

            #writing new address
            with open('data/addresses.csv','a') as csvfile:
                fieldnames = ['add_id','user_id','add_1','add_2','city','pincode']
                writer = csv.DictWriter(csvfile, fieldnames = fieldnames)
                # writer.writeheader()
                writer.writerow({'add_id':newId,'user_id':user_id,'add_1':add_1,'add_2':add_2,'city':city,'pincode':pincode})
                return json.dumps({'message':'Address Listed'})
    else:
        return json.dumps({'message':'User not present'})


#Edit Specific User
@users.route('/<user_id>',methods = ['PUT'])
def editSpecificUser(user_id):
    #updated data
    name = request.json['name']
    mobile = request.json['mobile']
    email = request.json['email']

    arr = []
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            arr.append(row)
    # print(arr)
    #finding and rewriting data
    isPresent = False
    with open('data/users.csv','w') as csvfile:
        fieldnames = ['id','name','mobile','email']
        writer = csv.DictWriter(csvfile,fieldnames = fieldnames)
        writer.writeheader()
        for i in range(len(arr)):
            if int(arr[i]['id']) == int(user_id):
                isPresent = True
                writer.writerow({'id':user_id,'name':name,'mobile':mobile,'email':email})
                continue
            writer.writerow({'id':arr[i]['id'],'name':arr[i]['name'],'mobile':arr[i]['mobile'],'email':arr[i]['email']})

    return json.dumps("User Updated") if isPresent else json.dumps('User Not Found')   


#Edit Specific Address
@users.route('/<user_id>/<address_id>',methods = ['PUT'])
def editSpecificAddress(user_id,address_id):

        #collecting data from json input
        add_1 = request.json['add_1']
        add_2 = request.json['add_2']
        city = request.json['city']
        pincode = request.json['pincode']

        #check for user is present
        isPresent = False
        with open('data/users.csv') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['id'] == user_id:
                    isPresent = True
                    break
            
        if isPresent:
            arr = []
            with open('data/addresses.csv') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    arr.append(row)

            print('address'+str(address_id)+'user'+str(user_id))
            with open('data/addresses.csv','w') as csvfile:
                fieldnames = ['add_id','user_id','add_1','add_2','city','pincode']
                writer = csv.DictWriter(csvfile,fieldnames = fieldnames)
                writer.writeheader()
                for i in range(len(arr)):
                    if int(arr[i]['add_id']) == int(address_id) and int(arr[i]['user_id']) == int(user_id):
                        print('reaching here')
                        writer.writerow({'add_id':arr[i]['add_id'],'user_id':arr[i]['user_id'],'add_1':add_1,'add_2':add_2,'city':city,'pincode':pincode})
                        continue
                    writer.writerow({'add_id':arr[i]['add_id'],'user_id':arr[i]['user_id'],'add_1':arr[i]['add_1'],'add_2':arr[i]['add_2'],'city':arr[i]['city'],'pincode':arr[i]['pincode']})

            return json.dumps({'message':'Address updated'})
        else:
            return json.dumps({'message':'User is not present'})


@users.route('/<user_id>',methods=['DELETE'])
def deleteSpecificUser(user_id):
    #creating user arr without this user
    arr = []
    with open('data/users.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['id']) == int(user_id):
                continue
            arr.append(row)

    
    #creating address arr without addresses of this user
    add = []
    with open('data/addresses.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['user_id']) == int(user_id):
                continue
            add.append(row)


    #rewriting users
    with open('data/users.csv','w') as csvfile:
            fieldnames = ['id','name','mobile','email']
            writer = csv.DictWriter(csvfile,fieldnames = fieldnames)
            writer.writeheader()
            for i in range(len(arr)):
                writer.writerow({'id':arr[i]['id'],'name':arr[i]['name'],'mobile':arr[i]['mobile'],'email':arr[i]['email']})

    #rewriting address
    with open('data/addresses.csv','w') as csvfile:
            fieldnames = ['add_id','user_id','add_1','add_2','city','pincode']
            writer = csv.DictWriter(csvfile,fieldnames = fieldnames)
            writer.writeheader()
            for i in range(len(add)):
                writer.writerow({'add_id':add[i]['add_id'],'user_id':add[i]['user_id'],'add_1':add[i]['add_1'],'add_2':add[i]['add_2'],'city':add[i]['city'],'pincode':add[i]['pincode']})

    return json.dumps('User Deleted')
            
    
        
@users.route('/<user_id>/<address_id>',methods=['DELETE'])
def deleteSpecificAddress(user_id,address_id):
 
    #creating address arr without addresses of this user
    add = []
    specificAddArr = [] #address arr for specific user
    with open('data/addresses.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if int(row['user_id']) == int(user_id) and int(row['add_id']) == int(address_id):
                continue
            #append after deleting
            if int(row['user_id']) == int(user_id):
                specificAddArr.append(row)
            add.append(row)

    #rewriting address
    with open('data/addresses.csv','w') as csvfile:
            fieldnames = ['add_id','user_id','add_1','add_2','city','pincode']
            writer = csv.DictWriter(csvfile,fieldnames = fieldnames)
            writer.writeheader()
            for i in range(len(add)):
                writer.writerow({'add_id':add[i]['add_id'],'user_id':add[i]['user_id'],'add_1':add[i]['add_1'],'add_2':add[i]['add_2'],'city':add[i]['city'],'pincode':add[i]['pincode']})

    return json.dumps({'arr':specificAddArr,'message':'Address Deleted'})
            