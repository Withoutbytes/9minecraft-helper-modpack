import $ from 'jquery';


export const CreateMenuDiv = () => $(`<div id="overlay-buttons"></div>`)
    .css({
        position: "fixed",
        display: "inline",
        left: 0,
        bottom: 0,
        "z-index": 999,
    })
    .appendTo("body");