import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import College from './collge';
import Student from './student';
import Graph from './graph';
import ReactLoading from 'react-loading';
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
      gf:false
    }
    this.func=this.func.bind(this);
    this.func();
    this.cole=this.cole.bind(this);
    this.ste=this.ste.bind(this);
    this.grf=this.grf.bind(this);
  }
  async func() {
    const response = await fetch(process.env.REACT_APP_COL_URI);
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
    const respons=await fetch(process.env.REACT_APP_STD_URI);
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
    this.setState({cl:false});
}
cole()
{
  this.setState({cc:false,gf:false});
} 
ste()
{
  this.setState({cc:true,gf:false});
}
grf()
{
  this.setState({gf:true});
}
  render()
  {
    return(
      <div className="App">
        {this.state.cl||<button onClick={this.cole}>College</button>}
        {this.state.cl||<button onClick={this.ste}>Students</button>}
        {this.state.cl||<button onClick={this.grf}>Graphs</button>}
        {!this.state.cl||<div style={{position:"absolute",top:"30%",left:"45%"}}>
         Loading <ReactLoading type="spokes" color="red" height={'120%'} width={'120%'}/></div>}
       {this.state.cl||this.state.cc||this.state.gf||<College key={this.state} list={this}></College>}
       {this.state.cl||!this.state.cc||this.state.gf||<Student key={this.state} list={this}></Student>}
       {this.state.cl||!this.state.gf||<Graph></Graph>}
      </div>
    );
  }
}

export default App;
