
import axios from 'axios';


const KEY = '30973377-2fa9d5ab9ec6c16f13d3292f0'
const DNS = 'https://pixabay.com/api/'

export async function imgApiSearch(searchQuerry, pageNumber) {
    try {
        const response = await axios.get(`${DNS}?key=${KEY}&q=${searchQuerry}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`) 
        return response.data;
    } catch (error) {
     console.log("Sorry, there are no images matching your search query. Please try again.");   
    }
    
}