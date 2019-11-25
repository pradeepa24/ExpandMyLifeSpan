import React, { Component } from 'react';
import './customize-meal-plan.css';
import backButton from '../../images/back-button-icon.png';
import {Link } from 'react-router-dom';
import addIcon from '../../images/add-icon.webp';
export default class CustomizeMealPlan extends Component {
    constructor(props){
        super(props);
        this.props.getSimilarRecipes();
    }
  
    displayMeals = () => {
       
         if(this.props.similarRecipes.length > 0){
             return this.props.similarRecipes.map((meal,ind) => {
                
                 return (
                     <div className="similar-meal-content" >
                 <Link to={`/meal-plan/${meal.id}`} key={ind} > <img className="meal-img"src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/></Link>
                 <div  className="meals-dis-list">
                     <div className="similar-meal-description">
                        <h5>{meal.title.toUpperCase()}</h5>
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
    render() {
        return (
            <div className="customize-meal-content">
                  <Link to="/meal-plan"><img className="home-icon" src={backButton} alt="backButton" onClick={ this.props.reloadPlans}/></Link> 
                <div className="similar-rec">

                 {this.displayMeals()}
                </div>
            </div>
        )
    }
}
