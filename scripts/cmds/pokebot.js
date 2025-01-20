const fs = require("fs");

// Path to the database file
const dbPath = "pokedb.json";

// Ensure `pokedb.json` exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({}));
}

// Track active Pokémon and spawn timers for each thread
let activePokemon = {};
let spawnTimers = {};

module.exports = {
  config: {
    name: "pokebot",
    version: "1.0",
    author: "SUDIP",
    countDown: 1,
    role: 0,
    shortDescription: "Enable/disable Pokémon bot",
    longDescription: "A bot that spawns Pokémon every 40 minutes or after a Pokémon is claimed.",
    category: "entertainment",
    guide: "{pn} [on/off]",
  },

  // When the bot starts
  onStart: async function ({ message, event, threadsData, args }) {
    const pokedb = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const threadID = event.threadID;
    let pokebot = await threadsData.get(threadID, "settings.pokebot");

    // Initialize bot settings if undefined
    if (pokebot === undefined) {
      await threadsData.set(threadID, true, "settings.pokebot");
    }

    // Enable/disable the bot
    if (!["on", "off"].includes(args[0])) {
      return message.reply("Please use 'on' or 'off' to control the bot.");
    }
    await threadsData.set(threadID, args[0] === "on", "settings.pokebot");

    if (args[0] === "on") {
      // Initialize thread in database if not already present
      if (!pokedb.hasOwnProperty(threadID)) {
        pokedb[threadID] = { taken: [], usdata: {} };
        fs.writeFileSync(dbPath, JSON.stringify(pokedb));
      }

      // Start the spawn timer for this thread
      if (!spawnTimers[threadID]) {
        this.startPokemonTimer(threadID, message);
      }

      return message.reply("Pokémon bot is now enabled!");
    } else {
      // Clear the spawn timer and reset active Pokémon
      clearTimeout(spawnTimers[threadID]);
      delete spawnTimers[threadID];
      delete activePokemon[threadID];
      return message.reply("Pokémon bot is now disabled!");
    }
  },

  // Start the Pokémon spawn timer
  startPokemonTimer: function (threadID, message) {
    const interval = 4 * 60 * 1000; // 40 minutes in milliseconds

    // Clear any existing timer
    clearTimeout(spawnTimers[threadID]);

    // Set a timer for spawning a Pokémon
    spawnTimers[threadID] = setTimeout(async () => {
      const pokos = [
        { name: "abra", image: "https://i.ibb.co/yyB2S6z/abra.png" },
        { name: "absol", image: "https://i.ibb.co/Vp6k3dm/absol.png" },
        { name: "accelgor", image: "https://i.ibb.co/4PjXB1d/accelgor.png" },
        { name: "aegislash-shield", image: "https://i.ibb.co/tYQdfbM/aegislash-shield.png" },
      ];

      const randomPokemon = pokos[Math.floor(Math.random() * pokos.length)];

      // Announce the Pokémon spawn
      const form = {
        body: `A wild Pokémon appeared! Add them to your Pokémon collection by replying Pokémon name!`,
        attachment: await global.utils.getStreamFromURL(randomPokemon.image),
      };

      message.send(form, (err, info) => {
        // Save reply listener for catching Pokémon
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "pokebot",
          mid: info.messageID,
          name: randomPokemon.name,
          threadID,
        });

        // Mark Pokémon as active for this thread
        activePokemon[threadID] = true;
      });
    }, interval);
  },

  // Handle Pokémon catch replies
  onReply: async function ({ event, Reply, message }) {
    if (event.body.toLowerCase() === Reply.name) {
      const pokedb = JSON.parse(fs.readFileSync(dbPath, "utf8"));
      const threadID = event.threadID;
      const userID = event.senderID;

      // Add Pokémon to the user's collection
      if (!pokedb[threadID].usdata[userID]) {
        pokedb[threadID].usdata[userID] = [];
      }
      pokedb[threadID].usdata[userID].push(Reply.name);

      // Save database
      fs.writeFileSync(dbPath, JSON.stringify(pokedb));

      message.reply(`Congratulations! You caught ${Reply.name.toUpperCase()}!`);
      message.unsend(Reply.mid);

      // Clear the active Pokémon flag
      activePokemon[threadID] = false;

      // Restart the spawn timer for the next Pokémon
      this.startPokemonTimer(threadID, message);
    } else {
      message.reply("Wrong name! Try again!");
    }
  },
};
