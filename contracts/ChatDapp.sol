
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract ChatDapp{
    //struct

    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;


    //Check user Exist

    function checkUserExists(address pubkey) public view returns(bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //Create Account

    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender)==false, "User Already exist");
        require(bytes(name).length>0,"Username cannot be empty");
        userList[msg.sender].name = name;
    }

    //GET username

    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey)==true,"User is not registered");
        return userList[pubkey].name;
    }

    //Add Friend

    function addFriend(address friendKey,string calldata name) external{
        require(checkUserExists(msg.sender),"Create an Account");
        require(checkUserExists(friendKey),"Friend not found");
        require(msg.sender != friendKey,"U cant ad urself as friend");
        require(checkAlreadyFriends(msg.sender,friendKey)==false,"these users are already friends");

        _addFriend(msg.sender, friendKey, name);
        _addFriend(friendKey,msg.sender,userList[msg.sender].name);   
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1,address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i=0; i<userList[pubkey1].friendList.length; i++){

            if(userList[pubkey1].friendList[i].pubkey == pubkey2)return true;
        }
        return false;
    }

    function _addFriend(address me, address friendKey, string memory name) internal{
        friend memory newFriend = friend(friendKey,name);
        userList[me].friendList.push(newFriend);
    }

    //Get my friend

    function getMyFriend() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //get chat code

    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1,pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2,pubkey1));
    }

    // Send Message

    function sendMessage(address friendKey,string calldata _msg) external{
        require(checkUserExists(msg.sender)==true,"Create an account");
        require(checkUserExists(friendKey), "User is not registered");
        require(checkAlreadyFriends(msg.sender,friendKey), "You not friend with the given address");

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //Read msg

    function readMessage(address friendKey) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        return allMessages[chatCode];
    }

}
