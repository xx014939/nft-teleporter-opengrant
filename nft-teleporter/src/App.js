import './App.css';
import './fonts/MODERNA_.TTF'
import multimedia from './multimedia.svg'
import rhsImage from './rhsImage.png'
import LoginPortal from './components/LoginPortal';


function App() {
  return (
    <div className="container">
      <div className='lhs-container'>
        <LoginPortal/>
      </div>
      <div className='rhs-container'>
        <img src={multimedia}/>
      </div>
    </div>
    
  );
}

export default App;
