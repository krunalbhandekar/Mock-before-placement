let globalData = [];
let filteredData = [];
let allData = [];
let pagination = document.getElementById("pagination-container");

getAllData();
apiCall(1);
renderPagination(7);

async function getAllData() {
  for (let i = 1; i <= 7; i++) {
    let data = await fetch(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${i}`
    );
    data = await data.json();
    data = data.data;
    allData = [...allData, ...data];
  }
  console.log(allData, allData.length);
}

//1. API Call
async function apiCall(page) {
  let data = await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}`
  );

  globalData = await data.json();
  globalData = globalData.data;
  filteredData = globalData;
  renderData(globalData);
}

//2. Rendering Table
function renderData(data) {
  let root = document.querySelector("tbody");
  root.innerHTML = null;
  data.map((el) => {
    let row = document.createElement("tr");

    let profile = document.createElement("td");
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    );
    image.setAttribute("class", "dp");
    profile.append(image);

    let name = document.createElement("td");
    name.innerText = el.name;

    let department = document.createElement("td");
    department.innerText = el.department;

    let salary = document.createElement("td");
    salary.innerText = el.salary;

    let gender = document.createElement("td");
    gender.innerText = el.gender;

    row.append(profile, name, department, gender, salary);
    root.append(row);
  });
}

// 3. Pagination using the API itself
function renderPagination(pages) {
  for (let page = 1; page <= pages; page++) {
    let button = document.createElement("button");
    button.innerText = page;
    pagination.append(button);

    button.addEventListener("click", () => {
      apiCall(page);
    });
  }
}

// Filter Functionality (Uses Manual Pagination)
let filter = document.getElementById("filter-department");
filter.addEventListener("change", filterData);

function filterData() {
  let dept = filter.value;

  filteredData = allData.filter((el) => {
    return dept == el.department;
  });

  renderButtons(filteredData);
}

// Sort Functionality (Uses Manual Pagination)
let sort = document.getElementById("filter-sort");
sort.addEventListener("change", sortData);

function sortData() {
  let query = sort.value;
  if (query == "lth") {
    filteredData.sort(function (a, b) {
      return parseFloat(a.salary) - parseFloat(b.salary);
    });
    renderButtons(filteredData);
  }
  if (query == "htl") {
    filteredData.sort(function (a, b) {
      return parseFloat(b.salary) - parseFloat(a.salary);
    });
    renderButtons(filteredData);
  }
}

//Search by name functionality (Uses Manual Pagination)
let searchEmployee = document.getElementById("search-employee");
searchEmployee.addEventListener("input", searchData);

function searchData() {
  let searchQuery = searchEmployee.value;
  searchQuery = searchQuery.toLowerCase();
  if (searchQuery == "") {
    filteredData = data;
  } else {
    filteredData = allData.filter((el) => {
      let name = el.name.toLowerCase();
      console.log(name);
      return name.includes(searchQuery);
    });
    document.getElementById("pagination-container").innerHTML = null;
  }
  renderButtons(filteredData);
}

// Pagination Manually - Since our pagination from backend breaks when we filter or sort
//Pagination Variables and Functionality
const per_page = 5; //Took it as 5, so that we can clearly see how pagination works, since we dont have enough data
let current_page = 1;

//Pagination buttons
function renderButtons(data) {
  pagination.innerHTML = null;
  let pages = Math.ceil(data.length / per_page);
  paginatedList(data, current_page, per_page);
  for (let page = 1; page <= pages; page++) {
    let button = document.createElement("button");
    button.setAttribute("class", "pagination-btn");
    button.innerText = page;
    button.addEventListener("click", () => {
      current_page = page;
      paginatedList(data, current_page, per_page);
    });
    pagination.append(button);
  }
}

//Paginated list
function paginatedList(data, current_page, per_page) {
  let start = per_page * (current_page - 1);
  let end = per_page * current_page;
  let paginatedData = data.slice(start, end);
  renderData(paginatedData);
}

// Notes
// Button pagination is working from the API pagination iteself, and for filter,search and sort we are using manual pagination, since we don't have support for that from the API itself.
