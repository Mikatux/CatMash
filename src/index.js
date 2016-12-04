import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';
firebase.initializeApp(firebaseConfig);
// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('root'))