let myLibrary = [];
let title = "";
let author = "";
let numberOfPages = 0;
let hasRead = "";

function Book(title, author, numberOfPages, hasRead){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasRead = hasRead;
}

function clearFormInput(modal){
    let inputs = modal.querySelectorAll("input");
    let readNo = document.getElementById("readNo");
    modal.style.display = "none";

    //clear all input values except for radio buttons
    inputs.forEach(input => {
        if(input.type != "radio"){
            input.value = "";
        }
    });

    readNo.checked = true;
}

function clearData(){
    const trs = document.querySelectorAll('tr');

    //remove all rows except headers
    trs.forEach(tr => {
        if(tr.rowIndex != 0){
            tr.parentNode.removeChild(tr);
        }
    })
}

function displayData(){
    const table = document.querySelector('#main > table');
    const dbRefObject = firebase.database().ref();
    dbRefObject.on('value', snap => {

        clearData();

        snap.forEach(book => {
            let tr = document.createElement('tr');
            let tdTitle = document.createElement('td');
            let tdAuthor = document.createElement('td');
            let tdNumPages = document.createElement('td');
            let tdHasRead = document.createElement('td');
            let tdDelete = document.createElement('td');

            tdTitle.textContent = book.val().title;
            tdAuthor.textContent = book.val().author;
            tdNumPages.textContent = book.val().numberOfPages;

            //for hasRead, create a link then append it to tdHasRead
            let aHasRead = document.createElement('a');
            aHasRead.textContent = book.val().alreadyRead;
            aHasRead.setAttribute('data-attribute', book.key); //added index number for update purposes
            aHasRead.style.cssText = "cursor: pointer; text-decoration: underline; color: grey;";
            addReadListener(aHasRead, aHasRead.textContent);
            tdHasRead.appendChild(aHasRead);

            //for delete, also create a link then append it to tdDelete
            let aDelete = document.createElement('a');
            aDelete.className = "del";
            aDelete.textContent = 'Delete';
            aDelete.setAttribute('data-attribute', book.key); //added index number for delete purposes
            aDelete.style.cssText = "cursor: pointer; text-decoration: underline; color: red;";
            addDelListener(aDelete);
            tdDelete.appendChild(aDelete);

            tr.appendChild(tdTitle);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdNumPages);
            tr.appendChild(tdHasRead);
            tr.appendChild(tdDelete);

            table.appendChild(tr);
        });
    });
}

function insertData(){
    const dbRefObject = firebase.database().ref();
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const alreadyRead = document.getElementsByName("read");
    let read = "";
    
    alreadyRead.forEach(x => {
        if(x.checked){
            read = x.value;
        }
    });

    clearData();

    dbRefObject.push({
        title: title.value,
        author: author.value,
        numberOfPages: pages.value,
        alreadyRead: read
    });
}

function addDelListener(btn){
    btn.addEventListener("click", () => {
        deleteEntry(btn.dataset.attribute);
    });
}

function deleteEntry(key){
    const dbRefObject = firebase.database().ref().child(key);
    dbRefObject.set(null);
}

function addReadListener(btn, value){
    btn.addEventListener("click", () => {
        toggleRead(btn.dataset.attribute, value);
    });
}

function toggleRead(key, value){
    const dbRefObject = firebase.database().ref().child(key);
    let newValue = (value == "No" ? "Yes" : "No");

    dbRefObject.update({
        alreadyRead: newValue
    });
}

window.addEventListener("load", () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyDNf80WN1o1-PsJlgyCwO9mgR9WzYa--bs",
        authDomain: "library-e163c.firebaseapp.com",
        projectId: "library-e163c",
        storageBucket: "library-e163c.appspot.com",
        messagingSenderId: "859801603285",
        appId: "1:859801603285:web:e031d0048dd0897ddf665c",
        measurementId: "G-VNWN11G3BL"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let addBtn = document.getElementById("add");
    let modal = document.getElementById("modal");
    let cancel = document.getElementById("cancel");
    let submit = document.getElementById("submit");
    
    displayData();

    addBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    cancel.addEventListener("click", () => {
        clearFormInput(modal);
    });

    submit.addEventListener("click", () => {
        insertData();
        clearFormInput(modal);
    });
});