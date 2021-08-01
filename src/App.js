import React from 'react';
import './App.css';
import Header from "./features/Header/Header";
import Footer from "./features/Footer/Footer";
import {BrowserRouter as Router, Switch, Route, HashRouter} from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import BlogPage from "./page/BlogPage/BlogPage";
import BlogPageEdit from "./page/BlogEditPage/BlogEditPage";
import Blogs from "./page/Blogs/Blogs";
// import Tester from "./page/Tester/Tester"
import BlogContent from "./features/BlogContent/BlogContent"
import Login from "./page/Login/Login";
import Gallery from './page/Gallery/Gallery';
import Contact from "./page/Contact/Contact"

function App() {
  return (
    <div className="app">
      <Router>
      <Header />
        <Switch>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/sign-in">
            <Login />
            <Footer />
          </Route>
          <Route path="/blogs">
            <Blogs />
            <Footer />
          </Route>
          <Route path="/blog-page-edit/:id">
            <BlogPageEdit />
            <Footer />
          </Route>
          <Route path="/blog-page/:id">
            <BlogPage />
            <Footer />
          </Route>
          <Route path="/">
            <HomePage />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
