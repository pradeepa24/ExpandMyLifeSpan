import React, { Component } from 'react';
import './login.css';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    updateCredential = (e) => {
       let cred = {...this.props.loggerInfo} 
       cred[e.target.name] = e.target.value;
      this.props.setLogin(cred);
      if(e.target.name === "userName"){
          this.props.checkUserNm(this.props.loggerInfo.userName);
          setTimeout(()=>{
            this.props.checkPswd(this.props.loggerInfo.password);
        },500)
      } else{
              if(this.props.loggerInfo.userName === ''){
                this.props.checkUserNm(this.props.loggerInfo.userName);
              }
              this.props.checkPswd(this.props.loggerInfo.password);
      }
    }
    submitLogin = (e) => {
        e.preventDefault();
        this.props.authenticateUser();
        setTimeout(() => {
            console.log(this.props.authenticatedFlag)
            if(this.props.authenticatedFlag) {
                this.props.history.push("/home");
              }
        }, 750)
    }
 displayValidMsgPswd = () =>{
   return (
       <span>{this.props.passwordErrMsg}</span>
   )
 }
 displayValidMsgUser =() =>{
    return (
        <span>{this.props.userNmErrMsg}</span>
    )
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
                                placeholder="User name"
                                name="userName"
                                value={this.props.loggerInfo.userName}
                                onChange={this.updateCredential}
                          />
                          
                       </div>
                       <span>{this.displayValidMsgUser()}</span>
                       <div className="fields">
                          <label>Password</label>
                          <input type="password"
                                 placeholder="Password"
                                 name="password"
                                 value={this.props.loggerInfo.password}
                                 onChange={this.updateCredential}
                           /> 
                            
                       </div>
                       <span>{this.displayValidMsgPswd()}</span>   
                       <div className="submit">
                           {/* <input type="submit"
                                  value="Submit"
                                  name="submit"
                                  onClick={this.submitLogin}
                                  disabled={this.props.isValidForm}
                            /> */}
                            <button type="submit" name="submit" 
                                   className="submit"
                                  onClick={this.submitLogin}
                                  disabled={!this.props.isValidForm} >Submit
                            </button>
                       </div>
                   </div>
               </form>
              
                   
               <div className="sign-up-content">
               <Link to="/reset">Forgot Password?Reset</Link>
               <div>
               <p>Not registered yet?</p>
                   <Link to="/sign-up">Sign Up</Link>
               </div>
                  
               </div>
            </div>
         </div>
            
        )
    }
}
