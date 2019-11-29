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
import PasswordReset from './components/password-reset-component/password-reset';
import Axios from 'axios';
import leafIcon from './images/leaf-icon.png';
import HealthTip from './components/health-tip-component/health-tip';
const KEY = 'AIzaSyAEjrWBTS0fzNvmx9JTdBBNYEVs460G0SU';
const rapidKey = "4f90ef96b0msh246f6e054afbdd1p14c2ffjsn4e4ab27d80f1";
const spoonacularKey = "11d5a0e250msh19b75e8285d84ebp183a4fjsnfad048d8d187";
const spoonDirectKey = "2ea07250d6d543da875c6de34ad2c608";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready:false,
      loginCredentials:[],
      loggerInfo:{
        "firstName":"",
        "lastName":"",
        "email":"",
        "userName":"",
        "password":"",
        "question":"",
        "answer":"",
        "startWeight": "",
        "currentWeight": "",
        "goalWeight": "",
        "date":"",
        "caloriePerDay":2000,
        "mealPlan":{},
        "workoutPlan":[],
        "healthTip":{},
        "healthVideos":[],
        avatar:""
    },
    userName:"",
    avatar:"",
    password:"",
    confirmPassword:"",
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
    errorMessages:[{'userName':[{'required':'User name cannot be empty'},
                                //  {'incorrect':'User Name incorrect'}
                                //  {'available':'User Name already taken'}
                                ]
                    },
                   {'password':[{'required':'Password cannot be empty'},
                                {'incorrect':'Password incorrect'}
                              ]
                    }],
    isValidForm:false,
    passwordErrMsg:"",
    userNmErrMsg:"",
    userOptionWatchWorkout:"20min Workout",
    bmiResult:{},
    calorieInTakePerDay:2000,
    bmiLoaderFlag:false,
    recipeDescription:{},
    nutritionData:{},
    healthTip:{},
    healthVideoList:[],
    selectedHealthVideo:null,
    searchQueryForHealth:['indian health tips','american health tips','tasty smoothies','healthy food choices']
    }
  }

  componentDidMount(){
   this.getCredentials();
   
  }
  checkPswd = (pswd) =>{
    let fieldNm = this.state.errorMessages.find((field,ind)=> ind === 1)
   if(pswd === ''){
      console.log(fieldNm);
      let msg = fieldNm.password.filter((m,i)=>  i===0)
      console.log(msg)
      this.setState({
        passwordErrMsg:msg[0].required
      },()=>{
        console.log(this.state.passwordErrMsg)
      })
      } else{
        this.setState({
          isValidForm:true
        })
      }
  }
  checkUserNm = (un) =>{
    let fieldNmUn = this.state.errorMessages.find((field,ind)=> ind === 0)
    if(un === ''){
       console.log(fieldNmUn);
       let msg = fieldNmUn.userName.filter((m,i)=>  i===0)
       console.log(msg)
       this.setState({
        userNmErrMsg:msg[0].required
       },()=>{
         console.log(this.state.userNmErrMsg)
       })
       } else{
        this.setState({
          userNmErrMsg:""
         })
       }
  }
  setPassword = (pass) =>{
   this.setState({
     password:pass
   })
  }
  setConfirmPassword = (pass) => {
    this.setState({
      confirmPassword:pass
    })
  }
  getDescription = (id) => {
    Axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,{headers:{
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": spoonacularKey}
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
 getMeals = (cal) => {
  Axios.get(`https://api.spoonacular.com/recipes/mealplans/generate?apiKey=${spoonDirectKey}&targetCalories=${cal}&timeFrame=day`
  // {headers:{
  //   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  //   "x-rapidapi-key": spoonacularKey}
  // }
  )
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
       bmiObj:obj,
       bmiResult:{}
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
        this.getMeals(this.state.calorieInTakePerDay);
        let logger = this.state.loginCredentials.find(user => user.userName === this.state.userName);
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
  Axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/similar`,{headers:{
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": spoonacularKey}
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
console.log(login)
    this.setState({
      loggerInfo: login,
      userName:login.userName,
      password:login.password
    },()=>{
      console.log(this.state.loggerInfo)
    })
  }
 
  authenticateUser = () => {
    let fieldNm = this.state.errorMessages.find((field,ind)=> ind === 1);
    let logger = this.state.loginCredentials.find(user => {
      console.log(user)
      if(user.userName == this.state.loggerInfo.userName){
        console.log(user.date)
        return user;
      }
    
    })
    console.log(this.state.loginCredentials)
    console.log(this.state.loggerInfo.userName)
    console.log(this.state.userName)
    console.log(logger.date)
    if(logger.date !== new Date().toDateString()){
        if(logger.caloriePerDay !== ""){
             this.setState({
                calorieInTakePerDay:logger.caloriePerDay,
               },() =>{
                  this.getMeals(this.state.calorieInTakePerDay);
              })
          } else{
             this.getMeals(this.state.calorieInTakePerDay);
           }
           this.handleSubmit("workout");
           this.getHealthTip();
           this.handleSubmitForHealth(this.state.searchQueryForHealth[Math.floor(Math.random()*this.state.searchQueryForHealth.length)]);
     
           if(this.state.avatar === ""){
              this.setState({
                    avatar:"https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png"
             })
            }
            if(this.state.loggerInfo.password === logger.password) {
                this.setState({
                       authenticatedFlag:true,
                       passwordErrMsg:"",
                        userNmErrMsg:"",
                       loggerInfo:logger
                   },()=>{
                 console.log(this.state.authenticatedFlag)
                 
                 this.updateCredential(logger);
                })
             } else{
              let msgInCorrect = fieldNm.password.filter((m,i)=>  i===1)
                      this.setState({
                        passwordErrMsg:msgInCorrect[0].incorrect,
                        userNmErrMsg:"",
                         },()=>{
                        console.log(this.state.passwordErrMsg)
                        })
             }
    } else {
         if(!logger.mealPlan.meals || logger.mealPlan.meals.length === 0 ){
             if(logger.caloriePerDay !== ""){
                 this.setState({
                    calorieInTakePerDay:logger.caloriePerDay,
                    },() =>{
                    this.getMeals(this.state.calorieInTakePerDay);
                   })
               } else{
                   this.getMeals(this.state.calorieInTakePerDay);
                }
        
               this.handleSubmit("workout");
                this.getHealthTip();
                this.handleSubmitForHealth(this.state.searchQueryForHealth[Math.floor(Math.random()*this.state.searchQueryForHealth.length)]);
        
               if(this.state.avatar === ""){
                    this.setState({
                         avatar:"https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png"
                      })
                  }
                  if(this.state.loggerInfo.password === logger.password) {
                    this.setState({
                           authenticatedFlag:true,
                           passwordErrMsg:"",
                            userNmErrMsg:"",
                           loggerInfo:logger
                       },()=>{
                     console.log(this.state.authenticatedFlag)
                     
                     this.updateCredential(logger);
                    })
                 } else{
                  let msgInCorrect = fieldNm.password.filter((m,i)=>  i===1)
                          this.setState({
                            passwordErrMsg:msgInCorrect[0].incorrect,
                            userNmErrMsg:"",
                             },()=>{
                            console.log(this.state.passwordErrMsg)
                            })
                 }
      } else{
        console.log('entering else')
        if(this.state.loggerInfo.password === logger.password) {
          this.setState({
             authenticatedFlag:true,
             passwordErrMsg:"",
                userNmErrMsg:"",
          })
          this.setState({
                calorieInTakePerDay:logger.caloriePerDay,
                 mealPlan:logger.mealPlan,
                 workoutVideos:logger.workoutPlan,
                 healthTip:logger.healthTip,
                 avatar:logger.avatar,
                healthVideoList:logger.healthVideos,
                loggerInfo:logger
             },()=>{
                if(this.state.avatar === ""){
                   this.setState({
                         avatar:"https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png"
                     })
                  }
           })
      } else{
      let msgInCorrect = fieldNm.password.filter((m,i)=>  i===1)
              this.setState({
                passwordErrMsg:msgInCorrect[0].incorrect,
                userNmErrMsg:"",
                 },()=>{
                console.log(this.state.passwordErrMsg)
                })
     }
    }
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
      logger.date=new Date().toDateString();
        logger.caloriePerDay = this.state.calorieInTakePerDay;
        console.log(logger.caloriePerDay)
        logger.mealPlan=this.state.mealPlan;
        console.log(logger.mealPlan)
        if(this.state.workoutVideos.length!==0){
          logger.workoutPlan=this.state.workoutVideos;
        }
        logger.healthTip = this.state.healthTip;
        logger.healthVideos = this.state.healthVideoList;
        console.log(this.state.password);
       logger.password = this.state.password;
        let futureLoggersMeal = [...this.state.loginCredentials];
        let index;
        futureLoggersMeal.forEach((user,ind) => {
          if(user.userName===this.state.loggerInfo.userName){
            index = ind;
          }
        })
        futureLoggersMeal[index]=logger;
        console.log(futureLoggersMeal)
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
  getHealthTip = () =>{
    Axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random`,{headers:{
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": spoonacularKey}
  })
  .then((res) => {
    console.log(res)
    
    this.setState({
      healthTip:res.data
    },()=>{
      console.log(this.state.healthTip)
      
    })
  })
  .catch((err) => console.log(err))
  }
  handleSubmitForHealth = (userQuery) => {
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
        healthVideoList: res.data.items
           })
       })
       .catch((err) => {
         console.log(err);
       })
    
}
handleHealthVideoSelect = (video) => {
  this.setState({selectedHealthVideo: video})
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
                                                                          checkPswd = {this.checkPswd}
                                                                          checkUserNm = {this.checkUserNm}
                                                                          isValidForm = {this.state.isValidForm}
                                                                          passwordErrMsg = {this.state.passwordErrMsg}
                                                                          userNmErrMsg = {this.state.userNmErrMsg}                   
            /> } />
            <Route exact path="/sign-up" render = { (props) => <SignUp {...props} loggerInfo = {this.state.loggerInfo}
                                                                                  setLogin = {this.setLogin}
                                                                                  createAccount = {this.createAccount}
                                                                                  authenticateUser = {this.authenticateUser}
                                                                                  authenticatedFlag = {this.state.authenticatedFlag}
                                                                                  calorieInTakePerDay = {this.state.calorieInTakePerDay}
  /> } />
            <Route exact path="/home" render = { (props) => <Home {...props} styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                              logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                              userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar}     
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
                                                                                      reloadPlans = {this.reloadPlans}
                                                                                      userName = {this.state.userName}  
                                                                                      avatar = {this.state.avatar} 
                                                                                      styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                                     
            /> } />
            <Route exact path="/workout-plan" render = { (props) => <WorkoutPlan {...props} workoutVideos = {this.state.workoutVideos}
                                                                                            selectedWorkoutVideo = {this.state.selectedWorkoutVideo}
                                                                                            handleVideoSelect = {this.handleVideoSelect}
                                                                                            reloadPlans = {this.reloadPlans}
                                                                                            loggerInfo = {this.state.loggerInfo}
                                                                                            userOptionWatchWorkout = {this.state.userOptionWatchWorkout}
                                                                                            setUserOptionWatchWorkout = {this.setUserOptionWatchWorkout}
                                                                                            userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar} 
                                                                              styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
            /> } />
            <Route exact path="/health-check" render = { (props) => <HealthCheck {...props} bmiObj = {this.state.bmiObj}
                                                                                            setBmiObject = {this.setBmiObject}
                                                                                            getBmi = {this.getBmi}
                                                                                            bmiResult = {this.state.bmiResult}
                                                                                            bmiLoaderFlag = {this.state.bmiLoaderFlag}
                                                                                            calorieInTakePerDay = {this.state.calorieInTakePerDay}
                                                                                            reloadPlans = {this.reloadPlans}
                                                                                            userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar} 
                                                                              styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                                           
            /> } />
             <Route exact path="/meal-plan/:id" render = { (props) => <RecipeDetails {...props} mealPlan = {this.state.mealPlan}
                                                                                                getDescription = {this.getDescription}
                                                                                                recipeDescription = {this.state.recipeDescription}
                                                                                                reloadPlans = {this.reloadPlans}
                                                                                                nutritionData = {this.state.nutritionData}
                                                                                                userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar} 
                                                                              styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                                             
            /> } />
              <Route exact path="/customize-meal-plan" render = { (props) => <CustomizeMealPlan {...props} getSimilarRecipes = {this.getSimilarRecipes}
                                                                                                           similarRecipes = {this.state.similarRecipes}
                                                                                                           addMealFromPlan = {this.addMealFromPlan}
                                                                                                           reloadPlans = {this.reloadPlans}
                                                                                                           userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar} 
                                                                              styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                                                         
            /> } />
            <Route exact path="/health-tip" render = { (props) => <HealthTip {...props} healthTip = {this.state.healthTip}
                                                                                        healthVideoList = {this.state.healthVideoList}
                                                                                        selectedHealthVideo = {this.state.selectedHealthVideo}
                                                                                        handleHealthVideoSelect = {this.handleHealthVideoSelect}
                                                                                        userName = {this.state.userName}  
                                                                              avatar = {this.state.avatar} 
                                                                              styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                             logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}
                                                                              reloadPlans = {this.reloadPlans}
                                                                                                         
            /> } />
             <Route exact path="/reset" render = { (props) => <PasswordReset {...props} loggerInfo = {this.state.loggerInfo}
                                                                                  setLogin = {this.setLogin}
                                                                                  loginCredentials = {this.state.loginCredentials}
                                                                                
                                                                                  authenticatedFlag = {this.state.authenticatedFlag}
                                                                                  password = {this.state.password}
                                                                                  confirmPassword = {this.state.confirmPassword}
                                                                                  setPassword = {this.setPassword}
                                                                                  setConfirmPassword = {this.setConfirmPassword}
                                                                                  updateCredential = {this.updateCredential}
            /> } />
          </Switch>
        </div>
      </div>
    );
  }
 
}

export default App;
