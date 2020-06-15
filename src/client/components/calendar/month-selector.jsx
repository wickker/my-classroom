import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "../all_styles.scss";

export default class MonthSelector extends React.Component {
  render() {
    return (
      <FormControl className={styles.dropdown}>
        <InputLabel>Select Month</InputLabel>
        <Select
          value={this.props.selectedMonth}
          onChange={this.props.selectMonth}
          className={styles.dropdown}
          style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
        >
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={1}
          >
            January
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={2}
          >
            February
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={3}
          >
            March
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={4}
          >
            April
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={5}
          >
            May
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={6}
          >
            June
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={7}
          >
            July
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={8}
          >
            August
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={9}
          >
            September
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={10}
          >
            October
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={11}
          >
            November
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Quicksand", letterSpacing: "1px" }}
            className={styles.dropdown}
            value={12}
          >
            December
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
}
