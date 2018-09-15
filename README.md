# Chat-Heads
Facebook Messenger chat heads recreated for Desktop

Creates an overlay of the person you’re chatting with that you can click any time to open up the
full Messenger app to send a message

Overlay displays an indicator with a preview of the message when you receive a new message

Drag around the chat head anywhere you want on your screen

Chat head always stays on top of your windows (except when in full screen applications)

![Index](https://github.com/brnlee/ChatHeads/blob/master/assets/screenshots/Index.PNG?raw=true "Chat")

![ChatHead](https://github.com/brnlee/ChatHeads/blob/master/assets/screenshots/MessagePreview.PNG?raw=true "Chat head with message preview")

## Usage

Right click on the profile picture of the person you want to make a chat head of and click "Create Chathead" in the context menu

Close chat head overlay by right click and clicking "close"

Left click chat head overlay to open and close the Messenger app to send or read messages

The Messenger application is minimized to the task tray when closed via the chat head overlay and can be opened again by clicking the task tray icon
### Prerequisites

This application requires the installation of the following packages

```
npm install electron --save-dev --save-exact
npm install electron-context-menu
```
## Notice

This application does not store any information including account credentials and messages. This application uses Messenger.com to get your chat.
## Built With

* [Electron](https://electronjs.org/) - JavaScript framework used to build desktop applications
* [Electron Context Menu](https://github.com/sindresorhus/electron-context-menu#readme) - Extensible context menu for Electron

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details