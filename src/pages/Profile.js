import React from 'react'
import {useContext} from 'react'
import AuthContext from '../components/store/auth-context'
import { useHistory, Link } from 'react-router-dom';



const Profile = () => {


const {favouriteRecipies,setFavouriteRecipies} =  useContext(AuthContext)




  return (
    <>
     <h1 style={{color:'#fff' ,fontSize:'24px', margin:' 20px 40px '}}>
         Favourite Recipies 
     </h1>

    <div style={{display:'flex', padding:20 }}>
  
       {favouriteRecipies.map((recipe, index)=>{
             return(
              <div style={styles.card} key={index}>
                    <img src={recipe.image} width={'100%'} height={'40%'} style={{borderRadius:'20px 20px 0 0', filter:'brightness(0.7)'}}/>  
                      <div style={{padding:'20px 5px', height:'60%',display:'flex',flexDirection:'column',gap:20}}>
                          <h1 style={{color:'#fff' ,fontSize:'20px',}}>{recipe.name}</h1>
                          <hr style={{width:"50px"}}/>
                          <p style={{color:'#fff' ,fontSize:'16px'}}>{recipe.description}</p>
                      </div>            
               </div>
              
              )
       })}

    </div>

    </>
  )
}

export default Profile


const styles ={
  
  card:{
    border:'3px solid #002F5A',
    height:'250px',
    width:'250px',
    margin:'0 20px',
    borderRadius:'20px',
    // backgroundColor:'#002F5A'

  }

}