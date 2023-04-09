This library will help you to work with the Apex Mozambique API quite simply.
First of all, you need to create a class
```js
const ApexAPI = require("simple-apex.js");
const Apex = new DiscordDB("token");
```


There are several requests:
```js
  Apex.getCrafting() // return items in Replicator
  Apex.getPlayerStatByName(playerName, platform) // return player's stats by name
  Apex.getPlayerStatById(playerUID, platform) // return player's stats by uid
  Apex.getPlayerMatchHistory(playerUID, mode, start, end, limit) // return player's match history by uid
  Apex.getLeaderBoard(hero, platform) // return leaders on hero
  Apex.getMap(mode, rus) // return maps in Apex
  Apex.getStore() // return items in store
  Apex.getNews() // return last news
  Apex.getServerStatus() // return Apex servers status
  Apex.getPlayerUIDbyName(playerName, platform) // return player uid by name
 ```
 Arguments:
```
platform = PC, X1, PS4, SWITCH, ANY.
hero = Legend name, starting with a capital letter.
mode = BATTLE_ROYALE, ARENAS, UNKNOWN
start, end = timestamp. Value must be an int.
PlayerUID = The player's UID.
playerName = The player's name.
```
