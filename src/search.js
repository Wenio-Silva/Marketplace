import React from 'react';
const cheerio = require('react-native-cheerio');
const baseURL = "https://www.magazinevoce.com.br/magazinesrbarato/";
export let homeData = [], searchData = [];

export async function searchMain() { 
    //clean the array
    homeData.splice(0, homeData.length);
    //search and load the html
    const response = await fetch(baseURL).catch((error) => {console.error(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    $('ol.g-items li').each((i, e) => { 
        const title = $(e).find('.g-desc > a > h3').text();
        const image = $(e).find('.g-img-wrapper > img').attr("data-original");
        const price = $(e).find('.g-desc > .g-price').text();
        const installment = $(e).find('.g-desc > .g-installment').text();

        const data = {title, image, price, installment};
        homeData.push(data);
    });
    console.log(homeData);
}
searchMain();
// Handle the user search
export function handle(UserSearch) {
    const addString = "busca/";
    const handleUS = UserSearch.replace(/ /g, "%20");
    
    const urlHandled = baseURL+addString+handleUS;
    searchSecond(urlHandled);
}

async function searchSecond(URL) { 
    //clean the array
    searchData.splice(0, searchData.length);
    //search and load the html
    const response = await fetch(URL).catch((error) => {console.error(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    $('ol.g-items li').each((i, e) => { 
        const title = $(e).find('.g-desc > a > h3').text();
        const image = $(e).find('.g-img-wrapper > img').attr("data-original");
        const price = $(e).find('.g-desc > .g-price').text();
        const installment = $(e).find('.g-desc > .g-installment').text();
        const data = {title, image, price, installment};
        searchData.push(data);
    }) 
    console.log(searchData);
};