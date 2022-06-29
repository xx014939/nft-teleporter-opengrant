import multimedia from './multimedia.svg'
import './App.css';
import LoginPortal from './components/LoginPortal';
import './fonts/MODERNA_.TTF'

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
