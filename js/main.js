// letiables DOM

let body = document.querySelector('body')
let loginFields = document.getElementsByClassName('loginFields')
let loginErrorAlert = document.getElementById('loginErrorAlert')

// Accessibility funtions

let defaultFont = 17

function increaseFont() {
  body.style.fontSize = (defaultFont + 'px')
  if (defaultFont <= 19) {
    return defaultFont++
  }
}

function decreaseFont() {
  body.style.fontSize = (defaultFont + 'px')
  if (defaultFont >= 13) {
    return defaultFont--
  }
}

function applyContrast() {
  if (body.className == '') {
    body.className = 'contrast'
  } else {
    body.className = ''
  }
}

// Validation login and form

function errorLogin() {
  loginErrorAlert.style.display = 'block'
}

function hideAlert() {
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

function togglePassword() {
  let passwordField = document.getElementById("password");
  let showPasswordCheckbox = document.getElementById("showPassword");
  if (showPasswordCheckbox.checked) {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
}

// Homepage functions

function publish() {
  const postContent = document.getElementById('post-text').value;
  const userName = document.getElementById('name').textContent;

  if (postContent.trim() !== '') {
    const postId = `post-${Date.now()}`;
    const postContainer = document.getElementById('posts-container');
    const postStructure = `
                <div class="row structure-content" id="${postId}">
                    <div class="col-2 profile-pic-post">
                        <span><i class="fa-circle-user fa-solid"></i></span>
                    </div>
                    <div class="col-3 align-self-center">
                        <span>${userName}</span>
                    </div>
                    <hr>
                    <div class="col-12 post-content">
                        <p>${postContent}</p>
                    </div>
                    <hr>
                    <div class="col-8 col-sm-9 col-md-10 mb-2 align-self-center">
                        <input class="form-control comment-input" type="text" placeholder="Escreva um comentário...">
                    </div>
                    <div class="col-1 ms-auto mb-2 button-style-w">
                        <button class="btn button-style comment-btn" on-click="comment()" type="button">Enviar</button>
                    </div>
                    <div class="col-12 comment-section">
                        <!-- Comentários serão inseridos aqui -->
                    </div>
                </div>
            `;
    postContainer.insertAdjacentHTML('beforeend', postStructure);
    document.getElementById('post-text').value = '';

    // Adicionar evento de comentário para o novo post
    const commentBtn = document.querySelector(`#${postId} .comment-btn`);
    commentBtn.addEventListener('click', function () {
      const commentInput = commentBtn.closest('.row').querySelector('.comment-input');
      const commentText = commentInput.value;
      if (commentText.trim() !== '') {
        const commentSection = commentBtn.closest('.row').querySelector('.comment-section');
        const commentStructure = `<span><i class="fa-circle-user fa-solid"></i></span><p>${commentText}</p>`;
        commentSection.insertAdjacentHTML('beforeend', commentStructure);
        commentInput.value = '';
      }
    });
  }
}

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
          window.location.href = `homepage.html?name=${person.name}&course=${person.course}&lastName=${person.lastName}`;
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