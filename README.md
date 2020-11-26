# Her message
A decentralized chat application

## Member
Time Yongyai              6030285121\
Phum Lertritmahachai      6030462921\
Jaturit Panpoonsup        6031007221\
Purinut Thedwichienchai   6031046721

## Installation
Run yarn install first.
```bash
yarn install
```

After that, install Metamask extension in your browser.\
https://metamask.io/download.html \
\
Run truffle dev in project root to start truffle development server.
```bash
truffle dev
```

Register an account from the truffle development server to Metamask by login to Metamask, then click the top right icon and select "Import Account".\
\
When you finish registering, create a new network by clicking on network dropdown menu, then select "Custom RPC". Type the following:\
Network name: Anything\
New RPC Url: Your truffle network url  (http://127.0.0.1:xxxx) \
Chain ID: Type some random hex number first (e.g. 0x1234) and it will tell you an available chain ID in the network. Type that chain ID instead.\
\
After finish creating the custom RPC, connect to that network.\
\
Now run yarn dev to start the frontend server.
```bash
yarn dev
```
Navigate to localhost:3000 to use the application.

## Usage
If everything runs correctly, you should see a popup window telling you that you are not register. Type in your public key.\
\
After that, you will be able to use the home page. Click "Add Contract" to add an account that you want to send message to. Type in their public key.\
\
For demo purpose, you will only be able to communicate with the first contract you added to your account.\
\
You can then type anything and send it to your first contract in the list.

## Debugging
The application looks like it cannot load the Metamask account
- Try redeploy your contract in truffle, then reload the page 2-3 times. (This will create a new contract and your past action (e.g. register, send message) will be reset.
```bash
truffle deploy --reset
```
All transactions are failed.
- Try resetting your Metamask account by open Metamask, click top right icon, click "Setting" > "Advanced", click "Reset Account", then reload the page 2-3 times.
