import React, { Component } from 'react';
import './home.css';
import {Link } from 'react-router-dom';
import mealBackground from '../../images/meal-plan-image.jpg';
import workoutBackground from '../../images/workout-plan-image.jpg';
import healthCheckBackground from '../../images/health-check-image.jpg';
import accountIcon from '../../images/settings-icon.png';

export default class Home extends Component {
    displayDropdown = () => {
        let styleSettings;
        if(this.props.styleSettings.display === 'none') {
            styleSettings = {display:'flex'};
        } else {
            styleSettings = {display:'none'};
        }
       this.props.setStyleSettings(styleSettings);
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
            <div className="home-content">
             <button><img className="home-icon" src={accountIcon} alt="homeIcon" onClick={this.displayDropdown}/></button>
             <div style={this.props.styleSettings} class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <button onClick={this.logOut}>Log out</button>
                </div>
                <Link to="/meal-plan">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>MEAL PLAN</h4>
                       <p></p>
                   </div>
                   <img src={mealBackground} alt="meals" />
                  </div>
                </Link>
                <Link to="/workout-plan">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>WORKOUT PLAN</h4>
                       <p></p>
                   </div>
                   <img src={workoutBackground} alt="meals" />
                  </div>
                </Link>
                <Link to="/health-check">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>HEALTH CHECK</h4>
                       <p></p>
                   </div>
                   <img src={healthCheckBackground} alt="meals" />
                  </div>
                </Link>
                {/* <div>
                
                <form>
                   <div className="field-groups">
                       <div className="fields">
                         <label>Height(cm)</label>
                         <input type="number"
                                name="height"
                                value=""
                                onChange=""
                          />
                       </div>
                       <div className="fields">
                          <label>Weight(kg)</label>
                          <input type="number"
                                 name="weight"
                                 value=""
                                 onChange=""
                           />      
                       </div>
                       <div className="submit">
                           <input type="submit"
                                  value="Submit"
                                  name="submit"
                                  onClick=""
                            />
                       </div>
                   </div>
               </form>
               
                </div> */}
            </div>

        )
    }
}
