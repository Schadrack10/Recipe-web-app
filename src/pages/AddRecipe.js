import React from 'react'
import { useState, useContext } from 'react'
import AuthContext from '../components/store/auth-context'
import { db } from '../index'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'

// import Box from '@mui/material'

const AddRecipe = () => {

  

    const {  //recipe states
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
        getRecipies
    } = useContext(AuthContext)




    return (
    <Box sx={{ padding:'20px 300px', minHeight:'calc(90vh - 100px)',}}>

        <form style={styles.form} onSubmit={handleCreate} >
            <Box>
                <Typography fontSize={30} fontWeight="bold" variant="h1" align="center" mb={2}>
                    Create your own recipe
                </Typography>
            </Box>
            <label>Recipe name</label>
            <input style={{ ...styles.input }} type="text" placeholder="what is your recipe named.." name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Recipe description</label>

            <input min={'0'} style={{ ...styles.input }} type="text" placeholder="describe the recipe ingredients" name="name" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Recipe duration</label>

            <input style={{ ...styles.input, width: '30%' }} type="number" placeholder="how long does it take" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <label>Recipe image</label>

            <input style={{ ...styles.input }} type="text" placeholder="eg. https://www.imgae.url" name="name" value={img} onChange={(e) => setImg(e.target.value)} />
            <Button variant="contained" color="warning" style={{ padding: '10px' }} type="submit">
                Create recipe
            </Button>
        </form>

    </Box>
    )
}

export default AddRecipe



const styles = {
    form: {
       display:'flex',
       flexDirection:'column',
    //    border:'1px solid red',
        padding:'20px',
       color:'#fff',
       justifyContent:'center',
       backgroundColor: '#030a18',
       boxShadow:' 0  7px 6px rgba(0, 0, 0, 0.9)'
    },
    input: {
       margin:'20px 0',
       padding:'10px 0',
       background:'#ccc',
       border:'none',

       width:'100%',
    //    padding:'15px',
       background:'transparent',
       borderBottom:'2px solid #002F5A',
       outline:'none',
       color:'#fff',
       borderTop:'none',
       borderRight:'none',
       borderLeft:'none',
    //    marginTop:'35px'
    //    border:'3px double #fff'

    }
}