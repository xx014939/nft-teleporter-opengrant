import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Footer from "./Footer";

function CreateCollectionPage () {
 return (
     <div className="create-collection-container">
         <div>
            <Header/>
         </div>
         <div>
            <ProgressBar/>
         </div>
         <div>
             <Footer/>
         </div>
     </div>
 );
}

export default CreateCollectionPage 