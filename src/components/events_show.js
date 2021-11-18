import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { getEvent, deleteEvent, putEvent } from "../actions";

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
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

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = {
      margin: 12
    }
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
            style={style}
          />
          <RaisedButton label="Cancel" primary={false} href="/" style={style} />
          <RaisedButton label="Delete" secondary={true}  style={style} onClick={this.onDeleteClick} />
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, state };
};
const mapDispatchToProps = { getEvent, deleteEvent, putEvent };
const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "Enter a title, please.";
  if (!values.body) errors.body = "Enter a body, please.";

  return errors;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(
    EventsShow
  )
);
