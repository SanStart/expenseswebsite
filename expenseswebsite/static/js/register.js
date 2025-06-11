// const usernameField=document.querySelector('#usernameField');
// const feedBackArea=document.querySelector(".invalid_feedback");


// usernameField.addEventListener("keyup", (e) => {
//     console.log('777777', 777777);
//     const usernameVal = e.target.value;

//     if (usernameVal.length > 0){
//         fetch("/authentication/validate-username",{
//             body: JSON.stringify({username: usernameVal }), 
//             method: "post"
//         })
//             .then(res=>res.json())
//             .then((data) => {
//                 console.log("data", data);
 
//             if (data.username_error){
//                 usernameField.classList.add('is-invalid');
//                 feedBackArea.style.display="block";
//                 feedBackArea.innerHTML = `<p>${data.username_error}</p>`;




//             }
//             });

//     }
   

// });

const usernameField = document.querySelector('#usernameField');
const feedBackArea = usernameField.nextElementSibling;

usernameField.addEventListener("keyup", (e) => {
    const usernameVal = e.target.value;

    if (usernameVal.length > 0){
        fetch("/authentication/validate-username", {
            body: JSON.stringify({ username: usernameVal }), 
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(res => res.json())
        .then((data) => {
            if (data.username_error){
                usernameField.classList.add('is-invalid');
                feedBackArea.style.display = "block";
                feedBackArea.innerHTML = `${data.username_error}`;
            } else {
                usernameField.classList.remove('is-invalid');
                feedBackArea.style.display = "none";
                feedBackArea.innerHTML = "";
            }
        });
    }
});
