const { Client, IntentsBitField, Collection } = require('discord.js');
require('dotenv').config();
const eventHandler = require('./handlers/eventHandler');
const mentionHandler = require('./handlers/mentionHandler');
const expHandler = require('./handlers/expHandler');
const loadCommands = require('./utils/commandLoader');
const path = require('path');
const antiSpamHandler = require('./handlers/antiSpamHandler');
const antiInviteHandler = require('./handlers/antiInviteHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.commands = new Collection();

loadCommands(client, path.join(__dirname, 'commands', 'misc'));
loadCommands(client, path.join(__dirname, 'commands', 'moderation'));

mentionHandler(client);
// expHandler(client);
antiSpamHandler(client);
antiInviteHandler(client);
eventHandler(client);

client.login(process.env.TOKEN);
