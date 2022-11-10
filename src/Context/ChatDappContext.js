// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";

import {CheckIfWalletConnected,connectWallet,connectingWithContract} from '../Utils/apiFeature'


export const ChatDappContext = React.createContext();


export const ChatDappProvider = ({children}) =>{
    const title = "hey welcome to blockchain";

    return(
        <ChatDappContext.Provider value={{title}}>
            {children}
        </ChatDappContext.Provider>
    )
}
