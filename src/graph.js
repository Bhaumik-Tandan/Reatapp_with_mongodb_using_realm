import React, { Component } from 'react';
import './graph.css';
import Drill from "./drilldown";
import { PieChart } from 'react-minimal-pie-chart';
const defaultLabelStyle = {
  fontSize: '0.4vw',
  fontFamily: 'sans-serif',
};
class Graph extends Component 
{
  constructor(p)
  {
    super(p);
    this.state={
      show_chart:false,
      drill_city_data:[],
      show_drill_city:true
    }
    this.drill_city=this.drill_city.bind(this);
    this.drill_skill=this.drill_skill.bind(this);
    this.main=this.main.bind(this);
  }
 async drill_city(e)
  {
    this.setState({drill_city_data:[]});
  for(var i=0;i<this.props.col.length;i++)
    {
      const a=await this.props.col[i].location.split(", ")[0];
      if(a=="City "+(e+1))
      this.setState({drill_city_data:this.state.drill_city_data.concat(this.props.col[i])});
    }
    this.setState({show_chart:true,show_drill_city:false});
  }
  async drill_skill(e)
  {
    console.log(e);
  }
  main()
  {
    this.setState({show_chart:false,show_drill_city:true});
  }
  render()
  {
    return(
      <div className="App">
        <br/>
        {!this.state.show_chart||<Drill state={this}></Drill>}
        {this.state.show_chart||<div className="grid-container">
      <PieChart className="grid-item" key={this.props.data} label={({ dataEntry }) => dataEntry.title} onClick={(e, segmentIndex) => this.drill_city(segmentIndex)}
        labelStyle={{
          ...defaultLabelStyle,
        }} data={this.props.data} ></PieChart>
        <PieChart className="grid-item" key={this.props.data2} data={this.props.data2} label={({ dataEntry }) => dataEntry.title} onClick={(e, segmentIndex) => this.drill_skill(segmentIndex)}
        labelStyle={{
          ...defaultLabelStyle,
        }}></PieChart>
    <PieChart className="grid-item"  key={this.props.data3} data={this.props.data3} label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }} ></PieChart>
      </div>}
      </div>
    );
  }
}

export default Graph;