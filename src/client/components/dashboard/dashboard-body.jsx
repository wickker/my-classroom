import React from "react";
import { isEmpty } from "lodash";

export default class DashboardBody extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("banana"));
    if (!!user && !isEmpty(user)) {
      this.setState({ user });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h4>Hello {this.state.user.name}!</h4>
        </div>
      </div>
    );
  }
}
