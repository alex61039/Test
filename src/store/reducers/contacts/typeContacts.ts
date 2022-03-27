import {IContact} from "../../../models/IContact";

export interface ContactsState{
    contacts:IContact[] | IContact;
    error:string
}

export enum ContactsActionEnum{
    SET_CONTACTS = "SET_CONTACTS",
    SET_NEW_CONTACT = "SET_NEW_CONTACT",
    SET_EDIT = "SET_EDIT",
    SET_DELETE = "SET_DELETE",
    SET_ERROR_CONTACT  = "SET_ERROR_CONTACT"
}

export interface SetContactsAction{
    type: ContactsActionEnum.SET_CONTACTS,
    payload: IContact[]
}

export interface SetNewContactAction{
    type:ContactsActionEnum.SET_NEW_CONTACT,
    payload:IContact
}

export interface SetEditContactAction{
    type:ContactsActionEnum.SET_EDIT,
    payload:IContact
}

export interface SetDeleteContactAction{
    type:ContactsActionEnum.SET_DELETE,
    payload:string
}

export interface SetErrorContactAction{
    type:ContactsActionEnum.SET_ERROR_CONTACT,
    payload:string
}

export type ContactsAction = SetContactsAction  | SetErrorContactAction | SetDeleteContactAction | SetNewContactAction | SetEditContactAction;