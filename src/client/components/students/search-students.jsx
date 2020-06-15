import React from "react";
import styles from "../all_styles.scss";
import Eye from "../../svg/eye-regular.svg";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class SearchStudents extends React.Component {
  stuDiv = cx(styles.stu_div, "col-sm", "ml-3", "pl-0");

  renderStudents = () => {
    if (this.props.students && this.props.students.length > 0) {
      let students = this.props.students;
      let HTML = students.map((element, index) => {
        return (
          <div className="row mt-3 mb-3" key={index}>
            <div className={this.stuDiv}>
              <img
                className={styles.stu_avatar}
                src={element.image}
                alt="student display picture"
              />
              <span
                className={styles.stu_name}
                id={element.id}
                onClick={this.props.getStudent}
              >
                {element.name}
              </span>
            </div>
          </div>
        );
      });
      return HTML;
    }
  };

  render() {
    let studentsDiv = this.renderStudents() || "";

    return <div>{studentsDiv}</div>;
  }
}
