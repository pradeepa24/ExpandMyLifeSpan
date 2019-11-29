import React, { Component } from 'react';
import './password-reset.css';

export default class PasswordReset extends Component {
    updatePassword = (e) =>{
        this.props.setPassword(e.target.value)
    }
    updateConfirmPassword = (e) =>{
        this.props.setConfirmPassword(e.target.value);
    }
    updateUserName = (e) =>{
        let cred = {...this.props.loggerInfo} 
        cred.userName = e.target.value;
        this.props.setLogin(cred);
    }
    changePassword = (e) =>{
        e.preventDefault();
        console.log(this.props.loggerInfo)
            if(this.props.password === this.props.confirmPassword){
                let cred = {...this.props.loggerInfo} 
                cred.password = this.props.password;
                console.log(cred)
                this.props.setLogin(cred);
                setTimeout(()=>{
                    console.log(this.props.loggerInfo)
                    let logger = this.props.loginCredentials.find(user => user.userName === this.props.loggerInfo.userName);
                    console.log(this.props.loginCredentials)
                    console.log(this.props.loggerInfo.userName)
                    console.log(this.props.loggerInfo.password)
                    console.log(logger)
                    console.log(logger.password)
                     this.props.updateCredential(logger);
                },500)
                
            //  let log = {}
              
            //     this.props.setLogin(log)
                        this.props.history.push("/");
                    
            }
      
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
                                placeholder="user name"
                                name="userName"
                                value={this.props.loggerInfo.userName}
                                onChange={this.updateUserName}
                          />
                          
                       </div>
                       <div className="fields">
                         <label>New Password</label>
                         <input type="password"
                                placeholder="new Password"
                                name="password"
                                value={this.props.password}
                                onChange={this.updatePassword}
                          />
                          
                       </div>
                       
                       <div className="fields">
                          <label>Confirm Password</label>
                          <input type="password"
                                 placeholder="confirm Password"
                                 name="confirmPassword"
                                 value={this.props.confirmPassword}
                                 onChange={this.updateConfirmPassword}
                           /> 
                            
                       </div>
                       
                       <div className="submit">
                           <input type="submit"
                                  value="Change"
                                  name="change"
                                  onClick={this.changePassword}
                            />
                       </div>
                   </div>
               </form>
               </div> 
            </div>
        )
    }
}
