import React, { Component } from 'react';
import College from './collge';
import Student from './student';
class Drill extends Component 
{
  constructor(p)
  {
    super(p);
    this.main=this.main.bind(this);
  }
  
  main()
  {
    this.props.state.setState({show_chart:false});
  }
  render()
  {
    return(
      <div className="App">
    <center><button onClick={this.main}>BACK</button></center>
    {this.props.state.state.show_drill_city||<College key={this.props.state} list={this.props.state.state.drill_city_data}></College>}
    {this.props.state.state.show_drill_skill||<Student key={this.props.state} list={this.props.state.state.drill_skill_data}></Student>}
    {this.props.state.state.show_drill_course||<College key={this.props.state} list={this.props.state.state.drill_course_data}></College>}
      </div>
    );
  }
}

export default Drill;