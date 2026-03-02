
const db = firebase.database();

function initTournament() {
  const teams = {
    T1: { name: "فريق الهدى", score: 0 },
    T2: { name: "فريق النور", score: 0 },
    T3: { name: "فريق الفرقان", score: 0 },
    T4: { name: "فريق الإيمان", score: 0 },
    T5: { name: "فريق التقوى", score: 0 },
    T6: { name: "فريق الصالحين", score: 0 },
    T7: { name: "فريق اليقين", score: 0 },
    T8: { name: "فريق البيان", score: 0 }
  };

  const matches = {
    M1: { teamA: "T1", teamB: "T2" },
    M2: { teamA: "T3", teamB: "T4" },
    M3: { teamA: "T5", teamB: "T6" },
    M4: { teamA: "T7", teamB: "T8" }
  };

  db.ref("contest_v1").set({
    teams: teams,
    matches: matches
  }).then(() => alert("تم إنشاء الفرق والمباريات بنجاح"));
}

function loadData() {
  db.ref("contest_v1").on("value", snap => {
    const data = snap.val();
    if (!data) return;

    const teamsDiv = document.getElementById("teams");
    const matchesDiv = document.getElementById("matches");

    teamsDiv.innerHTML = "";
    matchesDiv.innerHTML = "";

    Object.values(data.teams || {}).forEach(t => {
      teamsDiv.innerHTML += `<div>${t.name} - ${t.score} نقطة</div>`;
    });

    Object.values(data.matches || {}).forEach(m => {
      const a = data.teams[m.teamA].name;
      const b = data.teams[m.teamB].name;
      matchesDiv.innerHTML += `<div>${a} × ${b}</div>`;
    });
  });
}

window.onload = loadData;
