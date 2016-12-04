import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('root'));


// Uncomment to add new cat in bdd
/*
import sampleData from '../cats';
import FirebaseFunction from './Core/Firebase';
console.log(sampleData)
FirebaseFunction.importCatsInFirebase(sampleData);

// */