const resultTableBody = document.getElementById("result-table-body");
const resultTopDiv = document.getElementById("result-top-div")
const headerAboveTable = document.createElement("h1");
resultTopDiv.appendChild(headerAboveTable)
resultTopDiv.style.textAlign = "center";
let totalVotes = 0;
let counter = 0;

fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(politicalParties => {
        politicalParties.sort((partyA, partyB) => {
            return partyB.partyVotes - partyA.partyVotes;
        })
        politicalParties.map(party => {
            totalVotes += party.partyVotes;
        })
        headerAboveTable.innerHTML = "Frederiksberg Kommunevalg - Antal Stemmer: "+totalVotes;

        politicalParties.map(constructResults);
    });

function constructResults(politicalParties) {
    counter += 1;
    const percentVotes = Number((politicalParties.partyVotes/totalVotes) * 100).toFixed(2);
    const resultPartyTRow = document.createElement("tr");
    resultTableBody.appendChild(resultPartyTRow);
    resultPartyTRow.innerHTML = `
        <td>#${counter}</td>
        <td>(${escapeHTML(politicalParties.abbreviation)}) - ${escapeHTML(politicalParties.partyName)}</td>
        <td>${politicalParties.partyVotes}</td>
        <td>${percentVotes}%</td>
        <td><div id="${counter}" class="percent-votes-bar"></div></td>
    `;
    const bar = document.getElementById(counter)
    bar.style.width = percentVotes+"%";
}