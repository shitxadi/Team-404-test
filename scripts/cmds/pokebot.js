const fs = require("fs");

// Path to the database file
const dbPath = "pokedb.json";

// Ensure `pokedb.json` exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({}));
}

// Main script
module.exports = {
  config: {
    name: "pokebot",
    version: "1.0",
    author: "NIB",
    countDown: 1,
    role: 0,
    shortDescription: "Enable/disable Pokémon bot",
    longDescription: "A bot that spawns Pokémon after a set number of messages.",
    category: "entertainment",
    guide: "{pn} [on/off]",
  },

  // When the bot starts
  onStart: async function ({ message, event, threadsData, args }) {
    const pokedb = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    let pokebot = await threadsData.get(event.threadID, "settings.pokebot");

    // Initialize bot settings if undefined
    if (pokebot === undefined) {
      await threadsData.set(event.threadID, true, "settings.pokebot");
    }

    // Enable/disable the bot
    if (!["on", "off"].includes(args[0])) {
      return message.reply("Please use 'on' or 'off' to control the bot.");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.pokebot");

    // Initialize thread in database if enabled
    if (args[0] === "on" && !pokedb.hasOwnProperty(event.threadID)) {
      pokedb[event.threadID] = { taken: [], usdata: {} };
      fs.writeFileSync(dbPath, JSON.stringify(pokedb));
    }

    return message.reply(
      `Pokémon bot is now ${args[0] === "on" ? "enabled" : "disabled"}!`
    );
  },

  // Message handler to track messages and spawn Pokémon
  onChat: async function ({ event, message, threadsData }) {
    const pokedb = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const pokebot = await threadsData.get(event.threadID, "settings.pokebot");

    // If the bot is disabled for the thread, exit
    if (!pokebot) return;

    // Initialize message count if not set
    if (!global.poke) global.poke = {};
    if (!global.poke[event.threadID]) global.poke[event.threadID] = 0;

    // Increment message count
    global.poke[event.threadID]++;

    // Set message count required for spawn
    const spawnThreshold = 20; // Change this value if needed

    // Check if it's time to spawn a Pokémon
    if (global.poke[event.threadID] >= spawnThreshold) {
      // Reset message count
      global.poke[event.threadID] = 0;

      // Spawn a random Pokémon
      const pokos = [
        { name: "abra", image: "https://i.ibb.co/yyB2S6z/abra.png" },
        { name: "absol", image: "https://i.ibb.co/Vp6k3dm/absol.png" },
        { name: "accelgor", image: "https://i.ibb.co/4PjXB1d/accelgor.png" },
        { name: "aegislash-shield", image: "https://i.ibb.co/tYQdfbM/aegislash-shield.png" },
      ];

      const randomPokemon = pokos[Math.floor(Math.random() * pokos.length)];

      // Announce the Pokémon spawn
      const form = {
        body: `A wild Pokémon appeared: ${randomPokemon.name.toUpperCase()}! Reply with its name to catch it!`,
        attachment: await global.utils.getStreamFromURL(randomPokemon.image),
      };

      message.send(form, (err, info) => {
        // Save reply listener for catching Pokémon
        global.GoatBot.onReply.set(info.messageID, {
          commandName: "pokebot",
          mid: info.messageID,
          name: randomPokemon.name,
        });
      });
    }
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
    } else {
      message.reply("Wrong name! Try again!");
    }
  },
};
