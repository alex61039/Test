import React, {FC, useState} from "react";
import {Box, TextField, Button, Grid} from "@mui/material";
import useAction from "../hooks/useAction";


const SearchForm: FC = () => {
    const{setSearchContactAsync} = useAction()
    const [value, setValue] = useState<string>("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const search = () =>{
        setSearchContactAsync(value);
    }
    return (
        <Box
            component="form"
            sx={{'& > :not(style)': {marginLeft:20, width: '80ch'},}}
            noValidate
            autoComplete="off"
        >
        <Grid container direction={"row"} display={"flex"} flexWrap={"nowrap"} style={{height:40}}>

                <TextField label="Поиск" variant="outlined" value={value} onChange={onChange} fullWidth/>
                <Button variant={"contained"} onClick={search} style={{marginLeft:10}}>Найти</Button>

        </Grid>



      </Box>
    )
}

export default SearchForm;