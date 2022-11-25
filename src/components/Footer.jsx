import React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
       ...footerStyles.container
      }}
    >
      <Box sx={{...footerStyles.footerBlock}}>powered by our</Box>
      <Box sx={{...footerStyles.footerBlock}}>powered by our</Box>

    </Box>
  );
};


export default Footer;


const footerStyles = {
  container:{
    width: "100%",
    height: "80px",
    // border: "1px solid #fff",
    display: "flex",
    alignItems:'center',
    color:'#fff'
  },
  footerBlock:{
    width:'50%'
  }

}
