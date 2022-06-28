import logo from '../logo.svg';
import '../App.css';

function stepTwo() {
    console.log('clicked')
    document.querySelector('.lhs-inner').style.display = 'none'
    document.querySelector('.lhs-inner-two').style.display = 'flex'
}

function AppPortal() {
  return (
    <div>
        <div className='lhs-inner'>
            <div><img src={logo}/></div>
            <div><a onClick={stepTwo} className='button' href='#'>Create Your Collection</a></div>
        </div>
        <div className='lhs-inner-two'>
            <div><img src={logo}/></div>
            <div className='lhs-inner-two-text'>
                <div><h2>NFT Data</h2></div>
                <div><input label="Collection Name"></input></div>
                <div><input label="Token Symbol"></input></div>
                <div><a href='#' className='button'>BUTTON HERE</a></div>
            </div>
        </div>
    </div>
  );
}

export default AppPortal;