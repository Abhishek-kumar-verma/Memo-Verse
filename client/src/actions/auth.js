import * as api from '../api';
import { DELETE , FETCH_ALL , LIKE , UPDATE , CREATE ,AUTH} from '../constants/actionType';

export const signin = ( formData , navigate) => async( dispatch) =>{
    try{
        // login here
        const { data } = await api.signin(formData);
        dispatch({type: AUTH , data})
        navigate('/');
    }catch( error){
        console.log(error);
    }
}
export const signup = ( formData , navigate) => async( dispatch) =>{
    try{
        const { data } = await api.signup(formData);
        dispatch({type: AUTH , data})
        navigate('/');
    }catch( error){
        console.log(error);
    }
}