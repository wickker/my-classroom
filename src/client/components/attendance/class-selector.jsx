import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "../all_styles.scss";

export default class ClassSelector extends React.Component {
  render() {
    let classes = "";
    let classesHTML = "";

    if (this.props.classes.length > 0) {
      classes = this.props.classes;
      classesHTML = classes.map((element, index) => {
        return (
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            key={index}
            value={element.id}
          >
            {element.title}
          </MenuItem>
        );
      });
    }

    const classSelected = this.props.classSelected
      ? this.props.classSelected
      : "";

    return (
      <FormControl className={styles.dropdown} fullWidth>
        <InputLabel style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}>
          Select Class
        </InputLabel>
        <Select
          style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
          onChange={this.props.findClassIdMatch}
          value={classSelected}
        >
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            disabled
          >
            Select Class
          </MenuItem>
          {classesHTML}
        </Select>
      </FormControl>
    );
  }
}
