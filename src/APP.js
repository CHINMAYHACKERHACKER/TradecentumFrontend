import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TRADEUI from "./TRADEUI.js";
import REGISTER from "./REGISTER.js";
import HOME from "./HOME.js";
import FORGOTPASSWORD from "./FORGOTPASSWORD.js";
import MOBILEOTP from "./MOBILEOTP.js";
import TRADINGSIGNAL from "./TRADINGSIGNAL.js";
import TECHNICALSIGNAL from "./TECHNICALSIGNAL.js";
import FOREXTRADE from "./FOREXTRADE.js";
import DIGITALCRYTO from "./DIGITALCRYTO.js";
import UserActivationForm from "./SUBSCRITION.js";
import REGISTEREMAIL from "./REGISTEREMAIL.js";
import CryptoTable from "./MARKETDATA.js";
import EconomicCalendar from "./EconomicCalendar.js";
import CROSSRATE from "./CROSSRATE.js";
import VIDEOSTATICVIDEO from "./VIDEOSTATICVIDEO.js";
import VIDEO from "./VIDEO.js";
import TRADE from "./TRADE.js";
import USERCARD from "./USERCARD.js";
import LOGIN from "./LOGIN.js";

const APP = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TRADEUI />} />
                <Route path="/register" element={<REGISTER />} />
                <Route path="/home" element={<HOME />} />
                <Route path="/forgotpassword" element={<FORGOTPASSWORD />} />
                <Route path="/otp" element={<MOBILEOTP />} />
                <Route path="/signal" element={<TRADINGSIGNAL />} />
                <Route path="/Technicalsignal" element={<TECHNICALSIGNAL />} />
                <Route path="/forex" element={<FOREXTRADE />} />
                <Route path="/crypto" element={<DIGITALCRYTO />} />
                <Route path="/Subscription" element={<UserActivationForm />} />
                <Route path="/Email" element={<REGISTEREMAIL />} />
                <Route path="/market" element={<CryptoTable />} />
                <Route path="/EconomicCalendar" element={<EconomicCalendar />} />
                <Route path="/CROSSRATE" element={<CROSSRATE />} />
                <Route path="/videostaticvideo" element={<VIDEOSTATICVIDEO />} />
                <Route path="/video/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:TITLE/:ID" element={<VIDEO />} />
                <Route path="/trade" element={<TRADE />} />
                <Route path="/User" element={<USERCARD />} />
                <Route path="/login" element={<LOGIN />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default APP;