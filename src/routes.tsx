import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Convert from './pages/convert';
import Bhaskara from './pages/bhaskara/index';

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/convert" element={<Convert />} />
                    <Route path="/bhaskara" element={<Bhaskara />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;