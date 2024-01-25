import Dashboard from "./pages/Dashboard";
import NewEmplyee from "./pages/NewEmplyee";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Dashboard}/>
        <Route path="/newEmployee" Component={NewEmplyee}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
