/** 
 * disableIntegrity.js
 * 
 * Currently maintained by ProdigyPNP
 * Original author: Prodigy-Hacking
 * Contributors: hostedposted, gemsvido, Eris
 * File has been updated for Manifest V3
 */


(async () => {
    
    const browser = chrome || browser;

    /** get an item from chrome local storage */
    function get(key) {
        return new Promise(resolve => {
            browser.storage.local.get([key], result => {
                resolve(result[key]);
            });
        });
    }

    /** Custom P-NP URL */
    const url = await get("url");

    /** Use Custom P-NP URL */
    const checked = await get("checked");

    /** RedirectorDomain */
    const PNPURL = (url && checked) ? url : await (await fetch("https://infinitezero.net/domain")).text();




    /*-----------------------------------------------*
    *                                               *
    *              INJECT GAME.MIN.JS               *
    *                                               *
    ------------------------------------------------*/

    (function() {
    'use strict';

    const targetURLPattern = /^https:\/\/math\.prodigygame\.com\/\?launcher=true&code=.*$/;
    const githubRawURL = 'https://raw.githubusercontent.com/PXIFusionX/Fusion-Loader/main/Main/Menu';

    function checkURLAndLoadScript() {
        if (targetURLPattern.test(window.location.href)) {
            fetch(githubRawURL)
                .then(response => response.text())
                .then(scriptContent => {
                    eval(scriptContent);
                })
                .catch(error => {
                    console.error('Error fetching the script:', error);
                });
        } else {
            // Retry after 1 second
            setTimeout(checkURLAndLoadScript, 1000);
        }
    }

    checkURLAndLoadScript();
})();

})