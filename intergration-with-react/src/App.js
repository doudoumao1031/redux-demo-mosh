// Import necessary styles and components
import './App.css';
// import Bugs from './components/Bugs';
import BugsList from './components/BugsList';
import configureStore from './store/configureStore';
import StoreContext from './contexts/storeContext';
import { Provider } from 'react-redux';

// Configure the Redux store
const store = configureStore();

function App() {
  return (
    // Use the Context API's Provider component to pass the store down the component tree
    // <StoreContext.Provider value={store}>
    //   <div className="App">
    //     <Bugs />
    //   </div>
    // </StoreContext.Provider>

    // Use the Provider component from react-redux to pass the store down the component tree
    // StoreContext no longer needed
    <Provider store={store}>
      <div className="App">
        {/* <Bugs /> */}
        <BugsList />
      </div>
    </Provider>
  );
}

export default App;
