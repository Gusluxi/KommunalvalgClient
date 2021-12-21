function updateCandidate(candidate) {
    const candidateTRowToUpdate = document.getElementById(candidate.id);

    candidateTRowToUpdate.innerHTML = `
        <td><input required id="update-candidate-first-name-${candidate.id}" value="${escapeHTML(candidate.firstName)}"></td>
        <td><input required id="update-candidate-last-name-${candidate.id}" value="${escapeHTML(candidate.lastName)}"></td>
        <td><select id="update-candidate-party-${candidate.id}"><option value="${candidate.politicalParty.id}">${escapeHTML(candidate.politicalParty.partyName)}</option></select></td>
        <td><input required id="update-candidate-phone-number-${candidate.id}" value="${escapeHTML(candidate.phoneNumber.toString())}"></td>
        <td><input required id="update-candidate-email-${candidate.id}" value="${escapeHTML(candidate.email)}"></td>
        <td>
            <button id="confirm-btn-${candidate.id}">✔</button>
            <button id="cancel-btn-${candidate.id}">❌</button>
        </td>
    `;
    const selectPartyUpdate = document.getElementById("update-candidate-party-"+candidate.id);
    allPoliticalParties.map(party => {
        if (party.id !== candidate.politicalParty.id) {
            addPartyToSelect(party, selectPartyUpdate)
        }
    })

    document.getElementById("confirm-btn-"+candidate.id)
        .addEventListener("click", () => updateCandidateInBackend(candidate))

    document.getElementById("cancel-btn-"+candidate.id)
        .addEventListener("click", () => cancelUpdate(candidate))
}

function cancelUpdate(candidate) {
    const candidateTableRow = document.getElementById(candidate.id);

    constructCandidateTRow(candidateTableRow, candidate)
}

function updateCandidateInBackend(candidate) {
    const candidateTableRow = document.getElementById(candidate.id)

    const candidateToPatch = {
        id: candidate.id,
        firstName: document.getElementById(`update-candidate-first-name-${candidate.id}`).value,
        lastName: document.getElementById(`update-candidate-last-name-${candidate.id}`).value,
        phoneNumber: document.getElementById(`update-candidate-phone-number-${candidate.id}`).value,
        email: document.getElementById(`update-candidate-email-${candidate.id}`).value
    };

    fetch(baseURL + "/candidates/" + candidate.id + "/parties/" + document.getElementById("update-candidate-party-"+candidate.id).value, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(candidateToPatch)
    }).then(response => response.json())
        .then(candidate => {
            constructCandidateTRow(candidateTableRow, candidate.candidate);
        }).catch(error => console.log("Network related error: " + error));
}


function deleteCandidate(candidate) {
    fetch(baseURL + "/candidates/" + candidate.id, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(candidate.id).remove();
        } else {
            console.log("Candidate not deleted", response.status);
        }
    });
}