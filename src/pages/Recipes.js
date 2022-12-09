import React from 'react'
import RecipeComp from '../components/RecipeComp'
import { useState, useContext } from 'react'
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../index.js'
import AuthContext from '../components/store/auth-context'
import Loading from '../components/modals/Loading'
import EditModal from '../components/modals/EditModal'
import ViewRecipe from '../components/modals/ViewRecipe'



const Recipes = () => {


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
    getRecipies,
    loading,
    setLoading
  } = useContext(AuthContext)


  const [filterTerm, setFilterTerm] = useState('')




  return (
    <div style={{ height: '65vh' }}>



      {/* <form onSubmit={handleCreate} style={{marginBottom:'20px'}}>  
       <input style={{padding:'10px'}} type="text" placeholder="enter recipe name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
       <input style={{padding:'10px'}} type="text" placeholder="enter recipe description" name="name" value={description} onChange={(e)=>setDescription(e.target.value)} />
       <input style={{padding:'10px', width:'70px'}} type="number" placeholder="duration" name="duration" value={duration} onChange={(e)=>setDuration(e.target.value)} />
       <input style={{padding:'10px'}} type="text" placeholder="enter recipe img" name="name" value={img} onChange={(e)=>setImg(e.target.value)} />
       <button style={{padding:'10px'}} type="submit">
           Create recipe
       </button>
        </form>*/}



      <div style={{ ...styles.compContainer }}>
        <input placeholder={'find your recipe?'} style={styles.input} value={filterTerm} onChange={(e) => setFilterTerm(e.target.value.trim())} />

        {loading ?
          <Loading />

          :

          <>
            {recipies.filter(val => {

              if (!val.recipeName) {
                return val
              } else if (val.recipeName.toLowerCase().includes(filterTerm.toLowerCase())) {
                return val
              }
            }).map((recipe) => {
              return (
                <RecipeComp key={recipe.id} deleteRecipies={deleteRecipies} updateRecipe={updateRecipe} recipe={recipe} />
              )
            })}

          </>
        }

      </div>





    </div>
  )
}

export default Recipes

const styles = {
  compContainer: {
    padding: '0 250px'
  },
  input: {
    width: '100%',
    padding: '15px',
    background: 'transparent',
    borderBottom: '4px solid #002F5A',
    outline: 'none',
    color: '#fff',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    marginTop: '35px'

  }
}