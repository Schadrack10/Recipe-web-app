import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Fragment } from 'react'



const Layout = ({children})=>{

   return(

     <Fragment>
       <Navbar/>
       {children}
       
     </Fragment>

   )
}



export default Layout