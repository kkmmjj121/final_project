import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivacyAgreement from './components/PrivacyAgreement';
import ServiceIntro from "./components/ServiceIntro";
import Procedure from "./components/Procedure";
import Taxi from "./components/Taxi";
import Lost from "./components/Lost";
import Items from "./components/Items";
import Management from "./components/Management";
import Register from "./components/Register"
import ProtectedRoute from './utils/ProtectedRoute';
import IdInquiry from "./components/IdInquiry"
import PwInquiry from "./components/PwInquiry"
function App() {
    const [agreed, setAgreed] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/signup" element={<Signup agreed={agreed}/>}/>
                <Route path="/PrivacyAgreement" element={<PrivacyAgreement setAgreed={setAgreed}/>}/>
                <Route path="/ServiceIntro" element={<ServiceIntro/>}/>
                <Route path="/procedure" element={<Procedure/>}/>
                <Route path="/Items" element={<Items/>}/>
                <Route path="/Taxi" element={
                    <ProtectedRoute>
                        <Taxi/>
                    </ProtectedRoute>
                }/>
                <Route path="/Lost" element={
                    <ProtectedRoute>
                        <Lost/>
                    </ProtectedRoute>
                }/>
                <Route path="/Management" element={<Management/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/IdInquiry" element={<IdInquiry/>}/>
               <Route path="/PwInquiry" element={<PwInquiry/>}/>
            </Routes>
        </Router>
    );

}

export default App;
