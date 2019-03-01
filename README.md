# Premier League Predictions

## Development  
Open terminal  
Cd into repo
Run npm i  
Run grunt  
Open browser on localhost:8000

## Production  
HTML is copy pasted into code block in predictions section on the homepage of the site: https://bugle-reindeer-lwcn.squarespace.com/#predictions

CSS and JS are injected into the header and deliered via github pages:  
* https://chrisbowerbank.github.io/premier-league-predictions/css/matches.css
* https://chrisbowerbank.github.io/premier-league-predictions/js/min/matches.min.js

## Content  
Matches are populated via a [Google Sheet](https://docs.google.com/spreadsheets/d/1Cq-moMhz7MLKnomxK5qMkIXnOdJZi2N3SMcxamjxFKw/edit?usp=drive_web&ouid=105744439865364188074)

Each match has 4 components:
* team_A
* team_A_logo
* team_B
* team_B_logo

The `week` column will denote the match week and the columns will need to be cleared from week to week.

The submissions are collected via a [Google Form](https://docs.google.com/forms/d/1tu32J-pGtFoLui7FNGetTK9CeCGC2AE8EOGbAoAggG0/edit?usp=drive_web) that this code serves as a frontend for. 
