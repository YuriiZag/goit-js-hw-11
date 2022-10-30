import axios from 'axios';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css"
import './css/styles.css';




const refs = { 
    form: document.querySelector('#search-form'),
    queryContainer: document.querySelector('.query-container'),
}



refs.form.addEventListener('submit', onSubmit)



function onSubmit(e) {
    e.preventDefault();
    let searchQuerry = e.target.elements[0].value.trim();
    imgApiSearch(searchQuerry)
        .then(response => markupCreation(response.hits))
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name")  
        }) 
}

async function imgApiSearch(searchQuerry) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=30973377-2fa9d5ab9ec6c16f13d3292f0&q=${searchQuerry}&image_type=photo&orientation=horizontal&safesearch=true`) 
        return response.data;
    } catch (error) {
     console.log(error);   
    }
    
}



function markupCreation(array){
    console.log(array);
    let image = array.map(image => {
        return `<img src='${image.pageURL}'><img>`
    }).join('');
    console.log(image);
    refs.queryContainer.insertAdjacentHTML('afterbegin', image)
}



// function onChange(e) {
//     htmlClear();
//     let countryName = e.target.value.trim();
//     if (countryName!== '') {
//         countryApiSearch(countryName)
//             .then(country => createList(country))
//             .catch(error => {
//                 Notiflix.Notify.failure("Oops, there is no country with that name")  
//         })  
//     }
        

// }



// function countryApiSearch(countryName) {
//     return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json()});
// }

// function createList(array) {
//     if (array.length <= 10 && array.length !== 1) {
//         htmlClear()
//         createListItemMarkUp(array);
//         refs.list.classList.remove('with-one-item')

//     } else if (array.length > 10) {
//         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
//         refs.list.classList.remove('with-one-item')

//     } else if (array.length === 1) {
//         htmlClear()
//         createListItemMarkUp(array);
//         createInfoListMarkUp(array);
//         refs.list.classList.add('with-one-item')
//     }

// }

// function htmlClear() {
//     refs.list.innerHTML = '';
//     refs.countryInfo.innerHTML = '';
// }

// function createListItemMarkUp(array) {
//     const listPattern = array
//         .map(country => 
//              `<li class='list-item'><img src='${country.flags.svg}'></img><p>${country.name.official}</p></li>`
//         )
//         .join('')
        
//         refs.list.insertAdjacentHTML('afterbegin', listPattern);
// }

// function createInfoListMarkUp(array) {
//         let infoPattern = 
//             `<ul class='info-list'>
//                 <li>Capital: <span>${array[0].capital}</span></li>
//                 <li>Population: <span>${array[0].population}</span></li>
//                 <li>Languages: <span>${Object.values(array[0].languages)}</span></li>
//             </ul>`
         
//         refs.countryInfo.insertAdjacentHTML('afterbegin', infoPattern);
// }