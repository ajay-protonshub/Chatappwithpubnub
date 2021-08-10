import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ChatComponent from './ChatComponent'
import Auth from './Auth'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
    }
  />
);
const routing = (

  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <PrivateRoute path="/chat" component={ChatComponent} />
    </Switch>
  </Router>

)
ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
