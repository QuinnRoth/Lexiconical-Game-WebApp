let txt = document.querySelector("#txt");
let add = document.querySelector("#txt");
let mainDiv = document.querySelector("#mainDiv");
let count = 1;
let api_key = "d864b1fc-dac3-4c9c-a253-6519b9249419";
let attempts = 0;
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
    let rule1 = "Rule 1: Must be a noun.";
    let rule2 = "Rule 2: Must include exactly four unique letters.";
    let rule3 = "Rule 3: Must have fewer vowels than consonants.";
    let rule4 = "Rule 4: Must contain two double letters.";
    let rule5 = "Rule 5: Must be spelled in alphabetical order.";
    rulesArr.push(rule1, rule2, rule3, rule4, rule5);
    return rulesArr;
}

function checkRules(obj, data) {
    let score = 1;
    

    const rule1 = /noun/;
    for(let i = 0; i < data.length; i++ ){
        if (rule1.test(data[i].fl) && data[i].meta.stems.includes(obj.title)) {
            console.log("Rule 1 passed");
            score++;
            break;
        }
        
    }
    //if score did not go up return, because word was not a noun
    if(score == 1){
        return score;
    }
    
    const rule2 = new Set(obj.title);
    if (rule2.size === 4) {
        console.log("Rule 2 passed");
        score++;
    }
    else{
        return score;
    }


    const rule3 = new Set(obj.title.match(/[aeiou]/g));
    if (rule3.size < (obj.title.length - rule3.size)) {
        console.log("Rule 3 passed");
        score++;
    }
    else{
        return score;
    }

    const rule4 = /.*(.)\1.*(.)\2.*/;
    if (rule4.test(obj.title)) {
        console.log("Rule 4 passed");
        score++;
    }
    else{
        return score;
    }

    const rule5 = /^a*b*c*d*e*f*g*h*i*j*k*l*m*n*o*p*q*r*s*t*u*v*w*x*y*z*$/;
    if (rule5.test(obj.title)) {
        console.log("Today's Word Found!");
        score++;
    }
    else{
        return score;
    }
    console.log("Score: " + score);
    return score;
}

add.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        attempts++;
        let obj = {};
        let rulesObj = {};
        let score = 1;
        obj.title = txt.value.trim().toLowerCase();
        if (obj.title === "") {
            alert("Write Something");
        } else {
            let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + obj.title + "?key=" + api_key;
            try {
                var data = await apiCall(url);
                
                if (!data) {
                    alert("Word not found in dictionary.");
                    return;
                }

                if (!data[0].meta) {
                    alert("Word not found in dictionary.");
                    return;
                }

                if (!data[0].meta.stems[0]) {
                    alert("Word not found in dictionary.");
                    return;
                }
                
                // if obj.title.tolowercase() is not in data[0].meta.stems[] return
                if (!data[0].meta.stems.includes(obj.title)) {
                    alert("Word not found in dictionary.");
                    return;
                }

                score = checkRules(obj, data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("An error occurred while fetching data.");
            }


            if (score <= 5) {
                clearUI();
                for(let i = 0; i < score; i++) {
                    rulesObj.title = rules[i];
                    addUI(rulesObj);
                    console.log("ran " + i);
                }
            }
            else {
                clearUI();
                for(let i = 0; i < 5; i++) {
                    rulesObj.title = rules[i];
                    addUI(rulesObj);
                    console.log("ran " + i);
                }
                alert("Congratulations! You guessed the word! It took you " + attempts + " attempts.");
                attempts = 0;
            }
        }
    }
});

function clearUI() {
    let divs = document.querySelectorAll(".rule-item");
    divs.forEach((div) => {
        div.remove();
    });
}


function addUI(obj) {
    let div = document.createElement("div");
    div.classList.add("rule-item");
    let span = document.createElement("span");
    
    span.innerHTML = obj.title;
    div.append(span);
    
    mainDiv.append(div);
    txt.value = "";
}