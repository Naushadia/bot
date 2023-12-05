import { Client, Partials, GatewayIntentBits } from "discord.js";

const client = new Client({
  // intents: Object.keys(GatewayIntentBits),
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildModeration,
    // GatewayIntentBits.GuildEmojisAndStickers,
    // GatewayIntentBits.GuildIntegrations,
    // GatewayIntentBits.GuildWebhooks,
    // GatewayIntentBits.GuildInvites,
    // GatewayIntentBits.GuildVoiceStates,
    // GatewayIntentBits.GuildPresences,
    // GatewayIntentBits.GuildMessageReactions,
    // GatewayIntentBits.GuildMessageTyping,
    // GatewayIntentBits.DirectMessageReactions,
    // GatewayIntentBits.DirectMessageTyping,
    // GatewayIntentBits.GuildScheduledEvents,
    // GatewayIntentBits.AutoModerationConfiguration,
    // GatewayIntentBits.AutoModerationExecution,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction], // Enable specific partials
  // partials: Object.keys(Partials), // Enable all partials
});

export default client;
