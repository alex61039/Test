import React, {FC} from "react";
import {IContact} from "../models/IContact";
import {Edit, Delete} from "@mui/icons-material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import {Paper} from "@mui/material";
import {useNavigate} from "react-router-dom"
import useAction from "../hooks/useAction";
import  "../App.css"


interface ContactsProps{
    contacts:IContact[]
}

const ContactsList: FC<ContactsProps> = ({contacts}) => {
    const navigate = useNavigate();

    const {setDeleteContactAsync, setContactsAsync} = useAction();
    const deleteCon = (id: string) => {
        setDeleteContactAsync(id);
        setTimeout(() => setContactsAsync(), 1000)
    }
   return(
       <TableContainer component={Paper} sx={{marginTop:5, marginLeft:1, marginRight:5}}>
           <Table size={"small"}>
               <TableHead>
                   <TableRow>
                       <TableCell><h2>NN</h2></TableCell>
                       <TableCell align="left"><h2>Имя</h2></TableCell>
                       <TableCell align="left"><h2>Описание</h2></TableCell>
                       <TableCell></TableCell>
                       <TableCell></TableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                   {
                       contacts.map(({id, name, description}, index) =>

                               <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                   <TableCell>{index +1}</TableCell>
                                   <TableCell align="left">{name}</TableCell>
                                   <TableCell align="left">{description}</TableCell>
                                   <TableCell className={"tableCel"} align="right" onClick={ ()=> navigate("/EditContact/" + id) }><Edit/></TableCell>
                                   <TableCell className={"tableCel"} align="right" onClick={() => deleteCon(Number(id).toString())}><Delete/></TableCell>

                               </TableRow>

                       )
                   }
               </TableBody>
           </Table>
       </TableContainer>

       /*<div style={{ height: 400, width: '100%' }}>
           <div style={{ display: 'flex', height: '100%' }}>
               <div style={{ flexGrow: 1 }}>
                   <DataGrid sx={{border:"black 1px solid", '& .MuiDataGrid-cell:hover': {
                           color: 'red',
                       }}}
                       rows={contacts}
                       columns={column}
                       pageSize={10}
                       rowsPerPageOptions={[7]}
                   />
               </div>
           </div>
       </div>*/
   )
}

export default ContactsList;

