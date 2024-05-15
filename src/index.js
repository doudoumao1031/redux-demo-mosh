// import store from ".";
// // import store from "./customStore";
// import { bugAdded } from "./actions";
// import * as actions from "./actionTypes";
// import { bugResolved } from "./actions";
import configureAppStore from "./store/configureStore";
import { bugAdded, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser, assignBugToUser } from "./store/bugs";
// import * as actions from "./store/projects";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api";
import { loadBugs, addBug, resolveBug } from "./store/bugs";

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
// store.dispatch({
//     type: "apiCallBegan",
//     payload: {
//         url: "/bugs",
//         // method: "get",
//         // data: {},
//         onSuccess: "bugsReceived",
//         onError: "apiRequestFailed"
//     }
// });

// UI Layer 
// we shouldn't have too much details in UI layer
// store.dispatch(loadBugs());

// replace the above code which using hard-coded strings by using action creators
// store.dispatch(actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived",
//     // move the onError handling to the api middleware
//     // onError: actions.apiRequestFailed.type
// }));

// cache test
// store.dispatch(loadBugs());
// setTimeout(() => store.dispatch(loadBugs()), 200);

// saving data to the server
// store.dispatch(addBug({ description: "a" }));

// resolving bugs test
// store.dispatch(loadBugs());
// setTimeout(() => {
//     store.dispatch(resolveBug(4));
// }, 2000)

// assigning a bug to a user test
store.dispatch(loadBugs());
setTimeout(() => {
    store.dispatch(assignBugToUser(4, 5));
}, 200)