import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import GlobalBackButton from "./components/Navbar/GlobalBackButton";
import Home from './pages/home';
import Convert from './pages/pitagoras';
import Bhaskara from './pages/bhaskara';
import VelMedia from "./pages/vel_media";
import RankBhaskara from "./pages/RankBhaskara";
import RankPitagoras from "./pages/RankPitagoras";
import RankVelmedia from "./pages/RankVelmedia";
import ChooseRank from "./pages/ChooseRank";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Navbar";

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
                    <Route path="rank/bhaskara" element={<RankBhaskara />} />
                    <Route path="rank/pitagoras" element={<RankPitagoras />} />
                    <Route path="rank/vel_media" element={<RankVelmedia />} />
                    <Route path="rank" element={<ChooseRank />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <GlobalBackButton />
            </BrowserRouter>
        </>
    )
}

export default Router;