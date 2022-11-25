import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthContext from '../store/auth-context';
import { useState, useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'200px',
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({recipe}) {
   
   const { 
    editOpen,
    setEditOpen,
   
      //recipe states
      name,
      setName,
      img,
      setImg,
      description,
      setDescription,
      duration,
      setDuration,
      recipies,
      setRecipies,
      //firebse imports
      getDocs,
      getFirestore,
      collection,
      addDoc,
      updateDoc,
      doc,
      deleteDoc,
      //crud functions
      handleCreate,
      updateRecipe,
      deleteRecipies,
      getRecipies,
      recipeDetails,
      setRecipeDetails,
      EditValue, 
      setEditValue
    }  =useContext(AuthContext)
 


const handleSubmit = (recipe)=>{
  
  updateRecipe(recipe.id, recipe.recipeDuration)

  console.log(EditValue,'value in the modal form ')
}



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editOpen}
        // onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Recipe Duration of  { recipe.recipeName} 
            </Typography>
            <form onSubmit={()=>handleSubmit(recipe)} >
              
                <input onChange={(e)=> setEditValue(e.target.value)}  type={'number'} value={EditValue} placeholder={'duration '} style={{display:'block',width:'80%', margin:'10px 0', padding:'10px'}}/>
                 {/* increase the duration by 1 */}
            <Button 
            onClick={()=>setEditOpen(false)}  
            color="error" 
            variant="contained"
            sx={{marginRight:2}}
            >
                Cancel
            </Button>

            <Button 
            ml={2}
            type="submit"
            color="warning" 
            variant="contained"
            >
                update
            </Button>

            </form>
          
             
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}