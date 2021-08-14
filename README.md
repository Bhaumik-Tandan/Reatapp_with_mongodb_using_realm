# COLLEGE DASHBOARD USING ReactJS

This is the sample project of how can we dirrectly connect
ReactJs with MongoDB database without the use of any kind of 
backend.


## Demo

When we open the site we come accross a loading screen like this

![3](https://user-images.githubusercontent.com/62440699/129433207-abc5552c-ae54-49d2-bb94-1b7c1b3e2e42.gif)

After the site has been loaded and data has been fetched by default it render us to the college tab in the page
where we can see the list of all the collges in an interactive table table

![image](https://user-images.githubusercontent.com/62440699/129433226-79d87ead-ae7b-4ce1-8491-0cee1aba3079.png)

We can switch through all the the three tabs by clicking on them.
In the visulisation an animation also has been added in the pie charts

![1](https://user-images.githubusercontent.com/62440699/129433352-e27269a4-75e6-4c87-bd43-892894a27825.gif)


We can drill down to any field by clicking on any segment in the pie chart
and all the rows of that segment will be displayed, as you can see that when we search for
city 9 so the number of pages did not get reduced in the bottom right because all the collges
displayed are from that city only whereas when we seached for btech so the number of pages got reduced.
We can also export the data in form of pdf or csv.

![React App - Google Chrome 2021-08-14 09-32-35](https://user-images.githubusercontent.com/62440699/129433550-d57202e1-c38d-4bfe-9ae4-d6f115d61a11.gif)


## Database feeding

The database has been feeding in MongoDB atlas using the code present in
https://github.com/Bhaumik-Tandan/Reatapp_with_mongodb_using_realm/blob/master/data_generation/college.js

https://github.com/Bhaumik-Tandan/Reatapp_with_mongodb_using_realm/blob/master/data_generation/student.js

You can add your own custom url in the url variable given.

## Database fetching

React cannot directly interact with the MongoDB database
So we need to create a data hook to do so.
We can do so by using Realm tab in MongoDB
![image](https://user-images.githubusercontent.com/62440699/129433838-27da8480-b6c0-4e15-be16-fb8f4b08df44.png)

I have created two webhooks one for fetching the collge data
with following script



```
exports = async function(payload, response) {
   const collection=context.services.get("mongodb-atlas").db("coldb").collection("col");
   let collist = await collection.find().toArray();
    return  collist;
};
```

And another to fetch the student data with the following code
```
  exports = async function(payload, response) {
     const collection=context.services.get("mongodb-atlas").db("coldb").collection("std");
   let collist = await collection.find().toArray();
    return  collist;
};
```
After creating the webhook go to the settings tab
![image](https://user-images.githubusercontent.com/62440699/129433944-fc8b788a-7abe-4de9-b5ec-e92aca07ea93.png)

And there you will find a link for your web hook, if you want you can also add 
authentication. Also make sure to choose edit HTTP method to GET if you want to fetch data
via get request.
![image](https://user-images.githubusercontent.com/62440699/129433963-dd64669b-d39d-4799-be06-f842020414d2.png)

My web urls are

https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/student-flnbc/service/college/incoming_webhook/college

https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/student-flnbc/service/student/incoming_webhook/webhook0

You can also refer to the video for more information
https://youtu.be/mrHNSanmqQ4?t=7379
