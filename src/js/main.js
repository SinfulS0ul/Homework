const $studentsList = document.querySelector('.list__students');
const $ratingPercentList = document.querySelector('.list__rate-percent');
const $ratingList = document.querySelector('.list__rating');
const $sortByNameButton = document.querySelector('.menu__sorting__by-name');
const $sortByLastnameButton = document.querySelector('.menu__sorting__by-surname');
const $sortByRateButton = document.querySelector('.menu__sorting__by-rate');
const $maxRateButton = document.querySelector('.menu__rating__max-rate');
const $minRateButton = document.querySelector('.menu__rating__min-rate');
const $avgRateButton = document.querySelector('.menu__rating__avg-rate');
const $addRateButton = document.querySelector('.menu__rate-percent_create');
const $passwordCreateButton = document.querySelector('.menu__password-create__button');
const $symbolCountInput = document.querySelector('.menu__password-create__symb-count');
const $symbolIncludeInput = document.querySelector('.menu__password-create__symb-include');
const $digitIncludeInput = document.querySelector('.menu__password-create__digit-include');
const $passwordText = document.querySelector('.menu__password');

const studentsArray = [{
  firstName: 'Олег',
  lastName: 'Батун',
  rating: 60,
},
{
  firstName: 'Юлія',
  lastName: 'Бойчук',
  rating: 100,
},
{
  firstName: 'Максим',
  lastName: 'Пасічник',
  rating: 100
},
{
  firstName: 'Богдан',
  lastName: 'Тимчишин',
  rating: 77
},
{
  firstName: 'Назарій',
  lastName: 'Бохнак',
  rating: 75
},
{
  firstName: 'Назарій',
  lastName: 'Кошицький',
  rating: 84
},
{
  firstName: 'Віталій',
  lastName: 'Порученко',
  rating: 75
},
{
  firstName: 'Анастасія',
  lastName: 'Нагірянська',
  rating: 100
},
{
  firstName: 'Петро',
  lastName: 'Подміногін',
  rating: 80
},
];

const listOutput = (list, isModerateMassive) => {
  list.forEach(element => {
    const $student = document.createElement('li');
    const $rate = document.createElement('li');
    $student.className = 'studentsList__list-item';
    $rate.className = 'ratingList__list-item';
    $student.innerHTML = `<span class='item-name'>${element.firstName}</span>
                          <span class='item-name'>${element.lastName}</span>`;
    $rate.innerHTML = `<span class='item-name'>${element.rating}</span>`;
    $studentsList.appendChild($student);
    $ratingList.appendChild($rate);
    if (isModerateMassive === true) {
      const $percentRate = document.createElement('li');
      $percentRate.className = 'ratingPercentList__list-item';
      $percentRate.innerHTML = `<span class='item-name'>${element.ratePercent}%</span>`;
      $ratingPercentList.appendChild($percentRate);
    }
  });
};

const sorting = (object, property) => {
  const list = object.sort((itemOne, itemTwo) => itemOne[property] > itemTwo[property] ? 1 : itemOne[property] < itemTwo[property] ? -1 : 0);
  listOutput(list);
};

const rateChosing = (object, condition) => {
  let rateList;
  switch (condition) {
    case 'menu__rating__max-rate': {
      rateList = object.sort((itemOne, itemTwo) => itemOne.rating > itemTwo.rating ? -1 : itemOne.rating < itemTwo.rating ? 1 : 0)
        .filter((element, i, arr) => element.rating === arr[0].rating);
      break;
    }
    case 'menu__rating__min-rate':{
      rateList = object.sort((itemOne, itemTwo) => itemOne.rating > itemTwo.rating ? 1 : itemOne.rating < itemTwo.rating ? -1 : 0)
        .filter((element, i, arr) => element.rating === arr[0].rating);
      break;
    }
    case 'menu__rating__avg-rate':{
      let avg = 0;
      const sum = object.map(item => item = item.rating)
        .reduce((itemOne, itemTwo) => itemOne + itemTwo);
      avg = Math.ceil(sum / object.length);
      rateList = object.filter(element => element.rating === avg);
    }
  }
  listOutput(rateList);
};

const passwordGenerate = symbCount => {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const digits = '0123456789';
  if ($symbolIncludeInput.checked)
    charset += symbols;
  if ($digitIncludeInput.checked)
    charset += digits;
  let password = '';
  for (let i = 0, length = charset.length; i < symbCount; ++i) {
    password += charset.charAt(Math.floor(Math.random() * length));
  }
  $passwordText.innerHTML = `Ваш пароль: ${password}`;
};

const ratePercentAdding = object => {
  const maxRate = object.reduce((prev, curr) => prev.rating > curr.rating ? prev : curr);
  const newArr = object.slice();
  newArr.forEach(element => element.ratePercent = Math.round((maxRate.rating / element.rating) * 100) - 100);
  listOutput(newArr, true);
};

const studentsArraySorting = sorting.bind({}, studentsArray);
const studentsArrayRateChosing = rateChosing.bind({}, studentsArray);
const studentsArrayRatePercentAdding = ratePercentAdding.bind({}, studentsArray);

const clearList = () => {
  $studentsList.innerHTML = '';
  $ratingList.innerHTML = '';
  if ($ratingPercentList)
    $ratingPercentList.innerHTML = '';
};

$sortByNameButton.addEventListener('click', () => {
  clearList();
  studentsArraySorting('firstName');
});

$sortByLastnameButton.addEventListener('click', () => {
  clearList();
  studentsArraySorting('lastName');
});

$sortByRateButton.addEventListener('click', () => {
  clearList();
  studentsArraySorting('rating');
});

$maxRateButton.addEventListener('click', event => {
  clearList();
  studentsArrayRateChosing(`${event.target.className}`);
});

$minRateButton.addEventListener('click', event => {
  clearList();
  studentsArrayRateChosing(`${event.target.className}`);
});

$avgRateButton.addEventListener('click', event => {
  clearList();
  studentsArrayRateChosing(`${event.target.className}`);
});

$addRateButton.addEventListener('click', () => {
  clearList();
  studentsArrayRatePercentAdding();
});

$passwordCreateButton.addEventListener('click', () => {
  const symbCount = $symbolCountInput.value;
  passwordGenerate(symbCount);
});
