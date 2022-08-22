import styled from 'styled-components';

const AddUserForm = styled.form`
  width: 90%;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  & label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & input {
    font: inherit;
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.15rem;
    margin-bottom: 0.5rem;
  }

  & input:focus {
    outline: none;
    border-color: #4f005f;
  }
`;

export default AddUserForm;
