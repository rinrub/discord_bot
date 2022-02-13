
## Download nodejs
## npm install
## open discord in a browser and go to the channel you want to talk to#
- open dev tools (f12)
- open network
- send a message and read the request to find channelId, authenticationToken(in the request header), and userId.
## create a .env file, and fill it with:
-DISCORD_CHANNEL_ID={YourChannelId}
-DISCORD_AUTHENTICATION_TOKEN={YourAuthenticationToken}
-DISCORD_USER_ID={YourUserId}

#npm start#
## to run dev, install nodemon globaly -g