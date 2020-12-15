function searchUsername() {
    var input;
    var mainPage = document.getElementById('landingpage');
    var userPage = document.getElementById('userpage');

    input = document.getElementById('search_bar').value.toLowerCase();

    if (mainPage.style.visibility == "visible" && userPage.style.visibility == "hidden"){
        mainPage.style.visibility = "hidden";
        userPage.style.visibility = "visible";
    }
    handleGains(input);

}

function handleSkills(input) {
    axios.get('http://localhost:7373/skills/username='+ input)
        .then(function (response) {
            var obj = response.data.xp;
            var username = response.data.username;
            var obj2 = response.data.level;
            var levels = [];
            var values = [];
            var names = [];

            names = Object.getOwnPropertyNames(obj);
            for(var i in obj){
                values.push(obj[i]);
            }
            for(var x in obj2){
                levels.push(obj2[x]);
            }

            displayData(username, levels, names, values);
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

function handleGains(input) {
    axios.get('http://localhost:7373/skills/username='+ input)
        .then(function (response) {
            var obj = response.data.gained_xp;
            var username = response.data.username;
            var gains = [];
            var names = [];
            
            console.log(obj);
            names = Object.getOwnPropertyNames(obj);
            for(var i in obj){
                gains.push(obj[i]);
            }
            console.log(gains);
            displayData(username, gains, names);
            
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

function displayData(username, level_val, names, xp_val){
    var user_heading = document.getElementById("userheading");
    var exp_indicator = document.getElementById("expindicator");
    var table_heading_overall = document.getElementById("tableheadingoverall");
    var progress_bar = document.getElementById("progressbar");
    var lvl_current = document.getElementById("levelcurrent");
    var lvl_next = document.getElementById("levelnext");
    var lvl_show = document.getElementById("lvl_show");
    var lvl_name = document.getElementById("lvl_name");
    var lg = [];
    var xp_goal;
    var lvl;
    var xp_remaining;

    lg = calcLevel(level_val[0]);
    lvl = lg[0];
    xp_goal = lg[1];

    if(lvl == 10){
        exp_indicator.innerText = "Max level reached!";
        progress_bar.max = xp_goal;
        progress_bar.value = xp_goal;
        lvl_show.innerText = lvl;
        lvl_current.innerText = lvl-1;
        lvl_next.innerText = lvl;
        lvl_name.innerText = "Beer level " + lvl;
    }
    else{
        xp_remaining = numberWithCommas(xp_goal - parseInt(level_val[0]));
        exp_indicator.innerText = xp_remaining + " xp remaining until next level";
        progress_bar.max = xp_goal;
        progress_bar.value = level_val[0];
        lvl_show.innerText = lvl;
        lvl_current.innerText = lvl;
        lvl_next.innerText = lvl + 1;
        lvl_name.innerText = "Beer level " + lvl;
    }
    

    user_heading.innerText = username;

    table_heading_overall.innerText = "Overall gained XP: " + numberWithCommas(level_val[0]);
    for(var i in names){
        switch(names[i]){
            case "attack":
                document.getElementById("attack_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "defence":
                document.getElementById("defence_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "strength":
                document.getElementById("strength_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "hitpoints":
                document.getElementById("hitpoints_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "ranged":
                document.getElementById("ranged_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "prayer":
                document.getElementById("prayer_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "magic":
                document.getElementById("magic_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "cooking":
                document.getElementById("cooking_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "woodcutting":
                document.getElementById("woodcutting_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "fletching":
                document.getElementById("fletching_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "fishing":
                document.getElementById("fishing_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "firemaking":
                document.getElementById("firemaking_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "crafing":
                document.getElementById("crafting_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "smithing":
                document.getElementById("smithing_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "mining":
                document.getElementById("mining_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "herblore":
                document.getElementById("herblore_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "agility":
                document.getElementById("agility_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "thieving":
                document.getElementById("thieving_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "slayer":
                document.getElementById("slayer_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "farming":
                document.getElementById("farming_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "runecraft":
                document.getElementById("runecraft_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "hunter":
                document.getElementById("hunter_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
            case "construction":
                document.getElementById("construction_gained").innerText = numberWithCommas("+" + level_val[i]) + " xp";
        }
    }
    
}

function calcLevel(xp){
    var level;
    var goal;
    var lg = [];
    
    xp = parseInt(xp);
    
    if(xp < 1154){
        level = 1;
        goal = 1154;
    }
    else if(xp >= 1154 && xp < 4470){
        level = 2;
        goal = 4470;
    }
    else if(xp >= 4470 && xp < 13363){
        level = 3;
        goal = 13363;
    }
    else if(xp >= 13363 && xp < 37224){
        level = 4;
        goal = 37224;
    }
    else if(xp >= 37224 && xp < 101333){
        level = 5;
        goal = 101333;
    }
    else if(xp >= 101333 && xp < 273742){
        level = 6;
        goal = 273742;
    }
    else if(xp >= 273742 && xp < 737627){
        level = 7;
        goal = 737627;
    }
    else if(xp >= 737627 && xp < 1986068){
        level = 8;
        goal = 737627;
    }
    else if(xp >= 1986068 && xp < 5346332){
        level = 9;
        goal = 737627;
    }
    else if(xp >= 5346332){
        level = 10;
        goal = 1;
    }
    
    lg.push(level, goal);
    return lg;
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}