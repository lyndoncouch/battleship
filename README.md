Error codes:

|Code|Error|Description|
|1|Unknown Game|Game Guid not known|
|2|Unknown Player|Player id not known|
|3|Ships Overlap|Illegal ship placement during setup phase|




User's game loop.

Player 1
1) go to page.
2) create game
3) email link to other player
4) Player 1 (original) layout ships
5) Wait till Player 2 complete

Player 2
1) click on link
2) layout ships
3) Wait till Player 2 completes


Player 1 & 2
click link to play game


Needed:

1) first page:
	list of games (with current game status)
	link to create games

2) Layout page (per player)

3) Game board to play game (not to mention actual game!)

meta:
1)	Store current games and layouts somewhere external (db/file/?)
2) Player details? user/password/etc

