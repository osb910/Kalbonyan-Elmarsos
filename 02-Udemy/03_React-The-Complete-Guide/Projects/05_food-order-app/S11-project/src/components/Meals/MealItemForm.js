import {useState, useRef, useContext} from 'react';
import styled from 'styled-components';
import LanguageContext from '../../store/language-context';
import CartContext from '../../store/cart-context';
import Input from '../UI/Input';
import data from '../../store/content/Meals';

const StyledForm = styled.form`
  text-align: center;

  & button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.2em 1.5em;
    border-radius: 20px;
    font-weight: bold;
  }

  & button:hover,
  & button:active {
    background-color: #641e03;
    border-color: #641e03;
  }
`;
const MealItemForm = ({id, name, price}) => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];
  const amountRef = useRef();
  const cartCtx = useContext(CartContext);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const handleSubmit = evt => {
    evt.preventDefault();
    const amount = amountRef.current.value;
    const amountNum = amount;
    if (!amount.trim().length || amountNum < 1 || amountNum > 5) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    cartCtx.onAddItem({id, name, price, amount: amountNum});
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        ref={amountRef}
        label={content.amountDisplay}
        input={{
          id: 'amount' + id,
          type: 'number',
          step: '1',
          defaultValue: '1',
          lang: 'ar-EG',
        }}
      />
      <button>+ {content.addDisplay}</button>
      {!amountIsValid && <p>{content.invalidInput}</p>}
    </StyledForm>
  );
};

export default MealItemForm;
