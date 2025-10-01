const leaderboardTableNode = document.querySelector("#leaderboardTable");
const LOCAL_STORAGE_KEY = "leaderboardData";
const leaderboardData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];

(function createLeaderboardTable() {
    if(!leaderboardTableNode) return;

    leaderboardData.sort(function(a, b) {
        return b.score - a.score;
    });

    let prevScore = null;
    let rank = 1;
    let leaderboardTableData = "";
    leaderboardData.forEach((data) => {
        if(prevScore === null) prevScore = data.score;
        if(data.score < prevScore) {
            rank += 1;
            prevScore = data.score;
        }

        leaderboardTableData += `<tr id="${data.id}">
                <td>${rank}</td>
                <td>${data.name}</td>
                <td>${data.score}</td>
                <td>${data.date}</td>
            </tr>\n`
    })
    leaderboardTableNode.innerHTML = leaderboardTableData;
})()