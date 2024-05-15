// import store from ".";
// // import store from "./customStore";
// import { bugAdded } from "./actions";
// import * as actions from "./actionTypes";
// import { bugResolved } from "./actions";
import configureAppStore from "./store/configureStore";
import { bugAdded, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from "./store/bugs";
// import * as actions from "./store/projects";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureAppStore();

// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// }); 

// store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// }); 

// store.dispatch({
//     type: actions.BUG_ADDED,
//     payload: {
//         description: "Bug1"
//     }
// });

// store.dispatch(bugAdded("Bug 1"));
// store.dispatch(bugResolved(1));
// store.dispatch({
//     type: actions.BUG_REMOVED,
//     payload: {
//         id: 1
//     }
// });

// store.dispatch(userAdded({name: "User 1"}))
// store.dispatch(userAdded({name: "User 2"}))
// store.dispatch(projectAdded({ name: "Project 1" }))
// store.dispatch(bugAdded({description: "Bug 1"}));
// store.dispatch(bugAdded({description: "Bug 2"}));
// store.dispatch(bugAdded({description: "Bug 3"}));
// store.dispatch(bugAssignedToUser({bugId: 1, userId: 1}));
// store.dispatch(bugResolved({id: 1}));

// // const unresolvedBugs = store.getState().entities.bugs.filter(bug => !bug.resolved); 
// const unresolvedBugs = getUnresolvedBugs(store.getState()); 

// console.log(unresolvedBugs);
// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);

// console.log(store.getState());

// asynchroneous logic
// store.dispatch((dispatch, getState) => {
//     // Call an API
//     // When the promise is resolved => dispatch()
//     dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//     console.log("Got the bugs", getState());
//     // If the promise is rejected => dispatch() 
//     // dispatch({ type: "bugsRequestFailed", error: "An error occured." });
// });

// toast middleware test
// store.dispatch({ type: "error", payload: { message: "An error occured." } });

// api middleware test
store.dispatch({
    type: "apiCallBegan",
    payload: {
        url: "/bugs",
        // method: "get",
        // data: {},
        onSuccess: "bugsReceived",
        onError: "apiRequestFailed"
    }
});