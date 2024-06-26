import  React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from 'other/Test'
import Main from 'Main'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={ <Test /> } />
        <Route path="/main" element={ <Main type="default" /> } />
        <Route path="/" element={ <Main type="default" /> } />
        <Route path="/c" element={ <Main type="many_channels" /> } />
        <Route path="/c/:channel/" element={ <Main type="channel" /> } />
        <Route path="/c/:channel/newpost" element={ <Main type="new_post" /> } />
        <Route path="/c/:channel/moderator" element={ <Main type="moderator" /> } />
        <Route path="/c/:channel/posts/:post" element={ <Main type="read_post" /> } />
        <Route path="/settings" element={ <Main type="usersettings" /> } />
        <Route path="/user/:username" element={ <Main type="userprofile" /> } />
        <Route path="/admin" element={ <Main type="admin" /> } />
        <Route path="/createchannel" element={ <Main type="create_channel" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
