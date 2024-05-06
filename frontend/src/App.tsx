import  React from 'react';
// router check
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './layouts/Test'
import Feed from './layouts/Feed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
