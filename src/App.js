import React, { Component } from 'react';
import College from './collge';
import Student from './student';
import Graph from './graph';
import ReactLoading from 'react-loading';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
const skills=["c","c++","java","python","webdev","appdev"];
const course=["btech","mtech","phd","bsc"];
class App extends Component 
{
  constructor(p)
  {
    super(p);
    this.state = 
    {
      col:[],
      std:[],
      cl:true,
      cc:false,
      gf:false,
      graph_city:[],
      graph_skills:[],
      graph_course:[],
      stylec:{backgroundColor: "#58b851",fontSize: "2vw"},
      style:{fontSize: "2vw"},
      stylep:{fontSize: "2vw"}
    }
    this.func=this.func.bind(this);
    this.cole=this.cole.bind(this);
    this.ste=this.ste.bind(this);
    this.grf=this.grf.bind(this);
    this.func();
  }
  async func() {
    const response = await fetch("https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/student-flnbc/service/college/incoming_webhook/college");
    const data = await response.json();
    for(var i=0;i<data.length;i++){
    this.setState({ col: this.state.col.concat(
           {
             "cid":data[i].cid.$numberInt,
             "name":data[i].name,
             "year":data[i].year.$numberInt,
            "location":data[i].city+", "+data[i].state+", "+data[i].country,
            "total":data[i].total.$numberInt,
            "course":data[i].course.join(", ")
            }
         )});}
    const respons=await fetch("https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/student-flnbc/service/student/incoming_webhook/webhook0");
    const dat = await respons.json();
    for(var i=0;i<dat.length;i++){
      this.setState({ std: this.state.std.concat(
             {
               "sid":dat[i].id.$numberInt,
               "name":dat[i].name,
               "year":dat[i].year.$numberInt,
               "cid":dat[i].cid.$numberInt,
               "skills":dat[i].skills.join(", ")
              }
           )});}
           for(var i=1;i<=10;i++)
           {
             this.setState({ graph_city: this.state.graph_city.concat(
               {
                 title: "City "+i,
                 value: this.state.col.filter((obj) => obj.location.split(", ")[0] === "City "+i).length,
                 color:'#' +(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)
               }
             )});
           }
           const arr=this.state.std.map(a => a.skills).join("|");
           skills.forEach((i)=>{
            this.setState({ graph_skills: this.state.graph_skills.concat(
              {
                title: i,
                value: arr.split(i).length - 1,
                color:'#' +(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)
              }
            )});
           });
    const ar=this.state.col.map(a => a.course).join("|");
           course.forEach((i)=>{
            this.setState({ graph_course: this.state.graph_course.concat(
              {
                title: i,
                value: ar.split(i).length - 1,
                color:'#' +(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)
              }
            )});
           });
    this.setState({cl:false});
}
cole()
{
  this.setState({cc:false,gf:false, stylec:{backgroundColor: "#58b851",fontSize: "2vw"},stylep:{fontSize: "2vw"},style:{fontSize: "2vw"}});
} 
ste()
{
  this.setState({cc:true,gf:false, stylec:{fontSize: "2vw"},stylep:{backgroundColor: "#58b851",fontSize: "2vw"},style:{fontSize: "2vw"}});
}
grf()
{
  this.setState({gf:true, stylec:{fontSize: "2vw"},stylep:{fontSize: "2vw"},style:{backgroundColor: "#58b851",fontSize: "2vw"}});
}
  render()
  {
    return(
      <div className="App">
        {this.state.cl||<Tabs style={{backgroundColor: "#9cd598", color:"#10230e"}} centered
      ><center><Tab label="Colleges" onClick={this.cole} style={this.state.stylec}/>
        <Tab label="Students" onClick={this.ste} style={this.state.stylep}/>
        <Tab label="Visualisations" onClick={this.grf} style={this.state.style}/></center></Tabs>}
        {!this.state.cl||<div style={{position:"absolute",top:"30%",left:"45%"}}>
         Loading <ReactLoading type="spokes" color="red" height={'120%'} width={'120%'}/></div>}<div style={{position:"absolute",top:"10%"}}>
       {this.state.cl||this.state.cc||this.state.gf||<College key={this.state} list={this.state.col}></College>}
       {this.state.cl||!this.state.cc||this.state.gf||<Student key={this.state} list={this.state.std}></Student>}
       {this.state.cl||!this.state.gf||<Graph col={this.state.col} std={this.state.std} data={this.state.graph_city} data2={this.state.graph_skills} data3={this.state.graph_course}></Graph>}</div>
      </div>
    );
  }
}

export default App;
