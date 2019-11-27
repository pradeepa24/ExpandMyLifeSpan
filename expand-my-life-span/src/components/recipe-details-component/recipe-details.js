import React, { Component } from 'react';
import './recipe-details.css';
import loadingIcon from '../../images/loading-icon.gif';
import bulletIcon from '../../images/bullet-point-icon.png';
import horizontalLine from '../../images/horizontal-line.png';
import redStar from '../../images/red_star.png';
import backButton from '../../images/back-button-icon.png';
import clockIcon from '../../images/clock-icon.png';
import heartIcon from '../../images/heart-icon.png';
import homeIcon from '../../images/home-icon.jpg';
import {Link } from 'react-router-dom';
import {
    WhatsappShareButton, 
    WhatsappIcon,
    FacebookIcon,
    FacebookShareButton,
    
  } from 'react-share';


export default class RecipeDetails extends Component {
    constructor(props){
        super(props);
        this.props.getDescription(this.props.match.params.id);
    }
    reloadMealPlan = () =>{
        this.props.history.goBack();
        this.props.reloadPlans();
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
    displayNutrition = () => {
        if(this.props.nutritionData.bad){
            return this.props.nutritionData.bad.map((nut,ind) => {
                return (
                    <tr key={ind}>
                       <td>{nut.title}</td>
                       <td>{nut.amount}</td>
                    </tr>
                )
            })
        }
      
    }
    displayNoInstr = () => {
        return (
            <h5>Sorry No instructions available</h5>
        )
    }
    displayDescription = () => {
        if(this.props.recipeDescription.analyzedInstructions){
            return (
                <div className="meal-details-content">
                  <div className="meal-sec-purpose">
                    
                    <button className="account-icon" onClick={this.displayDropdown}>
                       <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
                    </button>
                    <div style={this.props.styleSettings} className="dropdown-content">
                  {/* <a href="#">Link 1</a>
                  <a href="#">Link 2</a> */}
                  <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link>
                  <img className="home-icon" src={backButton} alt="backButton" onClick={this.reloadMealPlan}/>
                  <button onClick={this.logOut}>Log out</button>
                </div>
                    <div className="header-meal-detail">
                       <h2>Meal Details</h2>
                     </div>
                
                    <div className="meal-sections">
                
                      <div className="meal-section-1">
                         <div className="meal-title">
                           <h3>{this.props.recipeDescription.title}</h3>
                           <div className="health-score">
                           <span>Health Score: {this.props.recipeDescription.healthScore}<img src={redStar} alt="redStar" /></span>
                           <span>Price per serving : {this.props.recipeDescription.pricePerServing}</span>
                        
                          </div>
                          <div className="diet-list">
                             {this.displayHealth()}
                             {this.displayDiet(this.props.recipeDescription.diets)}
                          </div>
                             {this.displayPairs(this.props.recipeDescription.winePairing)}
                         </div>
                         <div className="meal-image">
                             <img src={this.props.recipeDescription.image} />
                             <p>Like to share this recipe with your friends?</p>
                             <div className="share">
                                 <WhatsappShareButton
                                     url={`https://pradeepa24.github.io/ExpandMyLifeSpan/#/meal-plan/${this.props.match.params.id}`}
                                     title={this.props.recipeDescription.title}
                                     separator="::"
                                     className="share-button"
                                  >
                                      <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                                <FacebookShareButton
                                    url={`https://pradeepa24.github.io/ExpandMyLifeSpan/#/meal-plan/${this.props.match.params.id}`}
                                    quote={`Check out this recipe${this.props.recipeDescription.title}`}
                                    hashtag={`#recipe${this.props.recipeDescription.title}`}
                                    className="share-button"
                                  >
                                   <FacebookIcon size={32} round />
                                 </FacebookShareButton>
                              </div>
                       
                         </div>
                      </div>
               
                      <div className="meal-section-2">
                          <div className="meal-details-ingredients">
                              <div className="heading-prep">
                                  <h5 >Ingredients</h5>
                    
                              </div>
              
                               <div className="ingredient-list">
                                     {this.displayIngredients(this.props.recipeDescription.extendedIngredients)}
                               </div>
               
                     
                             </div>
                       </div>
                 
                       <div className="meal-section-3">
                          <div className="meal-details-description">
                             <div className="heading-prep">
                                <h5>Directions</h5>
                                <img src={clockIcon} alt="clockIcon"/>
                                <span>Ready In</span>
                                <div>{this.props.recipeDescription.readyInMinutes} m</div>
                             </div>
                    
                             <ol className="meal-det-desc">
                                   {this.props.recipeDescription.analyzedInstructions.length > 0 ? this.displaySteps(this.props.recipeDescription.analyzedInstructions[0].steps): this.displayNoInstr()}
                             </ol>
                    
                    
                          </div>
                       </div>
 
                        <div className="meal-section-4">
                           <div className="meal-details-nutrition">
                               <div className="heading-prep">
                                  <h5>Nutrition Facts</h5>
                                     {/* <img src={clockIcon} alt="clockIcon"/>
                                      <span>Ready In</span> */}
                                     {/* <div>{this.props.recipeDescription.readyInMinutes} m</div> */}
                                </div>
                              <div className="nutri-container">
                           <div className="meal-det-nutri">
                             <table>
                               <thead>
                                   <tr>
                                       <th></th>
                                       <th>Avg Qty Per Serve</th>
                                   </tr>
                               </thead>
                               <tbody>
                               {this.displayNutrition()}
                               </tbody>
                             </table>
                           
                            </div>
                          </div>
                        </div>
                         
                   </div>
                   <span><img className="horizontal-line"  src={horizontalLine} alt="horizontalLine" /></span>
                   </div>
                   </div>
                </div>
            ) 
        } else{
            return (
                   <div>
                      <h3>Loading</h3><img src={loadingIcon} />
                  </div>
            )
                
        }
       
    }
    displayHealth = () => {
        if(this.props.recipeDescription.veryHealthy){
            return (
               <h5><img src={heartIcon} alt="heartIcon" />Very Healthy</h5>
                )
        }
        if(this.props.recipeDescription.veryPopular){
            return (
                <h5><img src={heartIcon} alt="heartIcon" />Very Popular</h5>
            )
        }
       
    }
    displayPairs = (pairs) => {
        if(pairs.pairingText){
           
                return (
                    <div className="wine-pairs">
                    <p>{this.props.recipeDescription.winePairing.pairingText}</p>
                    </div>
                )
           
        }
       
    }
    displayDiet = (diet) => {
        return diet.map((eachDiet,index) => {
            return (
                  <h5 key={index}><img src={heartIcon} alt="heartIcon" />{eachDiet} </h5>
            )
        })
    }
    displaySteps = (steps) => {
        return steps.map((step,index) => {
            return (
                  <li key={index}>{step.step}</li>
            )
        })
    }
    displayIngredients = (ingredients) => {
        return ingredients.map((ingredient,index) => {
            return (
                <span key={index}><img src={bulletIcon} alt="bulletIcon"/>{ingredient.original}</span>
            )
        })
    }
    render() {
        return (
            <div className="meal-details-purpose-content">
                {this.displayDescription()}
            </div>
        )
    }
}
