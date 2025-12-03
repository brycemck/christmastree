# christmastree
creates a christmas tree client with a handler for adding new ornaments to the tree via a route

## Setup instructions
1. clone/download these files to a folder on your computer
2. download NVM for your device (https://www.nvmnode.com/guide/download.html)
3. in a terminal/powershell, navigate to the newly-downloaded directory
`cd C:\path\to\christmastree`
4. run the command `nvm install 24.11.1`, and then `nvm use 24.11.1`
5. run the command `node server.js` (or, double-click the launch.bat file in the directory)
6. add a Browser Overlay to your OBS, and use 'http://localhost:3153' as the URL (do NOT check 'Local File'). set the dimensions to width 800, height 1100.
7. use alt-click cropping to crop the browser overlay to the edges of the tree, and then drag the corners to resize it as necessary
8. in your Firebot effects for adding an ornament (chat command effect), use the 'HTTP Request' effect, set the method to 'GET', and use 'http://localhost:3153/addOrnament' as the URL.