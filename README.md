# DnDs"R"Us

Be it player or dungeon master, keep track of your characters and campaigns at Dnds"R"Us!

## Description

A MERN stack application to allow individual users to create characters, customize them and keep track with your on going campaign.

## Wireframe

- Landing page - Users first screen when routing to the website

![wireframe](/public/landing%20page.JPG)

- My Characters - All the users characters displayed on cards.

![wireframe](/public/my%20characters%20screen.JPG)

- Register Form - Styled form for the sign up page

![wireframe](/public/register%20page.JPG)

- Character Sheet - View a specific characters information listed out in character sheet style

![wireframe](/public/Character%20Sheet.JPG)

## ERD

![ERD](/public/ERD.JPG)

## RESTful Routes

### Users

| HTTP METHOD (_Verb_) | URL (_Nouns_) | CRUD | Response                                                   | Notes |
| -------------------- | ------------- | ---- | ---------------------------------------------------------- | ----- |
| POST                 | /users        | C    | create new user                                            |       |
| GET                  | /users/:id    | R    | show user's profile including their character card list    |       |
| POST                 | /users/login  | C    | accept a payload of form data and use it to login the user |       |

### Characters

| HTTP METHOD (_Verb_) | URL (_Nouns_)                     | CRUD | Response                                                         | Notes |
| -------------------- | --------------------------------- | ---- | ---------------------------------------------------------------- | ----- |
| POST                 | /users/:id                        | C    | create new character                                             |       |
| GET                  | /users/:id/:characterId           | R    | Display specific chracter information in a character sheet style |       |
| PUT                  | /users/:id/:characterId           | U    | edit the character informtation                                  |       |
| DELETE               | /users/:id/:characterId           | D    | Delete specific character                                        |       |
| POST                 | /users/:id/:characterId/          | C    | create a new weapon in character db                              |       |
| POST                 | /users/:id/:characterId/          | C    | create a new spell in character db                               |       |
| PUT                  | /users/:id/:characterId/:weaponId | U    | edit a weapon in character db                                    |       |
| PUT                  | /users/:id/:characterId/:weaponId | U    | edit a spell in character db                                     |       |

## User Stories

- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a character with starting informational questions.
- As a signed in user, I would like to update my character in real time by editing the character sheet.
- As a signed in user, I would like to delete my character.
- As a signed in user, I would like to see all my characters in my profile and then select the card to view that character.

## MVP

### Tuesday

- Set up react client with routes
- Set up mongoose server
- Set up user authentication with password encryption
- Set up CRUD functionality for user

### Wednesday

- Set up CRUD functionality for character and its subdocs
- Create forms to use CRUD functionality on the front-end

### Thursday

- Add content to Landing Page, Profile, NavBar
- Show a profile of character cards that link to character sheet

### Friday, Saturday, Sunday

- Clean up bugs
- Start implimenting SCSS
- Start Styling the character sheet page.
- Add Styling to other pages and NavBar.
- Prepare for presentation

## Stretch Goals

- Working on Styling
- Refactoring the database for future plans to add a dungeon master side to the application.

## Tech Stack

- MERN (Mongoose, Express, React, Node.js)
- Axios
- CSS: SCSS
- HTML
