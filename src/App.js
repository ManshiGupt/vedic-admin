import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TokenDataProvider} from "./support/local-data-store";
import PrivateRoute from "./support/private-route";
import AppLayout from './layout/app-layout';
import AllUser from "./page/all-user";
import AllPandit from "./page/all-pandit";
import FaqHelp from "./page/faq-help";
import Login from "./page/login";
import SignUp from "./page/signup";
import Profile from "./page/profile";


const App = () => {

    return (
        <TokenDataProvider>
            <Router>

                <Routes>

                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Render PrivateRoute as a child */}
                    <Route element={<PrivateRoute />}>

                        <Route path="/" element={<AppLayout />}>

                            <Route path="/user-profile" element={<AllUser />} />
                            <Route path="/all-pandit" element={<AllPandit />} />
                            <Route path="/faq-help" element={<FaqHelp />} />
                            <Route path="/profile" element={<Profile />} />
                            
                        </Route>
                    </Route>

                </Routes>
            </Router>
        </TokenDataProvider>
    );
};

export default App;
