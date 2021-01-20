const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB",
});
connection.connect((err) => {
    if (err) return console.log(err);
    console.log("connected");
    mainMenu();
});
// function main menu:
function mainMenu() {
    // prompt user choice for post, bid, or exit
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "Return songs within position range",
                    "Search for song",
                    "Search for artist's top albums",
                    "EXIT"],
                name: "choice",
            },
        ])
        .then(answers => {
            if (answers.choice === "Return all songs by artist") {
                artistQuery();
            } else if (answers.choice === "Return artists with more than one song listed") {
                repeatArtist();
            } else if (answers.choice === "Return songs within position range") {
                searchSongWithinRange();
            } else if (answers.choice === "Search for song") {
                searchSong();
            } else if (answers.choice === "Search for artist's top albums") {
                topSongAlbum();
            } else {
                connection.end();
            }
        });
}

function searchSong() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What song would you like to search up?",
                name: "song",
            },
        ])
        .then(answers => {
            var query = connection.query("SELECT * FROM top5000 WHERE song = ?", answers.song, function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                    // const item = res.find((songInfo) => songInfo.song === answers.song);
                    // console.log(`${item.song}: Position - ${item.position}, Artist - ${item.artist}, Year - ${item.year}`);
                    mainMenu();
                }
            }
            );
        });
}