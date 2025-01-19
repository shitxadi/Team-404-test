const fs = require("fs");
const path = "pokedb.json";

if (!fs.existsSync(path)) {
  // If the file doesn't exist, create it with an empty JSON object
  fs.writeFileSync(path, JSON.stringify({}));
}

module.exports = {
  config: {
    name: "pokebot",
    version: "1.0",
    author: "NIB",
    countDown: 1,
    role: 0,
    shortDescription: "Enable/disable Pokemon bot",
    longDescription: "",
    category: "harem kings",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5,
    },
  },
  onStart: async function ({ message, event, threadsData, args }) {
    const pokedb = JSON.parse(fs.readFileSync(path, "utf8"));
    let pokebot = await threadsData.get(event.threadID, "settings.pokebot");

    if (pokebot === undefined) {
      await threadsData.set(event.threadID, true, "settings.pokebot");
    }

    if (!["on", "off"].includes(args[0])) {
      return message.reply("on or off");
    }

    await threadsData.set(event.threadID, args[0] === "on", "settings.pokebot");

    if (args[0] === "on") {
      if (!pokedb.hasOwnProperty(event.threadID)) {
        pokedb[event.threadID] = { taken: [], usdata: {} };
        fs.writeFileSync(path, JSON.stringify(pokedb));
      }
    }

    return message.reply(`Is already ${args[0] === "on" ? "turned on" : "turned off"}`);
  },
};
