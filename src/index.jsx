import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import './index.css';
import Cases from './Cases';
import Dscr from './DSCR';
import Dsk8 from './DSK8';
import Cc from './CC';
import Dscivil from './DSCIVIL';
import Odycrim from './ODYCRIM';
import Odytraf from './ODYTRAF';
import GraphiQLClient from './GraphiQL';

Amplify.configure(awsmobile);

ReactDOM.render(
  <Router>
    <div className="navbar">
      <ul className="horizontal">
        <li>
          <NavLink to="/cases">All Cases</NavLink>
        </li>
        <li>
          <NavLink to="/dscr">DSCR</NavLink>
        </li>
        <li>
          <NavLink to="/dsk8">DSK8</NavLink>
        </li>
        <li>
          <NavLink to="/cc">CC</NavLink>
        </li>
        <li>
          <NavLink to="/dscivil">DSCIVIL</NavLink>
        </li>
        <li>
          <NavLink to="/odycrim">ODYCRIM</NavLink>
        </li>
        <li>
          <NavLink to="/odytraf">ODYTRAF</NavLink>
        </li>
        <li>
          <NavLink to="/graphql">GraphiQL</NavLink>
        </li>
      </ul>
    </div>
    <div className="content">
      <Route exact path="/" component={Cases} />
      <Route path="/cases" component={Cases} />
      <Route path="/dscr" component={Dscr} />
      <Route path="/dsk8" component={Dsk8} />
      <Route path="/cc" component={Cc} />
      <Route path="/dscivil" component={Dscivil} />
      <Route path="/odycrim" component={Odycrim} />
      <Route path="/odytraf" component={Odytraf} />
      <Route path="/graphql" component={GraphiQLClient} />
    </div>
  </Router>,
  document.getElementById('root')
);
