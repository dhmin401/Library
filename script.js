let myList = [];
var storedList = JSON.parse(localStorage.getItem("myList"));

window.addEventListener('load', function () {
    if(storedList.length > 0) {
        myList = storedList;
        loadList();
    }
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    myList.push(this);
    addList();
}

function addBook() {
    let title = document.forms["bookForm"]["title"].value;
    let author = document.forms["bookForm"]["author"].value;
    let pages = document.forms["bookForm"]["pages"].value;
    let checkBox = document.getElementById("read");
    let read = "";
    if(checkBox.checked == true) {
        read = "read";
    }
    else {
        read = "unread";
    }
    new Book(title, author, pages, read);
    return false;
}

function loadList() {
    let listContainer = document.getElementById("listContainer");
    let listHeader = document.getElementById("listHeader");
    let list = document.createElement("ul");

    for(let i = 0; i < myList.length; i++) {
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "listItem");

        let mark = document.createElement("BUTTON");
        mark.setAttribute("id", "markBook" + (i + 1));
        mark.setAttribute("class", "markBook");
        mark.innerText = "Change Mark";
        mark.onclick = function() {
            changeMark(event.target.id);
        }

        let remove = document.createElement("BUTTON");
        remove.setAttribute("id", "removeBook" + (i + 1))
        remove.innerText = "Remove";
        remove.onclick = function() {
            removeBook(event.target.id);
        }

        listItem.textContent = myList[i].title + 
                            " by " + myList[i].author + 
                            " " + myList[i].pages + " pages, " + myList[i].read + ".";

        listItem.appendChild(remove);                    
        listItem.appendChild(mark);
        list.appendChild(listItem);       
    }
    listContainer.appendChild(list);  
    listContainer.style.visibility = "visible";
    listHeader.style.visibility = "visible";
}

function addList() {
    setStorage();
    document.getElementById("listContainer").innerText = '';
    loadList();
}

function modifyList() {
    setStorage();
    let listContainer = document.getElementById("listContainer");
    let listHeader = document.getElementById("listHeader");

    if(myList.length == 0) {
        listContainer.style.visibility = "hidden";
        listHeader.style.visibility = "hidden";
        return;
    }

    listContainer.innerText = '';
    loadList();
}

function changeMark(id) {
    let index = parseInt(id.substr(8)) - 1;
    if(myList[index].read === "read") {
        myList[index].read = "unread";
    }
    else {
        myList[index].read = "read";
    }
    modifyList();
}

function removeBook(id) {
    let index = parseInt(id.substr(10)) - 1;
    myList.splice(index, 1);
    modifyList();
}

function setStorage() {
    localStorage.setItem("myList", JSON.stringify(myList));
}