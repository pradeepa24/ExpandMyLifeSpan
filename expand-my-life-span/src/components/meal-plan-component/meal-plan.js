import React, { Component } from 'react';
import './meal-plan.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';
import loadingIcon from '../../images/loading-icon.gif';
import removeIcon from '../../images/remove-icon.png';
import addIcon from '../../images/add-icon.webp';
export default class MealPlan extends Component {
    updateSearch = (e) => {
       this.props.setSearch(e.target.value);
       this.props.callMeals();
    }
 
  removeMeal = (index) =>{
    this.props.removeMealFromPlan(index);
  }
  addMeal = (sList,ind) => {
    this.props.addMealFromPlan(sList,ind);

  }
    displayMeals = () => {
     
        if(this.props.mealPlan.meals){
            return this.props.mealPlan.meals.map((meal,ind) => {
           
                return (
                  <div key={ind} className="meal-content" >
                     <Link to={`/meal-plan/${meal.id}`}  ><img className="meal-img" src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/></Link>
                    <div  className="meals-dis-list">
                        <div className="meal-description">
                          <h5>{meal.title.toUpperCase()}</h5>
                          <p>Preparation Time: {meal.readyInMinutes}</p>
                          <p>Servings: {meal.servings}</p>
                         </div>
                         <button className="remove" onClick={()=>this.removeMeal(ind)} ><img src={removeIcon} alt="removeIcon" /></button>
                         </div>
                    </div>
                
                )
            })
        }    
    }
    displaySearchResult = () =>{
       
        if(this.props.searchList.length > 0){
          return this.props.searchList.map((meal,ind) => {
            return (
             
                  <div key={ind} className="meal-content" >
                  <Link to={`/meal-plan/${meal.id}`} key={ind} ><img className="meal-img" src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/></Link>
                  <div  className="meals-dis-list">
                    <div className="meal-description">
                       <h5>{meal.title.toUpperCase()}</h5>
                       <p>Preparation Time: {meal.readyInMinutes}</p>
                       <p>Servings: {meal.servings}</p>
                    </div>
                    <button className="remove" onClick={()=>this.addMeal(this.props.searchList,ind)} ><img src={addIcon} alt="addIcon" /></button>
                   </div>
                   
                </div>
                
                )
        })
        } else{
          return (
            <div className="loader-section">
               <h3>Loading</h3><img className="loading" src={loadingIcon} alt="loadingIcon"/>
            </div>
          )
        }
       
    }
    render() {
       
        return (
            <div className="meal-plan-content">
              <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link>
              <div>
                <div className="meal-plan-sections">
                  <div className="search-meal-content">
                      <Link to="/customize-meal-plan"><h3>Need a different Meal Plan? View Me</h3></Link>
                      <span>Or</span><h3> Search your meal</h3><div className="search-meal">
                         <input type="text"
                                name="searchText"
                                value={this.props.searchText}
                                onChange={this.updateSearch}
                                placeholder="Search recipes"
                          />
                      </div>
                      <div className="search-results">

                      {this.displaySearchResult()}
                      </div>
                   </div>

                   <div className="meal-plan-section-2">
                     <div className="meals">
                       <div className="meals-heading">
                          <h3>Meal Plan for the day</h3>
                       </div>
                       {this.displayMeals()}
                    </div>
                   </div>
                   
                </div>
              </div>
            </div>
        )
    }
}
