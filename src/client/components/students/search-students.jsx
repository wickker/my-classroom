import React from "react";
import styles from "./students.scss";
import Button from '@material-ui/core/Button';
import Eye from "../../svg/eye-regular.svg"

export default class SearchStudents extends React.Component {
  renderStudents = () => {
    if (this.props.students.length > 0) {
      let students = this.props.students;
      let HTML = students.map((element, index) => {
        let num = index + 1;
        // let id = "stu-" + element.id;
        return (
          <div className="row mt-3 mb-3" key={index}>
            <div className="col-sm">
              <span className="mr-3">{num}.</span>
              <img className={styles.avatar} src={element.image} alt="student display picture" />
              {element.name}
              <img id={element.id} src={Eye} className={styles.icon} onClick={this.props.getStudent} />
            </div>
          </div>
        );
      });
      return HTML;
    }
  };

  render() {

    let studentsDiv = this.renderStudents() || "";

    return (<div>
      {studentsDiv}
    </div>);;
  }
}
