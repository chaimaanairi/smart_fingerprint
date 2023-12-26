# Smart Fingerprint

<h3> Project of design course - Tasarim dersi Projesi </h3>

Main page

![1-mainPage](https://user-images.githubusercontent.com/83820363/223975924-b234e1a7-1b4d-474b-baae-0639b6c0f829.png)


<h2> Project Architecture Overview</h2>
<h3> 1. Front-End Development</h3>
The front-end component of the project plays a crucial role in providing a user-friendly interface and facilitating interactions with the blockchain. Key technologies utilized include:

HTML: Responsible for defining the structure of the web pages.
<b>CSS:</b>Employed for designing and styling the user interface.
JavaScript and TypeScript: Used for interacting with the blockchain, connecting to the wallet, and displaying dynamic data to users.
React.js and Next.js: Frameworks chosen to enhance the efficiency and maintainability of the front-end application.
Node JS and NPM Packages: Leveraged on the server side for running NodeJS, installing dependencies, and utilizing tools tailored for blockchain development.

<h3> 2. Smart Contract Development</h3>
The smart contract forms the core logic of the decentralized application (DApp). It is essential to note that smart contracts are immutable once deployed on the blockchain. The development process involves:

Deployment on Ganache: Initial testing and interaction with the smart contract occur on the Ganache local blockchain.
Immutability: Smart contracts are programmed to run seamlessly on the blockchain, and changes to their code post-deployment are not possible.

<h3> 3. Middleware Integration with Web3.js</h3>
To establish a seamless connection between the front end and the smart contract, a middleware is employed, with the Web3.js library being the key component. The integration process encompasses:

Web3.js Library: Facilitates communication between the front-end application and the Metamask wallet.
Metamask: Browser extension wallet installation is necessary for direct connections to the blockchain. It acts as an intermediary between the smart contract and the front-end application.
Ganache: Initially utilized as the local blockchain for development and testing purposes. The application will eventually be deployed on the appropriate underlying blockchain.
Workflow Overview
Front-end Development: Utilizing HTML, CSS, JavaScript, and TypeScript along with React.js and Next.js frameworks.
Smart Contract Deployment: Initial deployment on Ganache for testing and development purposes.
Metamask Installation: Users install Metamask as a browser extension to establish a secure connection with the blockchain.
Web3.js Middleware: Integration of Web3.js as a middleware to ensure seamless communication between the front-end and the blockchain.
Blockchain Interaction: Users interact with the decentralized application through the Metamask wallet, connecting to the blockchain.
By incorporating these three interconnected components, the project aims to deliver a robust and decentralized solution, combining a user-friendly interface with secure and immutable smart contract execution on the blockchain.
