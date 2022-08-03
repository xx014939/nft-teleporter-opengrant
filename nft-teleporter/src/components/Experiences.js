import TransparentHeader from "./TransparentHeader";
import '../styles/Experiences.css';
import bg from '../2049px.png'
import vrSVG from '../vrSVG.svg'
import imageSVG from '../imageSVG.svg'

function SelectExperienceModal () {
    return (
        <div className="select-modal-container">
            <div className="select-modal-header">
                <div><h2>Select Your NFT Experience</h2></div>
                <div>Subtitle here...</div>
            </div>
            <div className="select-modal-body">
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon">
                        <svg width="35" height="22" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.485 11.4984V16.2441C34.485 17.1996 33.7277 17.9746 32.7793 18.0029V9.73601C33.7277 9.76428 34.485 10.5428 34.485 11.4984Z" fill="#676767"/><path d="M28.7778 8.95593H6.21564C5.76601 8.95593 5.40039 9.32155 5.40039 9.77085V17.9719C5.40039 18.4212 5.76601 18.7869 6.21564 18.7869H12.404C12.9978 18.7869 13.1659 18.2416 13.3907 17.9968C15.4084 15.1995 19.5842 15.1979 21.6028 17.9972C21.8229 18.2368 21.9967 18.7869 22.5892 18.7869H28.7778C29.2271 18.7869 29.5927 18.4212 29.5927 17.9719V9.77085C29.5927 9.32155 29.2271 8.95593 28.7778 8.95593Z" fill="#676767"/><path d="M28.7793 6.4766H6.21503C4.39952 6.4766 2.92383 7.95587 2.92383 9.77138V17.9711C2.92383 19.7866 4.39959 21.2659 6.21503 21.2659H12.4047C14.4382 21.2659 15.2606 19.5794 15.4022 19.4469C16.4227 18.0211 18.5688 18.0169 19.5923 19.4469C19.7185 19.5651 20.5673 21.2659 22.5898 21.2659H28.7794C30.5949 21.2659 32.0706 19.7866 32.0706 17.9711V9.77138C32.0705 7.95587 30.5948 6.4766 28.7793 6.4766ZM30.3011 17.9711C30.3011 18.8098 29.6181 19.4964 28.7793 19.4964H22.5897C21.5612 19.4964 21.2193 18.6028 21.029 18.41C19.2942 16.0067 15.7005 16.0061 13.9652 18.41C13.7877 18.5899 13.4439 19.4964 12.4045 19.4964H6.21503C5.37629 19.4964 4.69328 18.8099 4.69328 17.9711V9.77138C4.69328 8.93264 5.37629 8.24963 6.21503 8.24963H28.7793C29.6181 8.24963 30.3011 8.93264 30.3011 9.77138V17.9711Z" fill="#676767"/><path d="M2.21747 9.73602V18.003C1.26904 17.9747 0.511719 17.1996 0.511719 16.2442V11.4984C0.511719 10.5428 1.26904 9.76428 2.21747 9.73602Z" fill="#676767"/><path d="M21.1643 5.76878H13.8281C14.6704 4.62573 14.9464 3.42959 15.0773 2.54128C15.2154 1.6176 15.9869 0.94873 16.9105 0.94873H18.0854C19.0056 0.94873 19.777 1.61753 19.915 2.5377C20.046 3.42959 20.3221 4.62221 21.1643 5.76878Z" fill="#676767"/></svg>
                    </div>
                    <div className="select-modal-experience-text">VR/3D</div>
                </div>
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_333_10)"><path d="M19.4056 4.67676C19.1537 4.81233 18.8395 4.71796 18.7039 4.46599C18.5684 4.21402 18.6627 3.89986 18.9147 3.7643L20.1384 3.10714L14.6222 0.136191C14.5456 0.0949433 14.4533 0.0949433 14.3767 0.136191L8.8605 3.10714L10.0842 3.76482C10.3362 3.90038 10.4305 4.21454 10.295 4.46651C10.1594 4.71848 9.84523 4.81285 9.59326 4.67728L8.28516 3.97351V9.89107C8.28521 9.98628 8.33751 10.0738 8.42135 10.1189L13.9816 13.1152V11.3929C13.9816 11.1068 14.2134 10.875 14.4994 10.875C14.7854 10.875 15.0173 11.1068 15.0173 11.3929V13.1152L20.5775 10.121C20.662 10.0755 20.7144 9.98703 20.7137 9.89107V3.97351L19.4056 4.67676ZM16.8163 6.07498L15.0173 7.04285V8.28571C15.0173 8.57171 14.7854 8.80357 14.4994 8.80357C14.2134 8.80357 13.9816 8.57171 13.9816 8.28571V7.04285L12.1825 6.07601C11.9306 5.94045 11.8362 5.62629 11.9718 5.37432C12.1073 5.12235 12.4215 5.02798 12.6735 5.16355L14.4994 6.14437L16.3254 5.16044C16.5774 5.02487 16.8915 5.11924 17.0271 5.37121C17.1627 5.62318 17.0683 5.93734 16.8163 6.07291V6.07498Z" fill="#676767"/><path d="M0.58 26.9286H2.76846L5.94034 19.6786H5.29768C4.72716 19.6713 4.19093 19.9503 3.86943 20.4217L0.0849286 26.1471C0.0300846 26.2241 0.000417227 26.3162 0 26.4107C0.0180759 26.7134 0.277171 26.9448 0.58 26.9286Z" fill="#676767"/><path d="M0.58 27.9643C0.38178 27.9634 0.185335 27.9269 0 27.8566V28.4821C0 28.7681 0.231853 29 0.517857 29H28.4821C28.7681 29 29 28.7681 29 28.4821V27.8566C28.8147 27.9269 28.6182 27.9634 28.42 27.9643H0.58Z" fill="#676767"/><path d="M23.7017 19.6786H23.5764L24.0942 20.8645C24.1587 21.0122 24.1507 21.1814 24.0727 21.3224C23.9946 21.4634 23.8554 21.56 23.696 21.5838L23.2455 21.809C23.0139 21.9247 22.9033 22.1936 22.9865 22.4387L23.5412 24.1031C23.6019 24.2847 23.7578 24.4179 23.9467 24.4496L25.4319 24.6966C25.6377 24.6967 25.8239 24.8187 25.9062 25.0073L26.7488 26.9286H28.4194C28.7222 26.9448 28.9813 26.7134 28.9994 26.4107C28.9994 26.3181 28.971 26.2277 28.9181 26.1518L25.1289 20.4191C24.807 19.949 24.2714 19.6711 23.7017 19.6786Z" fill="#676767"/><path d="M7.70651 19.6786H7.07058L3.8987 26.9286H25.6176L25.0744 25.6893L23.7772 25.4718C23.2076 25.3792 22.7372 24.9767 22.5576 24.4284L22.004 22.7681C21.7621 22.0345 22.0921 21.2341 22.7808 20.8841L22.9393 20.8049L22.4463 19.6786H21.293L27.8796 9.60469C27.9842 9.44982 27.9972 9.25064 27.9137 9.08349C27.8301 8.91635 27.6631 8.80715 27.4764 8.79776C27.2898 8.78837 27.1126 8.88024 27.0127 9.03815L18.3625 22.2679H10.6371L1.98678 9.03815C1.8869 8.88024 1.7097 8.78837 1.52308 8.79776C1.33646 8.80715 1.16938 8.91635 1.08586 9.08349C1.00234 9.25064 1.01534 9.44982 1.11988 9.60469L7.70651 19.6786Z" fill="#676767"/></g><defs><clipPath id="clip0_333_10"><rect width="29" height="29" fill="white"/></clipPath></defs></svg>
                    </div>
                    <div className="select-modal-experience-text">AR</div>
                </div>
                <div className="select-modal-experience">
                    <div className="select-modal-experience-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 35.8342C0 38.1351 1.873 40 4.16581 40H35.3448C37.6456 40 39.5106 38.127 39.5106 35.8342V4.65525C39.5106 2.35437 37.6376 0.489441 35.3448 0.489441H4.16581C1.86492 0.489441 0 2.36244 0 4.65525V35.8342ZM35.3448 38.0221H4.16581C2.96289 38.0221 1.97795 37.0371 1.97795 35.8342V30.6269L9.46994 23.135L15.872 29.5371C16.2596 29.9246 16.8812 29.9246 17.2687 29.5371L28.8296 17.9761L37.5326 26.6791V35.8342C37.5326 37.0371 36.5477 38.0221 35.3448 38.0221ZM4.16581 2.46739H35.3448C36.5477 2.46739 37.5326 3.45233 37.5326 4.65525V23.8777L29.5239 15.8771C29.1364 15.4896 28.5148 15.4896 28.1273 15.8771L16.5663 27.438L10.1642 21.0359C9.77673 20.6484 9.15508 20.6484 8.76757 21.0359L1.97795 27.8255V4.65525C1.97795 3.45233 2.96289 2.46739 4.16581 2.46739Z" fill="#3D3D3D"/><path d="M12.2464 16.3211C15.0236 16.3211 17.2761 14.0606 17.2761 11.2915C17.2761 8.52233 15.0156 6.26181 12.2464 6.26181C9.47731 6.26181 7.2168 8.52233 7.2168 11.2915C7.2168 14.0606 9.46924 16.3211 12.2464 16.3211ZM12.2464 8.23976C13.9338 8.23976 15.2981 9.61222 15.2981 11.2915C15.2981 12.9707 13.9257 14.3432 12.2464 14.3432C10.5672 14.3432 9.19475 12.9707 9.19475 11.2915C9.19475 9.61222 10.5591 8.23976 12.2464 8.23976Z" fill="#3D3D3D"/></svg>
                    </div>
                    <div className="select-modal-experience-text">2D Asset</div>
                </div>
            </div>
        </div>
    )
}

function Experiences () {
    return (
            <div style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', height: '100vh', backgroundRepeat: 'no-repeat'}}>
                <div className="overlay"></div>
            <div>
                <TransparentHeader/>
            </div>
            <div>
                <SelectExperienceModal/>
            </div>
        </div>
    )
}

export default Experiences;