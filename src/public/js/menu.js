window.onload = function() {

    let menu = document.querySelector(".menu");
    let menu_option = document.querySelectorAll("header nav ul li");
    menu.addEventListener("click", function() {
        for (let i = 0; i < menu_option.length; i++) {
            console.log(menu_option[i]);
           menu_option[i].classList.toggle("mostrar-menu") 
            
        }
        
    });

}