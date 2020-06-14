import React from "react";
import bsCustomFileInput from "bs-custom-file-input";
import styles from "./students.scss";
import { CssBaseline } from "@material-ui/core";
var classNames = require("classnames");
const cx = classNames.bind(styles);

export default class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      document: "",
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  saveFile = (event) => {
    this.props.callback(event.target.value);
  }

  uploadFileFetch = (event) => {
    event.preventDefault();

    let cloudinary_url =
      "https://api.cloudinary.com/v1_1/dwoimiuph/image/upload";
    let cloudinary_upload_preset = "wh3xm7xt";

    let fileId = "inputFile";
    let fileGroup = document.getElementById(fileId);


    let file = fileGroup.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary_upload_preset);

    let myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };

    fetch(cloudinary_url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let inputURL = result.secure_url;
        console.log(inputURL);
        this.setState({ document: inputURL });
        this.props.callback(inputURL);
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    let fileId = "inputFile";

    const uploadButton = cx(styles.uploadButton, "input-group-text");

    const browseButton = cx(styles.browseButton, "custom-file-input");

    return (
      <div className="custom-file">
        <span>
          <input
            id={fileId}
            type="file"
            className={browseButton}
            name="document_prompt"
          />
          <label className="custom-file-label" htmlFor={fileId}>
            Choose File/ Input URL 
          </label>
          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span
                onClick={this.uploadFileFetch}
                className={uploadButton}
              >
                Upload
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="document"
              defaultValue={this.state.document}
              onChange={this.saveFile}
            />
          </div>
        </span>
      </div>
    );
  }
}
