pragma solidity >=0.4.25 <0.6.0;
contract Chatnew{
    event messageSentEvent(address indexed from, address indexed to, string message);
    event addFriendEvent(address indexed from, address indexed to);
    event acceptFriendEvent(address indexed from, address indexed to);
    event joinGroupEvent(address indexed from, string groupName);
    event sendMessageGroupEvent(address indexed from, string groupName);
    
    enum RelationshipState { Non, FriendRequest, Friend, Blocked}
    enum JoinGroupState {Non, Joined, Banned}

    struct Member {
        string name;
        bool isMember;
        uint messageStartBlock;
    }
    
    struct Group {
        string name;
        Member creator;
    }
    
    mapping (address => mapping (address => RelationshipState)) public relationships;
    mapping (address => Member) public members;
    mapping (string => Group) groups;
    mapping (string => bool) groupCheck;
    mapping (address => mapping (string => JoinGroupState)) joinStates;
    modifier onlyMember() {
        require(members[msg.sender].isMember == true);
        _;
    }
    
    function register(string memory name) public{
        require(members[msg.sender].isMember == false);
        Member memory newMember = Member(name, true, 0);
        members[msg.sender] = newMember;
    }
    
    function addFriend(address add) public onlyMember{
        require(relationships[msg.sender][add] == RelationshipState.Non);
        require(relationships[add][msg.sender] == RelationshipState.Non);
        
        relationships[msg.sender][add] = RelationshipState.FriendRequest;
        emit addFriendEvent(msg.sender, add);

    }
    
    function handleFriendRequest(address add, bool accept)public onlyMember{
        require(relationships[add][msg.sender] == RelationshipState.FriendRequest);
        
        if (accept){
            relationships[msg.sender][add] = RelationshipState.Friend;
            relationships[add][msg.sender] = RelationshipState.Friend;
            emit acceptFriendEvent(msg.sender, add);
        }
        else{
            relationships[msg.sender][add] = RelationshipState.Non;
            relationships[add][msg.sender] = RelationshipState.Non;
        }
    }
    
    function getRelationWith(address a) public view onlyMember returns (RelationshipState) {
        return relationships[msg.sender][a];
    }
    
    function sendMessage(address add, string memory message)public onlyMember{
        require(relationships[add][msg.sender] == RelationshipState.Friend);
        emit messageSentEvent(msg.sender, add, message);
        
        if (members[add].messageStartBlock == 0) {
            members[add].messageStartBlock = block.number;
        }
    }
    
    /*
    function createGroup(string groupName)public onlyMember{
        require(groupCheck[groupName] != true);
        Group memory newGroup = Group(groupName, members[msg.sender]);
        groups[groupName] = newGroup;
        groupCheck[groupName] = true;
        joinStates[msg.sender][groupName] = JoinGroupState.Joined;
    }
    
    function joinGroup(string groupName)public onlyMember{
        require(joinStates[msg.sender][groupName] == JoinGroupState.Non);
        require(groupCheck[groupName]==true);
        joinStates[msg.sender][groupName] = JoinGroupState.Joined;
        emit joinGroupEvent(msg.sender, groupName);
    }
    
    function getJoinState(string groupName) public view onlyMember returns (JoinGroupState) {
        require(groupCheck[groupName]==true);
        return joinStates[msg.sender][groupName];
    }
    
    function sendMessageGroup(string groupName) public onlyMember{
        require(groupCheck[groupName]==true);
        require(joinStates[msg.sender][groupName] == JoinGroupState.Joined);
        
    }*/

}
