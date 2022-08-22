import styled from 'styled-components';

const StyledForm = styled.section`
  .rtl & label {
    font-size: 1.25rem;
    font-family: Lotus;
  }

  & .group {
    margin-bottom: 0.8em;
  }
  @media all and (min-width: 480px) {
    padding: 60px 0;

    & form {
      margin: 0 auto;
      max-width: 320px;
    }
  }
`;

export default StyledForm;
