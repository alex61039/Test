import React, {FC, useEffect, useState} from "react";
import {IContact} from "../models/IContact";
import {Grid, TextField, Button} from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import useAction from "../hooks/useAction"
import {useTypedSelector} from "../hooks/useTypedSelector";

/*
interface EditProps{
    contact:IContact
}
*/

const EditContact:FC = () => {
    const params = useParams()
    const {id} = params;
    const initState = {
        id:0,
        userId:0,
        name:"",
        description:""
    };

    const {contacts} = useTypedSelector(state => state.contactReducer)
    const _contacts = contacts as IContact[]
    const contact = _contacts.find(it => it.id == id)
    if (contact) {
        initState.id = contact.id as number;
        initState.userId = contact.userId;
        initState.name = contact.name;
        initState.description = contact.description
    };

    const[newId, setId] = useState(initState.id)
    const[newName, setName] = useState(initState.name)
    const[newUserid, setUserid] = useState(initState.userId)
    const[newDesc, setDesc] = useState(initState.description)
    const{setEditContactAsync} = useAction()
    const navigate = useNavigate();

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleDesc = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
    }

    const formData = new FormData()
    formData.append("id", newId.toString())
    formData.append("userId", newUserid.toString() )
    formData.append("name", newName)
    formData.append("description", newDesc)


    const submit = () => {
        setEditContactAsync(formData);
        setTimeout( ()=> navigate("/Contacts"), 500)

    }

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <h2>Изменить контакт</h2>
            <Grid container direction={"column"} style={{width:"50vh"}}>
                <TextField {...newName} value={newName} label={"Имя"} style={{marginTop:10}} onChange={handleName}/>
                <TextField {...newDesc} value={newDesc} label={"Описание"} style={{marginTop:10, marginBottom:20}} onChange={handleDesc}/>
                <Button variant={"contained"} onClick={submit}>Записать</Button>
            </Grid>
        </Grid>
    )

}

export default EditContact;