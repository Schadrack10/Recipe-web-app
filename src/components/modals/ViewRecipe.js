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
  width: '50%',
  // height:'50%',
  bgcolor: '#000',
  color:'#fff',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
  display:'flex',
  alignItems:'start',
  justifyContent:'space-between',
  flexDirection:'column',
  padding:'10px',
  border:'3px double #111'
};

export default function ViewRecipe() {
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const { 
    editOpen,
    setEditOpen,
    viewOpen,
    setViewOpen,
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
      favouriteRecipies,
         setFavouriteRecipies
    }  =useContext(AuthContext)
 

const handleFavourites  = (name, description, duration,image)=>{

  let RecipeNAME = recipeDetails.name
  let elements = null
  // michee => {name:michh}
   
    // for(let i = 0 ; i < favouriteRecipies.length;i++){


        
    //      if( !favouriteRecipies[i].includes(RecipeNAME)){

    //         setFavouriteRecipies([...favouriteRecipies,{name:name, description:description, duration:duration,image:image}])
    //       }

        

    // }
  
  // console.log(elements)

    // if(!favouriteRecipies.includes(RecipeNAME)){

    //  setFavouriteRecipies([...favouriteRecipies,{name:name, description:description, duration:duration,image:image}])
    // }

    


    // console.log(RecipeNAME)


   setFavouriteRecipies([...favouriteRecipies,{name:name, description:description, duration:duration,image:image}])


}





  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={viewOpen}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={viewOpen}>
        <Box sx={style}>
           
             <img src={recipeDetails.img} height={300} width={'100%'} style={{objectFit:'cover', filter:'brightness(0.4)'}}/>
            
            <div>

              </div>
              <Typography variant="h3">
                {recipeDetails.name}
                   
                   
              </Typography>
             <Typography variant="p" color="#fff" sx={{mt:2,mb:2}}>
                {recipeDetails.description}
                </Typography>
                <div>
            <Button 
            onClick={()=>setViewOpen(false)} 
            color="error" 
            variant="contained"
            sx={{mr:2,mt:2}}
            >
                Cancel
            </Button>
            <Button 
             sx={{ml:2, mt:2}}
            ml={2}
            onClick={()=>handleFavourites(recipeDetails.name,recipeDetails.description,recipeDetails.duration,recipeDetails.img)} 
            color="warning" 
            variant="contained"
            >
                Add to favourite
            </Button>
                </div>

          

       
          </Box>
             
        </Fade>
      </Modal>
    </div>
  );
}