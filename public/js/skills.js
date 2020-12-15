function searchUsername() {
    var input;
    var mainPage = document.getElementById('landingpage');
    var userPage = document.getElementById('userpage');

    input = document.getElementById('search_bar').value.toLowerCase();
    /*
    if (mainPage.style.visibility == "visible" && userPage.style.visibility == "hidden"){
        mainPage.style.visibility = "hidden";
        //userPage.style.visibility = "visible";
    }*/
    handleGains(input);

}

function handleGains(input) {
    axios.get('http://localhost:7373/skills/username='+ input)
        .then(function (response) {
            var obj = response.data;
            var username = response.data.username;
            var names = [];
            var data = [];
            var levelnames = [];
            var levels = [];
            var xpnames = [];
            var xp = [];

            for(var i in obj){
                data.push(obj[i]);
            }
            names = Object.getOwnPropertyNames(obj);

            for(var i=2;i<49;i=i+2){
                levelnames.push(names[i]);
                levels.push(data[i]);
            }
            for(var i=3;i<50;i=i+2){
                xpnames.push(names[i]);
                xp.push(data[i]);
            }

            displayData(username, levelnames, levels, xpnames, xp, data[50]);
            
        })
        .catch(function (error) {
            console.log(error);
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

function displayData(username, levelnames, levels, xpnames, xp, gained){
    var userPage = document.getElementById('userpage');
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

    lg = calcLevel(gained);
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
        xp_remaining = numberWithCommas(xp_goal - parseInt(gained));
        exp_indicator.innerText = xp_remaining + " xp remaining until next level";
        progress_bar.max = xp_goal;
        progress_bar.value = gained;
        lvl_show.innerText = lvl;
        lvl_current.innerText = lvl;
        lvl_next.innerText = lvl + 1;
        lvl_name.innerText = "Beer level " + lvl;
    }
    

    user_heading.innerText = username;

    table_heading_overall.innerText = "Overall gained XP: " + numberWithCommas(gained);
    for(var i in levelnames){
        switch(levelnames[i]){
            case "overallLevel":
                document.getElementById("overall_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "attackLevel":
                document.getElementById("attack_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "defenceLevel":
                document.getElementById("defence_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "strengthLevel":
                document.getElementById("strength_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "hitpointsLevel":
                document.getElementById("hitpoints_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "rangedLevel":
                document.getElementById("ranged_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "prayerLevel":
                document.getElementById("prayer_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "magicLevel":
                document.getElementById("magic_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "cookingLevel":
                document.getElementById("cooking_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "woodcuttingLevel":
                document.getElementById("woodcutting_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "fletchingLevel":
                document.getElementById("fletching_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "fishingLevel":
                document.getElementById("fishing_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "firemakingLevel":
                document.getElementById("firemaking_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "crafingLevel":
                document.getElementById("crafting_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "smithingLevel":
                document.getElementById("smithing_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "miningLevel":
                document.getElementById("mining_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "herbloreLevel":
                document.getElementById("herblore_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "agilityLevel":
                document.getElementById("agility_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "thievingLevel":
                document.getElementById("thieving_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "slayerLevel":
                document.getElementById("slayer_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "farmingLevel":
                document.getElementById("farming_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "runecraftLevel":
                document.getElementById("runecraft_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "hunterLevel":
                document.getElementById("hunter_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
            case "constructionLevel":
                document.getElementById("construction_gained").innerText = numberWithCommas(xp[i]) + "XP" + " / " + levels[i];
        }
    }
    userPage.style.visibility = "visible";
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
        goal = 1986068;
    }
    else if(xp >= 1986068 && xp < 5346332){
        level = 9;
        goal = 5346332;
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