let teams=[];
let matches=[];
let currentMatch=0;
let qIndex=0;
let timer;
let activeTeam=null;

let questions=[
{q:"كم عدد أركان الإسلام؟",a:["3","4","5","6"],c:2},
{q:"في أي شهر نزل القرآن؟",a:["شعبان","رمضان","رجب","ذو الحجة"],c:1},
{q:"كم عدد الصلوات؟",a:["3","4","5","6"],c:2},
{q:"أين الكعبة؟",a:["مكة","المدينة","القدس","الرياض"],c:0},
{q:"ما ليلة القدر؟",a:["أفضل ليلة","ليلة عادية","ليلة العيد","ليلة الجمعة"],c:0},
{q:"عدد أجزاء القرآن؟",a:["20","30","40","50"],c:1}
];

function createTeams(){
let n=document.getElementById("teamsCount").value;
let d=document.getElementById("teams");
d.innerHTML="";
for(let i=1;i<=n;i++){
d.innerHTML+=`<input id="t${i}" placeholder="اسم الفريق ${i}"><br>`;
}
}

function start(){
let n=document.getElementById("teamsCount").value;
teams=[];
for(let i=1;i<=n;i++){
let name=document.getElementById("t"+i).value||("فريق "+i);
teams.push({name,score:0});
}
genMatches();
document.getElementById("admin").style.display="none";
document.getElementById("game").style.display="block";
showMatch();
}

function genMatches(){
matches=[];
for(let i=0;i<teams.length;i++){
for(let j=i+1;j<teams.length;j++){
matches.push([i,j]);
}
}
}

function showMatch(){
if(currentMatch>=matches.length){
alert("انتهت البطولة");
return;
}
qIndex=0;
updateScore();
let m=matches[currentMatch];
document.getElementById("matchTitle").innerText=teams[m[0]].name+" ضد "+teams[m[1]].name;
showQuestion();
}

function showQuestion(){
activeTeam=null;
let q=questions[qIndex%questions.length];
document.getElementById("question").innerText=q.q;

let a=document.getElementById("answers");
a.innerHTML="";
q.a.forEach((ans,i)=>{
a.innerHTML+=`<button onclick="answer(${i})">${ans}</button>`;
});

startTimer();
}

function buzz(team){
activeTeam=team;
document.getElementById("bell").play();
}

function answer(i){
if(activeTeam===null) return;

let m=matches[currentMatch];
let real=(activeTeam==0)?m[0]:m[1];
let q=questions[qIndex%questions.length];

if(i==q.c){
teams[real].score+=1;
}else{
teams[real].score-=1;
}
updateScore();
}

function next(){
qIndex++;
if(qIndex>=5){
currentMatch++;
showMatch();
}else showQuestion();
}

function updateScore(){
let s=document.getElementById("score");
s.innerHTML="";
teams.forEach(t=>{
s.innerHTML+=t.name+" : "+t.score+"<br>";
});
}

function startTimer(){
clearInterval(timer);
let t=30;
document.getElementById("timer").innerText=t;
timer=setInterval(()=>{
t--;
document.getElementById("timer").innerText=t;
if(t<=0) clearInterval(timer);
},1000);
}
