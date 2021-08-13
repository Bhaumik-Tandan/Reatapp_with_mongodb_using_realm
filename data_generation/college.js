var c = require('mongodb').MongoClient;
var url =//link;
const course=["btech","mtech","phd","bsc"];
c.connect(url, function(err, db) {
 if (err) throw err;
 var s = db.db("coldb");
 var co = [ ];
 for(var i=1;i<=100;i++)
 {
   var o={};
   o["cid"]=i;
   o["name"]="College " +i;
   o["year"]=Math.floor(Math.random()*10)+1990;
   const a=Math.floor(Math.random()*10)+1;
   o["city"]="City "+a;
   o["state"]="State "+a;
   o["country"]="Country "+a;
   o["total"]=100;
   const cs=[];
   const j=Math.floor(Math.random()*course.length)+1;
   for(var k=0;k<j;k++){
     const a=course[Math.floor(Math.random()*course.length)];
     if (cs.indexOf(a)!=-1)
     k--;
     else
     cs.push(a);
   }
   o["course"]=cs;
   co.push(o);
 }
 console.log(co);

 s.collection("col").insertMany(co, function(err, res) {
 if (err) throw err;
 console.log("(ii)" + res.insertedCount + " College data inserted\n");

 });
});


