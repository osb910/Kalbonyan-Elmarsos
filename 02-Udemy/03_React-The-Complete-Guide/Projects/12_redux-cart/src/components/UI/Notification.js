import styled from 'styled-components';

const StyledNotification = styled.section`
  width: 100%;
  height: 3rem;
  background-color: #1a8ed1;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 10%;
  align-items: center;
  color: white;

  & h2,
  & p {
    font-size: 1rem;
    margin: 0;
  }

  .error {
    background-color: #690000;
  }

  .success {
    background-color: #1ad1b9;
  }
`;

const Notification = props => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = 'error';
  }
  if (props.status === 'success') {
    specialClasses = 'success';
  }

  // const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <StyledNotification className={specialClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </StyledNotification>
  );
};

export default Notification;
