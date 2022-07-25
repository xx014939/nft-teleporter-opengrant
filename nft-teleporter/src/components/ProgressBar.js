import '../styles/ProgressBar.css';

let counter = 0;

function updateCount () {
    counter = counter + 1;
}

function updateElement () {
    let elementArray = document.querySelectorAll('.progress-bar-element')
    for (let i = 0; i < counter; i++) {
        elementArray[i].style.background = 'blue'
    }
}


function ProgressBar () {
 return (
     <div className="progress-bar-container">
         <div className="progress-bar-step">
            <div className="progress-bar-element">1</div>
            <div className="progress-bar-text">Basic Info</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">2</div>
            <div className="progress-bar-text">Digital Assets</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">3</div>
            <div className="progress-bar-text">Blockchains kkk</div>
         </div>
         <div style={{width: '100%', height: "2px", background: "#ffffff", marginTop: "30px"}}></div>
         <div className="progress-bar-step">
            <div className="progress-bar-element">4</div>
            <div className="progress-bar-text">Smart Contract</div>
         </div>
         <button onClick={() => { updateCount(); updateElement();}}>CLICK ME</button>
     </div>
 );
}

export default ProgressBar 