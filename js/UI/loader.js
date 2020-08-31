export const loader = place => {
    place.insertAdjacentHTML('beforeend', 
        `<div class="spinner-grow text-primary loader" role="status" id="loaderId"></div>`
    )
}