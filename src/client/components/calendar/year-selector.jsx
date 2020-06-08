import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./calendar.scss";

export default class YearSelector extends React.Component {
  render() {
    return (
      <TextField
        label="Select Year"
        type="number"
        defaultValue={this.props.selectedYear}
        onChange={this.props.selectYear}
        className={styles.calendar_form}
      />
    );
  }
}
