import {useContext} from 'react';
import styled, {keyframes} from 'styled-components';
import Card from '../UI/Card';
import MealItem from './MealItem';
import LanguageContext from '../../store/language-context';
import data from '../../store/content/Meals';

const mealsAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledAvailableMeals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: ${mealsAppear} 1s ease-out forwards;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .rtl & ul li {
    font-size: 1.3rem;
  }
`;
const AvailableMeals = () => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];
  const mealsList = content.meals.map(props => (
    <MealItem {...props} key={props.id} />
  ));

  return (
    <StyledAvailableMeals>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </StyledAvailableMeals>
  );
};

export default AvailableMeals;
