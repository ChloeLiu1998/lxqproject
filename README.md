# Assignment 1 - Agile Software Practice.
20086450 Xiaoqian Liu

## Overview.
There are three test block:food,staff,comment.
information about each food on the website, such as name,price and number of votes obtained. There is also information about each staff, such as name, position, gender, number and number of votes obtained. It can increase food and staff, obtain information about each food and employee, obtain information about single foods and staffs, vote on favorite food and staff, and can give your own comments on food and staffs.

## API endpoints.

+ GET/food - Get all food
+ GET/staff - Get all staff
+ GET/comment - Get all comment
+ GET/food/:id - Get specific food
+ GET/staff/:id - Get specific staff
+ POST/food - Add food
+ POST/staff - Add staff
+ POST/comment - Add comment
+ PUT/food/:id/vote - Increase the number of votes for a food 
+ PUT/staff/:id/vote - Increase the number of votes for a staff
+ DELETE/food/:is - Delete a food
+ DELETE/staff/:is - Delete a staff

## Data model.
![][datamodel]
## Sample Test execution.
GET /food 200 670.159 ms - 9209
      √ should return all the foods (746ms)
    GET /food/:id
      when the id is valid
        √ should return the matching food
      when the id is invalid
        √ should return the NOT found message
GET /food/9999 200 5.501 ms - 220
    POST /food
GET /food/5dc516671c9d440000acf21f 200 50.319 ms - 135
      when the id is valid
POST /food 200 86.031 ms - 117
        √ should return confirmation message and update datastore (113ms)
    DELETE /food/:id
      when the id is valid
(node:35816) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoose
js.com/docs/deprecations.html#-findandmodify-
DELETE /food/5dc5f0908122127a14a4d3a6 200 33.390 ms - 40
        √ should delete the matching food (47ms)
GET /food 200 30.206 ms - 9366
      when the id is invalid
        √ should return the NOT found message
DELETE /food/999 200 0.946 ms - 219
    PUT /food/:id/vote
      when the id is valid
PUT /food/5dc5f3a2fac9759c3c4d4de4/vote 200 47.194 ms - 133
        √ should return a message and the food upvoted by 1 (62ms)
GET /food/5dc5f3a2fac9759c3c4d4de4 200 20.173 ms - 160
      when the id is invalid
PUT /food/9999/vote 200 0.660 ms - 220
        √ should return a 404 and a message for invalid food id

  Staffs
    GET /staff
GET /staff 200 34.352 ms - 5467
      √ should return all the staffs (47ms)
    GET /staff/:id
      when the id is valid
        √ should return the matching staff
      when the id is invalid
        √ should return the NOT found message
    POST /staff
GET /staff/9999 200 4.583 ms - 222
      when the id is valid
GET /staff/5dc7cdda8ad3cd34ec7ce5e1 200 28.897 ms - 216
POST /staff 200 38.902 ms - 156
        √ should return confirmation message and update datastore (54ms)
    DELETE /staff/:id
      when the id is valid
DELETE /staff/5dc68c17e9db485c148fcf33 200 17.188 ms - 41
        √ should delete the matching staff
GET /staff 200 37.093 ms - 5686
      when the id is invalid
        √ should return the NOT found message
DELETE /staff/999 200 1.044 ms - 221
    PUT /staff/:id/vote
      when the id is valid
PUT /staff/5dc7cdda8ad3cd34ec7ce5e1/vote 200 42.778 ms - 166
        √ should return a message and the staff upvoted by 1 (53ms)
GET /staff/5dc7cdda8ad3cd34ec7ce5e1 200 20.558 ms - 216
      when the id is invalid
PUT /staff/9999/vote 200 0.978 ms - 222
        √ should return a 404 and a message for invalid staff id

  Comments
    GET /comment
GET /comment 200 24.755 ms - 2405
      √ should return all the comments
    POST /comment
      when the id is valid
POST /comment 200 28.163 ms - 111
        √ should return confirmation message and update datastore


  18 passing (2s)

## Extra features.
In the process of testing, there will be unexpected reasons for test failure. I need to constantly debug and change methods and test statements myself


[datamodel]: a.png