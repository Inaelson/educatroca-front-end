// variables DOM

var body = document.querySelector('body')
var loginFields = document.getElementsByClassName('loginFields')
var loginErrorAlert = document.getElementById('loginErrorAlert')

// Accessibility funtions

var defaultFont = 17

function increaseFont() {
    body.style.fontSize = (defaultFont + 'px')
    if (defaultFont <= 19){
      return defaultFont++
   }
}

function decreaseFont() {
    body.style.fontSize = (defaultFont + 'px')
     if (defaultFont >= 13){
        return defaultFont--
     }
}

function applyContrast() {
    if (body.className == ''){
        body.className = 'contrast'
    } else {
        body.className = ''
    }
}

// Validation login and form

function errorLogin(){
    loginErrorAlert.style.display = 'block'
}

function hideAlert(){
    loginErrorAlert.style.display = 'none'
}

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()

// Homepage functions




// Integrate with api


function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`http://localhost:8080/educatroca/${email}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          alert('Usuário não encontrado');
        } else {
          const person = data;
          if (person.password === password) {
            alert('Login bem-sucedido');
            // Redirecionar para outra página ou realizar outra ação
          } else {
            errorLogin();
          }
        }
      })
      .catch(error => {
        console.error('Erro:', error)
        errorLogin();
      });
  }

function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const course = document.getElementById('course').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
      name: firstName,
      lastName: lastName,
      course: course,
      email: email,
      password: password
    };

    fetch('http://localhost:8080/educatroca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        alert('Cadastro realizado com sucesso!')
        console.log('Success:', data);
        const inputsToClear = document.querySelectorAll('.clear');
        inputsToClear.forEach(input => input.value = '');
        })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error case
      });
}