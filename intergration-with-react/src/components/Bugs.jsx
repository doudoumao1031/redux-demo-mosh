import { useContext, useEffect, useState } from 'react'
// import StoreContext from '../contexts/storeContext'
import { loadBugs } from '../store/bugs';
import { connect } from 'react-redux';

const Bugs =  ({ bugs, loadBugs }) => {
  // const [bugs, setBugs] = useState([]);
  // const store = useContext(StoreContext);
  
  // useEffect(() => {
  //   // This code runs once after the component is mounted
  //   setBugs(store.getState().entities.bugs.list);
  //   const unsubscribe = store.subscribe(() => {
  //     console.log('Store changed', store.getState());
  //     const bugsInStore = store.getState().entities.bugs.list;
  //     if(bugs !== bugsInStore) setBugs(bugsInStore);
  //   })
  //   console.log('Component did mount', store.getState());

  //   store.dispatch(loadBugs());

  //   // If you need cleanup code, return a function from useEffect
  //   return () => {
  //     unsubscribe();
  //     console.log('Component will unmount');
  //   };
  // }, []); 

  useEffect(() => {
    loadBugs();
  }, [loadBugs]);

  return (
    // <ul>
    //   {bugs.map(bug => (
    //     <li key={bug.id}>{bug.description}</li>
    //   ))}
    // </ul>
    <ul>
      {bugs.map(bug => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  )
}

// bugs: state.entities.bugs.list
const mapStateToProps = state => ({
  bugs: state.entities.bugs.list
});

// const mapDispatchToProps = dispatch => ({
//   loadBugs: () => dispatch(loadBugs())
// });

const mapDispatchToProps = {
  loadBugs
};

// higher order function
// ... going to create a new component that is connected to the store under the hood
// that component is going to take care of subscribing and unsubscribing from the store
// this bugs component knows absolutely nothing about the store
// a new container component => a dummy or presentation component
export default connect(mapStateToProps, mapDispatchToProps)(Bugs)

// export default Bugs
