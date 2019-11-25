import React, { Component } from 'react';
import './home.css';
import {Link } from 'react-router-dom';
import mealBackground from '../../images/meal-plan-image.jpg';
import workoutBackground from '../../images/workout-plan-image.jpg';
import healthCheckBackground from '../../images/health-check-image.jpg';
import accountIcon from '../../images/account-icon-check.png';

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
             <button className="account-icon"><img  src={accountIcon} alt="homeIcon" onClick={this.displayDropdown}/></button>
             <div style={this.props.styleSettings} class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <button onClick={this.logOut}>Log out</button>
                </div>
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
            </div>

        )
    }
}
