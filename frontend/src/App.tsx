import  React from 'react';
// router check
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './layouts/Test'
import Main from './layouts/Main'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
