import {useDispatch} from "react-redux"
import {bindActionCreators} from "redux";
import allActions from "../store/reducers/allActions";

const useAction = () => {
    const dispath = useDispatch()
    return bindActionCreators(allActions, dispath);
}

export default useAction;