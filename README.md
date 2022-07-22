# Spam Vanquisher
Discord bot that prevents automated message spam on the server.
The bot works by monitoring the messages in the server's channels following preset rules. When a rule is triggered an action is taken against the bad actor. Disabling communications and banning is supported but the set of actions can be expanded by placing new files in `src/actions` folder (more on extending below).

The bot also supports slash commands for manual ban and adds a new context menu button for messages to manually remove messages that might have slipped the automatic detection. (These features are currently designed with testing out the automatic measures in mind and commands will only work for the server's administrator and the bot administrator)

## Concept
The most basic idea of how it can be used is to monitor the members' messaging activity throughout the server. If an actor posts X amount of messages across Y amount of channels in Z seconds it is most likely an automated behavior (the default baseline is 4 messages across 4 channels in 20 seconds) so the bot takes action (ban by default).

It can also monitor the message contents preventing flood of identical messages or messages that match a certain regex (a link by default).

## Setting up
1. Create a new bot at [Discord Developer Portal](https://discord.com/developers/applications). I recommend setting the bot as private. This bot was designed to be running on one server at a time although it can monitor several servers at once.
2. The permissions to grant the bot depend on what it will be used for. In general it needs `Use Application Commands`, `Read Messages`, `Send Messages`, `Manage Messages` and a set of moderation permissions depending on what you have in mind (ban/kick/timeout members). By default it's initialized with `MESSAGE_CONTENT` intent but if you're not planning to use content filter and only monitor the message frequency you may remove `GatewayIntentBits.MessageContent` from client in `src/client.js`
3. After the bot on the discord side is all set up it's time to launch the project. Run 
```
yarn
``` 
in the project's directory to install all dependencies.

4. Create .env file in the root folder with your bot's credentials. Use .env.example as a guide, all the values can be found in your bot's application page at [Discord Developer Portal](https://discord.com/developers/applications).
5. Set up a `config.json` in the root folder. If this is the first time you run the bot and you don't have a `config.json` one will be automatically created based on `src/config.default.js`. You can tweak that file before running the bot to get the `config.json` that is to your liking.

## Usage
Run the bot as a service with pm2.
```
npm install -g pm2
pm2 start index.js
pm2 startup # follow instructions it provides
pm2 save
```
This ensures the bot is restarted in the case crush occures and the service is started when the server itself is rebooted (e.g. in case of an outage).

## Extending
New commands can be added to `src/commands` folder. As long as they extend `DiscordCommand` class they will be automatically registered and hooked up.

Same goes for new actions: put them in `src/actions` and extend `Action` class. The obvious contender for that would be `kick.js`.

## Persistence considerations
The bot keeps its store completely in memory. Given the relatively short span of relevant data (default TTL is only 30 seconds) there is no need for constant writes to the disk. In an unlikely event of a reset you only lose up to 30 seconds worth of data. If that seems unacceptable you can extend store object in `src/store/index.js` to facilitate `lowdb` which is already used to handle `config.json`. 
