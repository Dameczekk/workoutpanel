const profile_Picture = document.querySelectorAll('.profilePicture');
const welcome = document.querySelector('.welcome_text h1');
const full_Name = document.querySelectorAll('.fullName');

const renderNotifications = () => {
  
}

const completePanel = (fullName, profilePicture, name) => {
  full_Name.forEach(element => element.textContent = fullName);
  profile_Picture.forEach(element => element.setAttribute('src', profilePicture));
  welcome.textContent = `Good morning ${name}`;
  

}
