// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import PostList from './components/PostList';
import Protected from './components/Protected';
import Page from './components/Page';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route element={<Protected/>}>
          <Route path="/posts" element={<PostList />} />
        </Route>
          <Route path="/" element={<SignupForm />} />
          <Route path="/Page/:id" element={<Page />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
