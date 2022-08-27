import {useState, useEffect} from 'react';
const useCounter = ({decr} = {decr: true}) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => (decr ? prev + 1 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [decr]);

  return counter;
};

export default useCounter;
