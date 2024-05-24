import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import axios from 'axios';

// Action Types
// traditional way of creating action types without using redux toolkit
// no longer needed

// const BUG_ADDED = 'bugAdded';
// const BUG_REMOVED = 'bugRemoved';
// const BUG_RESOLVED = 'bugResolved';

// Action Creators
// export const bugAdded = createAction('bugAdded');
// export const bugRemoved = createAction('bugRemoved');
// export const bugResolved = createAction('bugResolved');

// traditional way of creating action creators without using redux toolkit
// no longer needed
// export const bugAdded = (description) => ({ // This is an action creator
//     type: BUG_ADDED,
//     payload: {
//         description,
//     },
// });


// export const bugRemoved = (id) => ({
//     type: BUG_REMOVED,
//     payload: {
//         id,
//     },
// });

// export const bugResolved = (id) => ({  
//     type: BUG_RESOLVED,
//     payload: {
//         id,
//     },
// });

// Reducer
// let lastId = 0

// using redux toolkit to create reducer
// without using switch case
// export default createReducer([], {
//     [bugAdded.type]: (state, action) => {
//         state.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false,
//         })
//     },
//     [bugRemoved.type]: (state, action) => {
//         return state.filter(bug => bug.id !== action.payload.id)
//     },
//     [bugResolved.type]: (state, action) => {
//         return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
//     }
// })

// traditional way of creating reducer without using redux toolkit
// export default function reducer(state = [], action){
//     switch(action.type){
//         case bugAdded.type:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false,
//                 }
//             ]
//         case bugRemoved.type:
//             return state.filter(bug => bug.id !== action.payload.id)
//         case bugResolved.type:
//             return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
//         default:
//             return state
//     }
// }

// let lastId = 0

const slice = createSlice({
    name: 'bugs',
    // initialState: [],
    initialState: {
        list: [],
        loading: false, // for loading indicator
        lastFetch: null // for caching
    },
    reducers: {
        bugsRequested: (state, action) => {
            state.loading = true;
        },
        bugsRequestFailed: (state, action) => {
            state.loading = false;
        },
        bugsReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.lastFetch = Date.now();
        },
        // destruct and rename parameter id to bugId
        bugAssignedToUser: (state, action) => {
            const { id: bugId, userId } = action.payload;
            const index = state.list.findIndex(bug => bug.id === bugId);
            state.list[index].userId = userId;
        },
        // command - event
        // addBug - bugAdded (notion of event)
        bugAdded: (state, action) => {
            // state.list.push({
            //     id: ++lastId,
            //     description: action.payload.description,
            //     resolved: false,
            // })
            state.list.push(action.payload);
        },
        bugRemoved: (state, action) => {
            return state.list.filter(bug => bug.id !== action.payload.id)
        },
        // command - event
        // resolveBug(command) - bugResolved(notion of event)
        bugResolved: (state, action) => {
            return state.list.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
        },
    },
})

// export default slice.reducer and slice.actions
export const { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;
export default slice.reducer;

// Action creators
// export const loadBugs = () => apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     // move the onError handling to the api middleware
//     onError: bugsRequestFailed.type
// })

// in real application, we should save the url in a configuration file
const url = "/bugs";
// add caching by using the lastFetch property
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = (Date.now() - new Date(lastFetch).getTime()) / 60000;
    if(diffInMinutes < 10) return;

    dispatch(
        apiCallBegan({
            url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
        })
    )
}

// if we change the implementation, but we have not the behavior of our application
// export const addBug = bug => async dispatch => {
//     const response = await axios.request({
//         baseURL: 'http://localhost:3000/api',
//         url: '/bugs',
//         method: 'post',
//         data: bug
//     })
//     dispatch(bugAdded(response.data));
// }

export const addBug = bug => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type
})  

export const resolveBug = id => apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type
})

// export const getUnresolvedBugs = state => store.getState().entities.bugs.filter(bug => !bug.resolved); 

const getBugs = state => state.entities.bugs;

export const getUnresolvedBugs = createSelector(
  getBugs,
  bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  getBugs,
  bugs => bugs.list.filter(bug => bug.userId === userId)
);