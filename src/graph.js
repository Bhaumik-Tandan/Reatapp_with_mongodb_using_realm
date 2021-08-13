import React, { Component } from 'react';
import './graph.css';
import Drill from "./drilldown";
import ReactLoading from 'react-loading';
import { PieChart } from 'react-minimal-pie-chart';
const defaultLabelStyle = {
  fontSize: '0.4vw',
  fontFamily: 'Helvetica'
};
const skills=["c","c++","java","python","webdev","appdev"];
const course=["btech","mtech","phd","bsc"];
class Graph extends Component 
{
  constructor(p)
  {
    super(p);
    this.state={
      show_chart:false,
      hide:false,
      drill_city_data:[],
      show_drill_city:true,
      show_drill_skill:true,
      drill_skill_data:[],
      drill_course_data:[],
      show_drill_course:true,
    }
    this.drill_city=this.drill_city.bind(this);
    this.drill_skill=this.drill_skill.bind(this);
    this.main=this.main.bind(this);
    this.drill_course=this.drill_course.bind(this);
  }
  async drill_course(e)
  {
    this.setState({drill_course_data:[],hide:true});
    for(var i=0;i<this.props.col.length;i++)
    {
      const arr=await this.props.col[i].course.split(", ").indexOf(course[e]);
      if(arr!=-1)
      this.setState({drill_course_data:this.state.drill_course_data.concat(this.props.col[i])});
    }
    this.setState({show_chart:true,show_drill_city:true,show_drill_skill:true,hide:false,show_drill_course:false});
  }
 async drill_city(e)
  {
    this.setState({drill_city_data:[],hide:true});
  for(var i=0;i<this.props.col.length;i++)
    {
      const a=await this.props.col[i].location.split(", ")[0];
      if(a=="City "+(e+1))
      this.setState({drill_city_data:this.state.drill_city_data.concat(this.props.col[i])});
    }
    this.setState({show_chart:true,show_drill_city:false,show_drill_skill:true,hide:false,show_drill_course:true});
  }
  async drill_skill(e)
  {
    this.setState({drill_skill_data:[],hide:true});
    for(var i=0;i<this.props.std.length;i++)
    {
      const arr=await this.props.std[i].skills.split(", ").indexOf(skills[e]);
      if(arr!=-1)
      this.setState({drill_skill_data:this.state.drill_skill_data.concat(this.props.std[i])});
    }
    this.setState({show_chart:true,show_drill_city:true,show_drill_skill:false,hide:false,show_drill_course:true});
  }
  main()
  {
    this.setState({show_chart:false,show_drill_city:true,show_drill_skill:true});
  }
  render()
  {
    return(
      <div className="App">
        {!this.state.hide||<div style={{position:"absolute",top:"30%",left:"45%"}}>
         Loading <ReactLoading type="spokes" color="red" height={'120%'} width={'120%'}/></div>}
       {this.state.hide|| <>
        <br/>
        {!this.state.show_chart||<Drill state={this}></Drill>}
        {this.state.show_chart||<div className="grid-container">
      <PieChart  className="grid-item" key={this.props.data} label={({ dataEntry }) => dataEntry.title} onClick={(e, segmentIndex) => this.drill_city(segmentIndex)} animate={true} lineWidth={70}
        labelStyle={{
          ...defaultLabelStyle,
        }} data={this.props.data} ></PieChart>
        <PieChart className="grid-item" key={this.props.data2} data={this.props.data2} label={({ dataEntry }) => dataEntry.title} onClick={(e, segmentIndex) => this.drill_skill(segmentIndex)} animate={true} lineWidth={70}
        labelStyle={{
          ...defaultLabelStyle,
        }}></PieChart>
    <PieChart className="grid-item"  key={this.props.data3} data={this.props.data3} label={({ dataEntry }) => dataEntry.title} onClick={(e, segmentIndex) => this.drill_course(segmentIndex)} animate={true} lineWidth={70}
        labelStyle={{
          ...defaultLabelStyle,
        }} ></PieChart>
      </div>}
      </>}
      </div>
    );
  }
}

export default Graph;