import { imgApiSearch } from './fetch';
import SimpleLightbox from "simplelightbox";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import "simplelightbox/dist/simple-lightbox.min.css";
import "notiflix/dist/notiflix-3.2.5.min.css"
import './css/styles.css';


let searchQuerry = '';
let pageNumber = 1;
let totalHits = 0;

const refs = { 
    form: document.querySelector('#search-form'),
    queryContainer: document.querySelector('.gallery'),
}



refs.form.addEventListener('submit', onSubmit)
window.addEventListener('scroll', debounce(onScroll, 250))

async function onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 10) {
        pageNumber += 1;
        console.log('lol')
        await loadingBallsCreate();
        await imgApiSearchResult(searchQuerry, pageNumber)
        await loadingBallsRemove();
    }
}

async function onSubmit(e) {
    refs.queryContainer.innerHTML = '';
    pageNumber = 1;
    totalHits = 0;

    e.preventDefault();
    searchQuerry = e.target.elements[0].value.trim();
    await imgApiSearchResult(searchQuerry, pageNumber);
    if (totalHits !== 0) {
       await Notiflix.Notify.success(`Hooray! We found ${totalHits} images`) 
    }
}





function markupCreation(array){
    console.log(array);
    let image = array.map(image => {
        return `<div class='card'>
            <a href="${image.largeImageURL}" class='image'>
                <img class='preview-image' src="${image.previewURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes:</b> <span>${image.likes}</span>
                </p>
                <p class="info-item">
                    <b>Views:</b> <span>${image.views}</span>
                </p>
                <p class="info-item">
                <b>Comments:</b> <span>${image.comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads:</b> <span>${image.downloads}</span>
                </p>
            </div>
            </div>`
    }).join('');

    refs.queryContainer.insertAdjacentHTML('beforeend', image)

    simpleLightBoxCreate();
    scrollByBehaveour();
    
}




function simpleLightBoxCreate() {
    const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionsDelay: '250s' });
    
}

function scrollByBehaveour() {
    const { height: cardHeight } = refs.queryContainer.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });   
}

function loadingBallsCreate() {
    loadingBalls = `
        <div class='loading-balls'>
            <div class='ball1'></div>
            <div class='ball2'></div>
            <div class='ball3'></div>
        </div>`
    refs.queryContainer.insertAdjacentHTML('beforeend', loadingBalls)
}

function loadingBallsRemove(){
    document.querySelector('.loading-balls').remove()
}

async function imgApiSearchResult(searchQuerry, pageNumber) {
    try {
        const response = await imgApiSearch(searchQuerry, pageNumber);
        
        await markupCreation(response.hits);
        totalHits = response.totalHits 

    } catch (error) {
        console.dir(error)
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

}