import useInput from '../hooks/use-input';

const validateName = value => value.trim() !== '';
const validateEmail = value =>
  /^[-.\w%+]+@[-\w]+\.[A-Za-z]{2,4}(\.[A-Z-a-z]{2})?$/.test(value);

const BasicForm = props => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    handleValueChange: handleFirstNameChange,
    handleInputBlur: handleFirstNameBlur,
    reset: resetFirstNameInput,
  } = useInput(validateName);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    handleValueChange: handleLastNameChange,
    handleInputBlur: handleLastNameBlur,
    reset: resetLastNameInput,
  } = useInput(validateName);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;

  formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const handleFormSubmission = evt => {
    evt.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(firstName, lastName, email);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div className='control-group'>
        <div className={`form-control ${firstNameHasError && 'invalid'}`}>
          <label htmlFor='first-name'>First Name</label>
          <input
            type='text'
            id='first-name'
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameBlur}
            value={firstName}
          />
          {firstNameHasError && (
            <p className='error-text'>First Name must not be empty.</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor='last-name'>Last Name</label>
          <input
            type='text'
            id='last-name'
            onChange={handleLastNameChange}
            onBlur={handleLastNameBlur}
            value={lastName}
          />
          {lastNameHasError && (
            <p className='error-text'>Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={email}
        />
        {emailHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
