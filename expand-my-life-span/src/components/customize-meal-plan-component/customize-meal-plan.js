import React, { Component } from 'react';
import './customize-meal-plan.css';
import backButton from '../../images/back-button-icon.png';
import homeIcon from '../../images/home-icon.jpg';
import {Link } from 'react-router-dom';
import addIcon from '../../images/add-icon.svg';
export default class CustomizeMealPlan extends Component {
    constructor(props){
        super(props);
        this.props.getSimilarRecipes();
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
    displayMeals = () => {
       
         if(this.props.similarRecipes.length > 0){
             return this.props.similarRecipes.map((meal,ind) => {
                
                 return (
                     <div className="similar-meal-content" >
                 <Link to={`/meal-plan/${meal.id}`} key={ind} > <img className="meal-img"src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/></Link>
                 <div  className="meals-dis-list">
                     <div className="similar-meal-description">
                        <h7><strong>{meal.title.toUpperCase()}</strong></h7>
                        <p>Preparation Time: {meal.readyInMinutes}</p>
                        <p>Servings: {meal.servings}</p>
                     </div>
                 <button className="remove" onClick={()=>this.props.addMealFromPlan(this.props.similarRecipes,ind)}><img src={addIcon} alt="addIcon" /></button>
                 </div>

                 </div>
                 )
             })
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
            <div className="customize-meal-content">
                 <div className="customize-wrapper">
                 
                  <button className="account-icon" onClick={this.displayDropdown}>
                    <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
                  </button>
                  <div style={this.props.styleSettings} className="dropdown-content">
                  <div><Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link></div>
                  <div><img className="home-icon" src={backButton} alt="backButton" onClick={this.reload}/></div>
                  <div><button onClick={this.logOut}>Log out</button>
                </div></div>
                  <div className="header-custom-meal-detail">

                  <h2>Similar Recipes</h2>
                  </div>
                  <div className="similar-rec-wrapper">
                  <div className="similar-rec">
                 {this.displayMeals()}
                </div>
                  </div>
               
                 </div>
            </div>
        )
    }
}
