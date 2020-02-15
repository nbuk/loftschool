/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise(async (resolve, reject) => {
        const url =
            'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        const response = await fetch(url);

        if (response.ok) {
            const cities = await response.json();
            resolve(cities);
        } else {
            reject('Ошибка загрузки данных');
        }
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().match(chunk.toLowerCase()) ? true : false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let allTowns;

loadTowns()
    .then(towns => {
        allTowns = towns;
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    })
    .catch(errorMessage => {
        const refreshBtn = document.createElement('button');

    })

filterInput.addEventListener('keyup', async e => {
    // это обработчик нажатия кливиш в текстовом поле
    const matcingTowns = [];

    isLoading = true;

    for (let town of towns) {
        if (isMatching(town.name, e.target.value)) {
            matcingTowns.push(town.name);
        }
    }

    if (matcingTowns.length) {
        const ul = createSearchResultsNode();

        filterResult.append(ul);
    }

    function createSearchResultsNode(towns) {
        const ul = document.createElement('ul');
        ul.style.listStyle = 'none';

        for (let town of towns) {
            const li = document.createElement('li');
            li.innerText = town;
            ul.append(li);
        }

        return ul;
    }
});

export { loadTowns, isMatching };
