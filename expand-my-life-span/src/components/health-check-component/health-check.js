import React, { Component } from 'react';
import './health-check.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';
import loadingIcon from '../../images/loading-icon.gif';

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
    submitBmi = (e) => {
        e.preventDefault();
        this.props.getBmi();
    }
    displayBmiResult = () => {
        console.log('entering')
        console.log(this.props.bmiResult.bmi)
        if(this.props.bmiResult.bmi){
            console.log('entered if');
            console.log(this.props.bmiResult.bmi)
            return (
                <div className="bmi-result-section">
                        <h3>BMI Result</h3>
                    <div className="bmi-result-parts">
                        <div className="bmi-result-part1">
                           <h4>BMI</h4>
                           <label>Value</label>
                           <p>{this.props.bmiResult.bmi.value}</p>
                           <label>Status</label>
                           <p>{this.props.bmiResult.bmi.status}</p>
                           <label>Risk Level</label>
                           <p>{this.props.bmiResult.bmi.risk}</p>
                           <label>Prime</label>
                           <p>{this.props.bmiResult.bmi.prime}</p>
                        </div>
                        <vr />
                        <div className="bmi-result-part2">
                          <h4>Waist to Hip ratio(whr)</h4>
                          <label>Value</label>
                           <p>{this.props.bmiResult.whr.value}</p>
                           <label>Status</label>
                           <p>{this.props.bmiResult.whr.status}</p>
                        </div>
                        <vr />
                        <div className="bmi-result-part3">
                          <h4>Waist to Height ratio(whtr)</h4>
                          <label>Value</label>
                           <p>{this.props.bmiResult.whtr.value}</p>
                           <label>Status</label>
                           <p>{this.props.bmiResult.whtr.status}</p>
                        </div>
                    </div>
                    <div>
                        <h3>Ideal Weight</h3>
                        <h3>{this.props.bmiResult.ideal_weight}</h3>
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
    render() {
        return (
            <div className="health-check-section">
               <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" /></Link> 
               <h3>Health Check</h3>
               <div className="health-check-content">
                  <div className="bmi-form">
                       <h3>BMI Form</h3>
                    <form>
                       <div className="bmi-field-groups">
                           <div className="bmi-fields">
                              <label>Height(cm)</label>
                              <input type="number"
                                     name="height"
                                     value={this.props.bmiObj.height.value}
                                     onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Weight(kg)</label>
                             <input type="number"
                                    name="weight"
                                    value={this.props.bmiObj.weight.value}
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
                                    onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Waist</label>
                             <input type="number"
                                    name="waist"
                                    value={this.props.bmiObj.waist}
                                    onChange={this.updateBmiObj} />
                           </div>
                           <div className="bmi-fields">
                             <label>Hip</label>
                             <input type="number"
                                    name="hip"
                                    value={this.props.bmiObj.hip}
                                    onChange={this.updateBmiObj}/>
                           </div>
                           <div className="bmi-fields submit">
                              <input type="submit"
                                     name="calculate"
                                     value="CALCULATE"
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
        )
    }
}
