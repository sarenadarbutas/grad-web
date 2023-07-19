import './App.css';
import {Route, Routes} from "react-router-dom";
import ComputerScienceMajorPage from './components/ComputerScienceMajorPage';
import User from "./components/User"
import UserClassesSelect from './components/UserClassesSelect';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}></Route>
      <Route path="/csmajor" element={<ComputerScienceMajorPage/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/user-classes" element={<UserClassesSelect/>}/>
    </Routes>
  );
}

export default App;
