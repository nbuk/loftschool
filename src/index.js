/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise(async (resolve, reject) => {
		const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
		const response = await fetch(url);

		if (response.ok) {
			response.json().then((cities) => {
				resolve(createSortedCitiesArray(cities));
			})
		} else {	
			reject('Ошибка загрузки данных');
		}
	});
	
	function createSortedCitiesArray(cities) {
		const arr = [];

		for (let city of cities) {
			arr.push(city);
		}
		
		return arr.sort( (a, b) => a.name > b.name ? 1 : -1 );
	}
}

loadAndSortTowns().then(arr => console.log(arr));

export { delayPromise, loadAndSortTowns };
