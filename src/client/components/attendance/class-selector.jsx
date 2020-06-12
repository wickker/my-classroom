import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class ClassSelector extends React.Component {
  render() {
    let classes = "";
    let classesHTML = "";

    if (this.props.classes.length > 0) {
      classes = this.props.classes;
      classesHTML = classes.map((element, index) => {
        return <MenuItem key={index} value={element.id}>{element.title}</MenuItem>;
      });
    }

    const classSelected = this.props.classSelected ? this.props.classSelected : "";

    return (
      <FormControl fullWidth>
        <InputLabel>Select Class</InputLabel>
        <Select onChange={this.props.findClassIdMatch} value={classSelected}>
          <MenuItem disabled>Select Class</MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  }
}
