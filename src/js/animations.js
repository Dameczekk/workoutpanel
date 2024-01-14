const kcal_today_value = document.querySelector('#kcal_today_value');
kcal_today_value.style.width = '0';

percentKcalToday = (kcal_today / goal_kcal) * 100;

setTimeout(() => {
  sideBar_Button_3.addEventListener('click', () => updateKcal());
}, 200);