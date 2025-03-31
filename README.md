# Smart Fingerprint

**Smart Fingerprint** is a decentralized blockchain-based education platform that enables a secure and transparent way to manage educational courses. The platform allows users to interact with the blockchain to list and purchase courses, while utilizing smart contracts for secure transactions and authentication.

![Smart Fingerprint](https://user-images.githubusercontent.com/83820363/223975924-b234e1a7-1b4d-474b-baae-0639b6c0f829.png)

## Project Architecture

### 1. Front-End Development
The front-end provides the user interface to interact with the blockchain and smart contracts. Key technologies used include:
- **HTML/CSS**: Used to structure and style the web pages.
- **React.js** and **Next.js**: Used to build a dynamic, user-friendly web application with server-side rendering and efficient state management.
- **JavaScript/TypeScript**: Used for interacting with the blockchain and integrating with the Ethereum network.

### 2. Smart Contract Development
The smart contract forms the core of the platform, ensuring that all transactions (like listing or purchasing courses) are secure and transparent:
- **Deployment on Ganache**: The smart contract is initially deployed and tested on the Ganache local blockchain.
- **Immutability**: Once deployed on the blockchain, the smart contract cannot be altered, ensuring a transparent and trustworthy system.

### 3. Middleware Integration with Web3.js
To communicate between the front-end and the blockchain, the following tools are integrated:
- **Web3.js Library**: Facilitates interaction between the front-end application and the blockchain.
- **Metamask**: A browser extension that allows users to connect to the Ethereum network and interact with the smart contract.
- **Ganache**: Used initially for local development and testing of the smart contract.

## Installation and Setup

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed (download from [nodejs.org](https://nodejs.org/)).
2. **Ganache**: Install Ganache for local blockchain development and testing (download from [trufflesuite.com](https://www.trufflesuite.com/ganache)).
3. **MetaMask**: Install the MetaMask browser extension to interact with the blockchain.

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/smart-fingerprint.git
   cd smart-fingerprint

2. Install dependencies:
    ```bash
    npm install

3. Set up and run Ganache on your local machine.

4. Deploy the smart contract to Ganache (ensure Ganache is running):
    ```bash
    truffle migrate --network development

5. Start the front-end application:
    ```bash
    npm run dev

6. Open your browser and navigate to `http://localhost:3000/` to view the application.
7. Connect MetaMask to your local Ganache network to interact with the blockchain.
8. You can now list and purchase courses on the Smart Fingerprint platform!

## Screenshots
1. Courses Marketplace Page:

Browse and interact with the available educational courses.
![Capture d’écran ](https://github.com/ChaimaaNairi/Smart_fingerPrint/assets/83820363/df67a850-6165-4c08-a09a-ba0cabda3d57)

2. Selecting the Correct Network:

Ensure that MetaMask is connected to the correct network to facilitate transactions.
![Capture d’écran ](https://github.com/ChaimaaNairi/Smart_fingerPrint/assets/83820363/4e57463a-25e3-454c-a57e-95bd483cc5d8)
![image](https://github.com/ChaimaaNairi/Smart_fingerPrint/assets/83820363/c0bb6cdf-df28-4986-8448-ced80742bbf0)

3. Ganache:

View the transactions on the Ganache local blockchain.
![Capture d’écran ](https://github.com/ChaimaaNairi/Smart_fingerPrint/assets/83820363/39991e5e-d808-464f-92d9-2ee41ce3501e)

## Conclusion
The Smart Fingerprint platform provides a secure and transparent blockchain-based education marketplace. By leveraging Ethereum, smart contracts, and Web3.js, the platform ensures that users can interact with the blockchain in a safe and intuitive way. With the ability to list and purchase courses, this decentralized application opens up new possibilities for online education.

