pragma solidity >=0.4.25 <0.6.0;
contract Chatnew{
    event messageSentEvent(address indexed from, address indexed to, string message);
    event addFriendEvent(address indexed from, address indexed to);
    event acceptFriendEvent(address indexed from, address indexed to);
    
    enum RelationshipState { Non, FriendRequest, Friend, Blocked}
    enum GroupState {Non, RequestJoin, Joined, Banned}

    struct Member {
        string name;
        bool isMember;
    }
    
    struct Group {
        string name;
    }
    
    mapping (address => mapping (address => RelationshipState)) public relationships;
    mapping (address => Member) public members;
 
    modifier onlyMember() {
        require(members[msg.sender].isMember == true);
        _;
    }
    
    function register(string name) public{
        require(members[msg.sender].isMember == false);
        Member memory newMember = Member(name, true);
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
    
    function sendMessage(address add, string message)public onlyMember{
        require(relationships[msg.sender][add] == RelationshipState.Friend);
        emit messageSentEvent(msg.sender, add, message);
    }
    
    
    
    
}
