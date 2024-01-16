//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가됨
// delete버튼을 누르면 삭제
// check버튼을 누르면 밑줄긋기 -> isComplete 상태변환
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 탭역할 만들기

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let deleteButton = document.getElementById("delete-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="task">
                <div class="task-done"id="${list[i].id}" >${list[i].taskContent}</div>
                <div class="button-box">
                  <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                  <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
        </div>`;
    } else {
      resultHTML += `
          <div class="task" id="${list[i].id}">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
          </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

  filterList = [];
  if (mode === "all") {
    //전체 리스트
    render();
  } else if (mode === "ongoing") {
    //진행중인 아이템 보여주기
    //task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    //끝나는케이스
    // =true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
