import React from "react";
import { useState, useEffect, useCallback } from "react";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from '../../index'
import { useHistory, Link } from 'react-router-dom';




let logoutTimer;


const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },

})

const calculateRemainingTime = (expirationTime) => {
    const currenttime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationTime - currenttime

    return remainingDuration

}


const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingTime = calculateRemainingTime(storedExpirationDate)
    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {


    const tokenData = retrieveStoredToken()
    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token

    }


    const [token, setToken] = useState(initialToken)
    const [isfederatedSignin, setIsfederatedSignin] = useState(false)
    const [user, setUser] = useState('')

    //recipe states
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [recipies, setRecipies] = useState([])
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [loading, setLoading] = useState(false)
   
    const ForceReload = ()=> window.location.reload();

    const [recipeDetails ,setRecipeDetails] =  useState({
        name:'',
        description:'',
        img:'',
        duration:0

    })

    const [favouriteRecipies, setFavouriteRecipies] = useState([{name:'test',duration:'testduration'},{name:'test2',duration:'testduration'}])
  const history =  useHistory()
    




   //modals
   const [editOpen, setEditOpen] = React.useState(false);
   const [viewOpen, setViewOpen] = React.useState(false);
   const [EditValue, setEditValue] = React.useState(0);



    const userIsLoggedIn = !!token


    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationTime', expirationTime);

        const remaingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(() => {
            loginHandler()
        }, remaingTime)
    }


    const logoutHandler = useCallback(() => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')


        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }

    }, [])


    useEffect(() => {

        if (token) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }

    }, [tokenData, logoutHandler])




    //recipe crud functions

    const recipiesCollectionRef = collection(db, "recipies")


    const handleCreate = async (e) => {
        e.preventDefault()
       setLoading(true)
        await addDoc(recipiesCollectionRef, {
            recipeName: name,
            recipeImg: img,
            recipeDescription: description,
            recipeDuration: Number(duration)

        })

        history.replace('/')
        ForceReload()
        setLoading(false)

        const clientData = {
            recipeName: name,
            recipeDescription: description,
            recipeImg: img,
            recipeDuration: duration

        }
        if (name, description, img, duration) {
            console.log(clientData)
        }

    }


    const updateRecipe = async (id, recipeDuration) => {
        // setLoading(true)
        const recipeDoc = doc(db, "recipies", id)
        const newDuration = { recipeDuration: recipeDuration  + 1}
        await updateDoc(recipeDoc, newDuration)
        ForceReload()

        // setLoading(false)
    }


    const deleteRecipies = async (id) => {
        const recipeDoc = doc(db, "recipies", id)
        setLoading(true)
        await deleteDoc(recipeDoc)
        ForceReload()
        setLoading(false)
    }

    const getRecipies = async () => {
        setLoading(true)
        const data = await getDocs(recipiesCollectionRef).then(data => data)
        // console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        setRecipies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })), 'data retrieved from firestore')
        setLoading(false)
    }



    useEffect(() => {
        getRecipies()
    }, [])



    const contextValue = {
        //user values
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        isfederatedSignin: isfederatedSignin,
        setIsfederatedSignin: setIsfederatedSignin,
        user: user,
        setUser: setUser,
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
        //loaders
        loading,
        setLoading,
        //modal
        editOpen,
        setEditOpen,
       recipeDetails,
       setRecipeDetails,
       viewOpen,
        setViewOpen,
         EditValue,
         setEditValue,
         //fav
         favouriteRecipies,
         setFavouriteRecipies


    }



    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}



export default AuthContext