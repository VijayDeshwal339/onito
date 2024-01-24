import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import Step1 from './form/Step1form';
import Step2 from './form/Step2form';
import DataTable from './components/DataTable';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/datatable" element={<DataTable />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
