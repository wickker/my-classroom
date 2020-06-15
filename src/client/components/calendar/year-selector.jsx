import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "../all_styles.scss";
import InputLabel from "@material-ui/core/InputLabel";

export default class YearSelector extends React.Component {
  render() {
    return (
      <TextField
        label="Select Year"
        type="number"
        defaultValue={this.props.selectedYear}
        onChange={this.props.selectYear}
        className={styles.dropdown}
        style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
        InputProps={{
          style: {
            fontFamily: "Quicksand",
            letterSpacing: "1px",
          },
        }}
      />
    );
  }
}
