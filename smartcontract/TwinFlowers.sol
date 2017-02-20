pragma solidity ^0.4.2;

contract TwinFlowers {
    address artist; // designated artist
    string sculptureName;
    address parent; // parent flower

    uint fundingGoal; 
    uint amountRaised; 
    uint deadline; 

    struct Contributor {
        address addr;
        uint amount;
        string name;
    }

    // Contributors list
    Contributor[] public contributors;
    event DonationComplete(address donator, uint amount, string name);

    //  Initialisation: Choose the creator of the flower
    function TwinFlowers(
        string sculptureNameToBe,
        address predecessor,   
        uint fundingGoalInEthers 
    ) {
        artist = msg.sender;
        sculptureName = sculptureNameToBe;
        parent = predecessor;                
        fundingGoal = fundingGoalInEthers * 1 ether;
        deadline = now + 365 days;
        amountRaised = 0;
    }   


    // default function that is called whenever anyone sends funds to a contract 
    function () {
        uint amount = msg.value;
        contributors[contributors.length++] = Contributor({addr: msg.sender, amount: amount, name: "anonymous"});
        amountRaised += amount;
        DonationComplete(msg.sender, amount, "anonymous");
    }
    /// Donation with your name registered on the blockchain
    function openDonation(string donatorName) {
        uint amount = msg.value;
        contributors[contributors.length++] = Contributor({addr: msg.sender, amount: amount, name: donatorName});
        amountRaised += amount;
        DonationComplete(msg.sender, amount, donatorName);
    }

    function askSculptureName() returns (string) {
        return sculptureName;
    }

    function getContributor(uint index) public returns(string, uint, address) {
        return (contributors[index].name, contributors[index].amount, contributors[index].addr);
    }


    // checks if the goal or time limit has been reached and choose successor
    function chooseSuccessor(address successor) {
        uint support = amountRaised * 1/10;
        uint payForward = amountRaised * 8 /10 ;

        if (msg.sender == artist){

            if (amountRaised >= fundingGoal){
                /* Successful campain*/
                if (artist.send(support))
                    throw;
                if (parent.send(support))
                    throw;
                if (successor.send(support))
                    throw;
                if (artist.send(this.balance))
                    throw;
            } 

        }
    }

    modifier afterDeadline() { if (now >= deadline) _ ;}


    /*After the deadline, anybody can ask to trigger refund*/
    function cancelCampaign() afterDeadline {
        if (amountRaised >= fundingGoal) throw;
        for (uint i = 0; i < contributors.length; ++i) {
            if (contributors[i].addr.send(contributors[i].amount))
                throw;
        }                      

        if (artist.send(this.balance))
            throw;
    }
}
