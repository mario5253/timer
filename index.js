// タイマーディスプレイ
const render = document.querySelector('#render');
// startボタン
const startBtn = document.querySelector('#startBtn');
// plusボタン
const plusBtn = document.querySelector('#plusBtn');
// minusBtn
const minusBtn = document.querySelector('#minusBtn');

// カウントされる数字
const renderNum = document.querySelector('#renderNum');

// 結果
let result = 0;
// plusボタンを押したら5分追加
plusBtn.addEventListener('click',()=> {
  result = result + 300;//5分追加
  renderNum.textContent = formatTime(result);
});

// minus押したら5分minusする

minusBtn.addEventListener('click',()=> {
  if (result >= 300) {
    result = result - 300;
    renderNum.textContent = formatTime(result);
  }
});


// カウントダウンスタート関数
let timerID = null;

let totalTime = 0;
startBtn.addEventListener('click',()=> {
  if(result > 0) {
    totalTime = result;
    // スタートボタン無効化
    startBtn.disabled = true;
     timerID = setInterval(()=>{
      if(result > 0) {
        result--;
        renderNum.textContent = formatTime(result);

        // 円の進捗
        setProgress(result / totalTime);
      } else {
        clearInterval(timerID);
        alert('おわったー！')
      } 
    },1000);
  }
});

// 秒・分単位の変換
function formatTime(seconds) {
  const M = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${M}分${s}秒`;
}
// 一時停止ボタン
const pauseBtn = document.querySelector('#pauseBtn');
pauseBtn.addEventListener('click',()=> {
  if(timerID !==null) { //タイマー作動中だったら
    clearInterval(timerID);//タイマーを止める
    timerID = null;
    startBtn.disabled = false;
  }
});

// 円周を求める
const circle = document.querySelector('#progressCircle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
  const offset = circumference * (1 - percent);
  circle.style.strokeDashoffset = offset;
}