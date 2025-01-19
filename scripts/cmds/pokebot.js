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
    author: "NIB",
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
    const interval = 40 * 60 * 1000; // 40 minutes in milliseconds

    // Clear any existing timer
    clearTimeout(spawnTimers[threadID]);

    // Set a timer for spawning a Pokémon
    spawnTimers[threadID] = setTimeout(async () => {
      const pokos = [
  {
    "name": "abra",
    "image": "https://i.ibb.co/yyB2S6z/abra.png"
  },
  {
    "name": "absol",
    "image": "https://i.ibb.co/Vp6k3dm/absol.png"
  },
  {
    "name": "accelgor",
    "image": "https://i.ibb.co/4PjXB1d/accelgor.png"
  },
  {
    "name": "aegislash-shield",
    "image": "https://i.ibb.co/tYQdfbM/aegislash-shield.png"
  },
  {
    "name": "aerodactyl",
    "image": "https://i.ibb.co/Lx4j9Vc/aerodactyl.png"
  },
  {
    "name": "aggron",
    "image": "https://i.ibb.co/XzMKRfX/aggron.png"
  },
  {
    "name": "aipom",
    "image": "https://i.ibb.co/GdszJ6V/aipom.png"
  },
  {
    "name": "alakazam",
    "image": "https://i.ibb.co/ZLbCmXV/alakazam.png"
  },
  {
    "name": "alcremie",
    "image": "https://i.ibb.co/ZdfpQvp/alcremie.png"
  },
  {
    "name": "alomomola",
    "image": "https://i.ibb.co/6rPSQ9d/alomomola.png"
  },
  {
    "name": "altaria",
    "image": "https://i.ibb.co/kqszVYs/altaria.png"
  },
  {
    "name": "amaura",
    "image": "https://i.ibb.co/4dnQk6g/amaura.png"
  },
  {
    "name": "ambipom",
    "image": "https://i.ibb.co/yyx18Qy/ambipom.png"
  },
  {
    "name": "amoonguss",
    "image": "https://i.ibb.co/3MgS4jm/amoonguss.png"
  },
  {
    "name": "ampharos",
    "image": "https://i.ibb.co/0MNWyFv/ampharos.png"
  },
  {
    "name": "anorith",
    "image": "https://i.ibb.co/8gPDzSv/anorith.png"
  },
  {
    "name": "appletun",
    "image": "https://i.ibb.co/sgRmt8p/appletun.png"
  },
  {
    "name": "applin",
    "image": "https://i.ibb.co/n81Jzks/applin.png"
  },
  {
    "name": "araquanid",
    "image": "https://i.ibb.co/nRtXpDX/araquanid.png"
  },
  {
    "name": "arbok",
    "image": "https://i.ibb.co/YygM0WR/arbok.png"
  },
  {
    "name": "arcanine",
    "image": "https://i.ibb.co/L5F39SZ/arcanine.png"
  },
  {
    "name": "arceus-normal",
    "image": "https://i.ibb.co/vYfHTCY/arceus-normal.png"
  },
  {
    "name": "archen",
    "image": "https://i.ibb.co/gjrrKWf/archen.png"
  },
  {
    "name": "archeops",
    "image": "https://i.ibb.co/cYKZjf8/archeops.png"
  },
  {
    "name": "arctovish",
    "image": "https://i.ibb.co/z7RSTZS/arctovish.png"
  },
  {
    "name": "arctozolt",
    "image": "https://i.ibb.co/KqCs4hD/arctozolt.png"
  },
  {
    "name": "ariados",
    "image": "https://i.ibb.co/LZ4RwGH/ariados.png"
  },
  {
    "name": "armaldo",
    "image": "https://i.ibb.co/Wz3wtYt/armaldo.png"
  },
  {
    "name": "aromatisse",
    "image": "https://i.ibb.co/Pz3kGcZ/aromatisse.png"
  },
  {
    "name": "aron",
    "image": "https://i.ibb.co/ftKBKWf/aron.png"
  },
  {
    "name": "arrokuda",
    "image": "https://i.ibb.co/CHJ0BmN/arrokuda.png"
  },
  {
    "name": "articuno",
    "image": "https://i.ibb.co/2jZt1q4/articuno.png"
  },
  {
    "name": "audino",
    "image": "https://i.ibb.co/TWZ12k9/audino.png"
  },
  {
    "name": "aurorus",
    "image": "https://i.ibb.co/cY6bbRs/aurorus.png"
  },
  {
    "name": "avalugg",
    "image": "https://i.ibb.co/k9wVbN6/avalugg.png"
  },
  {
    "name": "axew",
    "image": "https://i.ibb.co/1KF85Jj/axew.png"
  },
  {
    "name": "azelf",
    "image": "https://i.ibb.co/q98P3Bf/azelf.png"
  },
  {
    "name": "azumarill",
    "image": "https://i.ibb.co/P4kCd17/azumarill.png"
  },
  {
    "name": "azurill",
    "image": "https://i.ibb.co/KFf0gK3/azurill.png"
  },
  {
    "name": "bagon",
    "image": "https://i.ibb.co/B349fqw/bagon.png"
  },
  {
    "name": "baltoy",
    "image": "https://i.ibb.co/V2SFLrk/baltoy.png"
  },
  {
    "name": "banette",
    "image": "https://i.ibb.co/cTN4wzD/banette.png"
  },
  {
    "name": "barbaracle",
    "image": "https://i.ibb.co/gtB3ZfV/barbaracle.png"
  },
  {
    "name": "barboach",
    "image": "https://i.ibb.co/xzcZMw0/barboach.png"
  },
  {
    "name": "barraskewda",
    "image": "https://i.ibb.co/KFCD80t/barraskewda.png"
  },
  {
    "name": "basculin-red-striped",
    "image": "https://i.ibb.co/N3zM18V/basculin-red-striped.png"
  },
  {
    "name": "bastiodon",
    "image": "https://i.ibb.co/qBZLtHW/bastiodon.png"
  },
  {
    "name": "bayleef",
    "image": "https://i.ibb.co/NWCTLSh/bayleef.png"
  },
  {
    "name": "beartic",
    "image": "https://i.ibb.co/tpFmTRL/beartic.png"
  },
  {
    "name": "beautifly",
    "image": "https://i.ibb.co/k6tSHSS/beautifly.png"
  },
  {
    "name": "beedrill",
    "image": "https://i.ibb.co/ZhK7Sbk/beedrill.png"
  },
  {
    "name": "beheeyem",
    "image": "https://i.ibb.co/4mVw3v8/beheeyem.png"
  },
  {
    "name": "beldum",
    "image": "https://i.ibb.co/C0Cj2Jm/beldum.png"
  },
  {
    "name": "bellossom",
    "image": "https://i.ibb.co/YWdRLG4/bellossom.png"
  },
  {
    "name": "bellsprout",
    "image": "https://i.ibb.co/3vjdgZQ/bellsprout.png"
  },
  {
    "name": "bergmite",
    "image": "https://i.ibb.co/sC16NFM/bergmite.png"
  },
  {
    "name": "bewear",
    "image": "https://i.ibb.co/HrCScP7/bewear.png"
  },
  {
    "name": "bibarel",
    "image": "https://i.ibb.co/hynrYxR/bibarel.png"
  },
  {
    "name": "bidoof",
    "image": "https://i.ibb.co/grdYtLM/bidoof.png"
  },
  {
    "name": "binacle",
    "image": "https://i.ibb.co/74LGM2H/binacle.png"
  },
  {
    "name": "bisharp",
    "image": "https://i.ibb.co/Wt22695/bisharp.png"
  },
  {
    "name": "blacephalon",
    "image": "https://i.ibb.co/wMQxsbk/blacephalon.png"
  },
  {
    "name": "blastoise",
    "image": "https://i.ibb.co/HPhxW7C/blastoise.png"
  },
  {
    "name": "blaziken",
    "image": "https://i.ibb.co/CPkPk7r/blaziken.png"
  },
  {
    "name": "blipbug",
    "image": "https://i.ibb.co/FJSghNZ/blipbug.png"
  },
  {
    "name": "blissey",
    "image": "https://i.ibb.co/JkRJsxF/blissey.png"
  },
  {
    "name": "blitzle",
    "image": "https://i.ibb.co/FDc5PPx/blitzle.png"
  },
  {
    "name": "boldore",
    "image": "https://i.ibb.co/dcHV7XW/boldore.png"
  },
  {
    "name": "boltund",
    "image": "https://i.ibb.co/7jqSjWx/boltund.png"
  },
  {
    "name": "bonsly",
    "image": "https://i.ibb.co/6N3tVrC/bonsly.png"
  },
  {
    "name": "bouffalant",
    "image": "https://i.ibb.co/NKLtXs8/bouffalant.png"
  },
  {
    "name": "bounsweet",
    "image": "https://i.ibb.co/1qVpF5X/bounsweet.png"
  },
  {
    "name": "braixen",
    "image": "https://i.ibb.co/pXrw0LP/braixen.png"
  },
  {
    "name": "braviary",
    "image": "https://i.ibb.co/sQgjvNv/braviary.png"
  },
  {
    "name": "breloom",
    "image": "https://i.ibb.co/84dFG7q/breloom.png"
  },
  {
    "name": "brionne",
    "image": "https://i.ibb.co/nmKvsmQ/brionne.png"
  },
  {
    "name": "bronzong",
    "image": "https://i.ibb.co/zVjVzbg/bronzong.png"
  },
  {
    "name": "bronzor",
    "image": "https://i.ibb.co/fQrDfZm/bronzor.png"
  },
  {
    "name": "bruxish",
    "image": "https://i.ibb.co/MVTbh7B/bruxish.png"
  },
  {
    "name": "budew",
    "image": "https://i.ibb.co/VWT5mHt/budew.png"
  },
  {
    "name": "buizel",
    "image": "https://i.ibb.co/vXrKhMb/buizel.png"
  },
  {
    "name": "bulbasaur",
    "image": "https://i.ibb.co/XjTH8yz/bulbasaur.png"
  },
  {
    "name": "buneary",
    "image": "https://i.ibb.co/hVWTFFH/buneary.png"
  },
  {
    "name": "bunnelby",
    "image": "https://i.ibb.co/s9cnnn5/bunnelby.png"
  },
  {
    "name": "burmy-plant",
    "image": "https://i.ibb.co/XymJMCd/burmy-plant.png"
  },
  {
    "name": "butterfree",
    "image": "https://i.ibb.co/jDRtChz/butterfree.png"
  },
  {
    "name": "buzzwole",
    "image": "https://i.ibb.co/4jKR4Qk/buzzwole.png"
  },
  {
    "name": "cacnea",
    "image": "https://i.ibb.co/GHyh19C/cacnea.png"
  },
  {
    "name": "cacturne",
    "image": "https://i.ibb.co/mRdLwYw/cacturne.png"
  },
  {
    "name": "calyrex",
    "image": "https://i.ibb.co/vDDnNbZ/calyrex.png"
  },
  {
    "name": "camerupt",
    "image": "https://i.ibb.co/jkHYm1x/camerupt.png"
  },
  {
    "name": "carbink",
    "image": "https://i.ibb.co/5KSgk1R/carbink.png"
  },
  {
    "name": "carkol",
    "image": "https://i.ibb.co/Jq909fD/carkol.png"
  },
  {
    "name": "carnivine",
    "image": "https://i.ibb.co/xDH0TJC/carnivine.png"
  },
  {
    "name": "carracosta",
    "image": "https://i.ibb.co/VWBBdw6/carracosta.png"
  },
  {
    "name": "carvanha",
    "image": "https://i.ibb.co/LxgsF85/carvanha.png"
  },
  {
    "name": "cascoon",
    "image": "https://i.ibb.co/RYMjz4W/cascoon.png"
  },
  {
    "name": "castform",
    "image": "https://i.ibb.co/tpbyPdS/castform.png"
  },
  {
    "name": "caterpie",
    "image": "https://i.ibb.co/XjXZMG3/caterpie.png"
  },
  {
    "name": "celebi",
    "image": "https://i.ibb.co/BKgKymN/celebi.png"
  },
  {
    "name": "celesteela",
    "image": "https://i.ibb.co/60hffBZ/celesteela.png"
  },
  {
    "name": "centiskorch",
    "image": "https://i.ibb.co/jL1sz2r/centiskorch.png"
  },
  {
    "name": "chandelure",
    "image": "https://i.ibb.co/LpCvHbj/chandelure.png"
  },
  {
    "name": "chansey",
    "image": "https://i.ibb.co/z8XRMB2/chansey.png"
  },
  {
    "name": "charizard",
    "image": "https://i.ibb.co/vB9tCLP/charizard.png"
  },
  {
    "name": "charjabug",
    "image": "https://i.ibb.co/zNGY8rn/charjabug.png"
  },
  {
    "name": "charmander",
    "image": "https://i.ibb.co/98CkZ78/charmander.png"
  },
  {
    "name": "charmeleon",
    "image": "https://i.ibb.co/SQdgJft/charmeleon.png"
  },
  {
    "name": "chatot",
    "image": "https://i.ibb.co/GWFbdy3/chatot.png"
  },
  {
    "name": "cherrim-overcast",
    "image": "https://i.ibb.co/ZdFcbTM/cherrim-overcast.png"
  },
  {
    "name": "cherubi",
    "image": "https://i.ibb.co/LvswLKH/cherubi.png"
  },
  {
    "name": "chesnaught",
    "image": "https://i.ibb.co/0qXPBkk/chesnaught.png"
  },
  {
    "name": "chespin",
    "image": "https://i.ibb.co/zZpkTwJ/chespin.png"
  },
  {
    "name": "chewtle",
    "image": "https://i.ibb.co/61HVzBq/chewtle.png"
  },
  {
    "name": "chikorita",
    "image": "https://i.ibb.co/CvPGChT/chikorita.png"
  },
  {
    "name": "chimchar",
    "image": "https://i.ibb.co/jMgtRLq/chimchar.png"
  },
  {
    "name": "chimecho",
    "image": "https://i.ibb.co/HhLTjm7/chimecho.png"
  },
  {
    "name": "chinchou",
    "image": "https://i.ibb.co/1dCpXmd/chinchou.png"
  },
  {
    "name": "chingling",
    "image": "https://i.ibb.co/PWNKQpG/chingling.png"
  },
  {
    "name": "cinccino",
    "image": "https://i.ibb.co/2PJkxVb/cinccino.png"
  },
  {
    "name": "cinderace",
    "image": "https://i.ibb.co/z2mxQpg/cinderace.png"
  },
  {
    "name": "clamperl",
    "image": "https://i.ibb.co/WP4cFDc/clamperl.png"
  },
  {
    "name": "clauncher",
    "image": "https://i.ibb.co/qMHTr1n/clauncher.png"
  },
  {
    "name": "clawitzer",
    "image": "https://i.ibb.co/DGWjCLr/clawitzer.png"
  },
  {
    "name": "claydol",
    "image": "https://i.ibb.co/GQ1zHvd/claydol.png"
  },
  {
    "name": "clefable",
    "image": "https://i.ibb.co/KWwr0P1/clefable.png"
  },
  {
    "name": "clefairy",
    "image": "https://i.ibb.co/zrT04kq/clefairy.png"
  },
  {
    "name": "cleffa",
    "image": "https://i.ibb.co/ydGY60y/cleffa.png"
  },
  {
    "name": "clobbopus",
    "image": "https://i.ibb.co/qJ4HP75/clobbopus.png"
  },
  {
    "name": "cloyster",
    "image": "https://i.ibb.co/HNbH4c7/cloyster.png"
  },
  {
    "name": "coalossal",
    "image": "https://i.ibb.co/RBjMX7x/coalossal.png"
  },
  {
    "name": "cobalion",
    "image": "https://i.ibb.co/xM758M1/cobalion.png"
  },
  {
    "name": "cofagrigus",
    "image": "https://i.ibb.co/vLSWbn3/cofagrigus.png"
  },
  {
    "name": "combee",
    "image": "https://i.ibb.co/162pyrj/combee.png"
  },
  {
    "name": "combusken",
    "image": "https://i.ibb.co/fN0TCYV/combusken.png"
  },
  {
    "name": "comfey",
    "image": "https://i.ibb.co/54pB8Mx/comfey.png"
  },
  {
    "name": "conkeldurr",
    "image": "https://i.ibb.co/KqtVf74/conkeldurr.png"
  },
  {
    "name": "copperajah",
    "image": "https://i.ibb.co/6BgRjnZ/copperajah.png"
  },
  {
    "name": "corphish",
    "image": "https://i.ibb.co/n80dhNq/corphish.png"
  },
  {
    "name": "corsola",
    "image": "https://i.ibb.co/gym9x0P/corsola.png"
  },
  {
    "name": "corviknight",
    "image": "https://i.ibb.co/Jy8y0Qr/corviknight.png"
  },
  {
    "name": "corvisquire",
    "image": "https://i.ibb.co/GRmWn49/corvisquire.png"
  },
  {
    "name": "cosmoem",
    "image": "https://i.ibb.co/P1YsZXQ/cosmoem.png"
  },
  {
    "name": "cosmog",
    "image": "https://i.ibb.co/k3T10d3/cosmog.png"
  },
  {
    "name": "cottonee",
    "image": "https://i.ibb.co/rbT42CQ/cottonee.png"
  },
  {
    "name": "crabominable",
    "image": "https://i.ibb.co/JKTdtrc/crabominable.png"
  },
  {
    "name": "crabrawler",
    "image": "https://i.ibb.co/YRYM05b/crabrawler.png"
  },
  {
    "name": "cradily",
    "image": "https://i.ibb.co/bWBLSZQ/cradily.png"
  },
  {
    "name": "cramorant",
    "image": "https://i.ibb.co/2FrssPc/cramorant.png"
  },
  {
    "name": "cranidos",
    "image": "https://i.ibb.co/sJ2fKJm/cranidos.png"
  },
  {
    "name": "crawdaunt",
    "image": "https://i.ibb.co/WDCFRW7/crawdaunt.png"
  },
  {
    "name": "cresselia",
    "image": "https://i.ibb.co/3FXv89g/cresselia.png"
  },
  {
    "name": "croagunk",
    "image": "https://i.ibb.co/SKrg4Mc/croagunk.png"
  },
  {
    "name": "crobat",
    "image": "https://i.ibb.co/XFRwWTc/crobat.png"
  },
  {
    "name": "croconaw",
    "image": "https://i.ibb.co/TtyJNSd/croconaw.png"
  },
  {
    "name": "crustle",
    "image": "https://i.ibb.co/GPbtK8q/crustle.png"
  },
  {
    "name": "cryogonal",
    "image": "https://i.ibb.co/fpCscgZ/cryogonal.png"
  },
  {
    "name": "cubchoo",
    "image": "https://i.ibb.co/Pjn1GwP/cubchoo.png"
  },
  {
    "name": "cubone",
    "image": "https://i.ibb.co/GHGstKL/cubone.png"
  },
  {
    "name": "cufant",
    "image": "https://i.ibb.co/gSLMBrK/cufant.png"
  },
  {
    "name": "cursola",
    "image": "https://i.ibb.co/3Mdkr25/cursola.png"
  },
  {
    "name": "cutiefly",
    "image": "https://i.ibb.co/gPkP3yx/cutiefly.png"
  },
  {
    "name": "cyndaquil",
    "image": "https://i.ibb.co/nzX0dSR/cyndaquil.png"
  },
  {
    "name": "darkrai",
    "image": "https://i.ibb.co/c8Df1FZ/darkrai.png"
  },
  {
    "name": "darmanitan-standard",
    "image": "https://i.ibb.co/5T1Tmkw/darmanitan-standard.png"
  },
  {
    "name": "dartrix",
    "image": "https://i.ibb.co/5GNkZNx/dartrix.png"
  },
  {
    "name": "darumaka",
    "image": "https://i.ibb.co/jkxMDZG/darumaka.png"
  },
  {
    "name": "decidueye",
    "image": "https://i.ibb.co/6mHwNfJ/decidueye.png"
  },
  {
    "name": "dedenne",
    "image": "https://i.ibb.co/kSwhqC7/dedenne.png"
  },
  {
    "name": "deerling-spring",
    "image": "https://i.ibb.co/XLbpSWx/deerling-spring.png"
  },
  {
    "name": "deino",
    "image": "https://i.ibb.co/0yxFBWN/deino.png"
  },
  {
    "name": "delcatty",
    "image": "https://i.ibb.co/9NTvydK/delcatty.png"
  },
  {
    "name": "delibird",
    "image": "https://i.ibb.co/R2k81ZH/delibird.png"
  },
  {
    "name": "delphox",
    "image": "https://i.ibb.co/jLHGdB3/delphox.png"
  },
  {
    "name": "deoxys-normal",
    "image": "https://i.ibb.co/PxKxT3r/deoxys-normal.png"
  },
  {
    "name": "dewgong",
    "image": "https://i.ibb.co/ChQS4zf/dewgong.png"
  },
  {
    "name": "dewott",
    "image": "https://i.ibb.co/NrLY604/dewott.png"
  },
  {
    "name": "dewpider",
    "image": "https://i.ibb.co/5Bp91fZ/dewpider.png"
  },
  {
    "name": "dhelmise",
    "image": "https://i.ibb.co/0BkwyCR/dhelmise.png"
  },
  {
    "name": "dialga",
    "image": "https://i.ibb.co/mvf7QtW/dialga.png"
  },
  {
    "name": "diancie",
    "image": "https://i.ibb.co/LQWPMmv/diancie.png"
  },
  {
    "name": "diggersby",
    "image": "https://i.ibb.co/MMZF6jb/diggersby.png"
  },
  {
    "name": "diglett",
    "image": "https://i.ibb.co/TKJDBXm/diglett.png"
  },
  {
    "name": "ditto",
    "image": "https://i.ibb.co/tZ5YmvX/ditto.png"
  },
  {
    "name": "dodrio",
    "image": "https://i.ibb.co/Zf7735W/dodrio.png"
  },
  {
    "name": "doduo",
    "image": "https://i.ibb.co/xh6KW65/doduo.png"
  },
  {
    "name": "donphan",
    "image": "https://i.ibb.co/JqJX72n/donphan.png"
  },
  {
    "name": "dottler",
    "image": "https://i.ibb.co/BC0cJns/dottler.png"
  },
  {
    "name": "doublade",
    "image": "https://i.ibb.co/p4nQwMN/doublade.png"
  },
  {
    "name": "dracovish",
    "image": "https://i.ibb.co/1L4hs6B/dracovish.png"
  },
  {
    "name": "dracozolt",
    "image": "https://i.ibb.co/SXjyt2G/dracozolt.png"
  },
  {
    "name": "dragalge",
    "image": "https://i.ibb.co/LgL4gMc/dragalge.png"
  },
  {
    "name": "dragapult",
    "image": "https://i.ibb.co/k2wLytf/dragapult.png"
  },
  {
    "name": "dragonair",
    "image": "https://i.ibb.co/gy0jJ1V/dragonair.png"
  },
  {
    "name": "dragonite",
    "image": "https://i.ibb.co/YZ254cL/dragonite.png"
  },
  {
    "name": "drakloak",
    "image": "https://i.ibb.co/BrfV8Y1/drakloak.png"
  },
  {
    "name": "drampa",
    "image": "https://i.ibb.co/0V6cv4C/drampa.png"
  },
  {
    "name": "drapion",
    "image": "https://i.ibb.co/84w78RS/drapion.png"
  },
  {
    "name": "dratini",
    "image": "https://i.ibb.co/2MYLzXZ/dratini.png"
  },
  {
    "name": "drednaw",
    "image": "https://i.ibb.co/6WzGBBm/drednaw.png"
  },
  {
    "name": "dreepy",
    "image": "https://i.ibb.co/pXWbcnf/dreepy.png"
  },
  {
    "name": "drifblim",
    "image": "https://i.ibb.co/rkBycjk/drifblim.png"
  },
  {
    "name": "drifloon",
    "image": "https://i.ibb.co/mFGP6St/drifloon.png"
  },
  {
    "name": "drilbur",
    "image": "https://i.ibb.co/pX92Gjr/drilbur.png"
  },
  {
    "name": "drizzile",
    "image": "https://i.ibb.co/Jzcp2Cq/drizzile.png"
  },
  {
    "name": "drowzee",
    "image": "https://i.ibb.co/qyQKLvs/drowzee.png"
  },
  {
    "name": "druddigon",
    "image": "https://i.ibb.co/4tVRCfW/druddigon.png"
  },
  {
    "name": "dubwool",
    "image": "https://i.ibb.co/QJFnBCG/dubwool.png"
  },
  {
    "name": "ducklett",
    "image": "https://i.ibb.co/kGDBQ2b/ducklett.png"
  },
  {
    "name": "dugtrio",
    "image": "https://i.ibb.co/dm7T4Wk/dugtrio.png"
  },
  {
    "name": "dunsparce",
    "image": "https://i.ibb.co/Jj62CSY/dunsparce.png"
  },
  {
    "name": "duosion",
    "image": "https://i.ibb.co/1TkB2kg/duosion.png"
  },
  {
    "name": "duraludon",
    "image": "https://i.ibb.co/KzQCh0H/duraludon.png"
  },
  {
    "name": "durant",
    "image": "https://i.ibb.co/52y8myW/durant.png"
  },
  {
    "name": "dusclops",
    "image": "https://i.ibb.co/7gHnBq4/dusclops.png"
  },
  {
    "name": "dusknoir",
    "image": "https://i.ibb.co/yNqcJYp/dusknoir.png"
  },
  {
    "name": "duskull",
    "image": "https://i.ibb.co/Pw0vH2N/duskull.png"
  },
  {
    "name": "dustox",
    "image": "https://i.ibb.co/vhpPyxN/dustox.png"
  },
  {
    "name": "dwebble",
    "image": "https://i.ibb.co/QDRmRVh/dwebble.png"
  },
  {
    "name": "eelektrik",
    "image": "https://i.ibb.co/5K3gkfx/eelektrik.png"
  },
  {
    "name": "eelektross",
    "image": "https://i.ibb.co/bb5GrwM/eelektross.png"
  },
  {
    "name": "eevee",
    "image": "https://i.ibb.co/FsmwHxF/eevee.png"
  },
  {
    "name": "eiscue-ice",
    "image": "https://i.ibb.co/qJmccSm/eiscue-ice.png"
  },
  {
    "name": "ekans",
    "image": "https://i.ibb.co/6Ykr7v9/ekans.png"
  },
  {
    "name": "eldegoss",
    "image": "https://i.ibb.co/b1LJ0kW/eldegoss.png"
  },
  {
    "name": "electabuzz",
    "image": "https://i.ibb.co/9sGNkPp/electabuzz.png"
  },
  {
    "name": "electivire",
    "image": "https://i.ibb.co/ZJ4R4wt/electivire.png"
  },
  {
    "name": "electrike",
    "image": "https://i.ibb.co/rxwzC9D/electrike.png"
  },
  {
    "name": "electrode",
    "image": "https://i.ibb.co/Cn3JTks/electrode.png"
  },
  {
    "name": "elekid",
    "image": "https://i.ibb.co/Tw1DWsk/elekid.png"
  },
  {
    "name": "elgyem",
    "image": "https://i.ibb.co/Vw1s7wg/elgyem.png"
  },
  {
    "name": "emboar",
    "image": "https://i.ibb.co/y8HtzBc/emboar.png"
  },
  {
    "name": "emolga",
    "image": "https://i.ibb.co/60zgWwW/emolga.png"
  },
  {
    "name": "empoleon",
    "image": "https://i.ibb.co/cQTq67C/empoleon.png"
  },
  {
    "name": "entei",
    "image": "https://i.ibb.co/b1vB6hV/entei.png"
  },
  {
    "name": "escavalier",
    "image": "https://i.ibb.co/LgYztTD/escavalier.png"
  },
  {
    "name": "espeon",
    "image": "https://i.ibb.co/7zbmp5R/espeon.png"
  },
  {
    "name": "espurr",
    "image": "https://i.ibb.co/18n7XGH/espurr.png"
  },
  {
    "name": "eternatus",
    "image": "https://i.ibb.co/41rPnHw/eternatus.png"
  },
  {
    "name": "excadrill",
    "image": "https://i.ibb.co/W00f7gP/excadrill.png"
  },
  {
    "name": "exeggcute",
    "image": "https://i.ibb.co/W39GsQ6/exeggcute.png"
  },
  {
    "name": "exeggutor",
    "image": "https://i.ibb.co/VjLRMTc/exeggutor.png"
  },
  {
    "name": "exploud",
    "image": "https://i.ibb.co/F5H7Pcd/exploud.png"
  },
  {
    "name": "falinks",
    "image": "https://i.ibb.co/L1Bv4xV/falinks.png"
  },
  {
    "name": "farfetchd",
    "image": "https://i.ibb.co/NWQpNjG/farfetchd.png"
  },
  {
    "name": "fearow",
    "image": "https://i.ibb.co/88LV3Jf/fearow.png"
  },
  {
    "name": "feebas",
    "image": "https://i.ibb.co/RDKw6zC/feebas.png"
  },
  {
    "name": "fennekin",
    "image": "https://i.ibb.co/fpMJ8dH/fennekin.png"
  },
  {
    "name": "feraligatr",
    "image": "https://i.ibb.co/RPzThwv/feraligatr.png"
  },
  {
    "name": "ferroseed",
    "image": "https://i.ibb.co/tMcNwhX/ferroseed.png"
  },
  {
    "name": "ferrothorn",
    "image": "https://i.ibb.co/GkfB4gZ/ferrothorn.png"
  },
  {
    "name": "finneon",
    "image": "https://i.ibb.co/9n4XqLc/finneon.png"
  },
  {
    "name": "flaaffy",
    "image": "https://i.ibb.co/DwgNgW4/flaaffy.png"
  },
  {
    "name": "flabebe-red",
    "image": "https://i.ibb.co/jW4JdWc/flabebe-red.png"
  },
  {
    "name": "flapple",
    "image": "https://i.ibb.co/DD2v0zH/flapple.png"
  },
  {
    "name": "flareon",
    "image": "https://i.ibb.co/0ywGQSH/flareon.png"
  },
  {
    "name": "fletchinder",
    "image": "https://i.ibb.co/CmsrYTw/fletchinder.png"
  },
  {
    "name": "fletchling",
    "image": "https://i.ibb.co/kMVfyxQ/fletchling.png"
  },
  {
    "name": "floatzel",
    "image": "https://i.ibb.co/Wp6LtvD/floatzel.png"
  },
  {
    "name": "floette-red",
    "image": "https://i.ibb.co/q0PnB02/floette-red.png"
  },
  {
    "name": "florges-red",
    "image": "https://i.ibb.co/4SwycV5/florges-red.png"
  },
  {
    "name": "flygon",
    "image": "https://i.ibb.co/JmssGvY/flygon.png"
  },
  {
    "name": "fomantis",
    "image": "https://i.ibb.co/R0zBHFZ/fomantis.png"
  },
  {
    "name": "foongus",
    "image": "https://i.ibb.co/W5GLfWp/foongus.png"
  },
  {
    "name": "forretress",
    "image": "https://i.ibb.co/Kq7ztG4/forretress.png"
  },
  {
    "name": "fraxure",
    "image": "https://i.ibb.co/p1H0JxH/fraxure.png"
  },
  {
    "name": "frillish",
    "image": "https://i.ibb.co/D5SKPDh/frillish.png"
  },
  {
    "name": "froakie",
    "image": "https://i.ibb.co/f0GxZvz/froakie.png"
  },
  {
    "name": "frogadier",
    "image": "https://i.ibb.co/q9VKpf3/frogadier.png"
  },
  {
    "name": "froslass",
    "image": "https://i.ibb.co/8bNKT5b/froslass.png"
  },
  {
    "name": "frosmoth",
    "image": "https://i.ibb.co/GVKg63w/frosmoth.png"
  },
  {
    "name": "furfrou-natural",
    "image": "https://i.ibb.co/2dMR0f3/furfrou-natural.png"
  },
  {
    "name": "furret",
    "image": "https://i.ibb.co/dWRtHcS/furret.png"
  },
  {
    "name": "gabite",
    "image": "https://i.ibb.co/S0Pdh6G/gabite.png"
  },
  {
    "name": "gallade",
    "image": "https://i.ibb.co/VVjwmKJ/gallade.png"
  },
  {
    "name": "galvantula",
    "image": "https://i.ibb.co/9wwP7Bc/galvantula.png"
  },
  {
    "name": "garbodor",
    "image": "https://i.ibb.co/5rwYFgt/garbodor.png"
  },
  {
    "name": "garchomp",
    "image": "https://i.ibb.co/MkdCtQM/garchomp.png"
  },
  {
    "name": "gardevoir",
    "image": "https://i.ibb.co/HzxX9xD/gardevoir.png"
  },
  {
    "name": "gastly",
    "image": "https://i.ibb.co/KKj9gqj/gastly.png"
  },
  {
    "name": "gastrodon-west",
    "image": "https://i.ibb.co/tzrFVKv/gastrodon-west.png"
  },
  {
    "name": "genesect",
    "image": "https://i.ibb.co/3zMTn0V/genesect.png"
  },
  {
    "name": "gengar",
    "image": "https://i.ibb.co/cwdQL7f/gengar.png"
  },
  {
    "name": "geodude",
    "image": "https://i.ibb.co/xFTBCQv/geodude.png"
  },
  {
    "name": "gible",
    "image": "https://i.ibb.co/HHdJH2J/gible.png"
  },
  {
    "name": "gigalith",
    "image": "https://i.ibb.co/d6XzBjn/gigalith.png"
  },
  {
    "name": "girafarig",
    "image": "https://i.ibb.co/kHYzsQM/girafarig.png"
  },
  {
    "name": "giratina-altered",
    "image": "https://i.ibb.co/PFhP5Lv/giratina-altered.png"
  },
  {
    "name": "glaceon",
    "image": "https://i.ibb.co/PNQT5wY/glaceon.png"
  },
  {
    "name": "glalie",
    "image": "https://i.ibb.co/1Jz6bN7/glalie.png"
  },
  {
    "name": "glameow",
    "image": "https://i.ibb.co/dMFpZ5m/glameow.png"
  },
  {
    "name": "glastrier",
    "image": "https://i.ibb.co/B4p3SrN/glastrier.png"
  },
  {
    "name": "gligar",
    "image": "https://i.ibb.co/t4NLHkd/gligar.png"
  },
  {
    "name": "gliscor",
    "image": "https://i.ibb.co/0ZJcKPX/gliscor.png"
  },
  {
    "name": "gloom",
    "image": "https://i.ibb.co/LZKm19r/gloom.png"
  },
  {
    "name": "gogoat",
    "image": "https://i.ibb.co/Y0YfRNc/gogoat.png"
  },
  {
    "name": "golbat",
    "image": "https://i.ibb.co/KK6k5F9/golbat.png"
  },
  {
    "name": "goldeen",
    "image": "https://i.ibb.co/0Dk20pZ/goldeen.png"
  },
  {
    "name": "golduck",
    "image": "https://i.ibb.co/fxm3H1S/golduck.png"
  },
  {
    "name": "golem",
    "image": "https://i.ibb.co/0JNZYcR/golem.png"
  },
  {
    "name": "golett",
    "image": "https://i.ibb.co/v1cnWHd/golett.png"
  },
  {
    "name": "golisopod",
    "image": "https://i.ibb.co/tLPCXGt/golisopod.png"
  },
  {
    "name": "golurk",
    "image": "https://i.ibb.co/F84grPd/golurk.png"
  },
  {
    "name": "goodra",
    "image": "https://i.ibb.co/Qc2dFmg/goodra.png"
  },
  {
    "name": "goomy",
    "image": "https://i.ibb.co/XyZFkky/goomy.png"
  },
  {
    "name": "gorebyss",
    "image": "https://i.ibb.co/prs5WpC/gorebyss.png"
  },
  {
    "name": "gossifleur",
    "image": "https://i.ibb.co/1JXM1Bc/gossifleur.png"
  },
  {
    "name": "gothita",
    "image": "https://i.ibb.co/C8mz6BM/gothita.png"
  },
  {
    "name": "gothitelle",
    "image": "https://i.ibb.co/MB5KTVr/gothitelle.png"
  },
  {
    "name": "gothorita",
    "image": "https://i.ibb.co/D88LpcB/gothorita.png"
  },
  {
    "name": "gourgeist-average",
    "image": "https://i.ibb.co/BcsDjwj/gourgeist-average.png"
  },
  {
    "name": "granbull",
    "image": "https://i.ibb.co/C0wtwb9/granbull.png"
  },
  {
    "name": "grapploct",
    "image": "https://i.ibb.co/4VrzHB7/grapploct.png"
  },
  {
    "name": "graveler",
    "image": "https://i.ibb.co/W62wW24/graveler.png"
  },
  {
    "name": "greedent",
    "image": "https://i.ibb.co/HXsCSmb/greedent.png"
  },
  {
    "name": "greninja",
    "image": "https://i.ibb.co/mhx0JS0/greninja.png"
  },
  {
    "name": "grimer",
    "image": "https://i.ibb.co/wBHY4dF/grimer.png"
  },
  {
    "name": "grimmsnarl",
    "image": "https://i.ibb.co/2c1dV9L/grimmsnarl.png"
  },
  {
    "name": "grookey",
    "image": "https://i.ibb.co/tXW69yY/grookey.png"
  },
  {
    "name": "grotle",
    "image": "https://i.ibb.co/GtCTfTn/grotle.png"
  },
  {
    "name": "groudon",
    "image": "https://i.ibb.co/sCnbk2c/groudon.png"
  },
  {
    "name": "grovyle",
    "image": "https://i.ibb.co/GHnL7zX/grovyle.png"
  },
  {
    "name": "growlithe",
    "image": "https://i.ibb.co/8K39fRZ/growlithe.png"
  },
  {
    "name": "grubbin",
    "image": "https://i.ibb.co/k40T6cF/grubbin.png"
  },
  {
    "name": "grumpig",
    "image": "https://i.ibb.co/26jYHp9/grumpig.png"
  },
  {
    "name": "gulpin",
    "image": "https://i.ibb.co/59Y7xwX/gulpin.png"
  },
  {
    "name": "gumshoos",
    "image": "https://i.ibb.co/pr9Zn7t/gumshoos.png"
  },
  {
    "name": "gurdurr",
    "image": "https://i.ibb.co/zQZ3CqB/gurdurr.png"
  },
  {
    "name": "guzzlord",
    "image": "https://i.ibb.co/HdsgpK5/guzzlord.png"
  },
  {
    "name": "gyarados",
    "image": "https://i.ibb.co/6BRrjxf/gyarados.png"
  },
  {
    "name": "hakamo-o",
    "image": "https://i.ibb.co/6tqxWX9/hakamo-o.png"
  },
  {
    "name": "happiny",
    "image": "https://i.ibb.co/z5f9QGh/happiny.png"
  },
  {
    "name": "hariyama",
    "image": "https://i.ibb.co/6407Fm9/hariyama.png"
  },
  {
    "name": "hatenna",
    "image": "https://i.ibb.co/8gbvk9W/hatenna.png"
  },
  {
    "name": "hatterene",
    "image": "https://i.ibb.co/PDktGrY/hatterene.png"
  },
  {
    "name": "hattrem",
    "image": "https://i.ibb.co/N9BHR3d/hattrem.png"
  },
  {
    "name": "haunter",
    "image": "https://i.ibb.co/ggpMgWN/haunter.png"
  },
  {
    "name": "hawlucha",
    "image": "https://i.ibb.co/bzGKF1y/hawlucha.png"
  },
  {
    "name": "haxorus",
    "image": "https://i.ibb.co/zZXD30R/haxorus.png"
  },
  {
    "name": "heatmor",
    "image": "https://i.ibb.co/WfJjmn2/heatmor.png"
  },
  {
    "name": "heatran",
    "image": "https://i.ibb.co/2nV2wWY/heatran.png"
  },
  {
    "name": "heliolisk",
    "image": "https://i.ibb.co/BG5GQW8/heliolisk.png"
  },
  {
    "name": "helioptile",
    "image": "https://i.ibb.co/Zz6txK8/helioptile.png"
  },
  {
    "name": "heracross",
    "image": "https://i.ibb.co/5xGNc34/heracross.png"
  },
  {
    "name": "herdier",
    "image": "https://i.ibb.co/684LFyN/herdier.png"
  },
  {
    "name": "hippopotas",
    "image": "https://i.ibb.co/y5CY2WF/hippopotas.png"
  },
  {
    "name": "hippowdon",
    "image": "https://i.ibb.co/MPWZm1S/hippowdon.png"
  },
  {
    "name": "hitmonchan",
    "image": "https://i.ibb.co/rtd63sc/hitmonchan.png"
  },
  {
    "name": "hitmonlee",
    "image": "https://i.ibb.co/KFtkSXc/hitmonlee.png"
  },
  {
    "name": "hitmontop",
    "image": "https://i.ibb.co/HTYSdV3/hitmontop.png"
  },
  {
    "name": "honchkrow",
    "image": "https://i.ibb.co/yqnZtgX/honchkrow.png"
  },
  {
    "name": "honedge",
    "image": "https://i.ibb.co/kD5HhGh/honedge.png"
  },
  {
    "name": "ho-oh",
    "image": "https://i.ibb.co/HhjsS7X/ho-oh.png"
  },
  {
    "name": "hoopa",
    "image": "https://i.ibb.co/tQ2jh3q/hoopa.png"
  },
  {
    "name": "hoothoot",
    "image": "https://i.ibb.co/PNTsMpx/hoothoot.png"
  },
  {
    "name": "hoppip",
    "image": "https://i.ibb.co/XW65jKF/hoppip.png"
  },
  {
    "name": "horsea",
    "image": "https://i.ibb.co/BBR9H7s/horsea.png"
  },
  {
    "name": "houndoom",
    "image": "https://i.ibb.co/khwSfdr/houndoom.png"
  },
  {
    "name": "houndour",
    "image": "https://i.ibb.co/TRdcQLL/houndour.png"
  },
  {
    "name": "huntail",
    "image": "https://i.ibb.co/SKKTD1y/huntail.png"
  },
  {
    "name": "hydreigon",
    "image": "https://i.ibb.co/L5bL3QY/hydreigon.png"
  },
  {
    "name": "hypno",
    "image": "https://i.ibb.co/fXDmTZn/hypno.png"
  },
  {
    "name": "igglybuff",
    "image": "https://i.ibb.co/G3Jjghs/igglybuff.png"
  },
  {
    "name": "illumise",
    "image": "https://i.ibb.co/PNwBkmY/illumise.png"
  },
  {
    "name": "impidimp",
    "image": "https://i.ibb.co/5GsHDPJ/impidimp.png"
  },
  {
    "name": "incineroar",
    "image": "https://i.ibb.co/xLWx63L/incineroar.png"
  },
  {
    "name": "indeedee-male",
    "image": "https://i.ibb.co/K5MQ65p/indeedee-male.png"
  },
  {
    "name": "infernape",
    "image": "https://i.ibb.co/7Y047x5/infernape.png"
  },
  {
    "name": "inkay",
    "image": "https://i.ibb.co/wWX0WfL/inkay.png"
  },
  {
    "name": "inteleon",
    "image": "https://i.ibb.co/jzDkMH7/inteleon.png"
  },
  {
    "name": "ivysaur",
    "image": "https://i.ibb.co/ZYKPQrg/ivysaur.png"
  },
  {
    "name": "jangmo-o",
    "image": "https://i.ibb.co/FBkXdzY/jangmo-o.png"
  },
  {
    "name": "jellicent",
    "image": "https://i.ibb.co/DthY47P/jellicent.png"
  },
  {
    "name": "jigglypuff",
    "image": "https://i.ibb.co/PjGbJXN/jigglypuff.png"
  },
  {
    "name": "jirachi",
    "image": "https://i.ibb.co/HxGkqqy/jirachi.png"
  },
  {
    "name": "jolteon",
    "image": "https://i.ibb.co/sHTSNh4/jolteon.png"
  },
  {
    "name": "joltik",
    "image": "https://i.ibb.co/bW6MjX7/joltik.png"
  },
  {
    "name": "jumpluff",
    "image": "https://i.ibb.co/sRCsSr9/jumpluff.png"
  },
  {
    "name": "jynx",
    "image": "https://i.ibb.co/rkS1h2m/jynx.png"
  },
  {
    "name": "kabuto",
    "image": "https://i.ibb.co/hBppcYQ/kabuto.png"
  },
  {
    "name": "kabutops",
    "image": "https://i.ibb.co/9vjmFpL/kabutops.png"
  },
  {
    "name": "kadabra",
    "image": "https://i.ibb.co/BVfpD3c/kadabra.png"
  },
  {
    "name": "kakuna",
    "image": "https://i.ibb.co/8YRcYQ3/kakuna.png"
  },
  {
    "name": "kangaskhan",
    "image": "https://i.ibb.co/hH6TJmn/kangaskhan.png"
  },
  {
    "name": "karrablast",
    "image": "https://i.ibb.co/kyZfdjS/karrablast.png"
  },
  {
    "name": "kartana",
    "image": "https://i.ibb.co/d7BQxsd/kartana.png"
  },
  {
    "name": "kecleon",
    "image": "https://i.ibb.co/mD0fLMX/kecleon.png"
  },
  {
    "name": "keldeo-ordinary",
    "image": "https://i.ibb.co/LdfwGLj/keldeo-ordinary.png"
  },
  {
    "name": "kingdra",
    "image": "https://i.ibb.co/hckQSQp/kingdra.png"
  },
  {
    "name": "kingler",
    "image": "https://i.ibb.co/ft5csvP/kingler.png"
  },
  {
    "name": "kirlia",
    "image": "https://i.ibb.co/jh9PSRq/kirlia.png"
  },
  {
    "name": "klang",
    "image": "https://i.ibb.co/g9NFTmZ/klang.png"
  },
  {
    "name": "klefki",
    "image": "https://i.ibb.co/PFbKj8D/klefki.png"
  },
  {
    "name": "klink",
    "image": "https://i.ibb.co/NxHrQ85/klink.png"
  },
  {
    "name": "klinklang",
    "image": "https://i.ibb.co/v1xgpRN/klinklang.png"
  },
  {
    "name": "koffing",
    "image": "https://i.ibb.co/RHskq9v/koffing.png"
  },
  {
    "name": "komala",
    "image": "https://i.ibb.co/w6k4MrZ/komala.png"
  },
  {
    "name": "kommo-o",
    "image": "https://i.ibb.co/7YWxpns/kommo-o.png"
  },
  {
    "name": "krabby",
    "image": "https://i.ibb.co/CwctMTn/krabby.png"
  },
  {
    "name": "kricketot",
    "image": "https://i.ibb.co/q0BxDsS/kricketot.png"
  },
  {
    "name": "kricketune",
    "image": "https://i.ibb.co/hM4YpTJ/kricketune.png"
  },
  {
    "name": "krokorok",
    "image": "https://i.ibb.co/mymBm9g/krokorok.png"
  },
  {
    "name": "krookodile",
    "image": "https://i.ibb.co/878qSqY/krookodile.png"
  },
  {
    "name": "kubfu",
    "image": "https://i.ibb.co/8BPf2ZJ/kubfu.png"
  },
  {
    "name": "kyogre",
    "image": "https://i.ibb.co/tBSFWZV/kyogre.png"
  },
  {
    "name": "kyurem",
    "image": "https://i.ibb.co/c23Yf84/kyurem.png"
  },
  {
    "name": "lairon",
    "image": "https://i.ibb.co/dMNcJ40/lairon.png"
  },
  {
    "name": "lampent",
    "image": "https://i.ibb.co/Khd47F9/lampent.png"
  },
  {
    "name": "landorus-incarnate",
    "image": "https://i.ibb.co/854GSr4/landorus-incarnate.png"
  },
  {
    "name": "lanturn",
    "image": "https://i.ibb.co/1r61vXZ/lanturn.png"
  },
  {
    "name": "lapras",
    "image": "https://i.ibb.co/WvKXP7c/lapras.png"
  },
  {
    "name": "larvesta",
    "image": "https://i.ibb.co/R4WnJkd/larvesta.png"
  },
  {
    "name": "larvitar",
    "image": "https://i.ibb.co/CMqKBW0/larvitar.png"
  },
  {
    "name": "latias",
    "image": "https://i.ibb.co/HLcQQb3/latias.png"
  },
  {
    "name": "latios",
    "image": "https://i.ibb.co/jVZh4gP/latios.png"
  },
  {
    "name": "leafeon",
    "image": "https://i.ibb.co/t2fZp2B/leafeon.png"
  },
  {
    "name": "leavanny",
    "image": "https://i.ibb.co/303x5nZ/leavanny.png"
  },
  {
    "name": "ledian",
    "image": "https://i.ibb.co/mhzs6pn/ledian.png"
  },
  {
    "name": "ledyba",
    "image": "https://i.ibb.co/CtNWjGp/ledyba.png"
  },
  {
    "name": "lickilicky",
    "image": "https://i.ibb.co/db84bVh/lickilicky.png"
  },
  {
    "name": "lickitung",
    "image": "https://i.ibb.co/85pb38L/lickitung.png"
  },
  {
    "name": "liepard",
    "image": "https://i.ibb.co/X41SpL9/liepard.png"
  },
  {
    "name": "lileep",
    "image": "https://i.ibb.co/1b9p5jq/lileep.png"
  },
  {
    "name": "lilligant",
    "image": "https://i.ibb.co/gJSL7DQ/lilligant.png"
  },
  {
    "name": "lillipup",
    "image": "https://i.ibb.co/wcbPw6z/lillipup.png"
  },
  {
    "name": "linoone",
    "image": "https://i.ibb.co/s3tdndX/linoone.png"
  },
  {
    "name": "litleo",
    "image": "https://i.ibb.co/QMKggXN/litleo.png"
  },
  {
    "name": "litten",
    "image": "https://i.ibb.co/Gtw64gg/litten.png"
  },
  {
    "name": "litwick",
    "image": "https://i.ibb.co/YZ7FhJ8/litwick.png"
  },
  {
    "name": "lombre",
    "image": "https://i.ibb.co/qn0qkTb/lombre.png"
  },
  {
    "name": "lopunny",
    "image": "https://i.ibb.co/jkR8SJb/lopunny.png"
  },
  {
    "name": "lotad",
    "image": "https://i.ibb.co/bLfJshg/lotad.png"
  },
  {
    "name": "loudred",
    "image": "https://i.ibb.co/64tszcQ/loudred.png"
  },
  {
    "name": "lucario",
    "image": "https://i.ibb.co/nfYqCs2/lucario.png"
  },
  {
    "name": "ludicolo",
    "image": "https://i.ibb.co/1JdKN8C/ludicolo.png"
  },
  {
    "name": "lugia",
    "image": "https://i.ibb.co/bzPhYxC/lugia.png"
  },
  {
    "name": "lumineon",
    "image": "https://i.ibb.co/CWBJH7y/lumineon.png"
  },
  {
    "name": "lunala",
    "image": "https://i.ibb.co/zhnKrcJ/lunala.png"
  },
  {
    "name": "lunatone",
    "image": "https://i.ibb.co/JkRJbYw/lunatone.png"
  },
  {
    "name": "lurantis",
    "image": "https://i.ibb.co/S0cPr1b/lurantis.png"
  },
  {
    "name": "luvdisc",
    "image": "https://i.ibb.co/9t8mZwX/luvdisc.png"
  },
  {
    "name": "luxio",
    "image": "https://i.ibb.co/JqcNdqn/luxio.png"
  },
  {
    "name": "luxray",
    "image": "https://i.ibb.co/bmwczGF/luxray.png"
  },
  {
    "name": "lycanroc-midday",
    "image": "https://i.ibb.co/sWWrXsB/lycanroc-midday.png"
  },
  {
    "name": "machamp",
    "image": "https://i.ibb.co/QPjt1C8/machamp.png"
  },
  {
    "name": "machoke",
    "image": "https://i.ibb.co/wwx80v4/machoke.png"
  },
  {
    "name": "machop",
    "image": "https://i.ibb.co/DVDMRc8/machop.png"
  },
  {
    "name": "magby",
    "image": "https://i.ibb.co/QXq6CHv/magby.png"
  },
  {
    "name": "magcargo",
    "image": "https://i.ibb.co/VjHQSXy/magcargo.png"
  },
  {
    "name": "magearna",
    "image": "https://i.ibb.co/MCytrW1/magearna.png"
  },
  {
    "name": "magikarp",
    "image": "https://i.ibb.co/K0sbdgS/magikarp.png"
  },
  {
    "name": "magmar",
    "image": "https://i.ibb.co/LJv3pq6/magmar.png"
  },
  {
    "name": "magmortar",
    "image": "https://i.ibb.co/Jrrctgf/magmortar.png"
  },
  {
    "name": "magnemite",
    "image": "https://i.ibb.co/YtnkTdB/magnemite.png"
  },
  {
    "name": "magneton",
    "image": "https://i.ibb.co/zm9DNPY/magneton.png"
  },
  {
    "name": "magnezone",
    "image": "https://i.ibb.co/Gx8gFjQ/magnezone.png"
  },
  {
    "name": "makuhita",
    "image": "https://i.ibb.co/Dzm0s3N/makuhita.png"
  },
  {
    "name": "malamar",
    "image": "https://i.ibb.co/Cw5p4St/malamar.png"
  },
  {
    "name": "mamoswine",
    "image": "https://i.ibb.co/nP7jF13/mamoswine.png"
  },
  {
    "name": "manaphy",
    "image": "https://i.ibb.co/GRpg8CS/manaphy.png"
  },
  {
    "name": "mandibuzz",
    "image": "https://i.ibb.co/Zc7pCT5/mandibuzz.png"
  },
  {
    "name": "manectric",
    "image": "https://i.ibb.co/6gwxSLR/manectric.png"
  },
  {
    "name": "mankey",
    "image": "https://i.ibb.co/3vPbtS3/mankey.png"
  },
  {
    "name": "mantine",
    "image": "https://i.ibb.co/7bG1q0P/mantine.png"
  },
  {
    "name": "mantyke",
    "image": "https://i.ibb.co/R3B4z9f/mantyke.png"
  },
  {
    "name": "maractus",
    "image": "https://i.ibb.co/k0TTM5J/maractus.png"
  },
  {
    "name": "mareanie",
    "image": "https://i.ibb.co/QD66WSK/mareanie.png"
  },
  {
    "name": "mareep",
    "image": "https://i.ibb.co/bzKcQxS/mareep.png"
  },
  {
    "name": "marill",
    "image": "https://i.ibb.co/S6fCtdX/marill.png"
  },
  {
    "name": "marowak",
    "image": "https://i.ibb.co/n3CHDs7/marowak.png"
  },
  {
    "name": "marshadow",
    "image": "https://i.ibb.co/FVPnhh4/marshadow.png"
  },
  {
    "name": "marshtomp",
    "image": "https://i.ibb.co/V3rfcf5/marshtomp.png"
  },
  {
    "name": "masquerain",
    "image": "https://i.ibb.co/G91b8nR/masquerain.png"
  },
  {
    "name": "mawile",
    "image": "https://i.ibb.co/64DW43q/mawile.png"
  },
  {
    "name": "medicham",
    "image": "https://i.ibb.co/FWvQn2M/medicham.png"
  },
  {
    "name": "meditite",
    "image": "https://i.ibb.co/swd6Qwg/meditite.png"
  },
  {
    "name": "meganium",
    "image": "https://i.ibb.co/p1njtqY/meganium.png"
  },
  {
    "name": "melmetal",
    "image": "https://i.ibb.co/BB4jRz5/melmetal.png"
  },
  {
    "name": "meloetta-aria",
    "image": "https://i.ibb.co/tP0wMQk/meloetta-aria.png"
  },
  {
    "name": "meltan",
    "image": "https://i.ibb.co/wsYvrQS/meltan.png"
  },
  {
    "name": "meowstic-male",
    "image": "https://i.ibb.co/9cXbVD8/meowstic-male.png"
  },
  {
    "name": "meowth",
    "image": "https://i.ibb.co/XYnTwxj/meowth.png"
  },
  {
    "name": "mesprit",
    "image": "https://i.ibb.co/YbW0t9s/mesprit.png"
  },
  {
    "name": "metagross",
    "image": "https://i.ibb.co/Ph6g2b5/metagross.png"
  },
  {
    "name": "metang",
    "image": "https://i.ibb.co/4sr8Z3J/metang.png"
  },
  {
    "name": "metapod",
    "image": "https://i.ibb.co/xmb9MCR/metapod.png"
  },
  {
    "name": "mew",
    "image": "https://i.ibb.co/8YryvG9/mew.png"
  },
  {
    "name": "mewtwo",
    "image": "https://i.ibb.co/R4cz9dy/mewtwo.png"
  },
  {
    "name": "mienfoo",
    "image": "https://i.ibb.co/BjG6dSd/mienfoo.png"
  },
  {
    "name": "mienshao",
    "image": "https://i.ibb.co/875HpPr/mienshao.png"
  },
  {
    "name": "mightyena",
    "image": "https://i.ibb.co/rMRyNdd/mightyena.png"
  },
  {
    "name": "milcery",
    "image": "https://i.ibb.co/xjL9P6z/milcery.png"
  },
  {
    "name": "milotic",
    "image": "https://i.ibb.co/ydSdx5j/milotic.png"
  },
  {
    "name": "miltank",
    "image": "https://i.ibb.co/F6sn5fF/miltank.png"
  },
  {
    "name": "mime-jr",
    "image": "https://i.ibb.co/zSKqbJM/mime-jr.png"
  },
  {
    "name": "mimikyu-disguised",
    "image": "https://i.ibb.co/xmfWHC8/mimikyu-disguised.png"
  },
  {
    "name": "minccino",
    "image": "https://i.ibb.co/CHCk6Ct/minccino.png"
  },
  {
    "name": "minior-red-meteor",
    "image": "https://i.ibb.co/vxQ7RLt/minior-red-meteor.png"
  },
  {
    "name": "minun",
    "image": "https://i.ibb.co/68fbh4H/minun.png"
  },
  {
    "name": "misdreavus",
    "image": "https://i.ibb.co/gwPbH83/misdreavus.png"
  },
  {
    "name": "mismagius",
    "image": "https://i.ibb.co/Bgsb8t5/mismagius.png"
  },
  {
    "name": "moltres",
    "image": "https://i.ibb.co/1JtsTGn/moltres.png"
  },
  {
    "name": "monferno",
    "image": "https://i.ibb.co/nQQNPMx/monferno.png"
  },
  {
    "name": "morelull",
    "image": "https://i.ibb.co/sKyv03w/morelull.png"
  },
  {
    "name": "morgrem",
    "image": "https://i.ibb.co/8YpJbjs/morgrem.png"
  },
  {
    "name": "morpeko-full-belly",
    "image": "https://i.ibb.co/v4whW27/morpeko-full-belly.png"
  },
  {
    "name": "mothim-plant",
    "image": "https://i.ibb.co/cvQv972/mothim-plant.png"
  },
  {
    "name": "mr-mime",
    "image": "https://i.ibb.co/vs0mBZ5/mr-mime.png"
  },
  {
    "name": "mr-rime",
    "image": "https://i.ibb.co/xjR8Kq0/mr-rime.png"
  },
  {
    "name": "mudbray",
    "image": "https://i.ibb.co/b3Tnrc0/mudbray.png"
  },
  {
    "name": "mudkip",
    "image": "https://i.ibb.co/wshtrcd/mudkip.png"
  },
  {
    "name": "mudsdale",
    "image": "https://i.ibb.co/MD73sVB/mudsdale.png"
  },
  {
    "name": "muk",
    "image": "https://i.ibb.co/VTZ2dkq/muk.png"
  },
  {
    "name": "munchlax",
    "image": "https://i.ibb.co/ZWCGWF3/munchlax.png"
  },
  {
    "name": "munna",
    "image": "https://i.ibb.co/9rZ57sF/munna.png"
  },
  {
    "name": "murkrow",
    "image": "https://i.ibb.co/cTtZx7g/murkrow.png"
  },
  {
    "name": "musharna",
    "image": "https://i.ibb.co/yFKwDCj/musharna.png"
  },
  {
    "name": "naganadel",
    "image": "https://i.ibb.co/s9jkF9x/naganadel.png"
  },
  {
    "name": "natu",
    "image": "https://i.ibb.co/D9hJWdh/natu.png"
  },
  {
    "name": "necrozma",
    "image": "https://i.ibb.co/Wg8cXn1/necrozma.png"
  },
  {
    "name": "nickit",
    "image": "https://i.ibb.co/pd9DCBb/nickit.png"
  },
  {
    "name": "nidoking",
    "image": "https://i.ibb.co/bgzBXzM/nidoking.png"
  },
  {
    "name": "nidoqueen",
    "image": "https://i.ibb.co/nR4HNMn/nidoqueen.png"
  },
  {
    "name": "nidoran-f",
    "image": "https://i.ibb.co/MpYLSYb/nidoran-f.png"
  },
  {
    "name": "nidoran-m",
    "image": "https://i.ibb.co/Yy8bvNx/nidoran-m.png"
  },
  {
    "name": "nidorina",
    "image": "https://i.ibb.co/3zkRxSt/nidorina.png"
  },
  {
    "name": "nidorino",
    "image": "https://i.ibb.co/gDZ9rZH/nidorino.png"
  },
  {
    "name": "nihilego",
    "image": "https://i.ibb.co/k1c9ZJh/nihilego.png"
  },
  {
    "name": "nincada",
    "image": "https://i.ibb.co/09x3sQw/nincada.png"
  },
  {
    "name": "ninetales",
    "image": "https://i.ibb.co/vQ8f4Hg/ninetales.png"
  },
  {
    "name": "ninjask",
    "image": "https://i.ibb.co/djz6RyJ/ninjask.png"
  },
  {
    "name": "noctowl",
    "image": "https://i.ibb.co/NNjTK1k/noctowl.png"
  },
  {
    "name": "noibat",
    "image": "https://i.ibb.co/Jjvd6W8/noibat.png"
  },
  {
    "name": "noivern",
    "image": "https://i.ibb.co/bWTNTZg/noivern.png"
  },
  {
    "name": "nosepass",
    "image": "https://i.ibb.co/CB77WhZ/nosepass.png"
  },
  {
    "name": "numel",
    "image": "https://i.ibb.co/VHNk4nL/numel.png"
  },
  {
    "name": "nuzleaf",
    "image": "https://i.ibb.co/K6T7tbW/nuzleaf.png"
  },
  {
    "name": "obstagoon",
    "image": "https://i.ibb.co/RzzRhfT/obstagoon.png"
  },
  {
    "name": "octillery",
    "image": "https://i.ibb.co/L9HNDC1/octillery.png"
  },
  {
    "name": "oddish",
    "image": "https://i.ibb.co/xXydPY5/oddish.png"
  },
  {
    "name": "omanyte",
    "image": "https://i.ibb.co/drKB5mL/omanyte.png"
  },
  {
    "name": "omastar",
    "image": "https://i.ibb.co/fdvzCfS/omastar.png"
  },
  {
    "name": "onix",
    "image": "https://i.ibb.co/CzXvVbg/onix.png"
  },
  {
    "name": "oranguru",
    "image": "https://i.ibb.co/YkpD8VD/oranguru.png"
  },
  {
    "name": "orbeetle",
    "image": "https://i.ibb.co/gd48WmZ/orbeetle.png"
  },
  {
    "name": "oricorio-baile",
    "image": "https://i.ibb.co/mNr3RZC/oricorio-baile.png"
  },
  {
    "name": "oshawott",
    "image": "https://i.ibb.co/hDXK1pd/oshawott.png"
  },
  {
    "name": "pachirisu",
    "image": "https://i.ibb.co/ccGtY3S/pachirisu.png"
  },
  {
    "name": "palkia",
    "image": "https://i.ibb.co/tQ4PNrj/palkia.png"
  },
  {
    "name": "palossand",
    "image": "https://i.ibb.co/pWMtc1n/palossand.png"
  },
  {
    "name": "palpitoad",
    "image": "https://i.ibb.co/2hNYH0s/palpitoad.png"
  },
  {
    "name": "pancham",
    "image": "https://i.ibb.co/44PpRzp/pancham.png"
  },
  {
    "name": "pangoro",
    "image": "https://i.ibb.co/Y881zLS/pangoro.png"
  },
  {
    "name": "panpour",
    "image": "https://i.ibb.co/72wMw6g/panpour.png"
  },
  {
    "name": "pansage",
    "image": "https://i.ibb.co/y4R4LcS/pansage.png"
  },
  {
    "name": "pansear",
    "image": "https://i.ibb.co/4Mgy4CK/pansear.png"
  },
  {
    "name": "paras",
    "image": "https://i.ibb.co/HNqnVNQ/paras.png"
  },
  {
    "name": "parasect",
    "image": "https://i.ibb.co/QCprdMY/parasect.png"
  },
  {
    "name": "passimian",
    "image": "https://i.ibb.co/jzVcSKh/passimian.png"
  },
  {
    "name": "patrat",
    "image": "https://i.ibb.co/X3PNQyH/patrat.png"
  },
  {
    "name": "pawniard",
    "image": "https://i.ibb.co/CwXyPC9/pawniard.png"
  },
  {
    "name": "pelipper",
    "image": "https://i.ibb.co/H4DLTW1/pelipper.png"
  },
  {
    "name": "perrserker",
    "image": "https://i.ibb.co/v113Xpp/perrserker.png"
  },
  {
    "name": "persian",
    "image": "https://i.ibb.co/Vq5fMmm/persian.png"
  },
  {
    "name": "petilil",
    "image": "https://i.ibb.co/ZKVgprn/petilil.png"
  },
  {
    "name": "phanpy",
    "image": "https://i.ibb.co/16DzMKW/phanpy.png"
  },
  {
    "name": "phantump",
    "image": "https://i.ibb.co/8YfNwzs/phantump.png"
  },
  {
    "name": "pheromosa",
    "image": "https://i.ibb.co/Prmq7Yf/pheromosa.png"
  },
  {
    "name": "phione",
    "image": "https://i.ibb.co/8mN7MDL/phione.png"
  },
  {
    "name": "pichu",
    "image": "https://i.ibb.co/93Gtyty/pichu.png"
  },
  {
    "name": "pidgeot",
    "image": "https://i.ibb.co/jfhbCPJ/pidgeot.png"
  },
  {
    "name": "pidgeotto",
    "image": "https://i.ibb.co/CzmMF2C/pidgeotto.png"
  },
  {
    "name": "pidgey",
    "image": "https://i.ibb.co/HFKhyvd/pidgey.png"
  },
  {
    "name": "pidove",
    "image": "https://i.ibb.co/sJqFVT4/pidove.png"
  },
  {
    "name": "pignite",
    "image": "https://i.ibb.co/q7gxDSM/pignite.png"
  },
  {
    "name": "pikachu",
    "image": "https://i.ibb.co/QQtWjyj/pikachu.png"
  },
  {
    "name": "pikipek",
    "image": "https://i.ibb.co/d2KVkFN/pikipek.png"
  },
  {
    "name": "piloswine",
    "image": "https://i.ibb.co/SsRLT15/piloswine.png"
  },
  {
    "name": "pincurchin",
    "image": "https://i.ibb.co/K5gZFGs/pincurchin.png"
  },
  {
    "name": "pineco",
    "image": "https://i.ibb.co/g9yVt3b/pineco.png"
  },
  {
    "name": "pinsir",
    "image": "https://i.ibb.co/WfcBnRW/pinsir.png"
  },
  {
    "name": "piplup",
    "image": "https://i.ibb.co/Q9YbVGt/piplup.png"
  },
  {
    "name": "plusle",
    "image": "https://i.ibb.co/Y7qSmSM/plusle.png"
  },
  {
    "name": "poipole",
    "image": "https://i.ibb.co/J22MJ3m/poipole.png"
  },
  {
    "name": "politoed",
    "image": "https://i.ibb.co/9NZsn58/politoed.png"
  },
  {
    "name": "poliwag",
    "image": "https://i.ibb.co/1n6ZNPv/poliwag.png"
  },
  {
    "name": "poliwhirl",
    "image": "https://i.ibb.co/XVcX0P5/poliwhirl.png"
  },
  {
    "name": "poliwrath",
    "image": "https://i.ibb.co/vc3S9vy/poliwrath.png"
  },
  {
    "name": "polteageist-phony",
    "image": "https://i.ibb.co/WFzyZrp/polteageist-phony.png"
  },
  {
    "name": "ponyta",
    "image": "https://i.ibb.co/h1B5Whb/ponyta.png"
  },
  {
    "name": "poochyena",
    "image": "https://i.ibb.co/HC7LqKL/poochyena.png"
  },
  {
    "name": "popplio",
    "image": "https://i.ibb.co/yVPZTz8/popplio.png"
  },
  {
    "name": "porygon",
    "image": "https://i.ibb.co/19fYh5P/porygon.png"
  },
  {
    "name": "porygon2",
    "image": "https://i.ibb.co/s15nLH3/porygon2.png"
  },
  {
    "name": "porygon-z",
    "image": "https://i.ibb.co/pL3BV7G/porygon-z.png"
  },
  {
    "name": "primarina",
    "image": "https://i.ibb.co/zhw0yXp/primarina.png"
  },
  {
    "name": "primeape",
    "image": "https://i.ibb.co/5x7ptJY/primeape.png"
  },
  {
    "name": "prinplup",
    "image": "https://i.ibb.co/8gk1PnG/prinplup.png"
  },
  {
    "name": "probopass",
    "image": "https://i.ibb.co/M2ZCw8h/probopass.png"
  },
  {
    "name": "psyduck",
    "image": "https://i.ibb.co/rMDH9q8/psyduck.png"
  },
  {
    "name": "pumpkaboo-average",
    "image": "https://i.ibb.co/9wNVz4P/pumpkaboo-average.png"
  },
  {
    "name": "pupitar",
    "image": "https://i.ibb.co/0jhTQ2c/pupitar.png"
  },
  {
    "name": "purrloin",
    "image": "https://i.ibb.co/7b8VGqG/purrloin.png"
  },
  {
    "name": "purugly",
    "image": "https://i.ibb.co/yN0qc3X/purugly.png"
  },
  {
    "name": "pyroar",
    "image": "https://i.ibb.co/PcGnhkC/pyroar.png"
  },
  {
    "name": "pyukumuku",
    "image": "https://i.ibb.co/ydx4gqV/pyukumuku.png"
  },
  {
    "name": "quagsire",
    "image": "https://i.ibb.co/bHH642g/quagsire.png"
  },
  {
    "name": "quilava",
    "image": "https://i.ibb.co/r3WWqs2/quilava.png"
  },
  {
    "name": "quilladin",
    "image": "https://i.ibb.co/JH1VzcH/quilladin.png"
  },
  {
    "name": "qwilfish",
    "image": "https://i.ibb.co/xDDLJDk/qwilfish.png"
  },
  {
    "name": "raboot",
    "image": "https://i.ibb.co/5jfqy1x/raboot.png"
  },
  {
    "name": "raichu",
    "image": "https://i.ibb.co/82JvNbs/raichu.png"
  },
  {
    "name": "raikou",
    "image": "https://i.ibb.co/xHzkGQb/raikou.png"
  },
  {
    "name": "ralts",
    "image": "https://i.ibb.co/fFxVr5m/ralts.png"
  },
  {
    "name": "rampardos",
    "image": "https://i.ibb.co/2632swN/rampardos.png"
  },
  {
    "name": "rapidash",
    "image": "https://i.ibb.co/zQ68XCf/rapidash.png"
  },
  {
    "name": "raticate",
    "image": "https://i.ibb.co/QYvNF5k/raticate.png"
  },
  {
    "name": "rattata",
    "image": "https://i.ibb.co/bPFh9N4/rattata.png"
  },
  {
    "name": "rayquaza",
    "image": "https://i.ibb.co/W0Ptpz5/rayquaza.png"
  },
  {
    "name": "regice",
    "image": "https://i.ibb.co/X5kRvhs/regice.png"
  },
  {
    "name": "regidrago",
    "image": "https://i.ibb.co/2sLBWsf/regidrago.png"
  },
  {
    "name": "regieleki",
    "image": "https://i.ibb.co/0qS9LxR/regieleki.png"
  },
  {
    "name": "regigigas",
    "image": "https://i.ibb.co/7J43Wvv/regigigas.png"
  },
  {
    "name": "regirock",
    "image": "https://i.ibb.co/7pjDGYs/regirock.png"
  },
  {
    "name": "registeel",
    "image": "https://i.ibb.co/2t6dvX4/registeel.png"
  },
  {
    "name": "relicanth",
    "image": "https://i.ibb.co/pbb7fj1/relicanth.png"
  },
  {
    "name": "remoraid",
    "image": "https://i.ibb.co/h7nX36L/remoraid.png"
  },
  {
    "name": "reshiram",
    "image": "https://i.ibb.co/xjDCyGc/reshiram.png"
  },
  {
    "name": "reuniclus",
    "image": "https://i.ibb.co/CW3SG6B/reuniclus.png"
  },
  {
    "name": "rhydon",
    "image": "https://i.ibb.co/614vcy9/rhydon.png"
  },
  {
    "name": "rhyhorn",
    "image": "https://i.ibb.co/ccgnPrj/rhyhorn.png"
  },
  {
    "name": "rhyperior",
    "image": "https://i.ibb.co/6w5Gq6q/rhyperior.png"
  },
  {
    "name": "ribombee",
    "image": "https://i.ibb.co/sbDVS7Y/ribombee.png"
  },
  {
    "name": "rillaboom",
    "image": "https://i.ibb.co/kmwGkPG/rillaboom.png"
  },
  {
    "name": "riolu",
    "image": "https://i.ibb.co/fN84Cy3/riolu.png"
  },
  {
    "name": "rockruff",
    "image": "https://i.ibb.co/25M0Rgx/rockruff.png"
  },
  {
    "name": "roggenrola",
    "image": "https://i.ibb.co/rt9VpS8/roggenrola.png"
  },
  {
    "name": "rolycoly",
    "image": "https://i.ibb.co/nzx5BDF/rolycoly.png"
  },
  {
    "name": "rookidee",
    "image": "https://i.ibb.co/zrqxqpC/rookidee.png"
  },
  {
    "name": "roselia",
    "image": "https://i.ibb.co/XkQrqPC/roselia.png"
  },
  {
    "name": "roserade",
    "image": "https://i.ibb.co/ZVttXvz/roserade.png"
  },
  {
    "name": "rotom",
    "image": "https://i.ibb.co/br5RHDw/rotom.png"
  },
  {
    "name": "rowlet",
    "image": "https://i.ibb.co/f8FxTKc/rowlet.png"
  },
  {
    "name": "rufflet",
    "image": "https://i.ibb.co/Hn4qfLL/rufflet.png"
  },
  {
    "name": "runerigus",
    "image": "https://i.ibb.co/kcfQy1j/runerigus.png"
  },
  {
    "name": "sableye",
    "image": "https://i.ibb.co/KbQ8jgS/sableye.png"
  },
  {
    "name": "salamence",
    "image": "https://i.ibb.co/bJbVzk8/salamence.png"
  },
  {
    "name": "salandit",
    "image": "https://i.ibb.co/Cnd54Ly/salandit.png"
  },
  {
    "name": "salazzle",
    "image": "https://i.ibb.co/JvDfWFC/salazzle.png"
  },
  {
    "name": "samurott",
    "image": "https://i.ibb.co/hLyjRrQ/samurott.png"
  },
  {
    "name": "sandaconda",
    "image": "https://i.ibb.co/svRXLBW/sandaconda.png"
  },
  {
    "name": "sandile",
    "image": "https://i.ibb.co/R08943w/sandile.png"
  },
  {
    "name": "sandshrew",
    "image": "https://i.ibb.co/vjBNZm7/sandshrew.png"
  },
  {
    "name": "sandslash",
    "image": "https://i.ibb.co/D12qSfC/sandslash.png"
  },
  {
    "name": "sandygast",
    "image": "https://i.ibb.co/s2hGyg2/sandygast.png"
  },
  {
    "name": "sawk",
    "image": "https://i.ibb.co/d4ZCCw3/sawk.png"
  },
  {
    "name": "sawsbuck-spring",
    "image": "https://i.ibb.co/nsLCdfN/sawsbuck-spring.png"
  },
  {
    "name": "scatterbug-icy-snow",
    "image": "https://i.ibb.co/dMv1dJ7/scatterbug-icy-snow.png"
  },
  {
    "name": "sceptile",
    "image": "https://i.ibb.co/RYLw1fP/sceptile.png"
  },
  {
    "name": "scizor",
    "image": "https://i.ibb.co/f1PP6VW/scizor.png"
  },
  {
    "name": "scolipede",
    "image": "https://i.ibb.co/qRqt52B/scolipede.png"
  },
  {
    "name": "scorbunny",
    "image": "https://i.ibb.co/1f81Nc7/scorbunny.png"
  },
  {
    "name": "scrafty",
    "image": "https://i.ibb.co/pXmkfxP/scrafty.png"
  },
  {
    "name": "scraggy",
    "image": "https://i.ibb.co/pK50V9s/scraggy.png"
  },
  {
    "name": "scyther",
    "image": "https://i.ibb.co/cwRL110/scyther.png"
  },
  {
    "name": "seadra",
    "image": "https://i.ibb.co/NyH8LDt/seadra.png"
  },
  {
    "name": "seaking",
    "image": "https://i.ibb.co/8MhMD0P/seaking.png"
  },
  {
    "name": "sealeo",
    "image": "https://i.ibb.co/7yRtpCg/sealeo.png"
  },
  {
    "name": "seedot",
    "image": "https://i.ibb.co/ph9p97D/seedot.png"
  },
  {
    "name": "seel",
    "image": "https://i.ibb.co/92knqK8/seel.png"
  },
  {
    "name": "seismitoad",
    "image": "https://i.ibb.co/1fyCkMm/seismitoad.png"
  },
  {
    "name": "sentret",
    "image": "https://i.ibb.co/sysJTdw/sentret.png"
  },
  {
    "name": "serperior",
    "image": "https://i.ibb.co/9VV3Nj5/serperior.png"
  },
  {
    "name": "servine",
    "image": "https://i.ibb.co/j39xxJg/servine.png"
  },
  {
    "name": "seviper",
    "image": "https://i.ibb.co/pzB1wYB/seviper.png"
  },
  {
    "name": "sewaddle",
    "image": "https://i.ibb.co/bbsw1Gs/sewaddle.png"
  },
  {
    "name": "sharpedo",
    "image": "https://i.ibb.co/TkDx1np/sharpedo.png"
  },
  {
    "name": "shaymin-land",
    "image": "https://i.ibb.co/yFXZwz3/shaymin-land.png"
  },
  {
    "name": "shedinja",
    "image": "https://i.ibb.co/0Gt64VJ/shedinja.png"
  },
  {
    "name": "shelgon",
    "image": "https://i.ibb.co/WK67WM2/shelgon.png"
  },
  {
    "name": "shellder",
    "image": "https://i.ibb.co/jk9nCnD/shellder.png"
  },
  {
    "name": "shellos-west",
    "image": "https://i.ibb.co/HVV5WqN/shellos-west.png"
  },
  {
    "name": "shelmet",
    "image": "https://i.ibb.co/fC0x2nm/shelmet.png"
  },
  {
    "name": "shieldon",
    "image": "https://i.ibb.co/VJZC2DZ/shieldon.png"
  },
  {
    "name": "shiftry",
    "image": "https://i.ibb.co/F7Qygk0/shiftry.png"
  },
  {
    "name": "shiinotic",
    "image": "https://i.ibb.co/x7s1Fw2/shiinotic.png"
  },
  {
    "name": "shinx",
    "image": "https://i.ibb.co/df8BqnJ/shinx.png"
  },
  {
    "name": "shroomish",
    "image": "https://i.ibb.co/hV4PQ9S/shroomish.png"
  },
  {
    "name": "shuckle",
    "image": "https://i.ibb.co/3mCT2Jt/shuckle.png"
  },
  {
    "name": "shuppet",
    "image": "https://i.ibb.co/3cVZYdW/shuppet.png"
  },
  {
    "name": "sigilyph",
    "image": "https://i.ibb.co/jyYcDHm/sigilyph.png"
  },
  {
    "name": "silcoon",
    "image": "https://i.ibb.co/PhLQ6xn/silcoon.png"
  },
  {
    "name": "silicobra",
    "image": "https://i.ibb.co/TK0pT55/silicobra.png"
  },
  {
    "name": "silvally-normal",
    "image": "https://i.ibb.co/m88RBDR/silvally-normal.png"
  },
  {
    "name": "simipour",
    "image": "https://i.ibb.co/gyfvcVN/simipour.png"
  },
  {
    "name": "simisage",
    "image": "https://i.ibb.co/yS54Czc/simisage.png"
  },
  {
    "name": "simisear",
    "image": "https://i.ibb.co/BZCsRrd/simisear.png"
  },
  {
    "name": "sinistea-phony",
    "image": "https://i.ibb.co/bBMn9YX/sinistea-phony.png"
  },
  {
    "name": "sirfetchd",
    "image": "https://i.ibb.co/4ZBbDb0/sirfetchd.png"
  },
  {
    "name": "sizzlipede",
    "image": "https://i.ibb.co/DDQQmZy/sizzlipede.png"
  },
  {
    "name": "skarmory",
    "image": "https://i.ibb.co/n13RPDH/skarmory.png"
  },
  {
    "name": "skiddo",
    "image": "https://i.ibb.co/T2NZzFj/skiddo.png"
  },
  {
    "name": "skiploom",
    "image": "https://i.ibb.co/qC2yxSb/skiploom.png"
  },
  {
    "name": "skitty",
    "image": "https://i.ibb.co/TtZntPh/skitty.png"
  },
  {
    "name": "skorupi",
    "image": "https://i.ibb.co/s16j8qd/skorupi.png"
  },
  {
    "name": "skrelp",
    "image": "https://i.ibb.co/hccJCC7/skrelp.png"
  },
  {
    "name": "skuntank",
    "image": "https://i.ibb.co/BPdWr6F/skuntank.png"
  },
  {
    "name": "skwovet",
    "image": "https://i.ibb.co/GFJYRKX/skwovet.png"
  },
  {
    "name": "slaking",
    "image": "https://i.ibb.co/CVcZWCc/slaking.png"
  },
  {
    "name": "slakoth",
    "image": "https://i.ibb.co/VJjQK58/slakoth.png"
  },
  {
    "name": "sliggoo",
    "image": "https://i.ibb.co/TwrVrKR/sliggoo.png"
  },
  {
    "name": "slowbro",
    "image": "https://i.ibb.co/drsSF21/slowbro.png"
  },
  {
    "name": "slowking",
    "image": "https://i.ibb.co/MshxzFV/slowking.png"
  },
  {
    "name": "slowpoke",
    "image": "https://i.ibb.co/6PmzgPM/slowpoke.png"
  },
  {
    "name": "slugma",
    "image": "https://i.ibb.co/tb8qmyZ/slugma.png"
  },
  {
    "name": "slurpuff",
    "image": "https://i.ibb.co/pQdpz2f/slurpuff.png"
  },
  {
    "name": "smeargle",
    "image": "https://i.ibb.co/sCTZ2gb/smeargle.png"
  },
  {
    "name": "smoochum",
    "image": "https://i.ibb.co/6HJM9gT/smoochum.png"
  },
  {
    "name": "sneasel",
    "image": "https://i.ibb.co/N7Y3Ngk/sneasel.png"
  },
  {
    "name": "snivy",
    "image": "https://i.ibb.co/52fLT8s/snivy.png"
  },
  {
    "name": "snom",
    "image": "https://i.ibb.co/frX2kxq/snom.png"
  },
  {
    "name": "snorlax",
    "image": "https://i.ibb.co/M7WT4rs/snorlax.png"
  },
  {
    "name": "snorunt",
    "image": "https://i.ibb.co/cLKQRJ2/snorunt.png"
  },
  {
    "name": "snover",
    "image": "https://i.ibb.co/Jr8XN2f/snover.png"
  },
  {
    "name": "snubbull",
    "image": "https://i.ibb.co/xFCpP6b/snubbull.png"
  },
  {
    "name": "sobble",
    "image": "https://i.ibb.co/MVr7vDJ/sobble.png"
  },
  {
    "name": "solgaleo",
    "image": "https://i.ibb.co/Gknc1nW/solgaleo.png"
  },
  {
    "name": "solosis",
    "image": "https://i.ibb.co/vH7xgGh/solosis.png"
  },
  {
    "name": "solrock",
    "image": "https://i.ibb.co/khx8xXC/solrock.png"
  },
  {
    "name": "spearow",
    "image": "https://i.ibb.co/mzCNnBn/spearow.png"
  },
  {
    "name": "spectrier",
    "image": "https://i.ibb.co/yfjyNpZ/spectrier.png"
  },
  {
    "name": "spewpa-icy-snow",
    "image": "https://i.ibb.co/qY1q0Zz/spewpa-icy-snow.png"
  },
  {
    "name": "spheal",
    "image": "https://i.ibb.co/51WkrHj/spheal.png"
  },
  {
    "name": "spinarak",
    "image": "https://i.ibb.co/kKb45Hc/spinarak.png"
  },
  {
    "name": "spinda",
    "image": "https://i.ibb.co/xz8RhvN/spinda.png"
  },
  {
    "name": "spiritomb",
    "image": "https://i.ibb.co/F39Cdq8/spiritomb.png"
  },
  {
    "name": "spoink",
    "image": "https://i.ibb.co/30jMScN/spoink.png"
  },
  {
    "name": "spritzee",
    "image": "https://i.ibb.co/NTFhsGL/spritzee.png"
  },
  {
    "name": "squirtle",
    "image": "https://i.ibb.co/HGfnZZV/squirtle.png"
  },
  {
    "name": "stakataka",
    "image": "https://i.ibb.co/HCnvmC3/stakataka.png"
  },
  {
    "name": "stantler",
    "image": "https://i.ibb.co/FKDPMPt/stantler.png"
  },
  {
    "name": "staraptor",
    "image": "https://i.ibb.co/ws1769Q/staraptor.png"
  },
  {
    "name": "staravia",
    "image": "https://i.ibb.co/drX6rvT/staravia.png"
  },
  {
    "name": "starly",
    "image": "https://i.ibb.co/MVNvcGQ/starly.png"
  },
  {
    "name": "starmie",
    "image": "https://i.ibb.co/W25dJ6x/starmie.png"
  },
  {
    "name": "staryu",
    "image": "https://i.ibb.co/ZGqDXxB/staryu.png"
  },
  {
    "name": "steelix",
    "image": "https://i.ibb.co/L5wkFD5/steelix.png"
  },
  {
    "name": "steenee",
    "image": "https://i.ibb.co/mbjcdyT/steenee.png"
  },
  {
    "name": "stonjourner",
    "image": "https://i.ibb.co/rsJcDXP/stonjourner.png"
  },
  {
    "name": "stoutland",
    "image": "https://i.ibb.co/fnB9QRP/stoutland.png"
  },
  {
    "name": "stufful",
    "image": "https://i.ibb.co/cCvWf90/stufful.png"
  },
  {
    "name": "stunfisk",
    "image": "https://i.ibb.co/F5JGrk8/stunfisk.png"
  },
  {
    "name": "stunky",
    "image": "https://i.ibb.co/Dzqkm4j/stunky.png"
  },
  {
    "name": "sudowoodo",
    "image": "https://i.ibb.co/F7THNfs/sudowoodo.png"
  },
  {
    "name": "suicune",
    "image": "https://i.ibb.co/WPfgB48/suicune.png"
  },
  {
    "name": "sunflora",
    "image": "https://i.ibb.co/606RKCn/sunflora.png"
  },
  {
    "name": "sunkern",
    "image": "https://i.ibb.co/rxyyGDr/sunkern.png"
  },
  {
    "name": "surskit",
    "image": "https://i.ibb.co/LJmg9G0/surskit.png"
  },
  {
    "name": "swablu",
    "image": "https://i.ibb.co/ZMZ4qHL/swablu.png"
  },
  {
    "name": "swadloon",
    "image": "https://i.ibb.co/hchwktB/swadloon.png"
  },
  {
    "name": "swalot",
    "image": "https://i.ibb.co/mccg0ZK/swalot.png"
  },
  {
    "name": "swampert",
    "image": "https://i.ibb.co/kgVvvxX/swampert.png"
  },
  {
    "name": "swanna",
    "image": "https://i.ibb.co/2KYNwX6/swanna.png"
  },
  {
    "name": "swellow",
    "image": "https://i.ibb.co/R3CvCYy/swellow.png"
  },
  {
    "name": "swinub",
    "image": "https://i.ibb.co/TbNBSvz/swinub.png"
  },
  {
    "name": "swirlix",
    "image": "https://i.ibb.co/BtbtGNv/swirlix.png"
  },
  {
    "name": "swoobat",
    "image": "https://i.ibb.co/qx2f3vP/swoobat.png"
  },
  {
    "name": "sylveon",
    "image": "https://i.ibb.co/kGDLgCB/sylveon.png"
  },
  {
    "name": "taillow",
    "image": "https://i.ibb.co/FxFWSP6/taillow.png"
  },
  {
    "name": "talonflame",
    "image": "https://i.ibb.co/YL1t8G1/talonflame.png"
  },
  {
    "name": "tangela",
    "image": "https://i.ibb.co/L6GGdnB/tangela.png"
  },
  {
    "name": "tangrowth",
    "image": "https://i.ibb.co/mqh5pk8/tangrowth.png"
  },
  {
    "name": "tapu-bulu",
    "image": "https://i.ibb.co/sWDRBth/tapu-bulu.png"
  },
  {
    "name": "tapu-fini",
    "image": "https://i.ibb.co/cLHP5dg/tapu-fini.png"
  },
  {
    "name": "tapu-koko",
    "image": "https://i.ibb.co/VWJn7fM/tapu-koko.png"
  },
  {
    "name": "tapu-lele",
    "image": "https://i.ibb.co/6P3sh8N/tapu-lele.png"
  },
  {
    "name": "tauros",
    "image": "https://i.ibb.co/TwS4r9j/tauros.png"
  },
  {
    "name": "teddiursa",
    "image": "https://i.ibb.co/C2w9rgn/teddiursa.png"
  },
  {
    "name": "tentacool",
    "image": "https://i.ibb.co/F0910L7/tentacool.png"
  },
  {
    "name": "tentacruel",
    "image": "https://i.ibb.co/jWGkrjk/tentacruel.png"
  },
  {
    "name": "tepig",
    "image": "https://i.ibb.co/7nFGf4j/tepig.png"
  },
  {
    "name": "terrakion",
    "image": "https://i.ibb.co/nkRhR5T/terrakion.png"
  },
  {
    "name": "thievul",
    "image": "https://i.ibb.co/dLg7STp/thievul.png"
  },
  {
    "name": "throh",
    "image": "https://i.ibb.co/8MX9fSp/throh.png"
  },
  {
    "name": "thundurus-incarnate",
    "image": "https://i.ibb.co/V9tyfBn/thundurus-incarnate.png"
  },
  {
    "name": "thwackey",
    "image": "https://i.ibb.co/QcRfYgV/thwackey.png"
  },
  {
    "name": "timburr",
    "image": "https://i.ibb.co/hMVz8SD/timburr.png"
  },
  {
    "name": "tirtouga",
    "image": "https://i.ibb.co/Dw299xK/tirtouga.png"
  },
  {
    "name": "togedemaru",
    "image": "https://i.ibb.co/DCVhthW/togedemaru.png"
  },
  {
    "name": "togekiss",
    "image": "https://i.ibb.co/2gn1WHG/togekiss.png"
  },
  {
    "name": "togepi",
    "image": "https://i.ibb.co/KwcXncz/togepi.png"
  },
  {
    "name": "togetic",
    "image": "https://i.ibb.co/XxHghsr/togetic.png"
  },
  {
    "name": "torchic",
    "image": "https://i.ibb.co/hdNjgs9/torchic.png"
  },
  {
    "name": "torkoal",
    "image": "https://i.ibb.co/ZVgFQFG/torkoal.png"
  },
  {
    "name": "tornadus-incarnate",
    "image": "https://i.ibb.co/vx9Z38F/tornadus-incarnate.png"
  },
  {
    "name": "torracat",
    "image": "https://i.ibb.co/jh1BDJV/torracat.png"
  },
  {
    "name": "torterra",
    "image": "https://i.ibb.co/VVY0S0Q/torterra.png"
  },
  {
    "name": "totodile",
    "image": "https://i.ibb.co/Jjj3c1K/totodile.png"
  },
  {
    "name": "toucannon",
    "image": "https://i.ibb.co/Qdv9w8c/toucannon.png"
  },
  {
    "name": "toxapex",
    "image": "https://i.ibb.co/DYXxV0H/toxapex.png"
  },
  {
    "name": "toxel",
    "image": "https://i.ibb.co/y8Qvg49/toxel.png"
  },
  {
    "name": "toxicroak",
    "image": "https://i.ibb.co/5rsTph6/toxicroak.png"
  },
  {
    "name": "toxtricity-amped",
    "image": "https://i.ibb.co/GQnk8Bp/toxtricity-amped.png"
  },
  {
    "name": "tranquill",
    "image": "https://i.ibb.co/F5JJGqF/tranquill.png"
  },
  {
    "name": "trapinch",
    "image": "https://i.ibb.co/qmY7LNG/trapinch.png"
  },
  {
    "name": "treecko",
    "image": "https://i.ibb.co/X3qbpRP/treecko.png"
  },
  {
    "name": "trevenant",
    "image": "https://i.ibb.co/PMxCcvL/trevenant.png"
  },
  {
    "name": "tropius",
    "image": "https://i.ibb.co/SNvTZzM/tropius.png"
  },
  {
    "name": "trubbish",
    "image": "https://i.ibb.co/mtwSZPS/trubbish.png"
  },
  {
    "name": "trumbeak",
    "image": "https://i.ibb.co/TTnNN1R/trumbeak.png"
  },
  {
    "name": "tsareena",
    "image": "https://i.ibb.co/gDy3r0C/tsareena.png"
  },
  {
    "name": "turtonator",
    "image": "https://i.ibb.co/GFwFf0x/turtonator.png"
  },
  {
    "name": "turtwig",
    "image": "https://i.ibb.co/2WwzyNg/turtwig.png"
  },
  {
    "name": "tympole",
    "image": "https://i.ibb.co/MZSWx1f/tympole.png"
  },
  {
    "name": "tynamo",
    "image": "https://i.ibb.co/2SmFjYk/tynamo.png"
  },
  {
    "name": "type-null",
    "image": "https://i.ibb.co/mcbxtzg/type-null.png"
  },
  {
    "name": "typhlosion",
    "image": "https://i.ibb.co/6PcQzyV/typhlosion.png"
  },
  {
    "name": "tyranitar",
    "image": "https://i.ibb.co/VCbcH4F/tyranitar.png"
  },
  {
    "name": "tyrantrum",
    "image": "https://i.ibb.co/JdXSGgS/tyrantrum.png"
  },
  {
    "name": "tyrogue",
    "image": "https://i.ibb.co/KhS7hKd/tyrogue.png"
  },
  {
    "name": "tyrunt",
    "image": "https://i.ibb.co/dGbXL6B/tyrunt.png"
  },
  {
    "name": "umbreon",
    "image": "https://i.ibb.co/HqD6Z0t/umbreon.png"
  },
  {
    "name": "unfezant",
    "image": "https://i.ibb.co/jg7pn4X/unfezant.png"
  },
  {
    "name": "unown-a",
    "image": "https://i.ibb.co/RpVH2gQ/unown-a.png"
  },
  {
    "name": "ursaring",
    "image": "https://i.ibb.co/hfSR97x/ursaring.png"
  },
  {
    "name": "urshifu-single-strike",
    "image": "https://i.ibb.co/RTdqvNz/urshifu-single-strike.png"
  },
  {
    "name": "uxie",
    "image": "https://i.ibb.co/8X3Rd92/uxie.png"
  },
  {
    "name": "vanillish",
    "image": "https://i.ibb.co/vcPVfzn/vanillish.png"
  },
  {
    "name": "vanillite",
    "image": "https://i.ibb.co/hdmwTPK/vanillite.png"
  },
  {
    "name": "vanilluxe",
    "image": "https://i.ibb.co/mDQNLJj/vanilluxe.png"
  },
  {
    "name": "vaporeon",
    "image": "https://i.ibb.co/WnVZ3Kg/vaporeon.png"
  },
  {
    "name": "venipede",
    "image": "https://i.ibb.co/4PbTNwn/venipede.png"
  },
  {
    "name": "venomoth",
    "image": "https://i.ibb.co/C9CfN85/venomoth.png"
  },
  {
    "name": "venonat",
    "image": "https://i.ibb.co/RjK7mKk/venonat.png"
  },
  {
    "name": "venusaur",
    "image": "https://i.ibb.co/CsgDRpr/venusaur.png"
  },
  {
    "name": "vespiquen",
    "image": "https://i.ibb.co/g6YzLQy/vespiquen.png"
  },
  {
    "name": "vibrava",
    "image": "https://i.ibb.co/47cjHmV/vibrava.png"
  },
  {
    "name": "victini",
    "image": "https://i.ibb.co/1K8Scf2/victini.png"
  },
  {
    "name": "victreebel",
    "image": "https://i.ibb.co/s1fhbP1/victreebel.png"
  },
  {
    "name": "vigoroth",
    "image": "https://i.ibb.co/C0NC7TP/vigoroth.png"
  },
  {
    "name": "vikavolt",
    "image": "https://i.ibb.co/n7TZ2VW/vikavolt.png"
  },
  {
    "name": "vileplume",
    "image": "https://i.ibb.co/G5KtmvN/vileplume.png"
  },
  {
    "name": "virizion",
    "image": "https://i.ibb.co/Ky2hQ9M/virizion.png"
  },
  {
    "name": "vivillon-meadow",
    "image": "https://i.ibb.co/wM7S4TQ/vivillon-meadow.png"
  },
  {
    "name": "volbeat",
    "image": "https://i.ibb.co/mvPXsJL/volbeat.png"
  },
  {
    "name": "volcanion",
    "image": "https://i.ibb.co/mznY3xy/volcanion.png"
  },
  {
    "name": "volcarona",
    "image": "https://i.ibb.co/71vyWpp/volcarona.png"
  },
  {
    "name": "voltorb",
    "image": "https://i.ibb.co/28bFF8k/voltorb.png"
  },
  {
    "name": "vullaby",
    "image": "https://i.ibb.co/mzx9w8N/vullaby.png"
  },
  {
    "name": "vulpix",
    "image": "https://i.ibb.co/jWJwRt0/vulpix.png"
  },
  {
    "name": "wailmer",
    "image": "https://i.ibb.co/ScT6x85/wailmer.png"
  },
  {
    "name": "wailord",
    "image": "https://i.ibb.co/qCx8V6J/wailord.png"
  },
  {
    "name": "walrein",
    "image": "https://i.ibb.co/3yNwQzg/walrein.png"
  },
  {
    "name": "wartortle",
    "image": "https://i.ibb.co/ngR3Mj8/wartortle.png"
  },
  {
    "name": "watchog",
    "image": "https://i.ibb.co/XygpSzg/watchog.png"
  },
  {
    "name": "weavile",
    "image": "https://i.ibb.co/SrmZdrz/weavile.png"
  },
  {
    "name": "weedle",
    "image": "https://i.ibb.co/wQ4Yfx5/weedle.png"
  },
  {
    "name": "weepinbell",
    "image": "https://i.ibb.co/0BMb585/weepinbell.png"
  },
  {
    "name": "weezing",
    "image": "https://i.ibb.co/9bqR4CC/weezing.png"
  },
  {
    "name": "whimsicott",
    "image": "https://i.ibb.co/vv11G81/whimsicott.png"
  },
  {
    "name": "whirlipede",
    "image": "https://i.ibb.co/tzz4QbD/whirlipede.png"
  },
  {
    "name": "whiscash",
    "image": "https://i.ibb.co/mRV1xP1/whiscash.png"
  },
  {
    "name": "whismur",
    "image": "https://i.ibb.co/7jqcQPx/whismur.png"
  },
  {
    "name": "wigglytuff",
    "image": "https://i.ibb.co/GR7x7yk/wigglytuff.png"
  },
  {
    "name": "wimpod",
    "image": "https://i.ibb.co/FhSmfhG/wimpod.png"
  },
  {
    "name": "wingull",
    "image": "https://i.ibb.co/hMyfkR6/wingull.png"
  },
  {
    "name": "wishiwashi-solo",
    "image": "https://i.ibb.co/TmBg1LS/wishiwashi-solo.png"
  },
  {
    "name": "wobbuffet",
    "image": "https://i.ibb.co/5T7SPjD/wobbuffet.png"
  },
  {
    "name": "woobat",
    "image": "https://i.ibb.co/hYwCGDR/woobat.png"
  },
  {
    "name": "wooloo",
    "image": "https://i.ibb.co/bBrsPv7/wooloo.png"
  },
  {
    "name": "wooper",
    "image": "https://i.ibb.co/276fSx3/wooper.png"
  },
  {
    "name": "wormadam-plant",
    "image": "https://i.ibb.co/mFJbXNp/wormadam-plant.png"
  },
  {
    "name": "wurmple",
    "image": "https://i.ibb.co/PgJ65C8/wurmple.png"
  },
  {
    "name": "wynaut",
    "image": "https://i.ibb.co/xG8M6RK/wynaut.png"
  },
  {
    "name": "xatu",
    "image": "https://i.ibb.co/x7d26gF/xatu.png"
  },
  {
    "name": "xerneas-active",
    "image": "https://i.ibb.co/W6wLDW7/xerneas-active.png"
  },
  {
    "name": "xurkitree",
    "image": "https://i.ibb.co/3BMRzjZ/xurkitree.png"
  },
  {
    "name": "yamask",
    "image": "https://i.ibb.co/pnLBPHQ/yamask.png"
  },
  {
    "name": "yamper",
    "image": "https://i.ibb.co/8jW5Q4V/yamper.png"
  },
  {
    "name": "yanma",
    "image": "https://i.ibb.co/HtY3kY3/yanma.png"
  },
  {
    "name": "yanmega",
    "image": "https://i.ibb.co/h79yjgh/yanmega.png"
  },
  {
    "name": "yungoos",
    "image": "https://i.ibb.co/ZxNFkMv/yungoos.png"
  },
  {
    "name": "yveltal",
    "image": "https://i.ibb.co/bbdhGBK/yveltal.png"
  },
  {
    "name": "zacian-hero",
    "image": "https://i.ibb.co/Vj1wx8n/zacian-hero.png"
  },
  {
    "name": "zamazenta-hero",
    "image": "https://i.ibb.co/zmBtW2w/zamazenta-hero.png"
  },
  {
    "name": "zangoose",
    "image": "https://i.ibb.co/QbdFLpH/zangoose.png"
  },
  {
    "name": "zapdos",
    "image": "https://i.ibb.co/kKyQ23m/zapdos.png"
  },
  {
    "name": "zarude",
    "image": "https://i.ibb.co/VQ7RfGv/zarude.png"
  },
  {
    "name": "zebstrika",
    "image": "https://i.ibb.co/0nq4SNV/zebstrika.png"
  },
  {
    "name": "zekrom",
    "image": "https://i.ibb.co/48gm2PP/zekrom.png"
  },
  {
    "name": "zeraora",
    "image": "https://i.ibb.co/17y2GH4/zeraora.png"
  },
  {
    "name": "zigzagoon",
    "image": "https://i.ibb.co/mTVhjfR/zigzagoon.png"
  },
  {
    "name": "zoroark",
    "image": "https://i.ibb.co/G7GWXdw/zoroark.png"
  },
  {
    "name": "zorua",
    "image": "https://i.ibb.co/YkhSvgq/zorua.png"
  },
  {
    "name": "zubat",
    "image": "https://i.ibb.co/MCt8Tw0/zubat.png"
  },
  {
    "name": "zweilous",
    "image": "https://i.ibb.co/nPfwDTF/zweilous.png"
  },
  {
    "name": "zygarde",
    "image": "https://i.ibb.co/VC72x3m/zygarde.png"
  },
  {
    "name": "abomasnow",
    "image": "https://i.ibb.co/kMbv14n/abomasnow.png"
  }
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
