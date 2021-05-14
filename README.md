In this project, I created a simple library app. 
The project can be found in the Javascript course of The Odin Project.
When a user clicks the "Add new book" button, a modal window will appear with the add book form in it. 
I added a simple form validation to check each field. 
If any of it is empty, there will be an alert with a message "All fields must be filled up".
Clicking on the cancel button not only closes the modal but also clears everything you have put in the form.
That means you will have a fresh form when you click the add a book button again.
When submit button is clicked, the value of each field will be passed as arguments to the Book object.
This object will then be added to the array.
Next, I clear the current display and loop through the array.
Each book will be have its own row.
I used the create element then appendChild to do this.
I also created a variable which is initialized to 0. 
The purpose of this is to add a data-attribute to each book for deletion purposes.
Using this data-attribute, I know which book the user wants to delete. 
I used the splice function to remove this element from the array then clear and display again.
I also added a toggle for the already read cell.
If the user click it, it will change from yes to no and vice versa.