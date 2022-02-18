// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC1238/extensions/ERC1238URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Resources:
// https://github.com/ethereum/EIPs/issues/1238
// https://github.com/violetprotocol/ERC1238-token
// https://vitalik.ca/general/2022/01/26/soulbound.html

contract CryptoCredential is ERC1238, ERC1238URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

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

    address public issuer;

    constructor(address issuer_) {
        issuer = issuer_;
    }

    modifier onlyIssuer() {
        require(
            msg.sender == issuer,
            "Unauthorized: only contract issuer can issue new CryptoCredentials"
        );
        _;
    }

    // This is the method I was thinking that we can use to issue new credentials, which builds the data and mints the NTT
    function issueCredential(
        address creator, //to
        uint256 amount, // can probably hardcode to 1?
        string memory creationTitle,
        Skill skill,
        string memory totalFunding,
        string memory totalFunders
    ) external onlyIssuer {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        // for now just JSON stringify
        // eventually const tokenURI = "https://your-domain-name.com/credentials/tokens/1";
        string memory fullURI = string(
            abi.encodePacked(
                "{ title: { 'Created ",
                creationTitle,
                " with ",
                totalFunding,
                " ETH from ",
                totalFunders,
                " funders.' } skill: { '",
                skill,
                "' } }"
            )
        );

        bytes memory bytes_; // null

        _mintWithURI(creator, tokenId, amount, fullURI, bytes_);
    }

    function issueCredentials(
        address[] collaborators, //to
        uint256 amount, // can probably hardcode to 1?
        string memory creationTitle,
        Skill skill,
        string memory totalFunding,
        string memory totalFunders
    ) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        // for now just JSON stringify
        // eventually const tokenURI = "https://your-domain-name.com/credentials/tokens/1";
        string memory fullURI = string(
            abi.encodePacked(
                "{ title: { 'Created ",
                creationTitle,
                " with ",
                totalFunding,
                " ETH from ",
                totalFunders,
                " funders.' } skill: { '",
                skill,
                "' } }"
            )
        );

        bytes memory bytes_; // null

        _mintBatchWithURI(collaborators, tokenId, amount, fullURI, bytes_);
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
