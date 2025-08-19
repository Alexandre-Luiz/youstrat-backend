# [YouStrat](https://www.youstrat.com/)

This app focus in compile gaming strategy videos in a intuitive way. To facilitate the content management, it was developes one admin dashboard to create, edit and delete uploaded strategies. This project should be run with the [frontend project](https://github.com/Alexandre-Luiz/youstrat-frontend).

## Features

- Session management
- User password cryptography
- Cache strategy using Redis Cloud
- API to manage content (user, games, maps, strategies)

## API

**USER**

This API handles user authentication, including login, signup, signout, and session management.
    
Endpoints:

1. User Login

  - URL: /user/login
  - Method: POST

    Description: Authenticates a user and creates a session.

        Request Body: 
            {
            "username": "string",  
            "password": "string"
            }

2. User Signup

  - URL: /user/signup
  - Method: POST

    Description: Registers a new user and creates a session.

        Request Body: 
            {
            "username": "string",  
            "password": "string"
            }

3. User Signout

  - URL: /user/signout
  - Method: POST

    Description: Logs out a user and destroys the session.

4. Get User Session

  - URL: /user/session
  - Method: GET

    Description: Retrieves the current user session.


**Game**

This API handles game management, including creating, updating, retrieving, and deleting games.

1. Create New Game

  - URL: /game
  - Method: POST

    Description: Creates a new game. Only accessible by admin users.

        Request Body: 
            {
                "gameName": "game name"
            }

2. Get Games

  - URL: /game
  - Method: GET

    Description: Retrieves array of games names.

3. Update Game

  - URL: /game
  - Method: PUT

    Description: Updates an existing game. Only accessible by admin users.

        Request Body:
            {
                "gameId": id of the game to be updated
                "gameName": "New name"
            }

4. Delete Game by ID

  - URL: /game/:gameId
  - Method: DELETE

    Description: Deletes a game by its ID. Only accessible by admin users.

        Request Body: gameId (URL parameter) - The ID of the game to be deleted.


**Map**


1. Create New Map

  - URL: /map
  - Method: POST

    Description: Creates a new map. Should sent the gameId that the map belongs to. Only accessible by admin users.

        Request Body: 
        {
	        "mapName": "new map name",
	        "gameId": 1
        }

2. Get Map

  - URL: /map
  - Method: GET

    Description: Retrieves array of map objects like this:

        {
		    "mapId": 1,
            "mapName": "Ancient",
            "gameId": 1,
            "game": {
			    "gameId": 1,
			    "gameName": "cs2"
		    }
	    }

3. Update Maps

  - URL: /map
  - Method: PUT

    Description: Updates an existing map. Only accessible by admin users.

        Request Body example:
            {
                "mapId": 8,
                "mapName": "Vertigo",
                "gameId": 1,
                "game": 
                    {
                        "gameId": 1,
                        "gameName": "cs2"
                    }
            }
4. Delete Map by ID

  - URL: /map/:mapId
  - Method: DELETE

    Description: mapId (URL parameter): The ID of the map to be deleted.

        Request Body: gameId (URL parameter) - The ID of the game to be deleted.

**Strategies**


1. Create New Strategy

  - URL: /strategies
  - Method: POST

    Description: Creates a new strategy. Only accessible by admin users.

        Request Body example: 
        {
	        "stratName": "new strat name",
	        "type": "The type of the strategy (Nerd, Molotov, Smoke, Flash or Exec)",
            "videoUrl": "The url for the youtube video",
            "description": "Description of the new strategy",
            "mapId": The ID of the map that this strategy belongs to.
        }

2. Get Strategies

  - URL: /strategies/:gameName
  - Method: GET

    Description: Retrieves array of strategies objects of specific game like this:

    	{
            "stratId": 2,
            "type": "Molotov",
            "stratName": "CT - Fast B ramp molly",
            "videoUrl": "https://www.youtube.com/watch?v=3cx2-y_ho_8",
            "description": "Run aiming at the thin brick line at the wall. Jump throw when reaching the end.",
            "mapId": 1,
            "map": {
                "mapId": 1,
                "mapName": "Ancient",
                "gameId": 1
            }
		}


3. Update Strategy

  - URL: /strategies
  - Method: PUT

    Description: Updates an existing strategy. Only accessible by admin users.

        Request Body example:
            {
                "stratId": 34,
                "type": "Molotov",
                "stratName": "CT - Fast molly to ramp from alley",
                "videoUrl": "https://www.youtube.com/watch?v=-4v6446iDEI",
                "description": "Run aiming at the thin stone section of the wall and jump throw at the end of the wall",
                "mapId": 1,
                "map": {
                    "mapId": 1,
                    "mapName": "Ancient",
                    "gameId": 1
                }
            }

4. Delete Strategy by ID

  - URL: /strategies/:stratId
  - Method: DELETE

    Description: mapId (URL parameter): The ID of the map to be deleted.

        Request Body: gameId (URL parameter) - The ID of the game to be deleted.


## Prerequisites

Before running the application, ensure that you have the following software installed:

- Node.js (v16.20.0)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies: `npm install`
4. Create .env file and add:
 - DB_USER
 - DB_PASS
 - SESSION_SECRET
 - REDIS_PASS

## Usage

To start the development server, run: `npm run dev`. This will start the server at `http://localhost:3001`.

## License

This project is licensed under the [MIT License](LICENSE).
