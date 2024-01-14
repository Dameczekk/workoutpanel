const toggleArrow = document.querySelector('#toggleArrow');

const sideBar_Button_0 = document.querySelector('#sideBarButton0');
const sideBar_Button_1 = document.querySelector('#sideBarButton1');
const sideBar_Button_2 = document.querySelector('#sideBarButton2');
const sideBar_Button_3 = document.querySelector('#sideBarButton3');
const sideBar_Button_4 = document.querySelector('#sideBarButton4');
const sideBar_Button_5 = document.querySelector('#sideBarButton5');

const logOut_Button = document.querySelector('#logOut_Button');

const confirm1 = document.querySelector('#confirm1');
const confirm2 = document.querySelector('#confirm2');
const confirm3 = document.querySelector('#confirm3');
const confirm4 = document.querySelector('#confirm4');
const confirm6 = document.querySelector('#confirm6');

const cancel4 = document.querySelector('#cancel4');

const add_product_Button = document.querySelector('#add_product_Button');

const signup_Button = document.querySelector('#signup_Button');

const namesCookie = getCookie('names');
const lastNamesCookie = getCookie('lastNames');
const passwordsCookie = getCookie('passwords');
const birthdaysCookie = getCookie('birthdays');
const gendersCookie = getCookie('genders');
const firstLoginCookie = getCookie('firstLogin');
const profilePicsCookie = getCookie('profilePics');
const usersAgeCookie = getCookie('usersAge');
const notificationsCookie = getCookie('notidications');

const names = namesCookie ? JSON.parse(namesCookie) : [];
const lastNames = lastNamesCookie ? JSON.parse(lastNamesCookie) : [];
const passwords = passwordsCookie ? JSON.parse(passwordsCookie) : [];
const birthdays = birthdaysCookie ? JSON.parse(birthdaysCookie) : [];
const genders = gendersCookie ? JSON.parse(gendersCookie) : [];
const firstLogin = firstLoginCookie ? JSON.parse(firstLoginCookie) : [];
const profilePics = profilePicsCookie ? JSON.parse(profilePicsCookie) : [];
const usersAge = usersAgeCookie ? JSON.parse(usersAgeCookie) : [];
const notifications = notificationsCookie ? JSON.parse(notificationsCookie) : [];

const finishButton = document.querySelector('#finishButton');
const arrowBack = document.querySelector('#arrowBack');
const arrowForward = document.querySelector('#arrowForward');
const sliderContainer = document.querySelector('#profilePics');

const ring0 = document.querySelector('.lds-dual-ring');

const ring_Button = document.querySelector('#ring_button');
const profile = document.querySelector('.profile');

let devMode = true;
let accountIndex = getCookie('accountIndex') || null;
let currentImageIndex = 0;
let selectedImage = 0;
let runPanel = getCookie('runPanel') || false;

let goal_kcal = 2300;

let productsList = [];
let kcal_today = 0;

function captureDatas
(
  name, lastname, age, height, weight,
  protein_today, fats_today, carbohydrates_today,
  physicalActivityLevel
) {
  let userDatas = {
    name: name,
    lastname: lastname,
    age: age,
    height: height,
    weight: weight,
    protein_today: protein_today,
    fats_today: fats_today,
    carbohydrates_today: carbohydrates_today,
    physicalActivityLevel: physicalActivityLevel
  };

  let userDatasJSON = JSON.stringify(userDatas);

  setCookie('userDatas', userDatasJSON);
};

function addNewProduct(name, kcal, protein, carbohydrates, fat, weight, productType) {
  let product = {
    name: name,
    kcal: kcal,
    protein: protein,
    carbohydrates: carbohydrates,
    fat: fat,
    weight: weight,
    productType: productType
  };
  
  productsList.push(product);
}

let toggle_0 = true;

let product_id = 0;

toggleArrow.addEventListener('click', () => {
  const sideBar = document.querySelector('.sideBar');
  const panel = document.querySelectorAll('.panel');

  if (toggle_0) {
    panel.forEach(element => element.classList.add('expanded_panel'));
    sideBar.classList.add('expanded_sideBar');
    toggleArrow.querySelector('img').setAttribute('src', 'assets/img/icons/right.png');
  } else {
    panel.forEach(element => element.classList.remove('expanded_panel'));
    sideBar.classList.remove('expanded_sideBar');
    toggleArrow.querySelector('img').setAttribute('src', 'assets/img/icons/left.png');
  }
  toggle_0 = !toggle_0;
});

