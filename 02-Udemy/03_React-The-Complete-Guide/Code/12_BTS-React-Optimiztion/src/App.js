import React, {useState, useCallback} from 'react';
import Button from './components/UI/Button/Button';

import './App.css';
import DemoOutput from './components/UI/Button/Demo/DemoOutput';

const App = () => {
  const [paraVisible, setParaVisible] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  console.log('running');
  const handlePara = useCallback(() => {
    if (allowToggle) {
      setParaVisible(prev => !prev);
    }
  }, [allowToggle]);
  const handleAllowToggle = () => {
    setAllowToggle(true);
  };

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <DemoOutput show={paraVisible} />
      <Button onClick={handleAllowToggle}>Allow Toggling</Button>
      <Button onClick={handlePara}>Toggle Paragraph!</Button>
    </div>
  );
};

export default App;
