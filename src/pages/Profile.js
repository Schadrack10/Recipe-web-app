import React from 'react'
import {useContext} from 'react'
import AuthContext from '../components/store/auth-context'


const Profile = () => {


const {favouriteRecipies,setFavouriteRecipies} =  useContext(AuthContext)



  return (

    <div>
       {favouriteRecipies.map((recipe, index)=>{
             return(
              <div key={index}>
              {recipe.name}
               </div>
              
              )
       })}

    </div>
  )
}

export default Profile