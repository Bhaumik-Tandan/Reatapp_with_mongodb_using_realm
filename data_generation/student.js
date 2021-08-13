var c = require('mongodb').MongoClient;
var url = //link;
const skills=["c","c++","java","python","webdev","appdev"]
c.connect(url, function(err, db) {
 if (err) throw err;
 var s = db.db("coldb");
 var co = [ ];
 for(var i=1;i<=100;i++)
 {
   for(var p=1;p<=100;p++){
   var o={};
   o["id"]=p;
   o["name"]="Student " +p;
   o["year"]=Math.floor(Math.random()*6)+2015;
   const a=Math.floor(Math.random()*500);
   o["cid"]=i;
   const cs=[];
   const j=Math.floor(Math.random()*skills.length)+1;
   for(var k=0;k<j;k++){
    const a=skills[Math.floor(Math.random()*skills.length)];
    if (cs.indexOf(a)!=-1)
    k--;
    else
    cs.push(a);
   }
   o["skills"]=cs;
   co.push(o);
   }
 }
 console.log(co);

s.collection("std").insertMany(co, function(err, res) {
 if (err) throw err;
 console.log("(ii)" + res.insertedCount + " Students data inserted\n");

 });
});