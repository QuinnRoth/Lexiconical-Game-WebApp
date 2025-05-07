let arr = [];
let txt = document.querySelector("#txt");
let add = document.querySelector("#txt");
let mainDiv = document.querySelector("#mainDiv");
let count = 1;

rules = setRules();

let def = {};
def.id = 0;
def.title = rules[0];

addUI(def);


function setRules() {
    let rules = [];
    let rule1 = "Rule 1: Must Include the letter combination 'ou'.";
    let rule2 = "Rule 2: Must include the letter 'i' twice.";
    let rule3 = "Rule 3: The beginning and end must both be vowels.";
    let rule4 = "Rule 4: Must be 11 characters long.";
    let rule5 = "Rule 5: Guess today's word!";
    rules.push(rule1, rule2, rule3, rule4, rule5);
    return rules;
}

function checkRules() {
    

}

add.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        let obj = {};
        obj.id = count;
        obj.title = txt.value;
        if (obj.title === "" || obj.title.trim() == "") {
            alert("Write Something");
        } else {
            checkRules(obj.title);
            arr.push(obj);
            addUI(obj);
            storeInLocalStorage();
        }
        count++;
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


function storeInLocalStorage() {
    localStorage.setItem("items", JSON.stringify(arr));
}

function getLocalStorage() {
    if (localStorage.getItem("items")) {
        arr = JSON.parse(localStorage.getItem("items"));
    }

    arr.forEach((element) => {
        addUI(element);
    });
}

getLocalStorage();