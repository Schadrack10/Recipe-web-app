import React from 'react'
import {useState, useContext} from 'react'
import AuthContext from './store/auth-context';
import ViewRecipe from './modals/ViewRecipe';
import Button from '@mui/material/Button';
import EditModal from './modals/EditModal';



  const RecipeComp = ({recipe, updateRecipe, deleteRecipies})=>{

    const { 
      editOpen,
      setEditOpen,
      viewOpen,
      setViewOpen,
      recipeDetils,
      setRecipeDetails,
      handleEditOpen,
      handleEditClose
      }  =useContext(AuthContext)

  const AuthCtx =  useContext(AuthContext)


    return(

        <div style={{...styles.container}}>
              
            <div style={{...styles.half}}>
              <img style={styles.img} src={recipe.recipeImg} />
            </div>
            <div style={{...styles.half,gap:10}}>
                  <h2>{recipe.recipeName}</h2>
                  <h4 style={{color:''}}>{recipe.recipeDescription}</h4>
                  <h5>{recipe.recipeDuration} hrs to prepare</h5>
            </div>
            <div style={{...styles.half, justifyContent:"space-around" }}>
                   
                 { AuthCtx.isLoggedIn && <Button onClick={()=>{
                                        setRecipeDetails({
                                       name:recipe.recipeName,
                                       img:recipe.recipeImg,
                                       description:recipe.recipeDescription,
                                       duration:recipe.recipeDuration
                                     })
                                     setViewOpen(true)
                                     }} sx={{width:'150px', height:'28px'}} variant="contained" color="success">
                                      view recipe
                                  </Button>
                 }

                { AuthCtx.isLoggedIn && <Button onClick={()=>updateRecipe(recipe.id,recipe.recipeDuration ) }
                                      sx={{width:'150px',height:'28px'}}  variant="contained" color="warning">
                                     Add durat.. +1
                                 </Button>}
                { AuthCtx.isLoggedIn &&     <Button onClick={()=>deleteRecipies(recipe.id)} sx={{width:'150px',height:'28px'}} variant="contained" color="error">
                                     delete recipe
                                 </Button>}
            </div>
            <ViewRecipe recipe={recipe}  />
            <EditModal recipe={recipe}  />
        </div>
    	)


  }


export default RecipeComp


const styles = {
	container:{
     display:'flex',
     height:'140px',
     gap:10,
     width:'100%',
     // border:'1px solid #fff',
     justifyContent:'space-around',
     margin:'20px 0',
     borderRadius:'8px',
     color:'#fff',
     // background:'red',
      boxShadow: '0  7px 6px rgba(0, 0, 0, 0.9)'
	},
	half:{
	   // border:'1px solid #fff',
       flex:1,
       padding:'15px',
       display:'flex',
       flexDirection:'column',
       // gap:10,
      
	},
	img:{
       width:'100%',
       height:'100%',
       objectFit:'contain'
	}
}