
#How to get started

## Download nodejs from https://nodejs.org/en/
## Npm install
- ### open a terminal
- ### navigate to porject root
- ### run command npm install
## Open discord in a browser and go to the channel you want to use the bot
- ### open dev tools (f12)
- ### open network
- ### send a message and read the request to find channelId, authenticationToken(in the request header), and userId.
## Create a .env file, and fill it with:
- ### DISCORD_CHANNEL_ID={YourChannelId}
- ### DISCORD_AUTHENTICATION_TOKEN={YourAuthenticationToken}
- ### DISCORD_USER_ID={YourUserId}

## Npm start from project root
## To run dev, install nodemon globaly with -g flag