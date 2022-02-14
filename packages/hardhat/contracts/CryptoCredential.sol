// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC1238/extensions/ERC1238URIStorage.sol";

// Resources:
// https://github.com/ethereum/EIPs/issues/1238
// https://github.com/violetprotocol/ERC1238-token
// https://vitalik.ca/general/2022/01/26/soulbound.html

contract CryptoCredential is ERC1238, ERC1238URIStorage {

    address public issuer;

    enum Skill {
        Music,
        Photography,
        Painting,
        DigitalArt,
        Animation,
        Film,
        Sculpture,
        Poetry,
        Play,
        Dance
    }

    constructor(address issuer_, string memory baseURI_) ERC1238(baseURI_) {
        issuer = issuer_;
    }

    modifier onlyIssuer() {
        require(msg.sender == issuer, "Unauthorized: only contract issuer can issue new CryptoCredentials");
        _;
    }

    // This is the method I was thinking that we can use to issue new credentials, which builds the data and mints the NTT
    function issueCredential(
        address creator,
        string memory creationTitle,
        Skill skill,
        string memory totalFunding,
        string memory totalFunders
    ) external onlyIssuer {
        // Setup data
        // TODO

        // Creator
        // Title should be "Created '{creationTitle' with {totalFunding} ETH from {totalFunders} funders"
        // Skill

        // Mint NTT
        mint(
            creator,
            skill,
            1,
            ???,
            ???
        );
    }

    // The modifier above and all the below methods are from the ERC1238 "Badge" example
    function setIssuer(address newIssuer) external onlyIssuer {
        require(newIssuer != address(0), "Invalid address for new issuer");
        issuer = newIssuer;
    }

    function setBaseURI(string memory newBaseURI) external onlyIssuer {
        _setBaseURI(newBaseURI);
    }

    function mint(
        address to,
        uint256 id,
        uint256 amount,
        string memory uri,
        bytes memory data
    ) external onlyIssuer {
        _mintWithURI(to, id, amount, uri, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        string[] memory uris,
        bytes memory data
    ) external onlyIssuer {
        _mintBatchWithURI(to, ids, amounts, uris, data);
    }

    function burn(
        address from,
        uint256 id,
        uint256 amount,
        bool deleteURI
    ) external onlyIssuer {
        if (deleteURI) {
            _burnAndDeleteURI(from, id, amount);
        } else {
            _burn(from, id, amount);
        }
    }

    function burnBatch(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts,
        bool deleteURI
    ) external onlyIssuer {
        if (deleteURI) {
            _burnBatchAndDeleteURIs(from, ids, amounts);
        } else {
            _burnBatch(from, ids, amounts);
        }
    }
}
