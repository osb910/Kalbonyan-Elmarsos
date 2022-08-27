import useInput from '../hooks/use-input';

const SimpleInput = props => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    handleValueChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    reset: resetNameInput,
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    reset: resetEmailInput,
  } = useInput(value =>
    /^[-.\w%+]+@[-\w]+\.[A-Za-z]{2,4}(\.[A-Z-a-z]{2})?$/.test(value)
  );

  let formIsValid = false;

  formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const handleFormSubmission = evt => {
    evt.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div className={`form-control ${nameInputHasError && 'invalid'}`}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className={`form-control ${emailInputHasError && 'invalid'}`}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
