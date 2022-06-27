import logo from './logo.svg';
import multimedia from './multimedia.png'
import './App.css';

function App() {
  return (
    <div className="container">
      <div className='lhs-container'>
        <div className='lhs-inner'>
           <div><img src={logo}/></div>
           <div><a className='button' href='#'>BUTTON HERE</a></div>
        </div>
      </div>
      <div className='rhs-container'>
        <img src={multimedia}/>
      </div>
    </div>
  );
}

export default App;
