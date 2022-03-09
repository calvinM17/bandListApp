class Member {
    constructor(name, instrument){
        this.name = name;
        this.instrument = instrument;
    }
}

class Band {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }
    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

let bands = [];
let bandId = 0;

onClick('new-band', () => {
    bands.push(new Band(bandId++, getValue('new-band-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let bandDiv = document.getElementById('bands');
    clearElement(bandDiv);
    for (let band of bands) {
        let table = createBandTable(band);
        let title = document.createElement('h2');
        title.innerHTML = band.name;
        title.appendChild(createDeleteBandButton(band));
        bandDiv.appendChild(title);
        bandDiv.appendChild(table);
        for (let member of band.members) {
            createMemberRow(band, table, member);
        }
    }
}

function createMemberRow(band, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.instrument;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(band, member));
}

function createDeleteRowButton(band, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = band.members.indexOf(member);
        band.members.splice(index, 1);
            drawDOM();
    };
    return btn;
}

function createDeleteBandButton(band) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Band';
    btn.onclick = () => {
        let index = bands.indexOf(band);
        bands.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(band) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        band.members. push(new Member(getValue(`name-input-${band.id}`), getValue(`instrument-input-${band.id}`)));
        drawDOM();
    };
    return btn;
}

function  createBandTable(band) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let instrumentColumn = document.createElement('th');
    let buttonColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    instrumentColumn.innerHTML = 'Instrument';
    row.appendChild(nameColumn);
    row.appendChild(instrumentColumn);
    row.appendChild(buttonColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let instrumentTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${band.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let instrumentInput = document.createElement('input');
    instrumentInput.setAttribute('id', `instrument-input-${band.id}`);
    instrumentInput.setAttribute('type', 'text');
    instrumentInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(band);
    nameTh.appendChild(nameInput);
    instrumentTh.appendChild(instrumentInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(instrumentTh);
    formRow.appendChild(createTh);
    return table;

}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}