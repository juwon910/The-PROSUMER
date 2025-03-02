// =============== 전역 변수 및 초기 설정 ===============
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;         // 마우스/터치 드로잉 중인지 여부
let currentColor = "#000000";  // 기본 색상 (검정)
let brushSize = 5;            // 기본 브러시 두께
let currentTool = "brush";     // 현재 도구: brush, eraser 중
let lastX = 0, lastY = 0;      // 이전 좌표(드로잉 경로 연결용)

// =============== 도구 아이콘(버튼) 요소 가져오기 ===============
const brushTool = document.getElementById("brushTool");
const eraserTool = document.getElementById("eraserTool");
const paletteTool = document.getElementById("paletteTool");
const colorPicker = document.getElementById("colorPicker");
const brushSizeRange = document.getElementById("brushSizeRange");
const clearCanvasBtn = document.getElementById("clearCanvasBtn");
//여기부터터
const icons = [brushTool, eraserTool, paletteTool];

// 3) 아이콘 하나를 선택하면 나머지는 흑백, 해당 아이콘만 컬러
function selectIcon(icon) {
  // (A) 먼저 다른 아이콘들에서 .colorful 제거
  icons.forEach(i => i.classList.remove("colorful"));
  
  // (B) 클릭된 아이콘에만 .colorful 추가
  icon.classList.add("colorful");
}

// 4) 각 아이콘에 클릭 이벤트 걸기
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    selectIcon(icon);
  });
});
//여기까지지

// 브러시 버튼
brushTool.addEventListener("click", () => {
  currentTool = "brush";
  console.log("브러시 모드");
});

// 지우개 버튼
eraserTool.addEventListener("click", () => {
  currentTool = "eraser";
  console.log("지우개 모드");
});

// 팔레트 아이콘(색 선택)
paletteTool.addEventListener("click", () => {
  // 팔레트 아이콘 클릭 시 colorPicker 표시/숨김
  if (colorPicker.style.display === "none") {
    colorPicker.style.display = "inline-block";
  } else {
    colorPicker.style.display = "none";
  }
});

// 컬러 피커로 색 선택 시
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  console.log("색상 변경:", currentColor);
  // 팔레트 선택 후 자동으로 브러시 모드로 전환
  currentTool = "brush";
});

// 브러시 사이즈 변경 시
brushSizeRange.addEventListener("input", (e) => {
  brushSize = e.target.value;
  console.log("브러시 사이즈:", brushSize);
});

// 전체 지우기 버튼
clearCanvasBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// =============== 마우스 이벤트 ===============
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// =============== 터치 이벤트 (모바일/태블릿) ===============
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  lastX = touch.clientX - rect.left;
  lastY = touch.clientY - rect.top;
  isDrawing = true;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!isDrawing) return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  drawLine(lastX, lastY, x, y);
  [lastX, lastY] = [x, y];
});

canvas.addEventListener("touchend", () => (isDrawing = false));

// =============== 실제 드로잉 처리 함수 ===============
function draw(e) {
  if (!isDrawing) return;
  const x = e.offsetX;
  const y = e.offsetY;
  drawLine(lastX, lastY, x, y);
  [lastX, lastY] = [x, y];
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();

  if (currentTool === "eraser") {
    // 지우개 모드: 흰색으로 그리는 방법
    ctx.strokeStyle = "#ffffff"; 
  } else {
    // 브러시 모드
    ctx.strokeStyle = currentColor;
  }

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
// script.js

// 함수: 클릭 시 반짝이 클래스 부여 후 일정 시간 후 제거
// function addClickEffect(element) {
//   element.addEventListener("click", () => {
//     // 이미 다른 애니메이션이 진행 중이면 제거하고 다시 추가
//     element.classList.remove("click-flash"); 
//     void element.offsetWidth; // Reflow(강제 재생성) 트릭 - 애니메이션 재시작용

//     element.classList.add("click-flash");

//     // 300ms 후 자동 제거 (애니메이션 종료 시점)
//     setTimeout(() => {
//       element.classList.remove("click-flash");
//     }, 500);
//   });
// }

// 기존에 있던 DOM 요소를 불러오는 코드
// brushTool = document.getElementById("brushTool");
// paletteTool = document.getElementById("paletteTool");
// eraserTool = document.getElementById("eraserTool");

// // 세 버튼 각각에 효과 적용
// addClickEffect(brushTool);
// addClickEffect(paletteTool);
// addClickEffect(eraserTool);

// script.js

// 1) DOM 요소 가져오기
// brushTool = document.getElementById("brushTool");
// eraserTool = document.getElementById("eraserTool");
// paletteTool = document.getElementById("paletteTool");

// 2) 모든 아이콘을 배열에 담아 관리
