import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Convert from './pages/pitagoras';
import Bhaskara from './pages/bhaskara/index';

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="exercicio/pitagoras" element={<Convert />} />
                    <Route path="exercicio/bhaskara" element={<Bhaskara />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;