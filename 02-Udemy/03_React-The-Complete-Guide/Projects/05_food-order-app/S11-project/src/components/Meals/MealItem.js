import {useContext} from 'react';
import styled from 'styled-components';
import LanguageContext from '../../store/language-context';
import {arCount} from '../../store/utils';
import MealItemForm from './MealItemForm';

const StyledMealItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem;

  :not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  & h3 {
    margin: 0 0 0.25rem 0;
  }

  .description {
    font-style: italic;
  }

  .rtl & .description {
    font-style: normal;
  }

  .price {
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
  }
`;

const MealItem = ({id, description, price, name}) => {
  const {lang} = useContext(LanguageContext);
  const formattedPrice =
    lang === 'ar'
      ? arCount(price, {
          sng: 'دولار',
          pair: 'دولاران',
          plr: 'دولارات',
          zero: 'صفر',
        })
      : `$${price.toFixed(2)}`;
  console.log();
  return (
    <StyledMealItem>
      <h3>{name}</h3>
      <div className='description'>{description}</div>
      <div className='price'>{formattedPrice}</div>
      <MealItemForm id={id} name={name} price={price} />
    </StyledMealItem>
  );
};

export default MealItem;
