import React, { Component } from 'react';
import MaterialTable from "material-table";
class College extends Component 
{
  constructor(p)
  {
    super(p);
    this.state = 
    {
       option: { search: true, paging: true, filtering: true, exportButton: true },
      columns:[
        {
          title: "College ID",
          field: "cid",
        },
        {
            title: "College Name",
            field: "name",
        },
        {
            title: "Year Founded",
            field: "year",
        },
        {
            title: "Location",
            field: "location",
        },
        {
            title: "Number of Students",
            field: "total",
        },
        {
            title: "Courses Offered",
            field: "course",
        },
      ]
    }
  }

  render()
  {
    return(
      <div className="App">
       <MaterialTable  title="College Details" data={this.props.list} columns={this.state.columns} options={this.state.option}/>
      </div>
    );
  }
}

export default College;