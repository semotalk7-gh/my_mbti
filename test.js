const questions = [
  { q: "상대가 힘들다고 하면 나는…", a: {F: "마음 먼저 공감한다", T: "해결책부터 제시한다"} },
  { q: "여행 계획을 세울 때 나는…", a: {J: "시간표를 만들면 마음이 편하다", P: "가서 느낌대로 움직이는게 즐겁다"} },
  { q: "대화가 길어질 때 나는…", a: {I: "잠깐 쉬고 생각 정리 시간이 필요하다", E: "바로 결론낼 때 가장 속이 편하다"} },
  { q: "갈등이 생기면 나는…", a: {N: "큰 흐름/의미부터 이야기하고 싶다", S: "사실/사례부터 차근히 확인하고 싶다"} },
  { q: "상대가 늦을 때 나는…", a: {T: "약속/효율이 깨져 답답하다", F: "상대 사정부터 이해하려 한다"} },
  { q: "선물할 때 나는…", a: {F: "감정이 담긴 메시지가 중요", T: "실용성/가격대가 중요"} },
  { q: "회의에서 나는…", a: {E: "말하면서 생각이 정리된다", I: "듣고 정리해서 말하는 편이다"} },
  { q: "하루를 마칠 때 나는…", a: {J: "내일 할 일을 정리해야 편하다", P: "내일 기분따라 해도 괜찮다"} }
];

let state = { idx: 0, score: {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0} };

const elQ = document.getElementById('qtext');
const elA = document.getElementById('optA');
const elB = document.getElementById('optB');
const elStep = document.getElementById('step');
document.getElementById('total').textContent = questions.length;

function render(){
  const it = questions[state.idx];
  elQ.textContent = it.q;
  elA.textContent = Object.values(it.a)[0];
  elB.textContent = Object.values(it.a)[1];
  elA.onclick = () => choose(Object.keys(it.a)[0]);
  elB.onclick = () => choose(Object.keys(it.a)[1]);
  elStep.textContent = String(state.idx+1);
}
function choose(dim){
  state.score[dim]++;
  state.idx++;
  if(state.idx >= questions.length){
    const type = summarize(state.score);
    location.href = `result.html?type=${type}`;
  }else{
    render();
  }
}
function summarize(sc){
  const type =
    (sc.E>=sc.I?'E':'I') +
    (sc.S>=sc.N?'S':'N') +
    (sc.T>=sc.F?'T':'F') +
    (sc.J>=sc.P?'J':'P');
  // 결과 페이지에서는 F/T만 샘플 배지로 쓰지만, 전체 코드는 유지
  return sc.T>=sc.F ? 'T' : 'F';
}
render();
