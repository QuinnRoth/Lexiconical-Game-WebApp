let arr = [];
let txt = document.querySelector("#txt");
let add = document.querySelector("#txt");
let mainDiv = document.querySelector("#mainDiv");
let count = 1;
let api_key = "d864b1fc-dac3-4c9c-a253-6519b9249419";

rules = setRules();

let def = {};
def.id = 0;
def.title = rules[0];

addUI(def);

async function apiCall(url) {
    const myRequest = new Request(url);

    try {
        const response = await fetch(myRequest);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }

}

function setRules() {
    let rulesArr = [];
    let rule1 = "Rule 1: Must Include the letter combination 'ou'.";
    let rule2 = "Rule 2: Must include the letter 'i' twice.";
    let rule3 = "Rule 3: The beginning and end must both be vowels.";
    let rule4 = "Rule 4: Must be 11 characters long.";
    let rule5 = "Rule 5: Guess today's word!";
    rulesArr.push(rule1, rule2, rule3, rule4, rule5);
    return rulesArr;
}

function checkRules(obj) {
    let score = 0;
    const rule1 = /ou/;
    if (rule1.test(obj.title)) {
        console.log("Rule 1 passed");
        score++;
    }
    const rule2 = /i.*i/;
    if (rule2.test(obj.title)) {
        console.log("Rule 2 passed");
        score++;
    }
    const rule3 = /^[aeiouy].*[aeiouy]$/;
    if (rule3.test(obj.title)) {
        console.log("Rule 3 passed");
        score++;
    }
    const rule4 = /^.{11}$/;
    if (rule4.test(obj.title)) {
        console.log("Rule 4 passed");
        score++;
    }
    const rule5 = /insouciance/;
    if (rule5.test(obj.title)) {
        console.log("Today's Word Found!");
        score++;
    }
    return score;
}

add.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let obj = {};
        let rulesObj = {};
        let score = 0;
        obj.title = txt.value;
        if (obj.title === "" || obj.title.trim() == "") {
            alert("Write Something");
        } else {
            let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + obj.title + "?key=" + api_key;
            try {
                var data = await apiCall(url);
                
                if (!data) {
                    alert("Word not found in dictionary. data is null.");
                    return;
                }

                if (!data[0].meta.stems[0]) {
                    alert("Word not found in dictionary. hwi.hw is null.");
                    return;
                }
                if (data[0].meta.stems[0].toLowerCase() != obj.title.toLowerCase()) {
                    alert("Word not found in dictionary. hwi.hw does not match input.");
                    return;
                }

                score = checkRules(obj);
                
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("An error occurred while fetching data.");
            }

            for(let i = 1; i < score; i++) {
                rulesObj.title = rules[i];
                addUI(rulesObj);
            }
        }
    }
});


function addUI(obj) {
    let div = document.createElement("div");
    div.classList.add("rule-item");

    let span = document.createElement("span");
    
    span.innerHTML = obj.title;
    div.append(span);
    
    mainDiv.append(div);
    txt.value = "";
    console.log(arr);
}