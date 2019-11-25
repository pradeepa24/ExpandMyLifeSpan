import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from './components/login-component/login';
import SignUp from './components/sign-up-component/sign-up';
import Home from './components/home-component/home';
import MealPlan from './components/meal-plan-component/meal-plan';
import WorkoutPlan from './components/workout-plan-component/workout-plan';
import HealthCheck from './components/health-check-component/health-check';
import RecipeDetails from './components/recipe-details-component/recipe-details';
import CustomizeMealPlan from './components/customize-meal-plan-component/customize-meal-plan';
import Axios from 'axios';
import leafIcon from './images/leaf-icon.png';
const KEY = 'AIzaSyAEjrWBTS0fzNvmx9JTdBBNYEVs460G0SU';
const rapidKey = "4f90ef96b0msh246f6e054afbdd1p14c2ffjsn4e4ab27d80f1";
const spoonacularKey = "4f90ef96b0msh246f6e054afbdd1p14c2ffjsn4e4ab27d80f1";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready:false,
      loginCredentials:[],
      loggerInfo:{
        "userName":"",
        "password":"",
        "startWeight": "",
        "currentWeight": "",
        "goalWeight": "",
        "date":"",
        "caloriePerDay":"",
        "mealPlan":{},
        "workoutPlan":{}
    },
    userName:"",
    mealPlan:{},
    similarRecipes:[],
    searchText:"",
    searchList:[],
    authenticatedFlag: false,
    workoutVideos: [],
    selectedWorkoutVideo: null,
    styleSettings:{display:'none'},
    bmiObj:{
          "weight":{"value":"","unit":"kg"},
          "height":{"value":"","unit":"cm"},
          "sex":"m",
          "age":"",
          "waist":"",
          "hip":""
    },
    userOptionWatchWorkout:"20min Workout",
    bmiResult:{},
    calorieInTakePerDay:2000,
    bmiLoaderFlag:false,
    recipeDescription:{},
    nutritionData:{},
    
    }
  }
  componentDidMount(){
   this.getCredentials();
  }
  getDescription = (id) => {
    Axios.get(`https://webknox-recipes.p.rapidapi.com/recipes/${id}/information`,{headers:{
      "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
      "x-rapidapi-key": rapidKey}
    })
         .then((res)=>{
           console.log(res);
           this.getNutrition(id);
           this.setState({
             recipeDescription:res.data
           })
         })
         .catch((err)=>{
           console.log(err);
         })
  }
 getNutrition = (id) => {
   Axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`,{headers:{
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": spoonacularKey}
 })
 .then((res) => {
   console.log(res)
   this.setState({
      nutritionData:res.data
   })
  })
 .catch((err) => console.log(err))
 }
 getMeals = () => {
  Axios.get(`https://webknox-recipes.p.rapidapi.com/recipes/mealplans/generate?targetCalories=${this.state.calorieInTakePerDay}&timeFrame=day`,{headers:{
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": rapidKey}
  })
  .then((meals)=>{
    console.log(meals.data);
    this.setState({
        mealPlan:meals.data,
        ready:true,
    })
  })
  .catch((err)=>{
    console.log(err);
  })
 }
  setBmiObject = (obj) => {
     this.setState({
       bmiObj:obj
     })
  }
  getBmi = () => {
    this.setState({
      bmiLoaderFlag: true
    })
    let bmiTemp = {...this.state.bmiObj};
    if(bmiTemp.waist === ""){
      delete bmiTemp.waist;
    }
    if(bmiTemp.hip === ""){
      delete bmiTemp.hip;
    }
    Axios.post("https://bmi.p.rapidapi.com/",bmiTemp,{headers:{
      "x-rapidapi-host": "bmi.p.rapidapi.com",
	    "x-rapidapi-key": rapidKey,
	    "content-type": "application/json",
	    "accept": "application/json"
      }
    })
    .then((res)=>{
      console.log(res);
      // let cal = this.calculateCalorie();
      // console.log(cal);
      this.setState({
        bmiResult:res.data,
        calorieInTakePerDay: res.data.bmr.value,
        bmiObj:{
          "weight":{"value":"","unit":"kg"},
          "height":{"value":"","unit":"cm"},
          "sex":"m",
          "age":"",
          "waist":"",
          "hip":""
    },
       bmiLoaderFlag:false
      },()=>{
        this.getMeals();
        let logger = this.state.loginCredentials.filter(user => user.userName === this.state.userName);
        console.log(logger)
        this.updateCredential(logger);
      })    
    })
    .catch((err) => {
      console.log(err);
    })
  }
  setStyleSettings = (styleObj) => {
    this.setState({
      styleSettings: styleObj
    });
  }
  handleSubmit = (userQuery) => {
    Axios.get('https://www.googleapis.com/youtube/v3/search',{params: {
      part: "snippet",
      maxResults: 3,
      key: KEY,
      q:userQuery
  }
  })
       .then((res)=>{
          console.log(res);
          this.setState({
        workoutVideos: res.data.items
           })
       })
       .catch((err) => {
         console.log(err);
       })
    
}
getSimilarRecipes = () => {
  if(this.state.mealPlan.meals){
    this.state.mealPlan.meals.forEach((meal,ind)=>{
      console.log(ind)
      this.callSimilarRecipes(meal.id);
      
    })
  } 
}
callSimilarRecipes = (id) =>{
  Axios.get(`https://webknox-recipes.p.rapidapi.com/recipes/${id}/similar`,{headers:{
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": rapidKey}
  })
  .then((res) => {
    console.log(res)
    let similarRecipes = [...this.state.similarRecipes];
    res.data.forEach((rec,index) => {
       similarRecipes.push(rec);
    })
    this.setState({
      similarRecipes:similarRecipes
    })
  })
  .catch((err)=>console.log(err))
}

getCredentials = () => {
  Axios.get("https://ironrest.herokuapp.com/pradeepa")
  .then((data) => {
    console.log(data);
    let credentials = data.data.filter(cred => cred._id === '5dd713560dce380017fe821d');
    console.log(credentials)
    console.log(credentials[0].loggers)
    this.setState({
        ready:true,
        loginCredentials: credentials[0].loggers
    })
  })
  .catch((err)=>{
    console.log(err);
  }) 
}
handleVideoSelect = (video) => {
  this.setState({selectedWorkoutVideo: video})
}

  setLogin = (login) => {
    this.setState({
      loggerInfo: login,
      userName:login.userName
    })
  }
  authenticateUser = () => {
    console.log('entering')
    let logger = this.state.loginCredentials.filter(user => user.userName === this.state.loggerInfo.userName);
    if(logger[0].date !== new Date().toDateString()){
      this.setState({
        calorieInTakePerDay:logger[0].caloriePerDay,
      },() =>{
        this.getMeals();
      })
      this.handleSubmit("workout");
      this.updateCredential(logger);
    } else {
      if(logger[0].mealPlan.meals.length === 0 || !logger[0].mealPlan.meals){
        this.setState({
          calorieInTakePerDay:logger[0].caloriePerDay,
        },() =>{
          this.getMeals();
        })
        this.handleSubmit("workout");
        this.updateCredential(logger);
      } else{
        this.setState({
          calorieInTakePerDay:logger[0].caloriePerDay,
          mealPlan:logger[0].mealPlan,
          workoutVideos:logger[0].workoutPlan
        })
        
      }
    }
    if(this.state.loggerInfo.password === logger[0].password) {
      this.setState({
         authenticatedFlag:true,
         loggerInfo:logger
       })
       
    }
  }
  reloadPlans = () => {
    this.setState({
      similarRecipes:[]
    })
    this.getCredentials();
  }
  updateCredential = (logger) => {
    setTimeout(()=>{
      console.log(logger)
      logger[0].date=new Date().toDateString();
        logger[0].caloriePerDay = this.state.calorieInTakePerDay;
        logger[0].mealPlan=this.state.mealPlan;
        console.log(logger[0].mealPlan)
        logger[0].workoutPlan=this.state.workoutVideos;
        
        let futureLoggersMeal = [...this.state.loginCredentials];
        let index;
        futureLoggersMeal.forEach((user,ind) => {
          if(user.userName===this.state.loggerInfo.userName){
            index = ind;
          }
        })
        futureLoggersMeal[index]=logger[0];
        
        Axios.put("https://ironrest.herokuapp.com/pradeepa/5dd713560dce380017fe821d",{loggers:futureLoggersMeal})
        .then(res=>{
          
          console.log("updated with meal plan and date")
        })
        .catch((err)=>console.log(err))
      },500)
  }
  logOutSession = () => {
    this.setState({
      authenticatedFlag:false,
      loggerInfo:{
        userName:"",
        password:""
    },
    searchList:[],
    similarRecipes:[]
    })
  }
  setSearch = (str) => {
    this.setState({
      searchText:str
    })
    if(str.length < 1){
      this.setState({
        searchList:[]
    })
    }
  }
  setUserOptionWatchWorkout = (val) =>{
    this.setState({
      userOptionWatchWorkout:val
    },() => {
      this.handleSubmit(this.state.userOptionWatchWorkout);
    })
  }
  callMeals = ()=> {
    let str = this.state.searchText;
    Axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${str}`,{headers:{
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": spoonacularKey}
    })
      .then(res => {
        console.log(res)
        this.setState({
          searchList:res.data.results
      })
    })
      .catch(err => console.log(err))
  }
  createAccount = () => {
    let futureLoggers = [...this.state.loginCredentials];
    futureLoggers.push(this.state.loggerInfo);
     Axios.put("https://ironrest.herokuapp.com/pradeepa/5dd713560dce380017fe821d",{loggers:futureLoggers})
    .then(res=>{
      this.setState({
        authenticatedFlag:true
      })
    })
    .catch(err=>console.log(err))
  }
  removeMealFromPlan = (ind) =>{
    let mealList = {...this.state.mealPlan};
    mealList.meals.splice(ind,1);
    this.setState({
      mealPlan:mealList
    },() => {
      let loggerForRemoval = this.state.loginCredentials.filter(user => user.userName === this.state.userName);
      this.updateCredential(loggerForRemoval);
    })
    
  }
  addMealFromPlan = (list,ind)=>{
    let mealList = {...this.state.mealPlan};
    mealList.meals.push(list[ind]);
    this.setState({
      mealPlan:mealList,
     
    },() =>{
      let loggerForAdding = this.state.loginCredentials.filter(user => user.userName === this.state.userName);
      this.updateCredential(loggerForAdding);
    })
    
  }
  render() {
    return (
      <div className="content">
        <header>
           <img src={leafIcon} alt="leafIcon" />
          <h1>Aarokya</h1>
        </header>
        <div className="main-content">
          <Switch>
            <Route exact path="/" render = { (props) => <Login {...props} loggerInfo = {this.state.loggerInfo}
                                                                          setLogin = {this.setLogin}
                                                                          authenticateUser = {this.authenticateUser}
                                                                          authenticatedFlag = {this.state.authenticatedFlag}
            /> } />
            <Route exact path="/sign-up" render = { (props) => <SignUp {...props} loggerInfo = {this.state.loggerInfo}
                                                                                  setLogin = {this.setLogin}
                                                                                  createAccount = {this.createAccount}
                                                                                  authenticateUser = {this.authenticateUser}
                                                                                  authenticatedFlag = {this.state.authenticatedFlag}
            /> } />
            <Route exact path="/home" render = { (props) => <Home {...props} styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                              logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                              loggerInfo = {this.state.loggerInfo}       
            /> }  />
            <Route exact path="/meal-plan" render = { (props) => <MealPlan {...props} searchText = {this.state.searchText}
                                                                                      setSearch = {this.setSearch}
                                                                                      callMeals = {this.callMeals}
                                                                                      mealPlan = {this.state.mealPlan}
                                                                                      ready = {this.state.ready}
                                                                                      getGroceryList = {this.getGroceryList}
                                                                                      groceryList = {this.state.groceryList}
                                                                                      searchList = {this.state.searchList}
                                                                                      removeMealFromPlan = {this.removeMealFromPlan}
                                                                                      addMealFromPlan = {this.addMealFromPlan}
                                                                                      reloadPlans = {this.state.reloadPlans}
                                                                                      loggerInfo = {this.state.loggerInfo}
            /> } />
            <Route exact path="/workout-plan" render = { (props) => <WorkoutPlan {...props} workoutVideos = {this.state.workoutVideos}
                                                                                            selectedWorkoutVideo = {this.state.selectedWorkoutVideo}
                                                                                            handleVideoSelect = {this.handleVideoSelect}
                                                                                            reloadPlans = {this.state.reloadPlans}
                                                                                            loggerInfo = {this.state.loggerInfo}
                                                                                            userOptionWatchWorkout = {this.state.userOptionWatchWorkout}
                                                                                            setUserOptionWatchWorkout = {this.setUserOptionWatchWorkout}
            /> } />
            <Route exact path="/health-check" render = { (props) => <HealthCheck {...props} bmiObj = {this.state.bmiObj}
                                                                                            setBmiObject = {this.setBmiObject}
                                                                                            getBmi = {this.getBmi}
                                                                                            bmiResult = {this.state.bmiResult}
                                                                                            bmiLoaderFlag = {this.state.bmiLoaderFlag}
                                                                                            calorieInTakePerDay = {this.state.calorieInTakePerDay}
                                                                                            reloadPlans = {this.state.reloadPlans}
                                                                                            loggerInfo = {this.state.loggerInfo}
            /> } />
             <Route exact path="/meal-plan/:id" render = { (props) => <RecipeDetails {...props} mealPlan = {this.state.mealPlan}
                                                                                                getDescription = {this.getDescription}
                                                                                                recipeDescription = {this.state.recipeDescription}
                                                                                                reloadPlans = {this.reloadPlans}
                                                                                                nutritionData = {this.state.nutritionData}
                                                                                                loggerInfo = {this.state.loggerInfo}
            /> } />
              <Route exact path="/customize-meal-plan" render = { (props) => <CustomizeMealPlan {...props} getSimilarRecipes = {this.getSimilarRecipes}
                                                                                                           similarRecipes = {this.state.similarRecipes}
                                                                                                           addMealFromPlan = {this.addMealFromPlan}
                                                                                                           reloadPlans = {this.state.reloadPlans}
                                                                                                           loggerInfo = {this.state.loggerInfo}
            /> } />
          </Switch>
        </div>
      </div>
    );
  }
 
}

export default App;
