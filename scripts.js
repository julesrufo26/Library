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

function addBookToLibrary(book){
    myLibrary.push(book);
}   

function closeForm(){
    const inputs = document.querySelectorAll('#form-modal > input');
    const readYes = document.getElementById('readYes');
    const readNo = document.getElementById('readNo');

    //clear textBox contents
    inputs.forEach(input =>{
        input.value = "";
    });

    //Bring back the values for radio buttons
    readYes.value = 'Yes';
    readNo.value = "No";

    //reset radio button to No
    readNo.checked = true;

    //hide the modal
    modal.style.display = 'none';
}

function displayData(){
    const table = document.querySelector('#main > table');
    let x = 0;

    myLibrary.forEach(book => {
        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdAuthor = document.createElement('td');
        let tdNumPages = document.createElement('td');
        let tdHasRead = document.createElement('td');
        let tdDelete = document.createElement('td');
        
        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdNumPages.textContent = book.numberOfPages;

        //for hasRead, create a link then append it to tdHasRead
        let aHasRead = document.createElement('a');
        aHasRead.textContent = book.hasRead;
        aHasRead.setAttribute('data-attribute', x); //added index number for update purposes
        aHasRead.style.cssText = "cursor: pointer; text-decoration: underline; color: grey;";
        addReadListener(aHasRead);
        tdHasRead.appendChild(aHasRead);

        //for delete, also create a link then append it to tdDelete
        let aDelete = document.createElement('a');
        aDelete.textContent = 'Delete';
        aDelete.setAttribute('data-attribute', x); //added index number for delete purposes
        aDelete.style.cssText = "cursor: pointer; text-decoration: underline; color: red;";
        addDelListener(aDelete);
        tdDelete.appendChild(aDelete);

        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdNumPages);
        tr.appendChild(tdHasRead);
        tr.appendChild(tdDelete);

        table.appendChild(tr);

        x++;
    });
}

function clearData(){
    const trs = document.querySelectorAll('tr');

    trs.forEach(tr => {
        if(tr.rowIndex != 0){
            tr.parentNode.removeChild(tr);
        }
    })
}

function addDelListener(element){
   element.addEventListener('click', (e)=>{
       let index = e.toElement.dataset.attribute;
       deleteElement(index);
   });
}

function deleteElement(index){
    myLibrary.splice(index, 1);
    clearData();
    displayData();
}

function addReadListener(element){
    element.addEventListener('click', (e)=>{
        let index = e.toElement.dataset.attribute;
        toggleRead(index);
    });
}

function toggleRead(index){
    let currentReadStatus = myLibrary[index].hasRead;

    if(currentReadStatus == 'Yes'){
        myLibrary[index].hasRead = 'No';
    }
    else{
        myLibrary[index].hasRead = 'Yes';
    }

    clearData();
    displayData();
}

window.addEventListener('load', () => {
    const addNewBook = document.getElementById('add');
    const modal = document.getElementById('modal');
    const cancel = document.getElementById('cancel');
    const submit = document.getElementById('submit');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementsByName('read');

    addNewBook.addEventListener('click', () =>{
        modal.style.display = 'flex';
    });

    cancel.addEventListener('click', () =>{
        closeForm();
    });

    submit.addEventListener('click', () => {
        let hasRead = "";
        //simple form validation to check if all fields have been filled up
        if(title.value == "" || author.value == "" || numberOfPages == ""){
            alert("All fields must be filled up.");
            return;
        }

        for(let x=0; x<read.length; x++){
            if(read[x].checked){
                hasRead = read[x].value;

                break;
            }
        }

        //Create new book object
        let book = new Book(title.value, author.value, pages.value, hasRead);    

        //Add to the myLibrary array
        addBookToLibrary(book);

        closeForm();

        clearData();
        displayData();
    });
});
