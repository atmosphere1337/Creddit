import  React from 'react';
// router check
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './layouts/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
