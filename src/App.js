import logo from './logo.svg';
import './App.css';
import MainPage from './Components/MainPage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import  MealInfo  from './Components/MealInfo';

function App() {
  return (<>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/:mealId" element={<MealInfo/>}/> 

     
    </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