const switchSection = (from, to) => {
  const to_Element = document.querySelector(to);

  if (from == 'all') {
    const sections = document.querySelectorAll('.panel');

    sections.forEach(element => {
      element.classList.add('hidden');
    });
  } else {
    const from_Element = document.querySelector(from);
    
    from_Element.classList.add('hidden');
  }
  to_Element.classList.remove('hidden');
}

const overlay = () => {
  const overlay = document.querySelector('.overlay');

  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.add('animation_overlay');
    }, 50);
  } else {
    overlay.classList.remove('animation_overlay');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 500);
  }
}

const switchMenu = () => {
  const menu = document.querySelector('.menu');

  if (menu.classList.contains('expanded_menu')) {
    menu.classList.remove('expanded_menu');
  } else {
    menu.classList.add('expanded_menu');
  }

  overlay();
}

const modal = (num) => {
  const num_Modal = document.querySelector(`.modal${num}`);
  const alert0 = document.querySelector('#alert0');
  const alert1 = document.querySelector('#alert1');

  const notificationIndicator = document.querySelector('#ring_button img');

  if (num_Modal.classList.contains('hidden')) {
    num_Modal.classList.remove('hidden');
    setTimeout(() => num_Modal.classList.add('animation_modal'), 1);
    overlay();
  } else {
    num_Modal.classList.remove('animation_modal');
    setTimeout(() => {
      num_Modal.classList.add('hidden');
      clearModal(num);
    }, 400);
    overlay();

    if (num == 2) {
      alert0.classList.add('hidden');
    } else if (num == 3) {
      alert1.classList.add('hidden');
    } else if (num == 6) {
      notificationIndicator.setAttribute('src', 'assets/img/icons/notification.png');
    }
  }
}

const switchArea = (index) => {
  if (listAreas[index] && listAreas[index].style.transform == 'translateX(-100px)') {
    listAreas[index].style.transform = 'translateX(0)';
    section1.style.transform = 'translateX(0px)';
  } else if (listAreas[index]) {
    listAreas[index].style.transform = 'translateX(0px)';
    section1.style.transform = 'translateX(-100%)';
  }
}

const resetToInitialState = (selectedList) => {
  if (listAreas[selectedList] && listAreas[selectedList].style) {
    listAreas[selectedList].style.transform = 'translateX(100%)';
    section1.style.transform = 'translateX(0px)';
  }
};

const clearModal = (num) => {
  const modal =  document.querySelector(`.modal${num}`);
  const inputs = modal.querySelectorAll('input');

  inputs.forEach(element => element.value = '');
}

const addProduct = () => {
  const products_today = document.querySelector('#products_today');
  const productPattern = document.querySelector('.productPattern');
  const element = productPattern.content.cloneNode(true);
  const product = element.querySelector('.product');

  const name_input0 = document.querySelector('#name_input0');
  const protein_input0 = document.querySelector('#protein_input0');
  const carbohydrates_input0 = document.querySelector('#carbohydrates_input0');
  const fats_input0 = document.querySelector('#fats_input0');
  const type_input0 = document.querySelector('#type_input0');
  const weightProduct_input0 = document.querySelector('#weightProduct_input0');

  const proteinGrams = parseFloat(protein_input0.value);
  const carbohydratesGrams = parseFloat(carbohydrates_input0.value);
  const fatsGrams = parseFloat(fats_input0.value);

  const proteinCalories = proteinGrams * 4;
  const carbohydratesCalories = carbohydratesGrams * 4;
  const fatsCalories = fatsGrams * 9;

  const totalCalories = proteinCalories + carbohydratesCalories + fatsCalories;

  kcal_today += totalCalories;

  product.querySelector('img').setAttribute('src', `assets/img/icons/${type_input0.value}.png`);

  product.setAttribute('id', `product${product_id}`);
  product.querySelector('.name').textContent = name_input0.value;

  products_today.appendChild(element);
  addNewProduct(
    name_input0.value,
    totalCalories,
    protein_input0.value,
    carbohydrates_input0.value,
    fats_input0.value,
    weightProduct_input0.value,
    type_input0.value
  );

  product_id++;

  updateKcal();
}

const updateKcal = () => {
  const kcal_today_value = document.querySelector('#kcal_today_value');
  let percentKcalToday = (kcal_today / goal_kcal) * 100;

  kcal_today_value.style.width = percentKcalToday + '%';
  kcal_today_value.textContent = percentKcalToday.toFixed(1) + '%';
}

sideBar_Button_0.addEventListener('click', () => switchSection('all', '#section0'));
sideBar_Button_1.addEventListener('click', () => modal(0));
sideBar_Button_2.addEventListener('click', () => switchSection('all', '#section1'));
sideBar_Button_3.addEventListener('click', () => switchSection('all', '#section3'));
sideBar_Button_4.addEventListener('click', () => switchSection('all', '#section4'));
sideBar_Button_5.addEventListener('click', () => switchSection('all', '#section5'));

