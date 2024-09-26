import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TokenDataProvider } from "./support/local-data-store";
import PrivateRoute from "./support/private-route";
import AppLayout from './layout/app-layout';
import AllUser from "./page/all-user";
import AllPandit from "./page/all-pandit";
import FaqHelp from "./page/faq-help";
import Login from "./page/login";
import SignUp from "./page/signup";
import Profile from "./page/profile";
import MantraCategory from "./page/mantra-category";
import Mantra from "./page/mantra";
import YoutubeVideo from "./page/youtube-video";
import TVSeries from "./page/tv-series";
import SupportPage from "./page/support";
import Posts from "./page/posts";



const App = () => {

    return (
        <TokenDataProvider>
            <Router>

                <Routes>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Render PrivateRoute as a child */}
                    <Route element={<PrivateRoute />}>

                        <Route path="/" element={<AppLayout />}>

                            <Route path="/user-profile" element={<AllUser />} />
                            <Route path="/all-pandit" element={<AllPandit />} />
                            <Route path="/faq-help" element={<FaqHelp />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/mantra-category" element={<MantraCategory />} />
                            <Route path="/mantra" element={<Mantra />} />
                            <Route path="/youtube-video" element={<YoutubeVideo />} />

                            <Route path="/tv-series" element={<TVSeries />} />
                            <Route path="/support" element={<SupportPage />} />
                            <Route path="/posts" element={<Posts />} />
                            


                        </Route>

                    </Route>

                </Routes>
            </Router>
        </TokenDataProvider>
    );
};

export default App;
