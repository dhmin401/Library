let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    myLibrary.push(this);
    createList();
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

function createList() {
    let list = document.createElement("p");
    list.setAttribute("class", "list");

    let mark = document.createElement("BUTTON");
    mark.setAttribute("id", "markBook" + myLibrary.length)
    mark.innerHTML = "Change Mark";
    mark.onclick = function() {
        changeMark(event.target.id);
    }

    let remove = document.createElement("BUTTON");
    remove.setAttribute("id", "removeBook" + myLibrary.length)
    remove.innerHTML = "Remove";
    remove.onclick = function() {
        removeBook(event.target.id);
    }
    list.textContent = myLibrary[myLibrary.length - 1].title + 
                        " by " + myLibrary[myLibrary.length - 1].author + 
                        " " + myLibrary[myLibrary.length - 1].pages + " pages, " + myLibrary[myLibrary.length - 1].read + ".";
    list.appendChild(remove); 
    list.appendChild(mark);                   
    document.getElementById("bookList").appendChild(list);
    document.getElementById("bookList").style.visibility = "visible";
}

function modifyList() {
    if(myLibrary.length == 0) {
        document.getElementById("bookList").style.visibility = "hidden";
        return;
    }

    let bookList = document.getElementById("bookList");
    bookList.innerHTML = '';

    for(let i = 0; i < myLibrary.length; i++) {
        let list = document.createElement("p");
        list.setAttribute("class", "list");

        let mark = document.createElement("BUTTON");
        mark.setAttribute("id", "markBook" + (i + 1));
        mark.innerHTML = "Change Mark";
        mark.onclick = function() {
            changeMark(event.target.id);
        }

        let remove = document.createElement("BUTTON");
        remove.setAttribute("id", "removeBook" + (i + 1))
        remove.innerHTML = "Remove";
        remove.onclick = function() {
            removeBook(event.target.id);
        }
        list.textContent = myLibrary[i].title + 
                            " by " + myLibrary[i].author + 
                            " " + myLibrary[i].pages + " pages, " + myLibrary[i].read + ".";
        list.appendChild(remove);                    
        list.appendChild(mark);
        document.getElementById("bookList").appendChild(list);
    }
}

function changeMark(id) {
    let index = parseInt(id.substr(8)) - 1;
    if(myLibrary[index].read === "read") {
        myLibrary[index].read = "unread";
    }
    else {
        myLibrary[index].read = "read";
    }
    modifyList();
}

function removeBook(id) {
    let index = parseInt(id.substr(10)) - 1;
    myLibrary.splice(index, 1);
    modifyList();
}