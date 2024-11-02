# Block Explorer

This project is a custom blockchain explorer built with React, Ethers.js, and Hardhat. It allows users to explore blockchain data and interact with smart contracts on a local Hardhat node.

## Features

- View blockchain data, including blocks, transactions, and addresses
- Interact with smart contracts using Ethers.js
- Integrated Hardhat node for local testing and development
- Optimized with IndexedDB for efficient data storage
- Responsive UI built with Ant Design and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hardhat (development environment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shaivpidadi/block-explorer
   cd block-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Run this command to start React project

```bash
npm run start
```

This explorer is designed to work with a local Hardhat node Make sure to run `npx hardhat node` inside your hardhat project.

- Start Hardhat node:

  ```bash
  npx hardhat node
  ```

## Configuration

The application uses environment variables to manage settings. Add a `.env` file with the following variables as needed:

```env
REACT_APP_PROVIDER='http://localhost:8545'
REACT_APP_WS_PROVIDER='ws://localhost:8545'
```

## Dependencies

- React
- Ethers.js
- Tailwind CSS
- Hardhat

<div align="center">
  <sub>Created by <a href="https://github.com/Shaivpidadi">Shaishav Pidadi</a>.</sub>
</div>
