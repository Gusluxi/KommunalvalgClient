const candidatesTableBody = document.getElementById("candidates-table-body");
const politicalPartySelect = document.getElementById("party-select");
let allPoliticalParties;
let allCandidates;
fetch(baseURL + "/parties")
    .then(response => response.json())
    .then(politicalParties => {
        allPoliticalParties = politicalParties;
        politicalParties.map(politicalParty => addPartyToSelect(politicalParty, politicalPartySelect));
        fetch(baseURL + "/candidates")
            .then(response => response.json())
            .then(candidates => {
                allCandidates = candidates;
                console.log(candidates);
                candidates.map(createCandidateTRow);
                createExpandButton();
            })
    })

function addPartyToSelect(politicalParty, partySelect) {
    const partyOption = document.createElement("option");
    partyOption.setAttribute("value", politicalParty.id);
    partyOption.innerText = politicalParty.partyName;
    partySelect.appendChild(partyOption);
}

function createCandidateTRow(candidate) {
    const candidateTRow = document.createElement("tr");
    candidateTRow.id = candidate.id;
    candidatesTableBody.appendChild(candidateTRow);

    constructCandidateTRow(candidateTRow, candidate)
}

function constructCandidateTRow(tableRow, candidate) {
    tableRow.innerHTML = `
        <td><p>${escapeHTML(candidate.firstName)}</p></td>
        <td><p>${escapeHTML(candidate.lastName)}</p></td>
        <td><p>${escapeHTML(candidate.politicalParty.partyName)}</p></td>
        <td><p>${escapeHTML(candidate.phoneNumber.toString())}</p></td>
        <td><p>${escapeHTML(candidate.email)}</p></td>
        <td>
            <button id="update-btn-${candidate.id}">🛠️</button>
            <button id="delete-btn-${candidate.id}">🚫</button>
        </td>
    `;

    //Update - Event Listener
    document.getElementById("update-btn-"+candidate.id)
        .addEventListener("click", () => updateCandidate(candidate))

    //Delete - Event Listener
    document.getElementById("delete-btn-"+candidate.id)
        .addEventListener("click", () => deleteCandidate(candidate))
}

document.getElementById("party-select").addEventListener("change", filterCandidates)
document.getElementById("search-input").addEventListener("input", inputHandler)

function filterCandidates(event) {
    candidatesTableBody.innerHTML = "";
    if (event.target.value === "no-option") {
        allCandidates.map(createCandidateTRow)
    } else {
        fetch(baseURL + "/candidates/parties/" + event.target.value)
            .then(response => response.json())
            .then(candidatesOfParty => {
                candidatesOfParty.map(createCandidateTRow);
            })
    }
}

function inputHandler(event) {
    candidatesTableBody.innerHTML = "";
    const inputTerm = event.target.value.toLowerCase();
    allCandidates.filter(candidate => candidate.firstName.toLowerCase().includes(inputTerm) || candidate.lastName.toLowerCase().includes(inputTerm))
        .map(createCandidateTRow);
}