import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class ClassSelector extends React.Component {
  render() {
    let classes = "";
    let classesHTML = "";

    console.log(this.props.classes);

    if (this.props.classes.length > 0) {
      console.log("if loop");
      classes = this.props.classes;
      classesHTML = classes.map((element, index) => {
        return <MenuItem key={index} value={element.id}>{element.title}</MenuItem>;
      });
    }

    return (
      <FormControl fullWidth>
        <InputLabel>Select Class</InputLabel>
        <Select onChange={this.props.findClassIdMatch}>
          <MenuItem disabled>Select Class</MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  }
}
