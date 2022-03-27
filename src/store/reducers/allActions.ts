import AuthActionCreators from "./auth/action";
import ContactsActionCreators from "./contacts/actionContacts";

const allActions = {
    ...AuthActionCreators,
    ...ContactsActionCreators
}
export default allActions;
