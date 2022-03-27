import {ContactsState, ContactsAction, ContactsActionEnum} from "./typeContacts"

const initialState:ContactsState = {
    contacts: [],
    error:""
}

const contactsReducer = (state = initialState, action:ContactsAction):ContactsState => {

    switch (action.type){
        case ContactsActionEnum.SET_CONTACTS:
            return {
                ...state,
                contacts:action.payload
            };
        case ContactsActionEnum.SET_ERROR_CONTACT:
            return {
                ...state,
                error:action.payload
            }


        default:return {...state}
    }

}

export default contactsReducer;