const addBtn = document.querySelector(".add");
const userName = document.querySelector(".user-name");
const date = document.querySelector("#date");
const amount = document.querySelector("#amount");
const message = document.querySelector(".message");
const expenseData = document.querySelector(".expense-data");

const inputArr = JSON.parse(localStorage.getItem("inputArr")) || [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  message.textContent = "";
  const nameVal = userName.value;
  const dateVal = date.value;
  const amountVal = amount.value;
  const inputResults = validateInput(nameVal, dateVal, amountVal);
  getInput(inputResults);
  showExpence();
  userName.value = "";
  date.value = "";
  amount.value = "";
  console.log(inputArr);
});

const validateInput = (input1, input2, input3) => {
  if (input1 == "") {
    message.textContent = "Please Enter A Name";
  }
  if (input2 == "") {
    message.textContent = "Please Enter A Date";
  }
  if (input3 == "") {
    message.textContent = "Please Enter An Amount";
  } else {
    return [input1, input2, input3];
  }
};

const getInput = ([input1, input2, input3]) => {
  let obj = {};
  obj.name = `${input1}`;
  obj.date = `${input2}`;
  obj.amount = `${input3}`;
  obj.id = inputArr.length > 0 ? inputArr[inputArr.length - 1].id + 1 : 1;
  inputArr.push(obj);
  localStorage.getItem("inputArr", JSON.stringify(inputArr));
};

const showExpence = () => {
  expenseData.innerHTML = "";
  for (let i = 0; i < inputArr.length; i++) {
    //   inputArr.forEach((obj) => {
    //     for (let input in obj) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${inputArr[i].name}</td>
      <td>${inputArr[i].date}</td>
      <td>$${inputArr[i].amount}</td>
      <td><a class="deleteButton" onclick="deleteExpense(${inputArr[i].id})">
                    Delete</td>`;
    //   expenseData.append(td);
    expenseData.append(tr);
  }
};

const deleteExpense = (id) => {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].id == id) {
      inputArr.splice(i, 1);
    }
  }
  showExpence();
};
