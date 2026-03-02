let teams=[];
let matches=[];
let currentMatch=0;
let questionIndex=0;
let timerInterval;

let questions=[
{q:"كم عدد أركان الإسلام؟",a:["3","4","5","6"],c:2},
{q:"في أي شهر نزل القرآن؟",a:["شعبان","رمضان","رجب","ذو الحجة"],c:1},
{q:"كم عدد الصلوات المفروضة؟",a:["3","4","5","6"],c:2},
{q:"ما اسم أول نبي؟",a:["نوح","آدم","إبراهيم","موسى"],c:1},
{q:"كم عدد أجزاء القرآن؟",a:["20","30","40","50"],c:1},
{q:"أين يقع المسجد الحرام؟",a:["المدينة","مكة","القدس","الطائف"],c:1},
{q:"ما هي ليلة خير من ألف شهر؟",a:["ليلة القدر","ليلة العيد","ليلة الجمعة","ليلة عرفة"],c:0},
{q:"من هو خاتم الأنبياء؟",a:["عيسى","محمد","موسى","نوح"],c:1},
{q:"كم عدد السور في القرآن؟",a:["114","100","120","90"],c:0},
{q:"ما اسم كتاب المسلمين؟",a:["الإنجيل","التوراة","القرآن","الزبور"],c:2}
];

function createTeams(){
let n=document.getElementById("teamsCount").value;
let div=document.getElementById("teams");
div.innerHTML="";
teams=[];

for(let i=1;i<=n;i++){
div.innerHTML+=`<input placeholder="اسم الفريق ${i}" id="t${i}"><br>`;
}
}

function startTournament(){
let n=document.getElementById("teamsCount").value;
teams=[];

for(let i=1;i<=n;i++){
let name=document.getElementById("t"+i).value||("فريق "+i);
teams.push({name,score:0});
}

generateMatches();
showMatch();
document.getElementById("setup").style.display="none";
document.getElementById("match").style.display="block";
}

function generateMatches(){
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
questionIndex=0;
let m=matches[currentMatch];
document.getElementById("teamsTitle").innerText=teams[m[0]].name+" ضد "+teams[m[1]].name;
showQuestion();
}

function showQuestion(){
let q=questions[questionIndex%questions.length];
let box=document.getElementById("questionBox");
box.innerHTML=`<h3>${q.q}</h3>`;

q.a.forEach((ans,i)=>{
box.innerHTML+=`<button onclick="answer(${i})">${ans}</button>`;
});

startTimer();
}

function answer(i){
let q=questions[questionIndex%questions.length];
let m=matches[currentMatch];
if(i==q.c){
teams[m[0]].score+=1;
}
updateScore();
}

function updateScore(){
let s=document.getElementById("score");
s.innerHTML="";
teams.forEach(t=>{
s.innerHTML+=t.name+" : "+t.score+"<br>";
});
}

function nextQuestion(){
questionIndex++;
if(questionIndex>=5){
currentMatch++;
showMatch();
}else{
showQuestion();
}
}

function startTimer(){
clearInterval(timerInterval);
let t=30;
document.getElementById("timer").innerText=t;
timerInterval=setInterval(()=>{
t--;
document.getElementById("timer").innerText=t;
if(t<=0){
clearInterval(timerInterval);
}
},1000);
}
