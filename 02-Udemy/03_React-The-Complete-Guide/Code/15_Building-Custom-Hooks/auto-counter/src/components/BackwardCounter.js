import useCounter from '../hooks/use-counter';

import Card from './Card';

const BackwardCounter = () => {
  const counter = useCounter({decr: false});

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
