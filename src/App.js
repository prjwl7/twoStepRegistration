import React, { useState, useEffect } from 'react';
import Step1Form from './components/Step1Form.tsx';
import Step2Form from './components/Step2Form.tsx';
import store from './store.ts';
import { Provider } from 'react-redux';

const App = () => {
  const [step, setStep] = useState(1); // Add step state
  const [countries, setCountries] = useState([]);
  const goToNextStep = () => {
    setStep(step + 1);
  };
  useEffect(() => {
    // Replace with your API call or static data if needed
    fetch('https://restcountries.com/v3.1/alpha/col')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  return (
    <Provider store={store}>
      <div>
        {step === 1 && <Step1Form goToNextStep={goToNextStep} />}
        {step === 2 && <Step2Form countries={countries} />}
      </div>
    </Provider>
  );
};

export default App;
