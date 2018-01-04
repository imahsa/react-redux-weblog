import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//very sim to connect helper

/** Redux Form is responsible for our forms STATE and VALIDATION
 *Field is used to represent a distict input that is going to be visible ro users
 *In Field, "name" specifies what piece of state this fiels is going to produce
 *Field is more like more intracting with data
 *But it does not know to show itself to the users
 *That's why we need component to have some JSX
 */
class PostsNew extends Component {
  renderField(field) {
    // ES6 Destructering
    const { meta: {touched, error} } = field;
    // Un Destructered version
    // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
         />
         <div className="text-help">
          {touched ? error : ''}
         </div>

      </div>
    );
  }
  // We shoulde handle onSubmit by our self
  // We should send our form data to the backend
  // Redux Forms does not handle this for us
  onSubmit(values) {
    console.log(values);
  }
  render(){
    const { handleSubmit } = this.props;

    return (
      <div>
        {/* on form Submition, first redux form will call handleSubmit
          then handleSubmit runs the form validation
          after thet if everything was ok will come here and runs
          whatever function that WE wrote for handleing form submition*/}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Tags"
            name="tags"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

// This function will be automatically called
// whenever user tryes to submit the form
// The "value" arg is, whatever the user has written in the form input fields
function validate(values) {
  const errors = {};

  // Validate the inputs from 'value'
  // These error properties should be the same as the Field "name" property
  // So in this way the validate function and the Field can communicate
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.tags) {
    errors.tags = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If the error object that is returned is empty
  // Redux forms assume there is o error with this form, and it's fine to submit
  return errors;
}
/**form: "Name of The Form" should be unique
 *So reduxForm does not merge all our forms states into one form state
 *By using this function
 *The reduxForm has the ability to directly communicate from this component to
 *our reducer
 **/
export default reduxForm({
  //validate: validate,
  validate,
  form: 'PostNewForm'
})(PostsNew);
