//TODO: Handle Add/Edit Errors?
//Implement Saving of D-f Switches

function loadBlocks() {
  try {
    chrome.storage.sync.get(['blocked'], function(result) {
      let blocked = result.blocked;
      let container = document.getElementById("existingBlocks");
      container.innerHTML = "";

      for (let i = 0; i < blocked.length; i++) {
        let containerDiv = document.createElement("div");
        containerDiv.id = "displayEC" + i;

        let textbox = document.createElement("input");
        textbox.setAttribute("type", "text");
        textbox.setAttribute("value", blocked[i]);
        textbox.setAttribute("class", "text-input");
        textbox.setAttribute("disabled", true);
        textbox.id = "tbox" + i;

        let editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.setAttribute("class", "btn");
        editBtn.id = "edit" + i;

        let saveBtn = document.createElement("button");
        saveBtn.innerHTML = '<i class="fa fa-save"></i>';
        saveBtn.setAttribute("style", "display: None;");
        saveBtn.setAttribute("class", "btn");
        saveBtn.id = "save" + i;

        let delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fa fa-trash"></i>';
        delBtn.setAttribute("class", "btn");
        delBtn.id = "del" + i;

        containerDiv.appendChild(textbox);
        containerDiv.appendChild(editBtn);
        containerDiv.appendChild(saveBtn);
        containerDiv.appendChild(delBtn);

        container.appendChild(containerDiv);
      }
    });
  } catch (e) {}
}


function saveBlock(num) {
  try {
    chrome.storage.sync.get(['blocked'], function(result) {
      let blocked = result.blocked;
      let tbox = document.getElementById("tbox" + num);
      let saveBtn = document.getElementById("save" + num);
      let editBtn = document.getElementById("edit" + num);

      blocked[num] = tbox.value;

      chrome.storage.sync.set({ "blocked": blocked }, function(){
        tbox.setAttribute("disabled", true);
        saveBtn.setAttribute("style", "display: None;");
        editBtn.setAttribute("style", "display: inline-block;");
      });
    });
  } catch (e) {}
}

function deleteBlock(num) {
  try {
    chrome.storage.sync.get(['blocked'], function(result) {
      let blocked = result.blocked;
      blocked.splice(num, 1);

      chrome.storage.sync.set({ "blocked": blocked }, function(){
        loadBlocks();
        attachListners();
      });
    });
  } catch (e) {}
}

function editBlock(num) {
  let tbox = document.getElementById("tbox" + num);
  let saveBtn = document.getElementById("save" + num);
  let editBtn = document.getElementById("edit" + num);
  tbox.removeAttribute("disabled");
  saveBtn.setAttribute("style", "display: inline-block;");
  editBtn.setAttribute("style", "display: None;");
}

function addBlock() {
  try {
    chrome.storage.sync.get(['blocked'], function(result) {
      let blocked = result.blocked;
      let addbox = document.getElementById("add-text");
      blocked.push(addbox.value);

      chrome.storage.sync.set({ "blocked": blocked }, function(){
        loadBlocks();
        attachListners();
      });
    });
  } catch (e) {}
}

function attachListners() {

  try {
    chrome.storage.sync.get(['blocked'], function(result) {
      let blocked = result.blocked;

      for (let i = 0; i < blocked.length; i++) {
        let delBtn = document.getElementById("del" + i);
        let saveBtn = document.getElementById("save" + i);
        let editBtn = document.getElementById("edit" + i);
        delBtn.addEventListener("click", function() {
          deleteBlock(i);
        });
        saveBtn.addEventListener("click", function() {
          saveBlock(i);
        });
        editBtn.addEventListener("click", function() {
          editBlock(i);
        });
      }

      let addbox = document.getElementById("add");
      addbox.addEventListener("click", function() {
        addBlock();
      });

    });
  } catch (e) {}

}


loadBlocks();
attachListners();
