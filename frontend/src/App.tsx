import  React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './layouts/Test'
import Main from './layouts/Main'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={ <Test /> } />
        <Route path="/main" element={ <Main type="default" /> } />
        <Route path="/" element={ <Main type="default" /> } />
        <Route path="/c/:channel" element={ <Main type="channel" /> } />
        <Route path="/posts/:post" element={ <Main type="post" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
