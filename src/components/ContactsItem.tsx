import React, {FC} from "react";
import {Button, Card, Grid, CardContent, Typography} from "@mui/material"
import {IContact} from "../models/IContact";

interface ContactProps{
    name:string,
    description:string
}
const ContactsItem:FC<ContactProps> = ({name, description}) => {

    return(
        <Grid container justifyContent={"space-between"}>
            <Grid container direction={'row'}>
                <Card>
                    <CardContent>
                        <Typography color={"red"} variant={"h5"}>{name}</Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant={"h5"} color={"black"}>{description}</Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default ContactsItem;