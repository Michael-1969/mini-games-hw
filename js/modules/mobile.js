

function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP((support) => {
    const className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

function initMarquee(container) {
  const track = container.querySelector('.marquee__track'),
        inner = track.querySelector('.marquee__inner'),
        speed = parseInt(container.getAttribute('data-speed')) || 600,
        direction = container.getAttribute('data-direction') || 'left';
      //  console.log(track,' ',inner,' ',speed,' ',direction);

      if(!inner.dataset.cloned)
      {
        const originalCards = Array.from(inner.children);
        let totalWidth = inner.scrollWidth;
        const containerWidth = container.offsetWidth;
        
        while(totalWidth < (containerWidth * 3))
        {
            originalCards.forEach(card => {
               inner.appendChild(card.cloneNode(true));
             });
            totalWidth = inner.scrollWidth;
        }
        inner.dataset.cloned = 'true';
      }

      const updateAnimation = () =>{
           const totalWidth = parseInt(inner.scrollWidth / 4);
           const duration = parseInt(totalWidth / speed);

           
           if(direction === 'left'){
              inner.style.animation = 'scroll-left';
              inner.style.animationDuration = `${duration}s`;
              inner.style.animationIterationCount = 'infinite';
              inner.style.animationTimingFunction = 'linear';
           }
       };
       updateAnimation();
}

function anchors(){
  const anchors = document.querySelectorAll('a[href*="#"]');
  for(let anchor of anchors){
    anchor.addEventListener('click',(event)=>{
        event.preventDefault();
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          "behavior": "smooth",
          "block": "start",
        })
    });
  }

}

function replacingLink(link)
{
  const strGame = link.getAttribute('href').replace(/#/gi,'');
  
  const idMiniGames = document.getElementById(strGame);
   let stateBlock = window.getComputedStyle(idMiniGames).display;
    
     if(stateBlock === 'none')
     {
          const getAttr = link.getAttribute('href').replace(/about-games/gi,'mini-games');
          link.setAttribute('href',getAttr);
     }
     else{
          const getArrt = link.getAttribute('href').replace(/mini-games/gi,'about-games');
          link.setAttribute('href',getArrt);
     }
}

function sortCardGames(listAllCardsGames)
{
 
  const num_count = listAllCardsGames.children.length * listAllCardsGames.children[0].children.length;
  const num_column__elements = listAllCardsGames.children[0].children.length;
  
   let sort_elements = new Array(num_count);
   
   let sort_count = 0;
   let old_count = 0;
   
   for(const colums of listAllCardsGames.children)
   {
     for(const card of colums.children)
      {
        let index = parseInt(card.querySelector('.card-game__number-game span').innerHTML.match(/\d+$/g),10);
        sort_elements[index-1] = card;
      }  
   }
    
      for(const columns of listAllCardsGames.children)
       {
          let child = columns.lastElementChild;
          while(child)
          {
            columns.removeChild(child);
            child = columns.lastElementChild;
          }   
       }

      sort_count = 0;
      for(const columns of listAllCardsGames.children)
           for(let i = 0; i < num_column__elements; i++)
              columns.appendChild(sort_elements[sort_count++]);
       
}

function OriginalCardGames(listAllCardsGames){

  const num_column__elements = listAllCardsGames.children[0].children.length;
  const num_columns = listAllCardsGames.children.length;
  const num_count = listAllCardsGames.children.length * listAllCardsGames.children[0].children.length;
 
   let sort_elements = new Array(num_count);
   
   let sort_count = 0;
   let even_count = 0;
   let odd_count = 1;
  

   for(const colums of listAllCardsGames.children)
   {
     for(const card of colums.children)
      {   
          let index = parseInt(card.querySelector('.card-game__number-game span').innerHTML.match(/\d+$/g),10);
        
          if(sort_count < num_columns)
          {
            sort_elements[even_count] = card;
            even_count+=2;
          }
          //console.log(sort_count >= num_columns && sort_count < num_count);
          if(sort_count >= num_columns && sort_count < num_count){
              sort_elements[odd_count] = card;
              odd_count+=2;
          }
          sort_count++;
      } 
   }
  
     for(const columns of listAllCardsGames.children)
       {
          let child = columns.lastElementChild;
          while(child)
          {
            columns.removeChild(child);
            child = columns.lastElementChild;
          }   
       }
       sort_count = 0;
    
       for(const columns of listAllCardsGames.children)
           for(let i = 0; i < num_column__elements; i++)
              columns.appendChild(sort_elements[sort_count++]);

}

function SimpleArithmetic(){
      console.log("simple-arithmetic");
}

function GuessNumber()
{
  let input = document.querySelector(".guess-number__input");
  const all_buttons = Array.from(document.querySelectorAll(".guess-number__btn"));
  
  let out_result = document.querySelector(".guess-number__out-result");
  let out_help = document.querySelector(".guess-number__out-help");
  let out_attempt = document.querySelector(".guess-number__out-attempt");

  let item = 0;
  let randomNumber= 1 + Math.floor(Math.random() * 100);
  let userAttempt = "undefined";

  console.log("begin: ",userAttempt,' ',randomNumber);
  all_buttons.forEach(btn => {
      btn.addEventListener('click', (event) => {
          switch(event.currentTarget.dataset.test)
          {
            case "check":{
                    // console.log(event.currentTarget.dataset.test);
                    event.preventDefault();
                    userAttempt = input.value;
                    
                    if(userAttempt > randomNumber) {
                        out_result.textContent = "Не угадал";
                        out_help.textContent = "Перелет";
                        item++;
                        out_attempt.textContent = item;
                       }else if(userAttempt < randomNumber)
                             {
                               out_result.textContent = "Не угадал";
                               out_help.textContent = "Недолет";
                               item++;
                               out_attempt.textContent = item;
                             }else{
                                    out_result.textContent = "Угадал";
                                    out_help.textContent = "Точно в цель!";
                                    item++;
                                    out_attempt.textContent = item;
                                  }
                }; break;
            case "reset": {
                            event.preventDefault();
                            out_result.textContent = "";
                            out_help.textContent = "";
                            item = 0;
                            out_attempt.textContent = "";
                            input.value = "";
                            userAttempt = "undefined";
                            randomNumber= 1 + Math.floor(Math.random() * 100);
                            console.log("reset: ",userAttempt,' ',randomNumber);
                  }; break;
            default: break;
          }
      });
  });

}

function FlipCard()
{
  const all_buttons = Array.from(document.querySelectorAll('button[type="button"]'));
     
     all_buttons.forEach(btn => {
          btn.addEventListener('click', (event) => {
            //console.log(event.currentTarget.dataset.game === '');
            if (event.target.closest('.flip-card__inner'))
            {
              const inner = event.target.closest('.flip-card__inner');
              inner.classList.add('is-flipped');  // переворот карточки ДЛЯ игры
            }

            switch(event.currentTarget.dataset.game)
            {
              case "guess-number" : GuessNumber(); break;
              case "simple-arithmetic": SimpleArithmetic(); break;
              default: if(event.currentTarget.dataset.close  === 'close')
                      {
                          const inner = event.target.closest('.flip-card__inner'); 
                          inner.classList.remove('is-flipped'); // переворот карточки ПОСЛЕ игры
                      }
            }
          },false);
    });

}


export {isWebp,initMarquee,anchors,replacingLink,sortCardGames,OriginalCardGames,FlipCard};
//export {initMarquee,anchors,replacingLink,sortCardGames,OriginalCardGames};

