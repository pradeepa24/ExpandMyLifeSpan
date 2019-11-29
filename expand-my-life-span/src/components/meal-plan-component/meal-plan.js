import React, { Component } from 'react';
import './meal-plan.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';
import loadingIcon from '../../images/loading-icon.gif';
import removeIcon from '../../images/remove-icon.png';
import addIcon from '../../images/add-icon.svg';
import backButton from '../../images/back-button-icon.png';
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
                          <h6><strong>{meal.title.toUpperCase()}</strong></h6>
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
                       <h6><strong>{meal.title.toUpperCase()}</strong></h6>
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
reloadMealPlan = () =>{
  this.displayDropdown();
  this.props.history.goBack();
  this.props.reloadPlans();
}
    render() {
       
        return (
            <div className="meal-plan-content">
             
              <button className="account-icon" onClick={this.displayDropdown}>
                <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
             </button>
             <div style={this.props.styleSettings} className="dropdown-content">
                  <div><Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link></div>
                  <div><img className="home-icon" src={backButton} alt="backButton" onClick={this.reloadMealPlan}/></div>
                  <div><button onClick={this.logOut}>Log out</button></div>
                </div>
              <div className="meal-plan-purpose">
                <div className="meal-plan-sections">
                <div className="meals-heading">
                          <h2>Meal Plan for the day</h2>
                  </div>
                <div className="meal-plan-section-2">
                   
                     <div className="meals">
                       {this.displayMeals()}
                    </div>
                   </div>
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

                   
                   
                </div>
              </div>
            </div>
        )
    }
}
