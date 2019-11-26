import React, { Component } from 'react';
import './recipe-details.css';
import loadingIcon from '../../images/loading-icon.gif';
import bulletIcon from '../../images/bullet-point-icon.png';
import horizontalLine from '../../images/horizontal-line.png';
import redStar from '../../images/red_star.png';
import backButton from '../../images/back-button-icon.png';
import clockIcon from '../../images/clock-icon.png';
import heartIcon from '../../images/heart-icon.png';
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
        this.props.reloadPlans();
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
    displayDescription = () => {
        if(this.props.recipeDescription.analyzedInstructions){
            return (
                <div className="meal-details-content">
                <div className="meal-sections">
                <Link to="/meal-plan"><img className="home-icon" src={backButton} alt="backButton" onClick={this.reloadMealPlan}/></Link>
                 <div className="meal-section-1">
                   <div className="meal-title">
                     <h3>{this.props.recipeDescription.title}</h3>
                     <div className="health-score">
                         <span>Health Score: {this.props.recipeDescription.healthScore}<img src={redStar} alt="redStar" /></span>
                         <span>Price per serving : {this.props.recipeDescription.pricePerServing}</span>
                         {this.displayHealth()}
                     </div>
                         <div className="diet-list">
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
                           {this.displaySteps(this.props.recipeDescription.analyzedInstructions[0].steps)}
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
               <h5>Very Healthy</h5>
                )
        }
        if(this.props.recipeDescription.veryPopular){
            return (
                <h5>Very Popular</h5>
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
            <div>
                {this.displayDescription()}
            </div>
        )
    }
}
