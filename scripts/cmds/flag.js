const axios = require('axios');

module.exports = {
  config: {
    name: "flag",
    aliases: ['flag'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 30,
    role: 0,
    shortDescription: {
      en: "Guess the country"
    },
    longDescription: {
      en: "Guess the country name by its flag"
    },
    category: "game",
    guide: {
      en: "{pn}"
    },
  },

  onReply: async function ({ args, event, api, Reply, commandName, usersData }) {
    if (event.senderID !== Reply.author) return;
    const { country, nameUser } = Reply;
    const userReply = event.body.toLowerCase();

    if (userReply === country.toLowerCase()) {
      try {
        const rewardCoins = 250;
        const rewardExp = 170;
        const senderID = event.senderID;
        const userData = await usersData.get(senderID);
        await usersData.set(senderID, {
          money: userData.money + rewardCoins,
          exp: userData.exp + rewardExp,
          data: userData.data
        });

        const msg = {
          body: `✔️ ${nameUser}, You've answered correctly!\nAnswer: ${country}\n\nYou've received ${rewardCoins} coins and ${rewardExp} exp as a reward!`
        };
        api.unsendMessage(Reply.messageID);
        api.sendMessage(msg, event.threadID, event.messageID);
      } catch (error) {
        console.error("Error processing correct answer:", error);
      }
    } else {
      api.unsendMessage(Reply.messageID);
      api.sendMessage(`${nameUser}, The answer is wrong! The correct answer is: ${country}`, event.threadID);
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID } = event;
    const timeout = 60;

    try {
      // Fetch random country data
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countries = response.data;
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const countryName = randomCountry.name.common;
      const flagLink = randomCountry.flags.png;

      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: "What's the name of the country shown in the flag picture?",
        attachment: await global.utils.getStreamFromURL(flagLink)
      };

      api.sendMessage(msg, threadID, (error, info) => {
        if (error) {
          console.error("Error sending message:", error);
          return;
        }

        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          country: countryName,
          nameUser: namePlayerReact
        });

        setTimeout(() => {
          api.unsendMessage(info.messageID).catch(console.error);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }
};
