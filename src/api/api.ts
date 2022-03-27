import axios from "axios";
import {IUser} from "../models/IUser";
import {IContact} from "../models/IContact";
import {IUserContacts} from "../models/IUserContacts";

const baseURL = "http://localhost:3001/"


export const getUser = async (email: string, password: string): Promise<IUser[] | undefined> => {
    try {
        const user = await axios.get<IUser[]>(baseURL + "users?email=" + email + "&password=" + password).then(res => res.data);
        return user;
    } catch (e) {
        console.log(e)
    }
}

export const getContactsByUser = async (): Promise<IContact[] | undefined> => {
    try{
        const myUser = localStorage.getItem("userId")
        if(myUser){
            const userContacts = await axios.get<IUserContacts>(baseURL + "users/" +  myUser +"?_embed=contacts").then(res => res.data);
            return userContacts.contacts;
        }
    }catch (e) {
        console.log(e)
    }
}

export const gtContactById = async (id:string):Promise<IContact | undefined> => {
    try{
        if(id !== null){
            const contact = await axios.get<IContact>(baseURL + "contacts/" + id).then(res => res.data)
            return contact;
        }
    }catch (e) {
        console.log(e)
    }
}

export const createContact = async (contact:IContact):Promise<IContact | undefined> => {
    try{
        const newContact = await axios.post<IContact>(baseURL + "contacts", contact, {
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.data);
        return newContact
    }catch (e) {
        console.log(e)
    }
}

export const editContact = async (contact:IContact): Promise<IContact | undefined> => {
    try{
        if(contact){
            const editCon = await axios.put<IContact>(baseURL + "contacts/" + contact.id, contact, {
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res => res.data);
            return editCon;
        }
    }catch (e) {
        console.log(e)
    }
}

export const deleteContact = async (id:string) => {
    try{
        if(id !== null){
            return await axios.delete(baseURL + "contacts/" + id).then(res => res.data);
        }
    }catch (e) {
        console.log(e)
    }
}

export const searchContacts = async (query:string):Promise<IContact[] | undefined> => {
    try{
        const user = localStorage.getItem("userId") as string
        const searchList = await getContactsByUser() as IContact[]
        if(searchList?.length > 0){
            if(query !== null){
                const list = searchList.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                                                            el.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
                return list;
            }else {
                return searchList
            }
        }
    }catch (e) {
        console.log(e)
    }
}
