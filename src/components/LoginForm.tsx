import React, {FC, useState} from "react";
import {Button, Box, TextField, Grid, Typography, ThemeProvider} from "@mui/material";
import useAction from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {createTheme} from "@mui/material";
import {useNavigate, Navigate} from "react-router-dom"
import Contacts from "../pages/Contacts";



const LoginForm: FC = () => {

    const navigate = useNavigate()
    const[email, setEmail] = useState<string>("")
    const[password, setPassword] = useState<string>("")
   const{error, isAuth, user} = useTypedSelector(state => state.authReducer);
    const[err, setErr] = useState<string>("")
    const{login} = useAction();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const nav = () => {
        setTimeout(() => {
            if (localStorage.getItem("auth") === "true") {
                navigate("/Contacts")
            }
        }, 500)
    }

    const submit = () => {
       login(email, password);
       setTimeout( () => nav(), 500)
    }

    return(
        <Grid container spacing={0} direction={"column"} alignItems={"center"} justifyItems={"center"}>
            <Grid container direction={"column"} style={{padding:10, width:"50vh", border:"1px black solid" }}>

                 <TextField
                     {...email}
                     label={"Имя пользователя"}
                     style={{marginTop:10}}
                     onChange={handleEmail}
                     value={email}/>
                 <TextField
                     {...password}
                     label={"Пароль"}
                     style={{marginTop:10, marginBottom:10}}
                     type={"password"}
                     onChange={handlePassword}
                     value={password}/>
                 <Button variant={"contained"} onClick={submit}>Отправить</Button>
                {
                    error.length > 0
                        ?

                        <Typography sx={{marginTop: '10px'}} variant={"h6"} color={"red"}>{error}</Typography>

                        :
                        <></>

                }

            </Grid>
        </Grid>
    )
}

export default LoginForm;