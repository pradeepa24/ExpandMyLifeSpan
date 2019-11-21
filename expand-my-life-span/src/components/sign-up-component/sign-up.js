import React, { Component } from 'react';
import './sign-up.css';
import { create } from 'domain';

export default class SignUp extends Component {
    updateLogger = (e) => {
        let createdCredential = {...this.props.loggerInfo}
        createdCredential[e.target.name] = e.target.value;
        this.props.setLogin(createdCredential);
    }
   create = (e) => {
      e.preventDefault();
      this.props.createAccount();
      setTimeout(() => {
          console.log(this.props.authenticatedFlag);
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
                              onChange={this.updateLogger}
                        />
                     </div>
                     <div className="fields">
                        <label>Password</label>
                        <input type="password"
                               name="password"
                               value={this.props.loggerInfo.password}
                               onChange={this.updateLogger}
                         />      
                     </div>
                     <div className="submit">
                         <input type="submit"
                                value="Create"
                                name="submit"
                                onClick={this.create}
                          />
                     </div>
                 </div>
             </form>
          </div>
            </div>
            
        )
    }
}
