/* global firebase, FIREBASE_CONFIG */
function el(id){return document.getElementById(id);}
function firebaseReady(){
  const c = window.FIREBASE_CONFIG || {};
  return c.apiKey && !String(c.apiKey).includes("PASTE_");
}
function initFirebaseOrShowError(){
  if(!firebaseReady()){
    const msg = document.querySelector("[data-fb-error]");
    if(msg){ msg.style.display = "block"; }
    return false;
  }
  if(!firebase.apps || firebase.apps.length===0){
    firebase.initializeApp(window.FIREBASE_CONFIG);
  }
  window.db = firebase.database();
  return true;
}
function ref(path){ return window.db.ref(path); }
function setBadge(id, text, cls){
  const b = el(id); if(!b) return;
  b.textContent = text;
  b.className = "badge " + (cls||"");
}
function genCode(){ return String(Math.floor(1000 + Math.random()*9000)); }
const MATCH_Q_COUNT = 10;
const QUESTION_TIME_MS = 30000;
const LETTERS = ["A","B","C","D"];
