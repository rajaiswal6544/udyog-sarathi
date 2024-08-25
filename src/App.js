import './App.css';
import { Routes, Route,useNavigate } from "react-router-dom"

import Navbar from './components/Navbar';
import Home from "./container/Home";
import Resources from './container/Resources';
// import Headnav from "./components/Headnav"
import Signup from "./components/Signup"
import Loginuser from "./components/Loginuser"
import Profile from "./components/Profile"

import Footer from './components/Footer';
import { useState, useEffect } from 'react';
// import Onejob from './components/Onejob';
import About from './components/About';
import Contact from "./components/Contact";
// import Jobssec from './components/Jobssec';
// import Goverment from './components/Goverment';
// import { BiLogIn } from 'react-icons/bi';


// import payment compo
import Product from "./components/Product"
import Success from "./components/Success"
import Failure from "./components/Failure"

// import resume compo
import Resume from "./components/Resume"

import ScrollToTop from './components/ScrollToTop';
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition"


//  HERE  ######### SBH FINAL
import PostButton from "./components/PostButton"
import Form from './components/Form'
import AllJobList from './components/AllJobList';
// import { useHistory } from 'react-router-dom';



function App() {
  const navigate=useNavigate()
  const commands=[{
    command:["Go to *","Open *"],
    callback:(redirectPage)=>setRedUrl(redirectPage),
  },]
  const [isLoggedIn, setLoggedin] = useState(true);
const{transcript}=useSpeechRecognition({commands});

const[redirectUrl,setRedUrl]=useState("");

const pages=["courses","home","resume","contact","about"]

const urls={
  courses:"/courses",
  home:"/",
  resume:"/resume",
  contact:"/contact",
  about:"/about"
}

// const history = useHistory();

// useEffect(() => {
//   if (redirectUrl) {
//     history.push(redirectUrl);
//   }
// }, [redirectUrl, history]);


if(!SpeechRecognition.browserSupportsSpeechRecognition){
  return null;
}
let redirect=""
if(redirectUrl){
  if(pages.includes(redirectUrl)){
    redirect=navigate(redirectUrl)
}
}



  return (
    <div className="App">

    <ScrollToTop />

      <Navbar isLoggedIn={isLoggedIn} />
      <p id="transcript">Transcript:{transcript}</p>
      <button onClick={SpeechRecognition.startListening}>start</button>

      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route exact path="/courses" element={<Resources />} />

        {/* <Route exact path="/jobs" element={<Headnav />} /> */}

        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/login" element={<Loginuser />} />

        <Route exact path="/profile" element={<Profile />} />

        {/* <Route exact path="/onejob" element={<Onejob />} /> */}

        <Route exact path="/about" element={<About />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/jobs" element={<AllJobList />} />

        <Route exact path="/form" element={<Form />} />

        {/* <Route exact path="/home" element={<Home />} /> */}

      {redirect}
        {/* Payment routes */}

        <Route path="/product" Component={Product} />
        <Route path="/success" Component={Success} />
        <Route path="/failure" Component={Failure} />

        {/* Resume routes */}
        <Route exact path="/resume" element={<Resume />} />

      </Routes>
      

      <Footer />
      


    </div>
  );
}

export default App;

// import { Routes, Route, useNavigate ,Redirect} from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from "./container/Home";
// import Resources from './container/Resources';
// import Signup from "./components/Signup";
// import Loginuser from "./components/Loginuser";
// import Profile from "./components/Profile";
// import Footer from './components/Footer';
// import { useState, useEffect } from 'react';
// import About from './components/About';
// import Contact from "./components/Contact";
// import Product from "./components/Product";
// import Success from "./components/Success";
// import Failure from "./components/Failure";
// import Resume from "./components/Resume";
// import ScrollToTop from './components/ScrollToTop';
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import PostButton from "./components/PostButton";
// import Form from './components/Form';
// import AllJobList from './components/AllJobList';
// // import { useHistory } from 'react-router-dom';

// function App() {
//   const navigate = useNavigate();

//   const commands = [
//     {
//       command: ["Go to * page", "Go to *", "Open * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//   ];

//   const { transcript } = useSpeechRecognition({ commands });
//   const [redirectUrl, setRedirectUrl] = useState("");
//   const pages = ["home", "about", "courses","jobs","contact"];
//   const urls = {
//     home: "/",
//     contact: "/contact",
//     about: "/about",
//     courses: "/courses",
//     jobs:"/jobs",
//   };

 
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       return null;
//     }

 
//   let redirect = "";


//   if (redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Redirect to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

  


//   // const { transcript } = useSpeechRecognition();

//   // const [redirectUrl, setRedUrl] = useState("");

//   // const pages = ["courses", "home", "resume", "contact", "about"];

//   // const urls = {
//   //   courses: "/courses",
//   //   home: "/",
//   //   resume: "/resume",
//   //   contact: "/contact",
//   //   about: "/about"
//   // };

//   // const history = useHistory();

//   // useEffect(() => {
//   //   if (redirectUrl && pages.includes(redirectUrl)) {
//   //     history.push(redirectUrl);
//   //   }
//   // }, [redirectUrl, history]);

//   // if (!SpeechRecognition.browserSupportsSpeechRecognition) {
//   //   return null;
//   // }

//   return (
//     <div className="App">
//       <ScrollToTop />
//       <Navbar isLoggedIn={true} />
      

//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route exact path="/courses" element={<Resources />} />
//         <Route exact path="/signup" element={<Signup />} />
//         <Route exact path="/login" element={<Loginuser />} />
//         <Route exact path="/profile" element={<Profile />} />
//         <Route exact path="/about" element={<About />} />
//         <Route exact path="/contact" element={<Contact />} />
//         <Route exact path="/jobs" element={<AllJobList />} />
//         <Route exact path="/form" element={<Form />} />
//         {redirectUrl}
//         <Route path="/product" element={<Product />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/failure" element={<Failure />} />
//         <Route exact path="/resume" element={<Resume />} />
//         {redirect}
//       </Routes>
//       <p id="transcript">Transcript: {transcript}</p>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <Footer />
//     </div>
//   );
// }

// export default App;


// // #f58840

// // #grad {
// //   background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
// // }

// // background-image: url("https://img.freepik.com/premium-photo/abstract-background-design-images-wallpaper-ai-generated_643360-270191.jpg");