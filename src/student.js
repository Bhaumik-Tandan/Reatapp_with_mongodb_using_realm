import React, { Component } from 'react';
import MaterialTable from "material-table";
class Student extends Component 
{
  constructor(p)
  {
    super(p);
    this.state=this.state = 
    {
       option: { search: true, paging: true, filtering: true, exportButton: true },
      columns:[
        {
          title: "Student ID",
          field: "sid",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Year Joined",
            field: "year",
        },
        {
            title: "College ID",
            field: "cid",
          },
        {
            title: "Skills",
            field: "skills",
        },
      ]
    }
  }
     

  render()
  {
    return(
      <div className="App">
         <MaterialTable title="Student Details" data={this.props.list} columns={this.state.columns} options={this.state.option}/>
      </div>
    );
  }
}

export default Student;