const state={idx:0,score:{I:0,E:0,S:0,N:0,T:0,F:0,J:0,P:0},answers:[]};
const qEl=document.getElementById('qtext'),aEl=document.getElementById('optA'),bEl=document.getElementById('optB'),nEl=document.getElementById('optN'),stepEl=document.getElementById('stepText'),axisEl=document.getElementById('axisText'),progEl=document.getElementById('prog');
const body=document.body;
function applyThemeByIndex(i){
  body.classList.remove('theme-cream','theme-blue','theme-peach','theme-green');
  if(i<5) body.classList.add('theme-cream');
  else if(i<10) body.classList.add('theme-blue');
  else if(i<15) body.classList.add('theme-peach');
  else body.classList.add('theme-green');
}
function render(){const it=QUESTIONS[state.idx]; if(!it){return finish();}
 applyThemeByIndex(state.idx);
 qEl.textContent=it.q; aEl.textContent=it.a[0].t; bEl.textContent=it.a[1].t;
 aEl.onclick=()=>choose(it.a[0].v); bEl.onclick=()=>choose(it.a[1].v); nEl.onclick=()=>neutral(it.axis);
 stepEl.textContent=(state.idx+1)+' / '+QUESTIONS.length; axisEl.textContent=it.axis;
 const pct=Math.round((state.idx)/QUESTIONS.length*100); progEl.style.width=pct+'%';
}
function inc(k,v){state.score[k]=(state.score[k]||0)+v;}
function choose(v){inc(v,1); state.answers.push(v); next();}
function neutral(axis){ // add 0.5 to both sides of the current axis
  const map={IE:['I','E'],SN:['S','N'],TF:['T','F'],PJ:['J','P']};
  const pair=map[axis]; inc(pair[0],0.5); inc(pair[1],0.5);
  state.answers.push('N'); next();
}
function next(){state.idx++; if(state.idx>=QUESTIONS.length){finish();} else render();}
function finish(){const IE=state.score.I>=state.score.E?'I':'E'; const SN=state.score.S>=state.score.N?'S':'N'; const TF=state.score.T>=state.score.F?'T':'F'; const PJ=state.score.J>=state.score.P?'J':'P';
 const code=IE+SN+TF+PJ;
 const pct={IE:pctPair(state.score.I,state.score.E),SN:pctPair(state.score.S,state.score.N),TF:pctPair(state.score.T,state.score.F),PJ:pctPair(state.score.J,state.score.P)};
 localStorage.setItem('nykm_result',JSON.stringify({code,score:state.score,pct})); location.href='result.html';}
function pctPair(a,b){const t=a+b||1; const left=Math.round(a/t*100); return [left,100-left];}
render();