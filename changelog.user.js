// ==UserScript==
// @name        changelog
// @namespace   eleventynine@gmail.com
// @include     http://hackage.haskell.org/package/*
// @include     https://hackage.haskell.org/package/*
// @version     1
// @grant       none
// ==/UserScript==

function getChangeLogElem() {
  var uls = document.getElementsByTagName("ul");
  for(i = 0; i < uls.length; i ++) {
   if(uls[i].childElementCount == 1) {
     var lis = uls[i].getElementsByTagName("li");
     if(lis.length == 1) {
       var as = lis[0].getElementsByTagName("a");
       if(as.length == 1) {
         var a    = as[0];
         var link = a.getAttribute("href");
         if(link != null && link.startsWith("/package") && link.endsWith("changelog")) {
           return { elem: a, link: link }
         }
       }
     }
   }
  }
}

var elem = getChangeLogElem();
if(elem != null) {
  var a = getChangeLogElem();
  var changelog = new XMLHttpRequest();
  changelog.open("GET", a.link);
  changelog.send();
  changelog.onload = function () {
    // climb back to the 'ul', render markdown
    a.elem.parentElement.parentElement.innerHTML =
      "<code style='white-space: pre-wrap'>" + this.responseText + "</code>";   
  }
}
