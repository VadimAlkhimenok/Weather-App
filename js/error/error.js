export const showError = error => {
    document.querySelector('.content').insertAdjacentHTML('beforeend', 
        `
        <div class="error-card">
            <div class="alert alert-danger" role="alert">
                <strong>Error ${ error }!</strong>
                The city not find. <br>
                Check the correctness of the entered data.
            </div>
        </div>
        `
    )
}