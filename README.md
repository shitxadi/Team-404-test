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

## 📌 **Common Problems**
<details>
	<summary>
		📌 Error 400: redirect_uri_mismatch
	</summary>
	<p><img src="https://i.ibb.co/6Fbjd4r/image.png" width="250px"></p> 
	<p>1. Enable Google Drive API: <a href="https://youtu.be/nTIT8OQeRnY?t=347">Tutorial</a></p>
	<p>2. Add uri <a href="https://developers.google.com/oauthplayground">https://developers.google.com/oauthplayground</a> (not <a href="https://developers.google.com/oauthplayground/">https://developers.google.com/oauthplayground/</a>) to <b>Authorized redirect URIs</b> in <b>OAuth consent screen:</b> <a href="https://youtu.be/nTIT8OQeRnY?t=491">Tutorial</a></p>  
	<p>3. Choose <b>https://www.googleapis.com/auth/drive</b> and <b>https://mail.google.com/</b> in <b>OAuth 2.0 Playground</b>: <a href="https://youtu.be/nTIT8OQeRnY?t=600">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 Error for site owners: Invalid domain for site key
	</summary>
		<p><img src="https://i.ibb.co/2gZttY7/image.png" width="250px"></p>
		<p>1. Go to <a href="https://www.google.com/recaptcha/admin">https://www.google.com/recaptcha/admin</a></p>
		<p>2. Add domain <b>repl.co</b> (not <b>repl.com</b>) to <b>Domains</b> in <b>reCAPTCHA v2</b> <a href="https://youtu.be/nTIT8OQeRnY?t=698">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_grant, unauthorized_client 
	</summary>
		<p><img src="https://i.ibb.co/n7w9TkH/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/XFKKY9c/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/f4mc5Dp/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console, the refresh token will expire after 1 week and you need to get it back. <a href="https://youtu.be/nTIT8OQeRnY?t=445">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_client
	</summary>
		<p><img src="https://i.ibb.co/st3W6v4/Pics-Art-01-01-09-10-49.jpg" width="250px"></p>
		<p>- Check if you have entered your google project client_id correctly <a href="https://youtu.be/nTIT8OQeRnY?t=509">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 Error 403: access_denied
	</summary>
		<p><img src="https://i.ibb.co/dtrw5x3/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console only the approved accounts added to the project can use it <a href="https://youtu.be/nTIT8OQeRnY?t=438">Tuatorial</a></p>
</details>

## ❌ **DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION**
- The use of unknown source code can lead to the device being infected with viruses, malware, hacked social accounts, banks, ...
- Goat-Bot-V2 is only published at https://github.com/ntkhang03/Goat-Bot-V2, all other sources, all forks from other github, replit,... are fake, violate policy
- If you use from other sources (whether accidentally or intentionally) it means that you are in violation and will be banned without notice
## 📸 **Screenshots**
- ### Bot
<details>
	<summary>
 		Rank system
	</summary>

  - Rank card:
  <p><img src="https://i.ibb.co/d0JDJxF/rank.png" width="399px"></p>

  - Rankup notification:
  <p><img src="https://i.ibb.co/WgZzthH/rankup.png" width="399px"></p>

  - Custom rank card:
  <p><img src="https://i.ibb.co/hLTThLW/customrankcard.png" width="399px"></p>
</details>

<details>
	<summary>
 		Weather
	</summary>
	<p><img src="https://i.ibb.co/2FwWVLv/weather.png" width="399px"></p>
</details>

<details>
	<summary>
 		Auto send notification when have user join or leave box chat (you can custom message)
	</summary>
	<p><img src="https://i.ibb.co/Jsb5Jxf/wcgb.png" width="399px"></p>
</details>

<details>
	<summary>
 		Openjourney
	</summary>
	<p><img src="https://i.ibb.co/XJfwj1X/Screenshot-2023-05-09-22-43-58-630-com-facebook-orca.jpg" width="399px"></p>
</details>

<details>
	<summary>
 		GPT
	</summary>
	<p><img src="https://i.ibb.co/D4wRbM3/Screenshot-2023-05-09-22-47-48-037-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/z8HqPkH/Screenshot-2023-05-09-22-47-53-737-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/19mZQpR/Screenshot-2023-05-09-22-48-02-516-com-facebook-orca.jpg" width="399px"></p>
</details>



- ### Dashboard
<details>
	<summary>
 		Home:
	</summary>
	<p><img src="https://i.postimg.cc/GtwP4Cqm/Screenshot-2023-12-23-105357.png" width="399px"></p>
	<p><img src="https://i.postimg.cc/MTjbZT0L/Screenshot-2023-12-23-105554.png" width="399px"></p>
</details>

<details>
	<summary>
 		Stats:
	</summary>
	<p><img src="https://i.postimg.cc/QtXt98B7/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Login/Register:
	</summary>
	<p><img src="https://i.postimg.cc/Jh05gKsM/Screenshot-2023-12-23-105743.png" width="399px"></p>
	<p><img src="https://i.postimg.cc/j5nM9K8m/Screenshot-2023-12-23-105748.png" width="399px"></p>
</details>

<details>
	<summary>
 		Dashboard Thread:
	</summary>
	<p><img src="https://i.postimg.cc/RF237v1Z/Screenshot-2023-12-23-105913.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom on/off:
	</summary>
	<p><img src="https://i.ibb.co/McDRhmX/image.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom welcome message (similar with leave, rankup (coming soon), custom command (coming soon))
	</summary>
	<p><img src="https://i.ibb.co/6ZrQqc1/image.png" width="399px"></p>
	<p><img src="https://i.ibb.co/G53JsXm/image.png" width="399px"></p>
</details>

## ✨ **Copyright (C)**
- **[NTKhang (NTKhang03)](https://github.com/ntkhang03)**

## 📜 **License**

**VIETNAMESE**

- ***Nếu bạn vi phạm bất kỳ quy tắc nào, bạn sẽ bị cấm sử dụng dự án của tôi***
- Không bán mã nguồn của tôi
- Không tự xưng là chủ sở hữu của mã nguồn của tôi
- Không kiếm tiền từ mã nguồn của tôi (chẳng hạn như: mua bán lệnh, mua bán/cho thuê bot, kêu gọi quyên góp, v.v.)
- Không xóa/sửa đổi credit (tên tác giả) trong mã nguồn của tôi

**ENGLISH**

- ***If you violate any rules, you will be banned from using my project***
- Don't sell my source code
- Don't claim my source code as your own
- Do not monetize my source code (such as: buy and sell commands, buy and sell bots, call for donations, etc.)
- Don't remove/edit my credits (author name) in my source code
