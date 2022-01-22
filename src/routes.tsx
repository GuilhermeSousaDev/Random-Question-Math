import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Navbar from './components/Navbar';
import GlobalBackButton from "./components/Navbar/GlobalBackButton";
import Home from './pages/home';
import Convert from './pages/pitagoras';
import Bhaskara from './pages/bhaskara';
import VelMedia from "./pages/vel_media";

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="exercicio/pitagoras" element={<Convert />} />
                    <Route path="exercicio/bhaskara" element={<Bhaskara />} />
                    <Route path="exercicio/vel_media" element={<VelMedia />} />
                </Routes>
                <GlobalBackButton />
            </BrowserRouter>
        </>
    )
}

export default Router;