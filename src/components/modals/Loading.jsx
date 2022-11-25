import React from "react";
import DotLoader from "react-spinners/DotLoader";
import {
  FadeLoader,
  ScaleLoader,
  ClipLoader,
  BeatLoader,
} from "react-spinners";
import { Box } from "@mui/system";




const Loading = () => {


    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };


  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <BeatLoader
        style={{height:100}}
        color={"#fff"}
        // loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default Loading;
