import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

import Nav from './components/nav'
import Auth from './views/auth'

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
    return (
      <div>
        {
          this.state.scriptLoaded ?
          <div>
          <Router>
            <div>
              <Nav/>

              <Route path="/" exact component={Auth} />
            </div>
          </Router>
          </div> :
          <p>Loading...</p>
        }
      </div>
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
