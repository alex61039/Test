import {
    ContactsActionEnum,
    SetContactsAction, SetDeleteContactAction,
    SetEditContactAction,
    SetErrorContactAction,
    SetNewContactAction
} from "./typeContacts";
import {IContact} from "../../../models/IContact";
import {AppDispatch} from "../../index";
import {createContact, editContact, getContactsByUser, deleteContact, searchContacts} from "../../../api/api"

const ContactsActionCreators = {
    setContacts: (contacts: IContact[]): SetContactsAction => ({
        type: ContactsActionEnum.SET_CONTACTS,
        payload: contacts
    }),
    setErrorContacts: (error: string): SetErrorContactAction => ({
        type: ContactsActionEnum.SET_ERROR_CONTACT,
        payload: error
    }),
    setDeleteContact: (id: string): SetDeleteContactAction => ({
        type: ContactsActionEnum.SET_DELETE,
        payload: id
    }),
    setNewContact: (contact: IContact): SetNewContactAction => ({
        type: ContactsActionEnum.SET_NEW_CONTACT,
        payload: contact
    }),

    setEditContact: (contact: IContact): SetEditContactAction => ({
        type: ContactsActionEnum.SET_EDIT,
        payload: contact
    }),

    setDeleteContactAsync:(id:string) => async (dispatch:AppDispatch) => {
        try{
            if(id !== null){
                await deleteContact(id);
                dispatch(ContactsActionCreators.setDeleteContact(id));
            }else{
                dispatch(ContactsActionCreators.setErrorContacts("Ошибка при удалении контакта"))
            }
        }catch (e) {
            dispatch(ContactsActionCreators.setErrorContacts("Ошибка на сервере"))
        }
    },

    setEditContactAsync: (contact: FormData) => async (dispatch: AppDispatch) => {
        try {
            const data: IContact = {
                id: 0,
                userId: 0,
                name: '',
                description: ""
            }
            data.id = Number(contact.get("id"))
            data.userId = Number(contact.get("userId"))
            data.name = contact.get("name") as string
            data.description = contact.get("description") as string
            const editCon = await editContact(data);
            if (editCon) {
                dispatch(ContactsActionCreators.setEditContact(editCon))
            } else {
                dispatch(ContactsActionCreators.setErrorContacts("Ошибка при редактировании контакта"))
            }
        } catch (e) {
            dispatch(ContactsActionCreators.setErrorContacts("Ошибка на сервере"))
        }

    },
    setNewContactAsync: (contact: FormData) => async (dispatch: AppDispatch) => {
        try {
            const data: IContact = {
                userId: 0,
                name: "",
                description: ""
            }
            data.name = contact.get("name") as string
            data.userId = Number(contact.get("userId"))
            data.description = contact.get("description") as string

            const newContact = await createContact(data) as IContact;

            if (newContact) {
                dispatch(ContactsActionCreators.setNewContact(newContact))
            } else {
                dispatch(ContactsActionCreators.setErrorContacts("Ошибка при создании нового контакта"))
            }

        } catch (e) {
            dispatch(ContactsActionCreators.setErrorContacts("Ошибка на сервере"))
        }
    },

    setContactsAsync: () => async (dispatch: AppDispatch) => {
        try {
            const contacts = await getContactsByUser() as IContact[];
            if (contacts?.length > 0) {
                dispatch(ContactsActionCreators.setContacts(contacts))
            } else {
                dispatch(ContactsActionCreators.setErrorContacts("У пользователя нет контактов"))
            }
        } catch (e) {
            dispatch(ContactsActionCreators.setErrorContacts("Ошибка"))
        }
    },

    setSearchContactAsync:(query:string) => async (dispatch:AppDispatch) => {
        try{
            debugger
            const arr = [] as IContact[]
            const searchList = await searchContacts(query) as IContact[];
            if(searchList?.length > 0){
                dispatch(ContactsActionCreators.setContacts(searchList));
            }else {
                dispatch(ContactsActionCreators.setContacts(arr))
            }
        }catch (e) {
            dispatch(ContactsActionCreators.setErrorContacts("Ошибка"));
        }
    }
}


export default ContactsActionCreators;