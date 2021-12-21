const candidatesTableHead = document.getElementById("candidates-table-head");
const expandButtonDiv = document.getElementById("candidate-add-wrapper");
const candidateTRowForm = `
        <td><input id="create-candidate-first-name" placeholder="Fornavn"></td>
        <td><input id="create-candidate-last-name" placeholder="Efternavn"></td>
        <td><select id="create-candidate-party"></select></td>
        <td><input id="create-candidate-phone-number"></td>
        <td><input id="create-candidate-email"></td>
        <td>
            <button id="save-btn">💾</button>
        </td>
`;


function createExpandButton() {
    expandButtonDiv.innerHTML = `
    <label>Tilføj Kandidat</label><br>
    <button id="expand-candidate-add">➕</button>
    `
    document.getElementById("expand-candidate-add")
        .addEventListener("click", expandCandidateAdd)
}
function createCollapseButton() {
    expandButtonDiv.innerHTML = `
    <label>Annuller Kandidat</label><br>
    <button id="collapse-candidate-add">➖</button>
    `
    document.getElementById("collapse-candidate-add")
        .addEventListener("click", collapseCandidateAdd)
}

function expandCandidateAdd() {
    createCollapseButton();
    const candidateAddTableRow = document.createElement("tr")
    candidateAddTableRow.id = "candidate-form";
    candidatesTableHead.appendChild(candidateAddTableRow)
    candidateAddTableRow.innerHTML = candidateTRowForm;
    allPoliticalParties.map(party => addPartyToSelect(party, document.getElementById("create-candidate-party")));
    document.getElementById("save-btn")
        .addEventListener("click", saveCandidate)
}


function collapseCandidateAdd() {
    createExpandButton();
    document.getElementById("candidate-form").remove();
}

function saveCandidate() {
    const candidateToSave = {
        firstName: document.getElementById("create-candidate-first-name").value,
        lastName: document.getElementById("create-candidate-last-name").value,
        phoneNumber: document.getElementById("create-candidate-phone-number").value,
        email: document.getElementById("create-candidate-email").value
    }

    fetch(baseURL+"/candidates/"+document.getElementById("create-candidate-party").value, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(candidateToSave)
    }).then(response => response.json())
        .then(candidate => {
            console.log(candidate);
            collapseCandidateAdd();
            createCandidateTRow(candidate.candidate);
        }).catch(error => console.log("Network related error: " + error));
}