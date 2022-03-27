import {Navigate} from "react-router-dom";
import React, {FC} from "react";

const ProtectedRouter:FC = ({children}):React.ReactElement<string> => {

    if(localStorage.getItem("auth")){
        return children as React.ReactElement
    }
    return    <Navigate to="/Login"/>
}

export default ProtectedRouter;