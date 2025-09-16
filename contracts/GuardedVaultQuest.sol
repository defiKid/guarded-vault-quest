// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract GuardedVaultQuest is SepoliaConfig {
    using FHE for *;
    
    struct Party {
        euint32 partyId;
        euint32 memberCount;
        euint32 maxMembers;
        euint32 currentLevel;
        euint32 totalRewards;
        bool isActive;
        bool isCompleted;
        address leader;
        mapping(address => bool) members;
        mapping(address => euint32) memberRewards;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Dungeon {
        euint32 dungeonId;
        euint32 difficulty;
        euint32 rewardPool;
        euint32 completionTime;
        bool isActive;
        string name;
        string description;
        address creator;
        uint256 createdTime;
    }
    
    struct TreasureChest {
        euint32 chestId;
        euint32 partyId;
        euint32 rewardAmount;
        euint32 unlockLevel;
        bool isUnlocked;
        bool isClaimed;
        address claimer;
        uint256 unlockTime;
    }
    
    struct PlayerStats {
        euint32 totalParties;
        euint32 completedDungeons;
        euint32 totalRewards;
        euint32 reputation;
        bool isActive;
        address player;
        uint256 lastActivity;
    }
    
    mapping(uint256 => Party) public parties;
    mapping(uint256 => Dungeon) public dungeons;
    mapping(uint256 => TreasureChest) public treasureChests;
    mapping(address => PlayerStats) public playerStats;
    mapping(address => euint32) public playerReputation;
    
    uint256 public partyCounter;
    uint256 public dungeonCounter;
    uint256 public chestCounter;
    
    address public owner;
    address public verifier;
    
    event PartyCreated(uint256 indexed partyId, address indexed leader, uint32 maxMembers);
    event PartyJoined(uint256 indexed partyId, address indexed member);
    event PartyCompleted(uint256 indexed partyId, uint32 totalRewards);
    event DungeonCreated(uint256 indexed dungeonId, address indexed creator, string name);
    event TreasureChestUnlocked(uint256 indexed chestId, uint256 indexed partyId, address indexed claimer);
    event RewardClaimed(uint256 indexed chestId, address indexed claimer, uint32 amount);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createParty(
        uint256 _maxMembers,
        uint256 _duration
    ) public returns (uint256) {
        require(_maxMembers > 0 && _maxMembers <= 10, "Invalid max members");
        require(_duration > 0, "Duration must be positive");
        
        uint256 partyId = partyCounter++;
        
        parties[partyId].partyId = FHE.asEuint32(0); // Will be set properly later
        parties[partyId].memberCount = FHE.asEuint32(1);
        parties[partyId].maxMembers = FHE.asEuint32(0); // Will be set to actual value via FHE operations
        parties[partyId].currentLevel = FHE.asEuint32(1);
        parties[partyId].totalRewards = FHE.asEuint32(0);
        parties[partyId].isActive = true;
        parties[partyId].isCompleted = false;
        parties[partyId].leader = msg.sender;
        parties[partyId].members[msg.sender] = true;
        parties[partyId].startTime = block.timestamp;
        parties[partyId].endTime = block.timestamp + _duration;
        
        // Initialize player stats if not exists
        if (!playerStats[msg.sender].isActive) {
            playerStats[msg.sender] = PlayerStats({
                totalParties: FHE.asEuint32(0),
                completedDungeons: FHE.asEuint32(0),
                totalRewards: FHE.asEuint32(0),
                reputation: FHE.asEuint32(100), // Starting reputation
                isActive: true,
                player: msg.sender,
                lastActivity: block.timestamp
            });
        }
        
        emit PartyCreated(partyId, msg.sender, uint32(_maxMembers));
        return partyId;
    }
    
    function joinParty(uint256 partyId) public {
        require(parties[partyId].leader != address(0), "Party does not exist");
        require(parties[partyId].isActive, "Party is not active");
        require(!parties[partyId].members[msg.sender], "Already a member");
        require(block.timestamp <= parties[partyId].endTime, "Party has ended");
        
        // Check if party is full (this would need to be done off-chain with FHE)
        parties[partyId].members[msg.sender] = true;
        
        // Initialize player stats if not exists
        if (!playerStats[msg.sender].isActive) {
            playerStats[msg.sender] = PlayerStats({
                totalParties: FHE.asEuint32(0),
                completedDungeons: FHE.asEuint32(0),
                totalRewards: FHE.asEuint32(0),
                reputation: FHE.asEuint32(100),
                isActive: true,
                player: msg.sender,
                lastActivity: block.timestamp
            });
        }
        
        emit PartyJoined(partyId, msg.sender);
    }
    
    function createDungeon(
        string memory _name,
        string memory _description,
        uint256 _difficulty,
        uint256 _rewardPool
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Dungeon name cannot be empty");
        require(_difficulty > 0 && _difficulty <= 10, "Invalid difficulty");
        require(_rewardPool > 0, "Reward pool must be positive");
        
        uint256 dungeonId = dungeonCounter++;
        
        dungeons[dungeonId] = Dungeon({
            dungeonId: FHE.asEuint32(0), // Will be set properly later
            difficulty: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rewardPool: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            completionTime: FHE.asEuint32(0),
            isActive: true,
            name: _name,
            description: _description,
            creator: msg.sender,
            createdTime: block.timestamp
        });
        
        emit DungeonCreated(dungeonId, msg.sender, _name);
        return dungeonId;
    }
    
    function createTreasureChest(
        uint256 partyId,
        externalEuint32 rewardAmount,
        externalEuint32 unlockLevel,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(parties[partyId].leader != address(0), "Party does not exist");
        require(parties[partyId].isActive, "Party is not active");
        require(parties[partyId].members[msg.sender], "Only party members can create chests");
        
        uint256 chestId = chestCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalRewardAmount = FHE.fromExternal(rewardAmount, inputProof);
        euint32 internalUnlockLevel = FHE.fromExternal(unlockLevel, inputProof);
        
        treasureChests[chestId] = TreasureChest({
            chestId: FHE.asEuint32(0), // Will be set properly later
            partyId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rewardAmount: internalRewardAmount,
            unlockLevel: internalUnlockLevel,
            isUnlocked: false,
            isClaimed: false,
            claimer: address(0),
            unlockTime: 0
        });
        
        return chestId;
    }
    
    function unlockTreasureChest(
        uint256 chestId,
        uint256 partyId
    ) public {
        require(treasureChests[chestId].partyId != FHE.asEuint32(0), "Chest does not exist");
        require(parties[partyId].members[msg.sender], "Only party members can unlock chests");
        require(!treasureChests[chestId].isUnlocked, "Chest already unlocked");
        require(parties[partyId].isCompleted, "Party must be completed to unlock chests");
        
        treasureChests[chestId].isUnlocked = true;
        treasureChests[chestId].unlockTime = block.timestamp;
        
        emit TreasureChestUnlocked(chestId, partyId, msg.sender);
    }
    
    function claimReward(
        uint256 chestId,
        uint256 partyId
    ) public {
        require(treasureChests[chestId].isUnlocked, "Chest must be unlocked first");
        require(!treasureChests[chestId].isClaimed, "Reward already claimed");
        require(parties[partyId].members[msg.sender], "Only party members can claim rewards");
        
        treasureChests[chestId].isClaimed = true;
        treasureChests[chestId].claimer = msg.sender;
        
        // Update player stats
        playerStats[msg.sender].lastActivity = block.timestamp;
        
        emit RewardClaimed(chestId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function completeParty(
        uint256 partyId,
        externalEuint32 totalRewards,
        bytes calldata inputProof
    ) public {
        require(parties[partyId].leader == msg.sender, "Only party leader can complete party");
        require(parties[partyId].isActive, "Party is not active");
        require(!parties[partyId].isCompleted, "Party already completed");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalTotalRewards = FHE.fromExternal(totalRewards, inputProof);
        
        parties[partyId].isCompleted = true;
        parties[partyId].totalRewards = internalTotalRewards;
        parties[partyId].isActive = false;
        
        emit PartyCompleted(partyId, 0); // Total rewards will be decrypted off-chain
    }
    
    function updateReputation(
        address player,
        euint32 reputation
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(player != address(0), "Invalid player address");
        
        playerReputation[player] = reputation;
        playerStats[player].reputation = reputation;
        
        emit ReputationUpdated(player, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPartyInfo(uint256 partyId) public view returns (
        uint8 memberCount,
        uint8 maxMembers,
        uint8 currentLevel,
        uint8 totalRewards,
        bool isActive,
        bool isCompleted,
        address leader,
        uint256 startTime,
        uint256 endTime
    ) {
        Party storage party = parties[partyId];
        return (
            0, // FHE.decrypt(party.memberCount) - will be decrypted off-chain
            0, // FHE.decrypt(party.maxMembers) - will be decrypted off-chain
            0, // FHE.decrypt(party.currentLevel) - will be decrypted off-chain
            0, // FHE.decrypt(party.totalRewards) - will be decrypted off-chain
            party.isActive,
            party.isCompleted,
            party.leader,
            party.startTime,
            party.endTime
        );
    }
    
    function getDungeonInfo(uint256 dungeonId) public view returns (
        string memory name,
        string memory description,
        uint8 difficulty,
        uint8 rewardPool,
        uint8 completionTime,
        bool isActive,
        address creator,
        uint256 createdTime
    ) {
        Dungeon storage dungeon = dungeons[dungeonId];
        return (
            dungeon.name,
            dungeon.description,
            0, // FHE.decrypt(dungeon.difficulty) - will be decrypted off-chain
            0, // FHE.decrypt(dungeon.rewardPool) - will be decrypted off-chain
            0, // FHE.decrypt(dungeon.completionTime) - will be decrypted off-chain
            dungeon.isActive,
            dungeon.creator,
            dungeon.createdTime
        );
    }
    
    function getTreasureChestInfo(uint256 chestId) public view returns (
        uint8 rewardAmount,
        uint8 unlockLevel,
        bool isUnlocked,
        bool isClaimed,
        address claimer,
        uint256 unlockTime
    ) {
        TreasureChest storage chest = treasureChests[chestId];
        return (
            0, // FHE.decrypt(chest.rewardAmount) - will be decrypted off-chain
            0, // FHE.decrypt(chest.unlockLevel) - will be decrypted off-chain
            chest.isUnlocked,
            chest.isClaimed,
            chest.claimer,
            chest.unlockTime
        );
    }
    
    function getPlayerStats(address player) public view returns (
        uint8 totalParties,
        uint8 completedDungeons,
        uint8 totalRewards,
        uint8 reputation,
        bool isActive,
        uint256 lastActivity
    ) {
        PlayerStats storage stats = playerStats[player];
        return (
            0, // FHE.decrypt(stats.totalParties) - will be decrypted off-chain
            0, // FHE.decrypt(stats.completedDungeons) - will be decrypted off-chain
            0, // FHE.decrypt(stats.totalRewards) - will be decrypted off-chain
            0, // FHE.decrypt(stats.reputation) - will be decrypted off-chain
            stats.isActive,
            stats.lastActivity
        );
    }
    
    function isPartyMember(uint256 partyId, address member) public view returns (bool) {
        return parties[partyId].members[member];
    }
    
    function getPlayerReputation(address player) public view returns (uint8) {
        return 0; // FHE.decrypt(playerReputation[player]) - will be decrypted off-chain
    }
}
