// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";

import {CheckIfWalletConnected,connectWallet,connectingWithContract} from '../Utils/apiFeature'


export const ChatDappContext = React.createContext();


export const ChatDappProvider = ({children}) =>{
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("")
    const [friendLists,setFriendLists] = useState([]);
    const [friendsMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("")
    const [userLists, setUserLists] = useState([])
    //CHAT user Data

    const [currentUserName,setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("")


    const fetchData = async()=>{
        try{
            const contract = await connectingWithContract();
            console.log(contract);
            //GET account
            const connectAccount = await connectWallet();
            console.log(connectAccount);
            setAccount(connectAccount);
         
            //GET UserName
            const username = await contract.getUsername(connectAccount);
            console.log(username);
            setUserName(username);

            //GET my friend List
            const friendList = await contract.getMyFriend();
            setFriendLists(friendList);

            //GET all user List
            const userList = await contract.getAllAppUser()
            setUserLists(userList);


        }catch(error){
            setError("Please install and connect metamask")
            console.log(error)
        }
       
    }

    useEffect(()=>{
       fetchData();
    },[])

    //Read message

    const readMessage = async(friendAddress) => {
        try{
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress)
            setFriendMsg(read);
        }catch(error){
            setError("Currently you have No friends");
        }
    }

    // Create Account

    const createAccount = async({name, accountAddress})=>{
        try{
            if(name && accountAddress){
                const contract = await connectingWithContract();
                const getCreatedUser = await contract.createAccount(name);
                setLoading(true);
                await getCreatedUser.wait();
                setLoading(false);
                window.location.reload();
            }
            return setError("Name and Account Address cannot be empty");
        }catch(error){
            setError("Error while creating account")
        }
    }

    //Add your friend

    const addFriends = async ({name, accountAddress})=>{
        try{
            if(name && accountAddress){
                const contract = await connectingWithContract();
                const addMyFriend = await contract.addFriend(name,accountAddress);
                setLoading(true);
                await addMyFriend.wait();
                setLoading(false);
                // need to route to home page
                window.location.reload();
            }
            return setError("Please provide a valid address");
        }catch(error){
            setError("Something went wrong while adding friend")
        }
    }

    //Send messgae

    const sendMessage = async({msg,address})=>{
        try{
            if(msg && address){
                const contract = await connectingWithContract();
                const addMessage = await contract.sendMessage(address,msg);
                setLoading(true);
                await addMessage.wait();
                setLoading(false);
                window.location.reload();
            }
            return setError("Please enter msg and address");
        }catch(error){
            setError("Please please reload and try again")
        }
    }

    //Read Info

    const readUser = async(userAddress)=>{
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }

    return(
        <ChatDappContext.Provider value={{readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        CheckIfWalletConnected,
        connectWallet,
        account,
        userName,
        friendLists,
        friendsMsg,
        loading,
        error,
        userLists,
        currentUserName,
        currentUserAddress
        }}>
            {children}
        </ChatDappContext.Provider>
    )
}
