//single page application, working on the client side for this app.js
/*
IIFE ---> Immediatley invoked function expression
*/

(function(){
    function Start()

    {
        console.log("App Started")
        //Asking for confirmation to delete a database entry - delete button
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for(button of deleteButtons)
        {
            button.addEventListener('click',(event)=>{
                if(!confirm('Are You Sure You Want To Do This?'))
                {
                    event.preventDefault();
                    window.location.assign('/wishList')
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();


