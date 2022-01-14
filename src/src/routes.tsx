import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Convert from './pages/pitagoras';
import Bhaskara from './pages/bhaskara/index';
import VelMedia from "./pages/vel_media";

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="exercicio/pitagoras" element={<Convert />} />
                    <Route path="exercicio/bhaskara" element={<Bhaskara />} />
                    <Route path="exercicio/vel_media" element={<VelMedia />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;