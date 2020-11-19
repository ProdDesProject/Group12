function searchUsername() {
    var input;
    input = document.getElementById('search_bar').value.toLowerCase();
    document.getElementById("skilltable").innerHTML = "";
    getSkills(input);
}

function getSkills(input) {
    axios.get('http://localhost:7373/skills/username='+ input)
        .then(function (response) {
            var obj = response.data.xp;
            var username = response.data.username;
            var obj2 = response.data.level;
            var levels = [];
            var values = [];
            var names = [];
            var tableHeading = document.getElementById("table_heading");

            tableHeading.innerText = "Showing stats for " + username;
            tableHeading.style.visibility = "visible";
            names = Object.getOwnPropertyNames(obj);
            for(var i in obj){
                values.push(obj[i]);
            }
            for(var x in obj2){
                levels.push(obj2[x]);
            }
            makeArray(values, names, levels);
        })
        .catch(function (error) {
            status = error.response.status;
            if(status == 404){
                var tableHeading = document.getElementById("table_heading");
                var table = document.getElementById("skilltable");
                table.style.visibility = "hidden";
                tableHeading.style.visibility = "visible";
                tableHeading.innerText = "Username '" + input + "' not found";
            }
        });
}

function makeArray(values, names, levels) {
    var table = document.getElementById("skilltable");
    table.style.visibility = "visible";
    for(var i = 0; i < names.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = names[i];
        cell2.innerHTML = levels[i];
        cell3.innerHTML = values[i];
    }
}