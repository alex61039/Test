import React, {FC, useState} from "react";
import {Grid, Button, TextField} from "@mui/material"
import useAction from "../hooks/useAction";
import {useNavigate, Navigate} from "react-router-dom"


const NewContact:FC = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const{setNewContactAsync} = useAction()
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("")
    const user_Id = userId as string
    const formData = new FormData()
    formData.append("userId", user_Id)
    formData.append("name", name)
    formData.append("description", desc)

    const handleName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleDesc = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
    }

    const submit = () => {
        setNewContactAsync(formData);
       setTimeout( ()=>{navigate("/Contacts")}, 500)
    }

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <h2>Новый контакт</h2>
            <Grid container direction={"column"} style={{width:"50vh"}}>
                <TextField {...name} value={name} label={"Имя"} style={{marginTop:10}} onChange={handleName}/>
                <TextField {...desc} value={desc} label={"Описание"} style={{marginTop:10, marginBottom:20}} onChange={handleDesc}/>
                <Button variant={"contained"} onClick={submit}>Записать</Button>
            </Grid>
        </Grid>


    )

}
export default NewContact;