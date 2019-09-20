pragma solidity 0.5.8; 

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "./HitchensUnorderedAddressSet.sol";

contract Bushel_V1 is ERC20, ERC20Detailed, ERC20Mintable, Ownable {
    using SafeMath for uint256;
    using HitchensUnorderedAddressSetLib for HitchensUnorderedAddressSetLib.Set;
    HitchensUnorderedAddressSetLib.Set tokenHolders;
    address payable treasury;

    function initialize(address sender, address payable treasuryAddr, uint256 initialBalance) public initializer {
        Ownable.initialize(sender);
        ERC20Detailed.initialize("Bushel", "BSHL", 18);
        ERC20Mintable.initialize(sender);
        treasury = treasuryAddr;
        _mint(treasury, initialBalance);
    }

    function reportRevenue(address originator, uint256 marginDenominatedInBushels) public onlyOwner {
        uint256 toOriginator = marginDenominatedInBushels.div(2);
        uint256 toNetwork = marginDenominatedInBushels.div(2);
        _rewardNetwork(toNetwork, originator);
        _transfer(treasury, originator, toOriginator);
    }

    function _rewardNetwork(uint256 totalReward, address originator) private {
        for (uint i=0; i<tokenHolders.count(); i++){
            address tokenHolder = tokenHolders.keyAtIndex(i);
            if (tokenHolder == originator) {
                continue;
            }
            uint256 thisReward = balanceOf(tokenHolder).div(totalSupply()).mul(totalReward);
            _transfer(treasury, tokenHolder, thisReward);
        }
    }

    /**
    * Overrides the ERC20._transfer in order to add tracking of who owns 
    * tokens
    */
    function _transfer(address from, address to, uint256 value) internal {
        super._transfer(from, to, value);
        if (!tokenHolders.exists(to)) {
            tokenHolders.insert(to);
        }
    }

}
