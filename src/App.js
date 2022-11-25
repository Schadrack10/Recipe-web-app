import { BrowserRouter,Route, Switch, Redirect } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import AuthForm from './components/Auth/AuthForm'
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import {db} from './index.js'
import {getFirestore, collection, addDoc, getDocs} from 'firebase/firestore'
import AddRecipe from './pages/AddRecipe';




function App() {

   const [recipies, setRecipies] = useState([])
   const recipiesCollectionRef =  collection(db,"recipies")



   
  return (
   
   <Layout>

    <Switch>
    <Route exact path="/" component={Recipes }/>
     <Route path="/auth" component={AuthForm} />
    <Route path="/more" component={AddRecipe} />
    <Route path="/fav" component={Profile} />
    <Route path="/" component={Recipes} />
    </Switch>

   </Layout>
  
   
  );
}

export default App;






