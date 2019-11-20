import React, { Component } from 'react';
import './home.css';
import {Link } from 'react-router-dom';
import mealBackground from '../../images/meal-plan-image.jpg';
import workoutBackground from '../../images/workout-plan-image.jpg';
import healthCheckBackground from '../../images/health-check-image.jpg';

export default class Home extends Component {
    render() {
       
        return (
            <div className="home-content">
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
