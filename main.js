const $textboxs = document.querySelectorAll(".text-box");

$textboxs.forEach((textbox) => {
  // 기존 글자 저장
  const letters = [...textbox.innerText];

  // textbox 초기화
  textbox.innerText = "";

  // text box에 쪼갠 글자 span 태그로 묶어서 다시 넣기
  letters.forEach((letter) => {
    textbox.insertAdjacentHTML(
      "beforeend",
      `<span class="split-text">${letter}</span>`
    );
  });
});

// 대체할 텍스트 배열
const change = [
  "_",
  "-",
  ",",
  ".",
  "\\",
  "/",
  "!",
  "?",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "$",
  "#",
  "%",
  "&",
  "*",
  "@",
  ")",
  "(",
  "~",
  "+",
];

// 컬러 파레트
const colorPalette = ["#144201", "#217000", "#17ff00", "#0b7800"];

// textbox의 span들 2차 배열로 저장
const spansArr = Array.from($textboxs, (textbox) => {
  const spans = textbox.querySelectorAll(".split-text");
  return (textbox = [...spans]);
});

// textbox의 span들 innerText 2차 배열로 저장
const originalText = Array.from($textboxs, (textbox) => {
  const spans = textbox.querySelectorAll(".split-text");
  return (textbox = [...spans].map((span) => span.innerText));
});

// textboxs 순서대로 하나씩 i * 100 간격으로 changeCharacter 함수 실행
const animate = () => {
  for (let i = 0; i < spansArr.length; i++) {
    setTimeout(changeCharacter, i * 100, spansArr[i], originalText[i]);
  }
};

// 안의 span 애니메이션
const changeCharacter = (spans, originalText) => {
  for (let i = 0; i < spans.length; i++) {
    setTimeout(() => {
      if (spans[i].innerText === " ") return;

      // const randomMax = Math.floor(Math.random() * (change.length - 5) + 5);
      for (let j = 0; j < change.length + 1; j++) {
        const randomIdx = Math.floor(Math.random() * change.length);

        setTimeout(() => {
          j !== change.length
            ? (spans[i].innerText = change[randomIdx])
            : (spans[i].innerText = originalText[i]);
        }, j * 80);
      }
    }, i * 30);
  }
};

animate();

document.querySelector("#replay-btn").onclick = () => animate();

// 마우스 이벤트

const changeColor = (e) => {
  e.stopPropagation();
  e.preventDefault();
  if (e.target.nodeName !== "SPAN") return;
  e.target
    .closest("p")
    .querySelectorAll(".split-text")
    .forEach((span, idx) => {
      const change = (state) => {
        if (state === "animating") {
          return (span.style.color =
            colorPalette[Math.floor(Math.random() * 4)]);
        } else span.style.color = "white";
      };

      setTimeout(change, idx * 20, "animating");
      setTimeout(change, idx * 70, "animationend");
    });
};

const debouncing = (func, timeout = 300) => {
  clearTimeout(timerId);
  timerId = setTimeout(func, timeout);
};

const $container = document.querySelector(".container");
$container.onmousemove = (e) => changeColor(e);
