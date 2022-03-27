import React, {FC, useEffect} from "react";
import ContactsList from "../components/ContactsList";
import useAction from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IContact} from "../models/IContact";
import {Button, Grid} from "@mui/material"
import {useNavigate, Navigate} from "react-router-dom"
import NewContact from "./NewContact";
import SearchForm from "../components/SearchForm";


const Contacts:FC = () => {

    const navigate = useNavigate()
    const {setContactsAsync} = useAction();
    const {contacts, error} = useTypedSelector(state => state.contactReducer);
    const list = contacts as IContact[];
    debugger
    const submit = () => {
        navigate("/NewContact")
    }

    useEffect( () => {
        setContactsAsync()
    }, [])

    return(
        <>

            <h2>Список контактов</h2>
            <Grid style={{marginBottom: 10, marginLeft: 20, marginRight:50, display:"flex"}} container direction={"row"} alignItems={"baseline"}>
                <Button variant={"contained"} onClick={submit}>Новый контакт</Button>
                <SearchForm/>
            </Grid>
            {
                list.length > 0
                ?
                    <ContactsList contacts={list}/>
                    :
                    <div>
                        <h1>{error}</h1>
                    </div>
            }

        </>
    )
}

export default Contacts;