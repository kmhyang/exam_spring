init();

// 최초 셋팅
function init() {
    getEmpAllList("");

    getAllDept();

    document.querySelector('#chkDelBtn').addEventListener('click', selectDelte)

    document.querySelector('#delBtn').addEventListener('click', delBtnClick);

    document.querySelector('#saveBtn').addEventListener('click', saveBtnClick);

    document.querySelector("#deptInfo").addEventListener('change', getEmpDeptList);

    document.getElementById('allCheck')
        .addEventListener('click', allCheckEvent);

    document.getElementById('resetBtn')
        .addEventListener('click', resetCheck);

    document.getElementById('initBtn')
        .addEventListener('click', formInit);
}

let empIndexList = ["employeeId", "lastName", "hireDate", "jobId", "departmentName"];

// 전체 부서 리스트
function getEmpAllList(selectData) {
    document.querySelector('#empList tbody').replaceChildren();

    fetch("http://localhost:8099/empList?departmentId=" + selectData)
        .then(response => response.json())
        .then(data => {
            data.forEach(empData => {
                let trTag = createTrData(empData);
                document.querySelector("tbody").append(trTag);
            })
        })
        .catch(err => console.log(err));
}

//tr 생성
function createTrData(info) {
    let trTag = document.createElement('tr');
    let tdTag = document.createElement('td');
    let checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    tdTag.append(checkBox);
    trTag.append(tdTag);
    for (let empIndex of empIndexList) {
        tdTag = document.createElement('td');
        tdTag.textContent = info[empIndex];
        trTag.append(tdTag);
    }

    trTag.addEventListener('click', printEmpInfo);

    return trTag;
}

// tr 누를시
function printEmpInfo(e) {
    if (e.target.tagName == "INPUT") return;
    let empId = e.currentTarget.children[1].textContent;

    fetch("http://localhost:8099/empInfo?employeeId=" + empId)
        .then(response => response.json())
        .then(data => {
            printSelectedEmp(data);
        })
        .catch(err => console.log(err));
}

// 선택된 tr 정보 input창 출력
function printSelectedEmp(data) {
    let inputList = document.querySelectorAll("#empInfo input");
    inputList.forEach(inputData => {
        inputData.value = data[inputData.name];
    })
    let selectTag = document.querySelector("#deptData");
    selectTag.value = data[selectTag.name];
}

// 부서정보 -> select
function getAllDept() {
    fetch("http://localhost:8099/deptList")
        .then(response => response.json())
        .then(data => {
            let deptInfoTag = document.querySelector("#deptInfo");
            let deptDataTag = document.querySelector("#deptData");
            data.forEach(deptData => {
                let optionInfoTag = document.createElement('option');
                let optionDataTag = document.createElement('option');
                optionInfoTag.value = deptData["departmentId"];
                optionInfoTag.textContent = deptData["departmentName"];
                optionDataTag.value = deptData["departmentId"];
                optionDataTag.textContent = deptData["departmentName"];
                deptInfoTag.append(optionInfoTag);
                deptDataTag.append(optionDataTag);
            })
        })
        .catch(err => console.log(err));
}

// 부서선택시 리스트 출력
function getEmpDeptList(e) {
    let deptId = document.querySelector("#deptInfo").value;
    getEmpAllList(deptId);
}

// 저장 버튼 클릭
function saveBtnClick() {
    let inputList = document.querySelectorAll('#empInfo input');
    let selectData = document.querySelector('#deptData');
    let saveForm = {};
    inputList.forEach(inputData => {
        saveForm[inputData.name] = inputData.value;
    })
    saveForm[selectData.name] = selectData.value;
    console.log(saveForm);
    if (saveForm["employeeId"] == "") {
        insertData(saveForm, selectData.value);
    } else {
        updateData(saveForm, selectData.value)
    }
}

// insert data
function insertData(saveForm, deptId) {
    fetch("http://localhost:8099/empInsert", {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(saveForm)
        })
        .then(response => response.json())
        .then(data => {
            let selectTag = document.querySelector("#deptInfo");
            selectTag.value = saveForm["departmentId"];
            getEmpAllList(deptId);
            let inputList = document.querySelectorAll("#empInfo input");
            inputList.forEach(inputData=>{
                inputData.value=data[inputData.name];
            })
        })
        .catch(err => console.log(err));
}

//update data
function updateData(saveForm, deptId) {
    fetch("http://localhost:8099/empUpdate", {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(saveForm)
        })
        .then(response => response.json())
        .then(data => {
            let selectTag = document.querySelector("#deptInfo");
            selectTag.value = saveForm["departmentId"];
            getEmpAllList(deptId);
        })
        .catch(err => console.log(err));
}

// delBtn 클릭
function delBtnClick(e) {
    let empList = document.querySelectorAll("#empList tbody tr");
    let empId = document.querySelector('#empInfo input:nth-child(1)').value;
    fetch("http://localhost:8099/empDelete?employeeId=" + empId)
        .then(response => response.json())
        .then(data => {
            let message = `삭제 완료\n삭제 사원 : ${data["employeeId"]}`
            alert(message);
            empList.forEach(emp => {
                if (emp.children[1].textContent == data["employeeId"]) {
                    emp.remove();
                }
            })
            formInit();
        })
        .catch(err => console.log(err));
}

//선택 삭제
function selectDelte(e) {
    e.stopPropagation();
    let empList = document.querySelectorAll("#empList tbody tr");
    let chkInputList = document.querySelectorAll('#empList input[type="checkbox"]:checked');
    let checkedList = [];

    chkInputList.forEach(chkInput => {
        let empId = chkInput.parentNode.nextElementSibling.textContent;
        checkedList.push({
            'employeeId': empId
        });
    })

    fetch("http://localhost:8099/empDelete", {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(checkedList)
        })
        .then(response => response.json())
        .then(data => {
            let total = checkedList.length;
            let success = data.length;
            data.forEach(delEmp => {
                empList.forEach(emp=>{
                    if (emp.children[1].textContent === delEmp) {
                        emp.remove();
                    }
                })
            })

            let message = `----------------------------------\n삭제를 요청한 ${total}건 중 \n${success}건을 삭제했습니다.\n[대상사원 : ${JSON.stringify(data)}]\n----------------------------------`;
            alert(message);
        })
        .catch(err => console.log(err));
}

// 사원정보 전체 선택
function allCheckEvent(e) {
    let allCheckTag = document.getElementById('allCheck');
    let checkTags = document.querySelectorAll('[type="checkbox"]');
    checkTags.forEach(el => {
        el.checked = allCheckTag.checked;
    })
}

// 사원정보 선택취소
function resetCheck(e) {
    let checkTags = document.querySelectorAll('[type="checkbox"]');
    checkTags.forEach(el => {
        el.checked = false;
    })
}

// 초기화
function formInit() {
    let insertList = document.querySelectorAll('#empInfo input, #empInfo select');
    insertList.forEach(el => el.value = '');
}