// <Xác định logic>
let VALUES = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🖐️" },
];

let compare = (idPlayer, idCompuer) => {
  let indexPlayer = VALUES.findIndex((item) => item.id == idPlayer);
  let indexCompuer = VALUES.findIndex((item) => item.id == idCompuer);
  let check = indexPlayer - indexCompuer;
  if (check == -2 || check == 1) return 1; // player win
  else if (check == 0) return 0; // draw
  else return -1; //lose
};
// </Xác định logic>
// làm chuyển động của computer
let i = 0;
let handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.innerHTML = VALUES[i].value;
  computer.dataset.id = VALUES[i].id;
  i++;
  if (i == 3) {
    i = 0;
  }
};

// setInterval: hàm này sẽ lặp lại hàm handleChange sau mỗi 100ms
// và trả về key để có thể clearInterval hay có nghĩa là dừng vòng lặp
let interval = setInterval(handleChange, 10);

//
let playerItems = document.querySelectorAll(".user");

playerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    // 1.dừng máy lại
    clearInterval(interval);
    // 2. thêm actived cho nút vừa nhấn, lấy id của user và computer
    playerItems.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    event.target.classList.add("actived");
    // 3. so sánh và hiển thị kết quả
    let computer = document.querySelector("#computer");
    let idPlayer = event.target.id;
    let idComputer = computer.dataset.id;
    let result = compare(idPlayer, idComputer);
    let msg, color;
    if (result == 1) {
      msg = "Chúc mừng bạn đã thắng 1 con Bot đến từ Thanh Hóa 🌹";
      color = "success";
    } else if (result == 0) {
      msg = "Ôi trời, bạn chỉ hòa 1 con Bot đến từ Thanh Hóa 😑";
      color = "warning";
    } else {
      msg = "Hẹ hẹ hẹ, bạn đã thua 1 con Bot đến từ Thanh Hóa 🤣🤣🤣";
      color = "danger";
    }
    let alertDiv = document.createElement("div");
    alertDiv.innerHTML = msg;
    alertDiv.classList.add(`alert-${color}`);
    document.querySelector(".notification").appendChild(alertDiv);
    // 4. hiển thị nút chơi lại
    document.querySelector("#play-again").classList.remove("d-none");
  });
});

// Làm sự kiện click cho nút chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (event) => {
  interval = setInterval(handleChange, 100);
  playerItems.forEach((_item) => {
    _item.classList.remove("actived");
    _item.style.pointerEvents = "";
  });
  document.querySelector(".notification").innerHTML = "";
  document.querySelector("#play-again").classList.add("d-none");
});
