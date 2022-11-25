import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import {useContext} from 'react'
import { useHistory, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootsrap.min.css'
import AuthContext from './store/auth-context';
import Button from '@mui/material/Button';



const Navbar = () => {

    // const ForceReload = () => {
    //     setTimeout(()=>{
    //      window.location.reload(); 

    //     },1000)
    // }

  const AuthCtx = useContext(AuthContext);
  const {isfederatedSignin, setIsfederatedSignin, user , setUser} = useContext(AuthContext);
  const history =  useHistory()

  const isLoggedIn = AuthCtx.isLoggedIn;

  const logoutHandler = () => {
    AuthCtx.logout();
    setIsfederatedSignin(false)
    history.replace('/auth')
  };


  return (
    <Box sx={{...navStyles.container}}>
         <Box sx={{display:'flex',alignItems:'center', gap:2, width:'50%'}}>
           <img src="https://www.pngall.com/wp-content/uploads/8/Restaurant-Logo-PNG-Download-Image.png" width={70} />
            <Typography sx={navStyles.header} color="#fff" fontWeight={'bold'} fontStyle={'italic'} fontSize={30} variant="h2">
               <span style={{color:'#002F5A'}}>Food</span>  Lovers
            </Typography>
         </Box>
         <Box sx={{...navStyles.linkContainer}}>

          {  AuthCtx.isLoggedIn &&  <NavLink  style={navStyles.link}  to="/">Home</NavLink>}
           {  AuthCtx.isLoggedIn &&  <NavLink  style={navStyles.link}  to="/fav">Favourites</NavLink>}
            {  AuthCtx.isLoggedIn &&   <NavLink  style={navStyles.link}  to="/more">Add recipe</NavLink>}
            {AuthCtx.isLoggedIn  ? <Button sx={{ color:'#fff'}} variant="outlined" onClick={()=>logoutHandler()}>Logout</Button>:<NavLink  style={{...navStyles.link, marginLeft:'500px'}}  to="/auth">Login</NavLink>}
         </Box>
    </Box>
  )
}

export default Navbar



const navStyles = {
  container:{
   height:'100px',
   width:'100%',
   background:'#030a18',
   borderBottom:'10px double #002F5A',
   display:'flex',
   alignItems:'center'
  },
  linkContainer:{
     width:'50%',
     display:'flex',
      alignItems:'center',
     justifyContent:'space-between',
     padding:'0 50px'
  },
  link:{
    color:'#fff',
    textDecoration:'none',
    fontWeight:'bold',
    fontSize:'16px',
    
  }

}
