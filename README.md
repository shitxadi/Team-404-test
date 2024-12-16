<img src="https://i.imgur.com/wRUV5Sp.jpeg" alt="banner" width="100%">

<h1 align="center"><img src="./dashboard/images/logo-non-bg.png" width="22px"> Queen Bot V2 - Chat Messenger Bot</h1>

<p align="center">
    <a href="https://nodejs.org/dist/v20.0.0">
        <img src="https://img.shields.io/badge/Nodejs%20Support-20.x-brightgreen.svg?style=flat-square" alt="Nodejs Support v20.x">
    </a>
    <img alt="size" src="https://img.shields.io/github/repo-size/ItzPriyanshi/QueenBotV2.svg?style=flat-square&label=size">
    <img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=code%20version&prefix=v&query=%24.version&url=https://github.com/ItzPriyanshi/QueenBotV2/raw/main/package.json&style=flat-square">
    <img alt="visitors" src="https://visitor-badge.laobi.icu/badge?style=flat-square&page_id=ItzPriyanshi.QueenBotV2">
    <img alt="license" src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=brightgreen">
</p>

---

## Table of Contents
- [📝 Note](#-note)
- [🚧 Requirement](#-requirement)
- [📝 Tutorial](#-tutorial)
- [💡 How it Works](#-how-it-works)
- [🔔 Notifications for Updates](#-how-to-get-notification-when-have-new-update)
- [🆙 How to Update](#-how-to-update)
- [🛠️ Creating New Commands](#️-how-to-create-new-commands)
- [💭 Support](#-support)
- [📚 Supported Languages](#-support-languages-in-source-code)
- [📌 Common Problems](#-common-problems)
- [❌ DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION](#-do-not-use-the-original-undergraduate-version)
- [📸 Screenshots](#-screenshots)
- [✨ Copyright (C)](#-copyright-c)
- [📜 License](#-license)

---

## FCA Fixed By Priyansh Rajput 
This version includes fixes by Priyansh Rajput to the FCA (Facebook Chat API) implementation.

### Key Modifications
- Updated files:
  - `bot/login/login.js`
  - `package.json`
  - `package-lock.json`

## Credits
- The Fixed Version Of GoatBot By Priyansh Rajput [here](https://github.com/Priyansh-11/Goat-Bot-V2-Fix)
- You Can Follow [Priyansh Rajput](https://github.com/Priyansh-11)
- Show Some Support For His Efforts ⭐

### Recommendations 
- Leave `account.dev.txt` blank and put your cookies in `account.txt`. 
- Don't put your cookies inside `account.dev.txt`—that's only for configuration.

## 📝 Note
- This is a messenger chat bot using a personal account, utilizing an [unofficial API](https://github.com/ItzPriyanshi/fb-chat-api/blob/master/DOCS.md) ([Origin here](https://github.com/Schmavery/facebook-chat-api)). This may lead to your Facebook account being locked due to spam or other reasons. 
- It is recommended to use a clone account (one that you're willing to discard at any time).
- ***I am not responsible for any problems that may arise from using this bot.***

## 🚧 Requirement
- Node.js 20.x [Download](https://nodejs.org/dist/v20.0.0) | [Home](https://nodejs.org/en/download/) | [Other versions](https://nodejs.org/en/download/releases/)
- Basic knowledge of **programming**, JavaScript, Node.js, and unofficial Facebook API.

## 📝 Tutorial
Tutorials are available on YouTube:
- For mobile: [Watch here](https://www.youtube.com/watch?v=grVeZ76HlgA)
- For VPS/Windows: [Watch here](https://www.youtube.com/watch?v=uCbSYNQNEwY)

Summary instructions can be found [here](https://github.com/ItzPriyanshi/QueenBotV2/blob/main/STEP_INSTALL.md).

## 💡 How it Works
- The bot uses the unofficial Facebook API to send and receive messages from users.
- When a `new event` occurs (such as a message, reaction, new user joining, or user leaving the chat), the bot emits an event to the `handlerEvents`.
- The `handlerEvents` processes the event and executes the corresponding command:

  - **onStart**:
    - Checks if the user has called a command.
    - If yes, it verifies if the user is banned or if the `admin box only` mode is enabled. If not, it executes the command.
    - Checks the user's permissions and whether the command's cooldown has expired before executing it.

  - **onChat**:
    - Triggered when the user sends a message.
    - Checks the user's permissions and executes the command if allowed.

  - **onFirstChat**:
    - Triggered when the bot receives the first message from the chat since it started.
    - Functions similarly to `onChat`.

  - **onReaction**:
    - Triggered when a user reacts to a message with a specific message ID.
    - Automatically adds a method to delete the message from the set if called.

  - **onReply**:
    - Triggered when a user replies to a message with a specific message ID.
    - Similar to `onReaction`, it checks permissions and executes the command if allowed.

  - **onEvent**:
    - Triggered for new events (e.g., user joins/leaves, admin changes).
    - Loops through all `onEvent` commands and executes them based on the `commandName`.

  - **handlerEvent**:
    - Runs when a new event occurs and processes all event commands set in `GoatBot.eventCommands`.

## 🔔 Notifications for Updates
- Click on the `Watch` button in the upper right corner of the screen, select `Custom`, and choose `Pull requests` and `Releases`. Click `Apply` to get notified of new updates.

## 🆙 How to Update
Tutorials are available on YouTube:
- On phone/repl: [Watch here](https://youtu.be/grVeZ76HlgA?t=1342)
- On VPS/computer: [Watch here](https://youtu.be/uCbSYNQNEwY?t=508)

## 🛠️ Creating New Commands
- Instructions for creating new commands can be found [here](https://github.com/PriyanshiKaurJi/Goat-Bot-V2/blob/main/DOCS.md).

## 💭 Support
If you encounter major coding issues with this bot, please join and ask for help:
- [Discord Support](https://discord.com/invite/DbyGwmkpVY) (recommended)
- [Facebook Group](https://www.facebook.com/groups/goatbot)
- [Messenger Support](https://m.me/j/Abbq0B-nmkGJUl2C)
- ~~[Telegram Support](https://t.me/gatbottt)~~ (no longer supported)
- ***Please do not inbox me; I do not respond to private messages. Any questions should be directed to the chat group for answers. Thank you!***

## 📚 Supported Languages
- Currently, the bot supports 2 languages:
  - [x] `en: English`
  - [x] `vi: Vietnamese`

- Change the language in the `config.json` file.
- You can customize the language in the folders `languages/`, `languages/cmds/`, and `languages/events/`.

## 📌 Common Problems
<details>
    <summary>📌 Error 400: redirect_uri_mismatch</summary>
    <p><img src="https://i.ibb.co/6Fbjd4r/image.png" width="250px"></p> 
    <p>1. Enable Google Drive API: <a href="https://youtu.be/nTIT8OQeRnY?t=347">Tutorial</a></p>
    <p>2. Add URI <a href="https://developers.google.com/oauthplayground">https://developers.google.com/oauthplayground</a> (not <a href="https://developers.google.com/oauthplayground/">https://developers.google.com/oauthplayground/</a>) to <b>Authorized redirect URIs</b> in <b>OAuth consent screen:</b> <a href="https://youtu.be/nTIT8OQeRnY?t=491">Tutorial</a></p>  
    <p>3. Choose <b>https://www.googleapis.com/auth/drive</b> and <b>https://mail.google.com/</b> in <b>OAuth 2.0 Playground</b>: <a href="https://youtu.be/nTIT8OQeRn