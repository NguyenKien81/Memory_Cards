let Name; 
let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;
let startTime; // Thời gian bắt đầu
let timerInterval; // Biến để lưu interval
let minutes = 0; // Biến để lưu phút
let seconds = 0; // Biến để lưu giây
let times = 0;
if(window.innerHeight > window.innerWidth) {
    alert("Hãy xoay ngang màn hình để có trải nghiệp tốt nhất !!!");
}
function startTimer() {
    startTime = Date.now(); // Lưu thời gian hiện tại khi bắt đầu
    timerInterval = setInterval(updateTimer, 1000); // Cập nhật mỗi giây
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime; // Thời gian đã trôi qua tính bằng mili giây

    // Chuyển đổi thành giây
    seconds = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    // Hiển thị thời gian lên phần tử infor
    document.getElementById("infor").innerHTML = `<b>Time:</b> ${minutes}m ${seconds}s <b>Times:</b> ${times} <b>Name:</b> ${Name}`;
}

function checkInput() {
    Name = document.getElementById('Name').value;
    if (Name === "") {
        alert("Vui lòng nhập tên !!!");
    } else {
        alert(`Chào mừng ${Name} đến với trò chơi !!!`);
        document.getElementById("log_in").setAttribute("style", "display : none");
        document.getElementById("main_game").setAttribute("style", "display : flex");
        if(window.innerWidth < "800px"){
            document.getElementById("infor").style.fontSize = "12px";
            document.getElementsByClassName("card").forEach(card => {
                card.style.width = "cacl(100% / 6 - 2px)"
                card.style.height = "cacl(100% / 4 - 4px)"

            })
        }
        startTimer(); // Bắt đầu đồng hồ
        updateTimer(); // Cập nhật thông tin ngay lập tức
    }
}

function shuffleCard() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    matchedCards = 0;
    cardOne = cardTwo = "";
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelectorAll("img");
        imgTag[1].src = `image/img${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

function MatchCards(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        document.getElementById("infor").innerHTML = `<b>Time:</b> ${minutes}m ${seconds}s` + `<b>Times:</b> ${times}` + `<b>Name:</b> ${Name}`;
        if (matchedCards == 12) {
            setTimeout(() => {
                clearInterval(timerInterval); // Dừng đồng hồ khi thắng
                alert("Bạn đã thắng!"); // Thông báo khi người chơi thắng
                shuffleCard(); // Thay đổi vị trí thẻ
                matchedCards = 0;
                startTimer(); // Bắt đầu đồng hồ
                updateTimer(); // Cập nhật thông tin ngay lập tức
            }, 1200);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function flipCard(player) {
    let clickedCard = player.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            times++;
            return cardOne = clickedCard;
        } 
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelectorAll("img"),
            cardTwoImg = cardTwo.querySelectorAll("img");
        let img1 = cardOneImg[1].src, img2 = cardTwoImg[1].src;
        MatchCards(img1, img2);
    }
}

const cards = document.querySelectorAll(".card");

shuffleCard();