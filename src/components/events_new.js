import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { postEvent } from "../actions";

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <div>
        <TextField
          hintText={label}
          floatingLabelText={label}
          floatingLabelFixed={true}
          errorText={touched && error}
          type={type}
          {...input}
          fullWidth={true}
        />
      </div>
    );
  }

  async onSubmit(values) {
    await this.props.postEvent(values);
    //console.log(this.props)
    //console.log(this.props.history)
    console.log(this.context);
    console.log(this.context.history);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const styles = {
      margin: 12,
    };

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="Title"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="Body"
              name="body"
              type="text"
              component={this.renderField}
            />
          </div>
          <RaisedButton
            label="Submit"
            type="submit"
            primary={true}
            disabled={pristine || submitting || invalid}
            style={styles}
          />
          <RaisedButton label="Cancel" primary={false} href="/" />
        </form>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = { postEvent };
const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "Enter a title, please.";
  if (!values.body) errors.body = "Enter a body, please.";

  return errors;
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: "eventNewForm" })(EventsNew));
