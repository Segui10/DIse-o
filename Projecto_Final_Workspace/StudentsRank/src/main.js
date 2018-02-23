'use strict';

import {context} from './context.js';

/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function() {
  context.getTemplateRanking();
};

 /** Lisenerts to clear and routing the window location*/
window.addEventListener("hashchange", router, false);
window.addEventListener("searchchange", location="#rankingList", false);
window.addEventListener("resize", width ,false);

let opp="";
 /** Function to roting app */
function router(){
  console.log(location);
  let op=location.hash.split("/")[0];
  let hashcode=location.hash.split("/")[1];
  switch(op) {

    case "#addStudent":
      position(op);
      context.addPerson();
      opp=op;
    break;

    case "#rankingList":
      position(op);
      context.getTemplateRanking();
      location="#rankingList";
      location.search="";
      opp=op;
    break;

    case "#addGradedTask":
      position(op);
      context.addGradedTask();
      opp=op;
    break;
   
    case "#updateStudent":
      context.loadUpdateStudent(hashcode);
      position(op);
      opp=op;
    break;

    case "#deleteStudent":
      context.deletePerson(hashcode);
      position(op);
      context.getTemplateRanking();
      location.hash="#rankingList";
      location.search="";
      opp=op;
    break;

    case "#hideMenu":
      /*if(window.innerWidth<=576){
        console.log("responsive");
        document.getElementById("block-header").setAttribute("class","menu-hiden")
        console.log(document.getElementById("block-header").setAttribute("visibility","hidden"));
      }else{
        console.log("no-responsive");
      }
      location.hash="#rankingList";
      location.search="";*/
      console.log("responsive");
      var x = document.getElementById("block-header");
      var y = document.getElementById("content");
      var z = document.getElementById("hideop");
      if (x.className === "block-header") {
          x.className += " responsive";
          y.className += " responsive";
          z.innerText = "Show Menu";
          //document.getElementById("hideop").innerText("Show Menu");
      } else {
          x.className = "block-header";
          y.className = "block-main";
          z.innerText = "Hide Menu";
          //document.getElementById("hideop").innerText("Hide Menu");
      }
      location.hash=opp;
      location.search="";
    break;

    default:
      position(op);
      context.getTemplateRanking();
      location.hash="#rankingList";
    break;

  }

}

 /** Function to change the location of the menu */
function position(op){
  switch(op) {
    case "#addStudent":
      document.getElementById("rankingList").className='block-header-nav-nocurrent';    
      document.getElementById("addGradedTask").className='block-header-nav-nocurrent';    
      document.getElementById("addStudent").className='block-header-nav-current';
    break;

    case "#rankingList":
      document.getElementById("addStudent").className='block-header-nav-nocurrent';    
      document.getElementById("addGradedTask").className='block-header-nav-nocurrent';    
      document.getElementById("rankingList").className='block-header-nav-current';
    break;

    case "#addGradedTask":
      document.getElementById("rankingList").className='block-header-nav-nocurrent';    
      document.getElementById("addStudent").className='block-header-nav-nocurrent';    
      document.getElementById("addGradedTask").className='block-header-nav-current';
    break;

    default:
      document.getElementById("addStudent").className='block-header-nav-nocurrent';    
      document.getElementById("addGradedTask").className='block-header-nav-nocurrent';    
      document.getElementById("rankingList").className='block-header-nav-current';
    break;

  }

  function width(){
    console.log(window.innerWidth);
    if(window.innerWidth>576){
      document.getElementById("menu-hiden").setAttribute("class","menu-hiden")
    }
  }
}