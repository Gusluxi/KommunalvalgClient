const politicalPartyDiv = document.getElementById("parties-wrapper-div")

fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(politicalParties => {
        politicalParties.map(createPartyCard)
    });

function createPartyCard(politicalParty) {
    const partyCardDiv = document.createElement("div");
    partyCardDiv.className = "party-card-div";
    politicalPartyDiv.appendChild(partyCardDiv);
    constructPartyDiv(partyCardDiv, politicalParty)
}
function constructPartyDiv(cardDiv, politicalParty) {
    cardDiv.innerHTML = `
        <img class="party-image" src="${politicalParty.partyImage}">
        <h2>${escapeHTML(politicalParty.abbreviation)} - ${escapeHTML(politicalParty.partyName)}</h2>
       <h2><a href="https://${escapeHTML(politicalParty.webAddress)}">${escapeHTML(politicalParty.webAddress)}</a></h2>
    `
}