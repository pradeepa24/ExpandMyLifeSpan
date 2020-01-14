import React, { Component } from 'react';
import './meal-plan.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';
import loadingIcon from '../../images/loading-icon.gif';
import removeIcon from '../../images/remove-icon.png';
import addIcon from '../../images/add-icon.svg';
import backButton from '../../images/back-button-icon.png';
import ReactPaginate from 'react-paginate';

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
       
        if(this.props.elementsForSearch.length > 0){
          return this.props.elementsForSearch.map((meal,ind) => {
            return (
                  <div key={ind} className="meal-content" >
                  <Link to={`/meal-plan/${meal.id}`} key={ind} ><img className="meal-img" src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title}/></Link>
                  <div  className="meals-dis-list">
                    <div className="meal-description">
                       <h6><strong>{meal.title.toUpperCase()}</strong></h6>
                       <p>Preparation Time: {meal.readyInMinutes}</p>
                       <p>Servings: {meal.servings}</p>
                    </div>
                    <button className="remove" onClick={()=>this.addMeal(this.props.elementsForSearch,ind)} ><img src={addIcon} alt="addIcon" /></button>
                   </div>
                </div>
                
                )
        })
        } 
        // else{
        //   return (
        //     <div className="loader-section">
        //        <h3>Loading</h3><img className="loading" src={loadingIcon} alt="loadingIcon"/>
        //     </div>
        //   )
        // }
       
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

displayPage = () => {
  if(this.props.mealPage === 'mealPlan'){
    return (
      <div className="search">
      <div className="meals-heading">
                <h3>MEAL PLAN FOR THE DAY</h3>
        </div>
      {/* <div className="meal-plan-section-2"> */}
         
           <div className="meals">
             {this.displayMeals()}
          {/* </div> */}
         </div>
         </div>
    )
   
  }
  else if(this.props.mealPage === 'searchMeal'){
    return (
      <div className="search-wrap">
<div className="search">
<div className="meals-heading">
                <h2>Search Recipe</h2>
        </div>
      <input type="text"
      name="searchText"
      value={this.props.searchText}
      onChange={this.updateSearch}
      placeholder="Search recipes"
     />
  {this.props.elementsForSearch.length > 0 ? 
    <div className="search-cont" >
  <ReactPaginate containerClassName="pagination-container"
                       pageClassName="page-list"
                       activeClassName="active-page"
                       previousLinkClassName="page-list"
                       nextLinkClassName="page-list"
                       breakLabel={'...'}
                       pageCount={this.props.pageCountForSearch}
                       breakClassName="page-ellipsis"
                       breakLinkClassName="page-ellipsis-a"
                       pageRangeDisplayed={1}
                       marginPagesDisplayed={1}
                       onPageChange={this.props.handlePageClickForSearch}
                       forcePage={this.props.currentPageForSearch}
                       previousLabel={"Prev"}
                       nextLabel={"Next"}
        />
        <div className="search-result-page">
  {this.displaySearchResult()}
        </div>
  </div>
  :
  <div>
  </div>
  }
  
  </div>
      </div>
      
    )
 
  }
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
                <nav>
                  <button className="nav-opt" onClick={()=>{this.props.displaySelection('mealPlan')}}><p>MEAL PLAN</p></button>
                  <button className="nav-opt" onClick={()=>{this.props.displaySelection('searchMeal')}}><p>SEARCH MEAL</p></button>
                </nav>
                <div className="page">
               {this.displayPage()}
                </div>
                </div>
              </div>
            </div>
        )
    }
}
