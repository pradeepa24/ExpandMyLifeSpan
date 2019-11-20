import React, { Component } from 'react';
import './login.css';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    updateCredential = (e) => {
       let cred = {...this.props.loggerInfo} 
       cred[e.target.name] = e.target.value;
      this.props.setLogin(cred);
    }
    submitLogin = (e) => {
        e.preventDefault();
        this.props.authenticateUser();
        setTimeout(() => {
            if(this.props.authenticatedFlag) {
                this.props.history.push("/home");
              }
        }, 250)
    }
 
    render() {
        return (
            <div className="login">
              <div className="login-content">
               <form>
                   <div className="field-groups">
                       <div className="fields">
                         <label>Username</label>
                         <input type="text"
                                name="userName"
                                value={this.props.loggerInfo.userName}
                                onChange={this.updateCredential}
                          />
                       </div>
                       <div className="fields">
                          <label>Password</label>
                          <input type="password"
                                 name="password"
                                 value={this.props.loggerInfo.password}
                                 onChange={this.updateCredential}
                           />      
                       </div>
                       <div className="submit">
                           <input type="submit"
                                  value="Submit"
                                  name="submit"
                                  onClick={this.submitLogin}
                            />
                       </div>
                   </div>
               </form>
               <div className="sign-up-content">
                   <p>Not registered yet?</p>
                   <Link to="/sign-up">Sign Up</Link>
               </div>
            </div>
         </div>
            
        )
    }
}
