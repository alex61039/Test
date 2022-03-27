import {IContact} from "./IContact";

export interface IUserContacts{
    id?:number;
    email:string;
    contacts:IContact[]
}