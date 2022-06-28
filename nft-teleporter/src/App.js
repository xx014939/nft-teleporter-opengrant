import multimedia from './multimedia.svg'
import './App.css';
import AppPortal from './components/AppPortal';

function App() {
  return (
    <div className="container">
      <div className='lhs-container'>
        <AppPortal/>
      </div>
      <div className='rhs-container'>
        <img src={multimedia}/>
      </div>
    </div>
  );
}

export default App;
