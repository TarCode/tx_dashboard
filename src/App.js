import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import { configureStore } from './store'

import './App.css';

import Nav from './components/nav'
import Land from './views/land'
import Auth from './views/auth'
import RegisterCompany from './views/register-company'
import Register from './views/register'
import Home from './views/home'
import Users from './views/users'
import Transactions from './views/transactions'

const store = configureStore()

class App extends Component {
  state = {
    scriptLoaded: false
  }
  componentDidMount() {
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", () => {
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", () => {
        this.setState({ scriptLoaded: true })
      })
    })
  }
  
  render() {

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    return (
      <Provider store={store}>
        <div>
          {
            this.state.scriptLoaded ?
            <div>
            <Router>
              <div>
                 {
                  token && user ?
                  <div>
                    <Route path='*' component={Nav}/>
                    <div className='body'>
                      <Route exact path='/' component={Home}/>
                      <Route exact path='/users' component={Users}/>
                      <Route exact path='/transactions' component={Transactions}/>
                    </div>
                  </div> :
                  <div >
                    <div>
                      <Route path="/" exact component={Land} />
                      <Route path="/login" exact component={Auth} />
                      <Route path="/register" exact component={Register} />
                      <Route path="/company/register" exact component={RegisterCompany} />
                    </div>
                  </div>
                }
              </div>
            </Router>
            </div> :
            null
          }
        </div>
      </Provider>
    );
  }
}

function loadScript(url, callback){

  let script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState){  //IE
      script.onreadystatechange = function(){
          if (script.readyState === "loaded" ||
                  script.readyState === "complete"){
              script.onreadystatechange = null;
              callback();
          }
      };
  } else {  //Others
      script.onload = function(){
          callback();
      };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

export default App;
