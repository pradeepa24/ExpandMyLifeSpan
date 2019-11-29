import React, { Component } from 'react';
import './health-check.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';
import loadingIcon from '../../images/loading-icon.gif';
import backButton from '../../images/back-button-icon.png';

export default class HealthCheck extends Component {
    updateBmiObj = (e) => {
        let obj = {...this.props.bmiObj}
        if(typeof obj[e.target.name] === 'object') {
            obj[e.target.name].value = e.target.value;
        } else{
            obj[e.target.name] = e.target.value;
        }
        
        this.props.setBmiObject(obj)
    }
    reload = () =>{
      this.displayDropdown();
      this.props.reloadPlans();
      this.props.history.goBack();
     
  }
    displayDropdown = () => {
      let styleSettings;
      if(this.props.styleSettings.display === 'none') {
          styleSettings = {display:'flex'};
      } else {
          styleSettings = {display:'none'};
      }
     this.props.setStyleSettings(styleSettings);
  }
    submitBmi = (e) => {
        e.preventDefault();
        this.props.getBmi();
    }
    displayWhr = () => {
      if(this.props.bmiResult.whr){
        return (
          <div className="bmi-result-part2">
          <div className="heading-prep">
            <h4>Waist to Hip ratio(whr)</h4>
          </div>
          <div className="res-content">
            <div className="res-fields">
              <label>Value</label>
              <p>{this.props.bmiResult.whr.value}</p>
            </div>
             <div className="res-fields">
               <label>Status</label>
               <p>{this.props.bmiResult.whr.status}</p>
             </div>
           </div>
          </div>
        )
      }
    
    }
    displayWthr = () => {
      if(this.props.bmiResult.whtr){
        return (
          <div className="bmi-result-part3">
          <div className="heading-prep">
            <h4>Waist to Height ratio(whtr)</h4>
          </div>
          <div className="res-content">
             <div className="res-fields">
               <label>Value</label>
               <p>{this.props.bmiResult.whtr.value}</p>
             </div>
             <div className="res-fields">
                <label>Status</label>
                <p>{this.props.bmiResult.whtr.status}</p>
            </div>
          </div>
          </div>
        )
      }
      
    }
    displayBmiResult = () => {
        if(this.props.bmiResult.bmi){
            return (
                <div className="bmi-result-section">
                        <h3>BMI Result</h3>
                    <div className="bmi-result-parts">
                        <div className="bmi-result-part1">
                        <div className="heading-prep">

                           <h4>BMI</h4>
                        </div>
                        <div className="res-content">
                            <div className="res-fields">
                               <label>Value</label>
                               <p>{this.props.bmiResult.bmi.value}</p>
                            </div>
                           
                            <div className="res-fields">
                               <label>Status</label>
                               <p>{this.props.bmiResult.bmi.status}</p>
                            </div>
                           
                            <div className="res-fields">
                               <label>Risk Level</label>
                               <p>{this.props.bmiResult.bmi.risk}</p>
                            </div>

                            <div className="res-fields">
                               <label>Prime</label>
                               <p>{this.props.bmiResult.bmi.prime}</p>
                            </div> 
                          </div>
                        </div>
                      {this.displayWhr()}
                      {this.displayWthr()}
                    </div>
                    <div className="res-fields-1">
                        <h3>Ideal Weight :</h3>
                        <h3>{this.props.bmiResult.ideal_weight}</h3>
                    </div>
                    <div className="res-fields-1">
                        <h3>Calorie In take/ day :</h3>
                        <h3>{this.props.calorieInTakePerDay} calories</h3>
                    </div>
                </div>
            )
        } else {
            
              if(this.props.bmiLoaderFlag){
                return (
                  <div className="loader-section">
                     <h3>Loading</h3><img className="loading" src={loadingIcon} alt="loadingIcon"/>
                  </div>
                )
              } else {
                  return (
                      <div>
                          <h3>Please fill the BMI form and hit Calculate to get your result</h3>
                      </div>
                  )
              }
             
        }
    }
    logOut = () =>{
      this.props.logOutSession();
      setTimeout(()=>{
         if(!this.props.authenticatedFlag) {
             this.displayDropdown();
          this.props.history.push("/");
         }
      },250)
  }
    render() {
        return (
            <div className="health-check-section">
               
               <div className="health-check-content">
               <div className="health-check-wrapper">
               
               <button className="account-icon" onClick={this.displayDropdown}>
                <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
             </button>
             <div style={this.props.styleSettings} className="dropdown-content">
                <div><Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link></div> 
                  <div><img className="home-icon" src={backButton} alt="backButton" onClick={this.reload}/></div>
                  <div><button onClick={this.logOut}>Log out</button></div>
                </div>
               <h3>Health Check</h3>
                  <div className="bmi-form">
                       <h3>BMI Form</h3>
                    <form>
                       <div className="bmi-field-groups">
                           <div className="bmi-fields">
                              <label>Height(cm)</label>
                              <input type="number"
                                     name="height"
                                     value={this.props.bmiObj.height.value}
                                     placeholder="Enter height(cm)"
                                     onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Weight(kg)</label>
                             <input type="number"
                                    name="weight"
                                    value={this.props.bmiObj.weight.value}
                                    placeholder="Enter weight(kg)"
                                    onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Gender</label>
                               <select name="sex" onChange={this.updateBmiObj} >
                                 <option value="m">Male</option>
                                 <option value="f">Female</option>
                               </select>
                           </div>
                           <div className="bmi-fields">
                             <label>Age</label>
                             <input type="number"
                                    name="age"
                                    value={this.props.bmiObj.age}
                                    placeholder="Enter age"
                                    onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Waist</label>
                             <input type="number"
                                    name="waist"
                                    value={this.props.bmiObj.waist}
                                    placeholder="Enter waist size(inch)"
                                    onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Hip</label>
                             <input type="number"
                                    name="hip"
                                    value={this.props.bmiObj.hip}
                                    placeholder="Enter hip size(inch)"
                                    onChange={this.updateBmiObj}/>
                           </div>
                           <div className="bmi-fields submit">
                              <input type="submit"
                                     name="calculate"
                                     value="Calculate"
                                     onClick={this.submitBmi} />
                           </div>
                       </div>
                   </form>  
                  </div>
                  <div className="bmi-result">
                     {this.displayBmiResult()}
                  </div>
                  </div>
               </div>
            </div>
        )
    }
}
