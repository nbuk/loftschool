/* eslint-disable guard-for-in */
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let filteredCookies = parseCookie();
let cookies = parseCookie();

const createCookie = (name, value) => {
    name = name.replace(/\s+/g, '');
    value = value.replace(/\s+/g, '');

    if (name != '' && value != '') {
        document.cookie = `${name}=${value};`;
    }
}

function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=${cookies[cookieName]}; max-age=-1`
    cookies = parseCookie();
}

function parseCookie() {
    return document.cookie.split('; ').reduce((prev, cur) => {
        const [name, value] = cur.split('=');

        if (!value) {
            return;
        }

        prev[name] = value;

        return prev;
    }, {});
}

const addCookieToTable = () => {
    if (!filteredCookies) {
        return;
    }

    for (let cookie in filteredCookies) {
        createTableRowNode(cookie);
    }
}

const createTableRowNode = cookie => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdDelete = document.createElement('td');
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Удалить';
    deleteBtn.setAttribute('data-cookie-name', `${cookie}`)
    deleteBtn.classList.add('delete-cookie');

    tdName.textContent = cookie;
    tdValue.textContent = filteredCookies[cookie];

    tdDelete.append(deleteBtn);
    tr.append(tdName);
    tr.append(tdValue);
    tr.append(tdDelete);

    listTable.append(tr);
}

const filterCookie = value => {
    filteredCookies = {};
    for (let cookie in cookies) {
        if (cookies[cookie].match(value) || cookie.toString().match(value)) {
            filteredCookies[cookie] = cookies[cookie];
        }
    }
}

addCookieToTable();

listTable.addEventListener('click', e => {
    if (e.target.classList.contains('delete-cookie')) {
        const tr = e.target.parentElement.parentElement;
        const cookieName = e.target.dataset.cookieName;

        deleteCookie(cookieName);
        tr.remove();
    }
})

filterNameInput.addEventListener('keyup', e => {
    const filter = e.target.value;

    filterCookie(filter);

    addNameInput.value = '';
    addValueInput.value = '';
    listTable.innerHTML = '';

    addCookieToTable();
});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value, addValueInput.value);

    // addNameInput.value = '';
    // addValueInput.value = '';
    listTable.innerHTML = '';

    cookies = parseCookie();
    if (filterNameInput.value === '') {
        filteredCookies = parseCookie();
    } else {
        filterCookie(filterNameInput.value);
    }
    addCookieToTable();
});
