import React from "react";
import styles from "./classes.scss";
import Eye from "../../svg/eye-regular.svg";

export default class SearchClasses extends React.Component {

  renderClasses = () => {
    if (this.props.classes.length > 0) {
      let classes = this.props.classes;
      let HTML = classes.map((element, index) => {
        let num = index + 1;
        return (
          <div className="row mt-3 mb-3" key={index}>
            <div className="col-sm">
              <span className="mr-3">{num}.</span>
              <img
                className={styles.avatar}
                src={element.image}
                alt="student display picture"
              />
              {element.title}
              <img
                id={element.id}
                src={Eye}
                className={styles.icon}
                onClick={this.props.getClass}
              />
            </div>
          </div>
        );
      });
      return HTML;
    }
  };

  render() {
    let classesDiv = this.renderClasses() || "";

    return <div>{classesDiv}</div>;
  }
}
