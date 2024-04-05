// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Libraries/LibCalculations.sol";
import "./chainLinkWeatherData.sol";

contract insuranceRegistery is ReentrancyGuard {
    using Counters for Counters.Counter;
    uint256 public InsuranceId;
    address public chainLinkWeatherDataAddress;

struct insuranceData {
        address userWalletAddress;
        uint256 startDate;
        uint256 maturityDate;
        uint256 periodTime;
        uint256 areaOfLand;
        string seedsData;
        uint256 seedQuantity;
        string image;
        string yourAddress;
        uint256 Amount;
        //change
        string lat;
        string long;
    }

    // InsuranceId => insuranceData
    mapping(uint256 => insuranceData) public insuranceDetails;
    function getInsuranceDetails(uint256 id)public view returns(insuranceData memory){
        return insuranceDetails[id];
    }

    // InsuranceId => installment
    mapping(uint256 => uint8) public paidInstallments;
    function getPaidInstallments(uint256 id)public view returns(uint8){
        return paidInstallments[id];
    }

    // InsuranceId => block.timestamp
    mapping(uint256 => uint256) public lastInstallmentPaidTimestump;
    function getLastInstallmentPaidTimestump(uint256 id)public view returns(uint256){
        return lastInstallmentPaidTimestump[id];
    }

    // userAddress => InsuranceIds
    mapping(address => uint256[]) public userInsurances;

    function getUserInsurances()public view returns(uint256[] memory){
        return userInsurances[msg.sender];
    }

    //change
    //InsurancsId => success
    mapping(uint256=>bool) public claimed;
    //end

    event insuranceRegistered(uint256 InsuranceId, uint256 amount);

    event Claimed(uint256 InsuranceId, string massage, uint256 amount);
    constructor(address _chainLinkWeatherData) {
        chainLinkWeatherDataAddress = _chainLinkWeatherData;
    }

    function insuranceRegister(insuranceData memory _insuranceData)
        external
        returns (uint256 _insuranceId)
    {
        require(msg.sender != address(0), "Fake Address");

        _insuranceId = ++InsuranceId;

        insuranceDetails[_insuranceId] = _insuranceData;

        userInsurances[msg.sender].push(_insuranceId);

        emit insuranceRegistered(_insuranceId, _insuranceData.Amount);
    }

    function payInstallment(address ERC20Address, uint256 _insuranceId)
        external
        nonReentrant
    {
        insuranceData memory details = insuranceDetails[_insuranceId];
        require(
            details.userWalletAddress == msg.sender,
            "This is not your Insurance"
        );
        require(
            ERC20Address != address(0),
            "you can't do this with zero address"
        );

        require(
            details.maturityDate >=block.timestamp,
            "your maturity Date is over"
        );

        paidInstallments[_insuranceId]++;
        lastInstallmentPaidTimestump[_insuranceId] = block.timestamp;

        require(
            IERC20(ERC20Address).transferFrom(
                msg.sender,
                address(this),
                details.Amount
            ),
            "Unable to tansfer Fund"
        );
    }
    function claim(
        address ERC20Address, //ERC20Address is required
        uint256 _insuranceId,
        string memory image,
        uint256 current //change
    ) external nonReentrant{
        require(
            lastInstallmentPaidTimestump[_insuranceId] < block.timestamp,
            "You are claiming at wrong timestamp"
        );
        insuranceData memory details = insuranceDetails[_insuranceId];
        //change
        require(claimed[_insuranceId]==false,"You have already claimed");
        // require(details.maturityDate>block.timestamp,"Your maturity date is over");
        require(details.maturityDate>=current && details.startDate<=current,"Your maturity date is over");
        //end
        uint256 windSpeed = chainLinkWeatherData(chainLinkWeatherDataAddress).getWindSpeedData();
        uint256 RainFall = chainLinkWeatherData(chainLinkWeatherDataAddress).getRainData();
        //change
        string memory lata=chainLinkWeatherData(chainLinkWeatherDataAddress).getLat();
        string memory longa=chainLinkWeatherData(chainLinkWeatherDataAddress).getLong();
        string memory _lat=details.lat;
        string memory _long=details.long;
        require(keccak256(bytes(lata)) == keccak256(bytes(_lat)) && keccak256(bytes(longa)) == keccak256(bytes(_long)), "Location should be same");
        //end

        if (windSpeed >= 88 || RainFall >=501) {
            uint256 percent = LibCalculations.percent(
                details.Amount,
                125
            );
            require(
                details.userWalletAddress == msg.sender,
                "This is not your Insurance"
            );
            require(
                ERC20Address != address(0),
                "you can't do this with zero address"
            );
            require(
                IERC20(ERC20Address).transfer(
                    msg.sender,
                    details.Amount*details.periodTime + percent
                ),
                "Unable to tansfer Fund"
            );
            claimed[_insuranceId]=true;
            emit Claimed(_insuranceId, "success", details.Amount*details.periodTime + percent);
        } 
        else if (windSpeed >= 46 || RainFall >=401) {
            uint256 percent = LibCalculations.percent(
                details.Amount*details.periodTime,
                100
            );
            require(
                details.userWalletAddress == msg.sender,
                "This is not your Insurance"
            );
            require(
                ERC20Address != address(0),
                "you can't do this with zero address"
            );
            require(
                IERC20(ERC20Address).transfer(
                    msg.sender,
                    details.Amount*details.periodTime + percent
                ),
                "Unable to tansfer Fund"
            );
            claimed[_insuranceId]=true;
            emit Claimed(_insuranceId, "success", details.Amount*details.periodTime + percent);
        } 
        else {
            emit Claimed(_insuranceId, "unsuccess", 0);
        }

    }
}
