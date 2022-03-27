import React, {FC} from "react";
import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login";
import Contacts from "../pages/Contacts"
import Home from "../pages/Home";
import ProtectedRouter from "./ProtectedRouter";
import NotFound from "../pages/NotFound"
import NewContact from "../pages/NewContact";
import EditContact from "../pages/EditContact";


const AppRoute: FC = () => {

    return (
        <Routes>

            <Route path={"/Login"} element={<Login/>}/>
            <Route path={"/Contacts"} element={
                <ProtectedRouter>
                    <Contacts/>
                </ProtectedRouter>
            }/>
            <Route path={"/NewContact"} element={
                <ProtectedRouter>
                    <NewContact/>
                </ProtectedRouter>
            }/>
            <Route path={"/EditContact/:id"} element={
                <ProtectedRouter>
                    <EditContact/>
                </ProtectedRouter>
            }/>
            <Route path={"/Home"} element={<Home/>}/>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"*"} element={<NotFound/>}/>

        </Routes>

    )
}
export default AppRoute;