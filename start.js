runPanel = getCookie('runPanel') || false;
accountIndex = getCookie('accountIndex') || null;

const title = document.querySelector('title');

const start = () => {
  if (runPanel == 'true') {
    title.textContent = 'Panel - login';
    setTimeout(() => {
      completePanel(
        names[accountIndex] + ' ' + lastNames[accountIndex],
        profilePics[accountIndex] + '.png',
        names[accountIndex]
      );
      startPanel();
    }, 1000);
  } else {
    setTimeout(() => {
      modal(2);
    }, 500);
  }
}

const startPanel = () => {
  const start = document.querySelector('.start');
  const main = document.querySelector('main');

  title.textContent = 'Panel';

  start.querySelector('img').style.transform = 'scale(1.4)';

  main.classList.add('hidden');
  start.style.opacity = '0';

  setTimeout(() => {
    start.classList.add('hidden');
    main.classList.remove('hidden');
  }, 500);
}

const logOut = () => {
  window.location.reload();

  runPanel = false;
}

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

start();

const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;';  
};

const clearAllCookies = () => {
  deleteCookie('names');
  deleteCookie('lastNames');
  deleteCookie('passwords');
  deleteCookie('birthdays');
  deleteCookie('genders');
  deleteCookie('firstLogin');
  deleteCookie('profilePics');
  deleteCookie('accountIndex');
  deleteCookie('runPanel');
};

const update_button = document.querySelector('#update_button');

update_button.addEventListener('click', () => window.location.reload());