add_product_Button.addEventListener('click', () => modal(1));

confirm1.addEventListener('click', () => {
  modal(1);
  addProduct();
});

const cancels = ['cancel0', 'cancel1', 'cancel3', 'cancel6', 'cancel7'];

cancels.forEach(cancelId => {
  const cancel = document.querySelector(`#${cancelId}`);

  cancel.addEventListener('click', () => {
    const number = cancelId.split('cancel')[1];
    modal(number);
  });
});

signup_Button.addEventListener('click', () => modal(3));

confirm3.addEventListener('click', () => {
  const allInputs = document.querySelectorAll('#modalContainer3 input');
  const alert1 = document.querySelector('#alert1');
  const modalContainer3 = document.querySelector('#modalContainer3');

  const password_input0 = document.querySelector('#password_input0');
  const confirmPassword_input0 = document.querySelector('#confirmPassword_input0');

  let allFieldsFilled = true;

  allInputs.forEach(element => {
    if (element.value == '') {
      allFieldsFilled = false;
      return;
    }
  });

  if (allFieldsFilled) {
    saveUserDatas();
    modal(3);
    modal(2);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } else {
    alert1.classList.remove('hidden');
    alert1.textContent = 'Fill in all inputs!';

    modalContainer3.querySelectorAll('input').forEach(element => {
      if (element.value == '') {
        element.style.border = '2px solid #ff0000';
      }
      element.addEventListener('input', () => {
        if (element.value == '') {
          element.style.border = '2px solid #ff0000';
        } else {
          element.style.border = '';
          const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
          const hasUpperCase = /[A-Z]/;
          const hasNoSpacesOrDots = /^[^. ]+$/;

          const password = password_input0.value;

          password_input0.addEventListener('input', () => {
            if (password.length > 16) {
              alert1.textContent = 'Password is too long';
            }
            if (password.length < 8) {
              alert1.textContent = 'Password is too short';
            }
            if (!hasUpperCase.test(password)) {
              alert1.textContent = 'Password must contain at least one uppercase letter';
            }
            if (!specialCharacters.test(password)) {
              alert1.textContent = 'Password must contain at least one special character';
            }
            if (!hasNoSpacesOrDots.test(password)) {
              alert1.textContent = 'Password cannot contain dots or spaces';
            }
            if (
              password.length <= 16 &&
              password.length >= 8 &&
              hasUpperCase.test(password) &&
              specialCharacters.test(password) &&
              hasNoSpacesOrDots.test(password)
            ) {
              alert1.textContent = 'Password is valid';
              confirmPassword_input0.addEventListener('input', () => {
                if (confirmPassword_input0.value != password_input0.value) {
                  alert1.textContent = "Passwords don't match";
                  element.style.border = '2px solid #ff0000';
                }
              });
            } else {
              element.style.border = '2px solid #ff0000';
            }
          });
        }
      }); 
    });
  }
});


function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

function setCookie(name, value) {
  document.cookie = name + "=" + value + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
}

function calculateAge(birthDate) {
  const currentDate = new Date();
  const birthDateObject = new Date(birthDate);
  let age = currentDate.getFullYear() - birthDateObject.getFullYear();

  if (
    currentDate.getMonth() < birthDateObject.getMonth() ||
    (currentDate.getMonth() === birthDateObject.getMonth() &&
      currentDate.getDate() < birthDateObject.getDate())
  ) {
    age--;
  }

  return age;
}

const saveUserDatas = () => {
  const inputIds = [
    '#name_input1', '#date_input0', '#password_input0',
    '#confirmPassword_input0','#lastname_input0', '#genderInput', "#date_input0"
  ];

  inputIds.forEach(inputId => {
    const inputElement = document.querySelector(inputId);
    if (inputElement) {
      const inputValue = inputElement.value;

      if (inputId === '#name_input1') {
        names.push(inputValue);
      } else if (inputId === '#lastname_input0') {
        lastNames.push(inputValue);
      } else if (inputId === '#password_input0') {
        passwords.push(inputValue);
      } else if (inputId === '#date_input0') {
        birthdays.push(inputValue);
      } else if (inputId === '#genderInput') {
        genders.push(inputValue);
      } else if (inputId === '#date_input0') {
        usersAge.push(inputValue);
      }
    }
  });
  
  firstLogin.push(true);

  cookiesUpdate();
};

