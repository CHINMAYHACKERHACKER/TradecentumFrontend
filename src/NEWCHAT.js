import React from "react";
import { useState } from "react";
import CHAT from "./CHAT.js";
import NEWCHATCHAT from "./NEWCHATCHAT.js";

const NEWCHAT = () => {
    const [user, setUser] = useState(null);

    if (!user) {
        return <CHAT onAuth={(user) => setUser(user)} />;
    } else {
        return <NEWCHATCHAT user={user} />;
    }
}

export default NEWCHAT;