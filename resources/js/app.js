import jQuery from "jquery";

if(import.meta.hot){
    import.meta.hot.accept();
}

window.$ = window.jQuery = jQuery;

$(document).on('DOMContentLoaded', () => {
    import('./products.js');
})
