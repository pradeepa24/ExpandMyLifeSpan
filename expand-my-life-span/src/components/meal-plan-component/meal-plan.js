import React, { Component } from 'react';
import './meal-plan.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';

export default class MealPlan extends Component {
    updateSearch = (e) => {
       this.props.setSearch(e.target.value);
    }
    search = (e) => {
        e.preventDefault();
       this.props.callMeals();
    }
    displayMeals = () => {
       setTimeout(() => {
           console.log(this.props.mealPlan.meals)
        },750) 
        if(this.props.mealPlan.meals){
            return this.props.mealPlan.meals.map((meal,ind) => {
                console.log(meal.image)
                return (
                <div className="meal-content" key={ind}>
                    <img src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/>
                    <div className="meal-description">
                       <h5>{meal.title.toUpperCase()}</h5>
                       <p>Preparation Time: {meal.readyInMinutes}</p>
                       <p>Servings: {meal.servings}</p>
                    </div>
                </div>
                )
            })
        }
       
           
    }
    render() {
        console.log(this.props.mealPlan);
        return (
            <div className="meal-plan-content">
              <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" /></Link>
              <div className="search-meal-content">
                <input type="text"
                       name="searchText"
                       value={this.props.searchText}
                       onChange={this.updateSearch}
                    />
                  <button onClick={this.search}>Search</button>
              </div>
              <div className="meals">
                <div className="meals-heading">
                   <h3>Meal Plan for the day</h3>
                </div>
                {this.displayMeals()}
              </div>
            </div>
        )
    }
}
