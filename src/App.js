import { Provider } from 'react-redux';
import './App.css';
import Fetch from './container/Fetch/Fetch';
import { configureStore } from './container/Redux/store';
import Todo from './container/Todo/Todo';

function App() {
  let store = configureStore()
  return (
    <div className="App">
      {/* <Todo /> */}
      <Provider store={store}>
        <Fetch />
      </Provider>
    </div>
  );
}

export default App;
