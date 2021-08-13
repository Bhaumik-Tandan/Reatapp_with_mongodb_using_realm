import React, { Component } from 'react';
import './graph.css';
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
  }

  render()
  {
    return(
      <div className="App grid-container">
      <PieChart className="grid-item" key={this.props.data} label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }} data={this.props.data} ></PieChart>
      <PieChart className="grid-item" key={this.props.data2} data={this.props.data2} label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }}></PieChart>
     <PieChart className="grid-item"  key={this.props.data3} data={this.props.data3} label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }} ></PieChart>
      </div>
    );
  }
}

export default Graph;