const loginUser = (fullName, password) => {
  const storedNames = JSON.parse(getCookie('names')) || [];
  const storedLastNames = JSON.parse(getCookie('lastNames')) || [];
  const storedPasswords = JSON.parse(getCookie('passwords')) || [];
  const modalContainer2 = document.querySelector('#modalContainer2');

  const alert0 = document.querySelector('#alert0');

  const userIndex = storedNames.findIndex((name, index) => {
    const fullNameArray = fullName.split(' ');
    const firstName = fullNameArray[0];
    const lastName = fullNameArray.slice(1).join(' ');

    return name === firstName && storedLastNames[index] === lastName && storedPasswords[index] === password;
  });

  if (userIndex !== -1) {
    console.log('Zalogowano pomyślnie jako:', storedNames[userIndex], storedLastNames[userIndex]);
    accountIndex = userIndex;
    if (firstLogin[userIndex]) {
      modal(4);
      cookiesUpdate();
      sendNotification('Hello new user!', 'Welcome in workout panel, good lock in your workouts and build your-self! 💪', true);
    } else {
      modal(2);
      completePanel(
        names[accountIndex] + ' ' + lastNames[accountIndex],
        profilePics[accountIndex] + '.png',
        names[accountIndex]
      );
      setTimeout(() => {
        modal(5);
      }, 500);
    }
  } else if (fullName == '' || password == '') {
    alert0.classList.remove('hidden');
    alert0.textContent = 'Fill in all inputs!';
    modalContainer2.querySelectorAll('input').forEach(element => {
      if (element.value == '') {
        element.style.border = '2px solid #ff0000';
      }
      element.addEventListener('input', () => {
        if (element.value == '') {
          element.style.border = '2px solid #ff0000';
        } else {
          element.style.border = '';
        }
      }); 
    });
  } else {
    alert0.classList.remove('hidden');
    alert0.textContent = 'Account not found!';
  }
};

const loginButton = document.getElementById('login_Button');
loginButton.addEventListener('click', () => {
  const fullNameInput = document.getElementById('full_name_input').value;
  const passwordInput = document.getElementById('password_input1').value;
  loginUser(fullNameInput, passwordInput);
});

const cookiesUpdate = () => {
  setCookie('names', JSON.stringify(names));
  setCookie('lastNames', JSON.stringify(lastNames));
  setCookie('passwords', JSON.stringify(passwords));
  setCookie('birthdays', JSON.stringify(birthdays));
  setCookie('genders', JSON.stringify(genders));
  setCookie('firstLogin', JSON.stringify(firstLogin));
  setCookie('profilePics', JSON.stringify(profilePics));
  setCookie('accountIndex', JSON.stringify(accountIndex));
  setCookie('usersAge', JSON.stringify(usersAge));
  setCookie('notifications', JSON.stringify(notifications));
  setCookie('runPanel', runPanel);
}

arrowBack.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + sliderContainer.childElementCount) % sliderContainer.childElementCount;
  selectedImage != 0 ? selectedImage-- : selectedImage = 14;
  updateSlider();
});

arrowForward.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % sliderContainer.childElementCount;
  selectedImage != 14 ? selectedImage++ : selectedImage = 0;
  updateSlider();
});

function updateSlider() {
  const translateXValue = -currentImageIndex * 142;
  sliderContainer.style.transform = `translateX(${translateXValue}px)`;
}

finishButton.addEventListener('click', () => {
  profilePics[accountIndex] = (`assets/img/pics/person${selectedImage}`);
  firstLogin[accountIndex] = false;
  cookiesUpdate();
  modal(4);
});

logOut_Button.addEventListener('click', () => {
  logOut();
  cookiesUpdate();
});

confirm4.addEventListener('click', () => {
  modal(5);
  startPanel();
  runPanel = true;
  cookiesUpdate();
});

cancel4.addEventListener('click', () => {
  modal(5);
  startPanel();
});

ring_Button.addEventListener('click', () => modal(6));

const sendNotification = (title, content, save) => {
  const notificationPattern = document.querySelector('.notificationPattern');
  const notifications = document.querySelector('.notifications');
  const element = notificationPattern.content.cloneNode(true);

  const notificationTitle = element.querySelector('.notificationTitle');
  const notificationContent = element.querySelector('.notificationContent');

  const notificationIndicator = document.querySelector('#ring_button img');

  notificationIndicator.setAttribute('src', 'assets/img/icons/notifications.png');

  notificationTitle.textContent = title;
  notificationContent.textContent = content;

  if (save) {
    
  }
  
  notifications.appendChild(element);
}

confirm6.addEventListener('click', () => modal(6));

profile.addEventListener('click', () => modal(7));