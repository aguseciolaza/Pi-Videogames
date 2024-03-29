import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' ;
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import GameCreator from './components/GameCreator';
import GameDetail from './components/GameDetail';
import ErrorPath from './components/ErrorPath';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home}/>
      <Route exact path='/videogame' component={GameCreator}/>
      <Route path='/videogame/:id' component={GameDetail}/>
      <Route path='/*' component={ErrorPath} /> 
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
