// import Header from "./components/Header";
// import MediaSynthesis from "./components/MediaSynthesis";

// import MediaSynthesis from "./components/MediaSynthesis";
import NavBarComponent from "./components/NavBarComponent";
import MediaNew from "./components/MediaNew";
import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {
    const mobileScreen = window.matchMedia("(max-width: 767px)");

    const handleMobileScreen = (mobileScreen) => {
      console.log(mobileScreen.matches)
      const body = document.querySelector('body');
      if (mobileScreen.matches) {
        body.classList.add('rotate-screen');
      } else {
        body.classList.remove('rotate-screen');
      }
    };

    handleMobileScreen(mobileScreen);
    mobileScreen.addEventListener('change', handleMobileScreen);

    return () => {
      mobileScreen.removeEventListener('change', handleMobileScreen);
    };
  }, []);

  return (
    <div>
      <NavBarComponent />
      {/* <MediaSynthesis /> */}
      <MediaNew />
    </div>
  );
}

export default App;

