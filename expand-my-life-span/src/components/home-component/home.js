import React, { Component } from 'react';
import './home.css';
import {Link } from 'react-router-dom';
import mealBackground from '../../images/meal-plan-image.jpg';
import workoutBackground from '../../images/workout-plan-image.jpg';
import healthCheckBackground from '../../images/health-check-image.jpg';
import accountIcon from '../../images/account-icon-check.png';
import vegImg from '../../images/veg-car-img.jpg';
import exImg from '../../images/exercise-car-img.jpeg';
import healthImg from '../../images/bmi-car-img.jpg';

import healthTips from '../../images/health_tips-background.jpg';
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
             <button className="account-icon" onClick={this.displayDropdown}>
                <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
             </button>
             <div style={this.props.styleSettings} className="dropdown-content">
                  <div><button onClick={this.logOut}>Log out</button></div>
                </div>
                <div className="car-self">
                <img src ={exImg} alt="exersize" />
                <img src={vegImg} alt="healthyFoods" />
                <img src={healthImg} alt="trachBmi" />
                </div>
                <div className="purpose">
                
                    <h4>Eat Better.
                        Stay Fit.
                        Stay Healthy.</h4>
                    <p>Aarokya empowers you to achieve your diet, health and fitness goals.</p>
                </div>
                <div className="navigations">
                <div className="navigation-sections">
                <Link to="/meal-plan">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>Meal Plan</h4>
                       <p>Customized recipes according to your calorie intake per day along with ingredients, directions and nutrition facts.
                     So you can enjoy all there is to love about cooking, eating and staying healthy.</p>
                   </div>
                   <img src={mealBackground} alt="meals" />
                  </div>
                </Link>
                <Link to="/workout-plan">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>Workout Plan</h4>
                      <p>Workout videos picked from youtube and options offered to select the type of workout you can go for. Be Active, stay healthy.</p>
                   </div>
                   <img src={workoutBackground} alt="meals" />
                  </div>
                </Link>
                <Link to="/health-check">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>Health Check</h4>
                      <p>Get your BMI checked, know your ideal weight and calorie in take per day, get your meal plan customized according to it.</p>
                   </div>
                   <img src={healthCheckBackground} alt="meals" />
                  </div>
                </Link>
                <Link to="/health-tip">
                  <div className="meal-nav">
                   <div className="meal-nav-description">
                      <h4>Health Tips</h4>
                      <p>Get a health tip, a video to live a healthy living.</p>
                   </div>
                   <img src={healthTips} alt="meals" />
                  </div>
                </Link>
                </div>
                
                </div>
              
            </div>

        )
    }
}
