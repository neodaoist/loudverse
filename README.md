# LOUDVΞRSΞ
_Be seen. Be heard. Be experienced._

LOUDVERSE is a 2-sided marketplace for funding hard-to-quantify public goods like music, poetry, and theater.

### [Watch the demo video](https://www.dropbox.com/sh/cizir6uy73hzof5/AADIp7qNw-t7ywOOeZ3W6Pyma?dl=0)

### [Try the dapp](https://loudverse.vercel.app/)
NEW LINK is https://loudverse.vercel.app/ (only updated due to DNS problems with https://loudverse.xyz)

## Some behind-the-scenes
✍️ _**Crowd-Commissions**_ are ERC1155 non-transferrable tokens representing "proof of patronage”

🧾 _**Double Constrained Quadratic Funding**_ calculates matching funds with both a fixed subsidy pool and minimum viable funding goals. 

🎨 _**Smart-Art**_ is an ERC721 NFT that shares financial upside with collaborators and contributors using a royalty allocation table

### [Read the whitepaper](https://github.com/neodaoist/loudverse/blob/main/dcqf_whitepaper.pdf)

## 🚀 Continuation since the in-person BUIDLathon
1) Switched funding token from ETH to DAI
2) Added creator video streaming option to Calls For Funds
3) Added configurable maximum match amount to quadratic funding mechanism
4) Deployed to Polygon to run an invite-only, real-money round 🙌🙌🙌🙌

### Technologies used
- **Ethereum** =)
- **Next.js**
- **The Graph** — we expanded our subgraph to listen for DAI events and to include a video property on Calls For Funds, and deployed to both Polygon Mumbai and Polygon Mainnet
- **IPFS/Filecoin** — we heavily used nft.storage, both for storing crowd-commission NFT data/metadata and for minting smart-art NFT data/metadata; also hosting static assets
- **Chainlink** — we used Chainlink VRF v2 to give one Call For Fund a bonus 0.1 ETH (updated from initially using v1 =)
- **Superfluid** — we updated our Continuous Flow Agreement to use DAI instead of ETH, and deployed to both Polygon Mumbai and Polygon Mainnet
- **Livepeer** — we implemented 60 second videos for Creators to enhance their pitch in their Call For Funds; next up would be minting this as a Polygon video NFT, so that perhaps it could be offered to the top contributor, or similar incentive mechanic for crowdfunding
- **Polygon** — we switched our deployment from Ethereum Rinkeby to Polygon Mumbai and Polygon Mainnet, in order to offer Creators a very low transaction cost UX for crowdfunding
- **OpenSea** — we did a lot of testing and iteration using testnets.opensea.com to ensure data/metadata looks clean
- **Rarible** — we did a lot of testing and iteration using rinkeby.rarible.com to ensure data/metadata looks clean
- **MetaMask** — we recorded Creator onboarding videos show simple and clear MM usage for funding wallet, confirming a tx, contributing to a Call For Funds, open a money stream, and minting an NFT
- **UnstoppableDomains** — we began prototyping extended support beyond ENS for other Crypto TLDs, something which in our user discovery the Creators said they would like to have a choice of!
- Slice.so

## Team
- [neodaoist](https://github.com/neodaoist/)
- [plaird523](https://github.com/plaird523)
- [nickadamson](https://github.com/nickadamson)
- [Just John](https://github.com/dlsso)

## 🌴🌱🌲 Join us at LOUDVΞRSΞ and help artists ship creative work! 💚🌿🍀 
