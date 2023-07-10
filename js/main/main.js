const regionsFilter = document.querySelector(".regions-filter");
const typePositionFilter = document.querySelector(".typePosition-filter");
const regionsSelect = document.querySelector(".regions-select");
const typePositionSelect = document.querySelector(".typePosition-select");
const positionSelect = document.querySelector(".position-select");
const memberForm = document.querySelector(".member-form");
const addMemberBtn = document.querySelector(".add-member-btn");
const membersTable = document.querySelector(".members-table tbody");
const openModalBtn = document.querySelector(".open-modal-btn");

regionsFilter.innerHTML = `<option value='all'>All</option>`;

let selected = null;
let search = "";
let category = localStorage.getItem(CATEGORY) || "all";

function regionBorn() {
  const regionOptions = regions.map(
    (region) => `<option value="${region}">${region}</option>`
  );
  regionsFilter.innerHTML += regionOptions.join("");
  regionsSelect.innerHTML += regionOptions.join("");
}

function typePosition() {
  const typePositionOptions = typePositions.map(
    (typePosition) => `<option value="${typePosition}">${typePosition}</option>`
  );
  typePositionFilter.innerHTML += typePositionOptions.join("");
  typePositionSelect.innerHTML += typePositionOptions.join("");
}

function position() {
  const positionOptions = positions.map(
    (position) => `<option value="${position}">${position}</option>`
  );
  positionSelect.innerHTML += positionOptions.join("");
}

regionBorn();
typePosition();
position();

let membersJSON = localStorage.getItem("members");
let members = JSON.parse(membersJSON) || [];

memberForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (this.checkValidity()) {
    let member = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      regionBorn: this.regionBorn.value,
      position: this.position.value,
      typePosition: this.typePosition.value,
      birthDate: this.birthDate.value,
      salary: this.salary.value,
      isMarried: this.isMarried.checked,
    };

    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));

    const memberRow = getMemberRow(member, membersTable.rows.length);
    membersTable.insertAdjacentHTML("beforeend", memberRow);

    memberForm.reset();
    bootstrap.Modal.getInstance(document.getElementById("memberModal")).hide();
  } else {
    this.classList.add("was-validated");
  }
});

function getMemberRow(
  {
    firstName,
    lastName,
    regionBorn,
    birthDate,
    position,
    typePosition,
    salary,
    isMarried,
  },
  i
) {
  return `<tr>
            <td>${i + 1}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${regionBorn}</td>
            <td>${birthDate} Date</td>
            <td>${position}</td>
            <td>${typePosition}</td>
            <td>${salary}</td>
            <td>${isMarried ? "Yes" : "No"}</td>
            <td class="text-end">
              <button
                data-bs-toggle="modal"
                data-bs-target="#memberModal"
                class="btn btn-primary"
                onClick="editMember(${i})"
              ><i class="fas fa-edit"></i>
                Edit
              </button>
              <button class="btn btn-danger" onClick="deleteMember(${i})"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
          </tr>`;
}

members.forEach((member, i) => {
  const memberRow = getMemberRow(member, i);
  membersTable.insertAdjacentHTML("beforeend", memberRow);
});

function editMember(i) {
  selected = i;
  let {
    firstName,
    lastName,
    regionBorn,
    birthDate,
    position,
    typePosition,
    salary,
    isMarried,
  } = members[i];
  memberForm.firstName.value = firstName;
  memberForm.lastName.value = lastName;
  memberForm.regionBorn.value = regionBorn;
  memberForm.birthDate.value = birthDate;
  memberForm.position.value = position;
  memberForm.typePosition.value = typePosition;
  memberForm.salary.value = salary;
  memberForm.isMarried.checked = isMarried;
  addMemberBtn.innerHTML = `<i class="fas fa-save"></i> Save`;
}

openModalBtn.addEventListener("click", () => {
  memberForm.reset();
  selected = null;
  addMemberBtn.textContent = "Add";
});

// function deleteMember() {
//   members.slic;
// }
