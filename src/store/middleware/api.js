import axios from 'axios';

const api = ({dispatch}) => next => async action => {
    if (action.type !== 'apiCallBegan') return next(action);
    const {url, method, data, onSuccess, onError} = action.payload;
    try{
        const response = await axios.request({
            baseURL: 'http://localhost:3001/api',
            url,
            method,
            data
        });
        // General
        dispatch({type: onSuccess, payload: response.data});
    }catch(error){
        // General
        dispatch({type: onError, payload: error});
    }
}

export default api;