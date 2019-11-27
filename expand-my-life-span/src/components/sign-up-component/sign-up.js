import React, { Component } from 'react';
import './sign-up.css';
// import { create } from 'domain';


export default class SignUp extends Component {
    updateLogger = (e) => {
        let createdCredential = {...this.props.loggerInfo}
        console.log(createdCredential)
        createdCredential[e.target.name] = e.target.value;
        createdCredential['date']=new Date().toDateString();
        this.props.setLogin(createdCredential);
    }
    updateAvatar = (link) =>{
        console.log(link)
      let credAvatar = {...this.props.loggerInfo}
      console.log(credAvatar)
      credAvatar.avatar = link;
      credAvatar.caloriePerDay = this.props.calorieInTakePerDay;
      credAvatar.date = new Date().toDateString();
      this.props.setLogin(credAvatar);
    }
   create = (e) => {
      e.preventDefault();
      setTimeout(()=>{
          console.log(this.props.loggerInfo)
        this.props.createAccount();
        this.props.authenticateUser();
          console.log(this.props.authenticatedFlag);
        
    },500)
    
    setTimeout(() => {
        if(this.props.authenticatedFlag) {
            this.props.history.push("/home");
          }
    }, 2000)
   }
    render() {
        return (
            <div className="login">
             <div className="login-content">
             <form>
                 <div className="field-groups">
                 <div className="fields">
                       <label>First name</label>
                       <input type="text"
                              name="firstName"
                              value={this.props.loggerInfo.firstName}
                              onChange={this.updateLogger}
                        />
                         </div>
                        <div className="fields">
                       <label>Last name</label>
                       <input type="text"
                              name="lastName"
                              value={this.props.loggerInfo.lastName}
                              onChange={this.updateLogger}
                        />
                         </div>
                        <div className="fields">
                       <label>Email</label>
                       <input type="email"
                              name="email"
                              value={this.props.loggerInfo.email}
                              onChange={this.updateLogger}
                        />
                         </div>
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
                     <div className="fields">
                        <label>Secret Question</label>
                        <input type="text"
                               name="question"
                               value={this.props.loggerInfo.question}
                               onChange={this.updateLogger}
                         />      
                     </div>
                     <div className="fields">
                        <label>Answer</label>
                        <input type="password"
                               name="answer"
                               value={this.props.loggerInfo.answer}
                               onChange={this.updateLogger}
                         />      
                     </div>
                   
                     {/* <div className="avatar-wrapper"> */}
                     <div className="avatar-fields">
                     <label>Choose Avatar</label>
                     <div>
                     <label className="avatars">
                     <input type="radio"  onChange={()=>this.updateAvatar("https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png")}/>
                     <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" alt="profileAvatars"/>
                     </label>
                     <label className="avatars">

                     <input type="radio"  onChange={()=>this.updateAvatar("https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png")}/><img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Bearded_Man-17-512.png" alt="profileAvatars"/>
                     </label>
                     <label className="avatars">

                     <input type="radio"  onChange={()=>this.updateAvatar("https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/78-512.png")}/><img src="https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/78-512.png" alt="femaleAvatar" />
                     </label>
                     <label className="avatars">

                     <input type="radio"  onChange={()=>this.updateAvatar("https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/84-512.png")}/><img src="https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/84-512.png" alt="profileAvatars"/>
                     </label>
                     <label className="avatars">

                     <input type="radio"  onChange={()=>this.updateAvatar("https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png")}/><img src="https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png" alt="profileAvatars"/>
                     </label>
                     </div>
                     {/* </div> */}
                    
                     
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
