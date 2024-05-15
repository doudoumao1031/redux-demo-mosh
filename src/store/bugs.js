import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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

let lastId = 0

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAssignedToUser: (state, action) => {
            const { bugId, userId } = action.payload;
            const index = state.findIndex(bug => bug.id === bugId);
            state[index].userId = userId;
        },
        bugAdded: (state, action) => {
            state.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            })
        },
        bugRemoved: (state, action) => {
            return state.filter(bug => bug.id !== action.payload.id)
        },
        bugResolved: (state, action) => {
            return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
        }
    },
})

// export default slice.reducer and slice.actions
export const { bugAdded, bugRemoved, bugResolved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

// export const getUnresolvedBugs = state => store.getState().entities.bugs.filter(bug => !bug.resolved); 

const getBugs = state => state.entities.bugs;

export const getUnresolvedBugs = createSelector(
  getBugs,
  bugs => bugs.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  getBugs,
  bugs => bugs.filter(bug => bug.userId === userId)
);