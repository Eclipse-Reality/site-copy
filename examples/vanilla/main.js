import './style.css';

document.querySelectorAll('button:not(#create-provider)').forEach( (button) => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        document.querySelectorAll('site-copy-provider').forEach( (provider) => {
            provider.setAttribute('lang',lang)
        })
    })
})