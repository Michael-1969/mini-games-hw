'use strict';

import * as func from './modules/mobile.js';


document.addEventListener("DOMContentLoaded", () => {
     func.isWebp();
     func.anchors();

    func.initMarquee(document.querySelector('.marquee__container'));
    
      window.addEventListener('resize',(e) => {
         func.replacingLink(document.querySelector('.header__link'));
         if(Number(window.innerWidth) < Number(1024) || window.screen.width < Number(1024))
         {
           func.sortCardGames(document.querySelector('.about-games__cards'));
           // console.log("Изменился");
         }
         else
           func.OriginalCardGames(document.querySelector('.about-games__cards'));
      });

     func.FlipCard();
     
   });

//export default ModalBasket;

