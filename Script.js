document.addEventListener("DOMContentLoaded", () => {
  // ===== Elements =====
  const loader = document.getElementById("loader");
  const card = document.querySelector(".card-topup");
  const payBtn = document.getElementById("payBtn");
  const profileInput = document.getElementById("profileImgInput");
  const profilePreview = document.getElementById("profileImgPreview");
  const userInput = document.getElementById("userIdInput");
  const coinOptions = document.querySelectorAll('.coin-option');
  const paymentOptions = document.querySelectorAll('.payment-option');

  // Custom Coin Elements
  const customOption = document.getElementById("customCoinOption");
  const customModal = document.getElementById("customCoinModal");
  const customInput = document.getElementById("customCoinInput");
  const customPriceText = document.getElementById("customCoinPrice");
  const customPriceButton = document.getElementById("customCoinPriceButton");
  const customConfirm = document.getElementById("customCoinConfirm");
  const customClose = document.getElementById("customCoinClose");
  const customPayBtn = document.getElementById("CustomPay");
  const minimumText = document.getElementById("mimum"); // elemen minimum

  // Numeric Keyboard
  const keyboardButtons = document.querySelectorAll(".num-keyboard button");

  // Payment Success Elements
  const thanksText = document.getElementById("thanks-text");
  const coinAmount = document.getElementById("coin-amount");
  const backBtn = document.querySelector(".back-button");

  // ===== Init =====
  if(loader) loader.style.display = "none";
  if(card) card.style.display = "block";
  let selectedMethod = "Credit Card";

  // ===== Helper =====
  function coinToUSD(coins){
    return (coins / 300).toFixed(2);
  }

  function updatePrice(){
    let coins = Number(customInput.value);

    if(isNaN(coins) || coins <= 0){
      customPriceText.textContent = ""; // hilangkan harga sebelum input
      minimumText.style.display = "block"; // tampilkan minimum
      if(customPayBtn){
        customPayBtn.disabled = true;
        customPayBtn.classList.add("disabled");
      }
    } else {
      customPriceText.textContent = `$${coinToUSD(coins)}`;
      minimumText.style.display = "none"; // sembunyikan minimum
      if(customPayBtn){
        customPayBtn.disabled = false;
        customPayBtn.classList.remove("disabled");
      }
    }
  }

// =========== Close helper 2 ============

 function coinToUSD(coins){
  return (coins / 300).toFixed(2);
}

function updatePrice(){
  let coins = Number(customInput.value);

  // kalau kosong (""), reset ke kosong jangan jadi 0
  if(customInput.value.trim() === ""){
    customPriceButton.textContent = "";   // kosongin harga
    minimumText.style.display = "block";  // tampilkan minimum
    if(customPayBtn){
      customPayBtn.disabled = true;
      customPayBtn.classList.add("disabled");
    }
    return; // stop disini biar ga kebaca jadi 0
  }

  // kalau isinya angka valid
  if(isNaN(coins) || coins <= 0){
    customCoinPriceButton.textContent = "";
    minimumText.style.display = "block";
    if(customPayBtn){
      customPayBtn.disabled = true;
      customPayBtn.classList.add("disabled");
    }
  } else {
    customCoinPriceButton.textContent = `$${coinToUSD(coins)}`;
    minimumText.style.display = "none";
    if(customPayBtn){
      customPayBtn.disabled = false;
      customPayBtn.classList.remove("disabled");
    }
  }
}

// pas pertama kali load langsung reset ke kosong
document.addEventListener("DOMContentLoaded", () => {
  if(customCoinPriceButton) customCoinPriceButton.textContent = "";
  if(customInput) customInput.value = "";
  if(minimumText) minimumText.style.display = "block";
});


  // ===== Coin Selection =====
  coinOptions.forEach(option => {
    option.addEventListener('click', () => {
      coinOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      if(option.id === "customCoinOption"){
        customModal.classList.add("show");
        customInput.focus();
        updatePrice();
      } else {
        const price = option.getAttribute('data-price');
        if(payBtn) payBtn.textContent = `Pay $${Number(price).toFixed(2)}`;
      }
    });
  });

  // ===== Payment Method Selection =====
  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      selectedMethod = option.getAttribute("data-method");
    });
  });

  // ===== Profile Preview =====
  if(profileInput && profilePreview){
    profileInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () => profilePreview.src = reader.result;
        reader.readAsDataURL(file);
      } else {
        profilePreview.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
      }
    });
  }

  // ===== Custom Modal =====
  if(customClose) customClose.addEventListener("click", () => customModal.classList.remove("show"));
  if(customInput) customInput.addEventListener("input", updatePrice);

  if(customConfirm){
    customConfirm.addEventListener("click", () => {
      const coins = Number(customInput.value);
      if(!isNaN(coins) && coins > 0){
        localStorage.setItem("customCoins", coins);
        customModal.classList.remove("show");
        coinOptions.forEach(opt => opt.classList.remove('active'));
        customOption.classList.add('active');
        updatePrice();
      }
    });
  }

  // ===== Numeric Keyboard =====
  keyboardButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      if(!customInput) return;

      if(key === "Backspace"){
        customInput.value = customInput.value.slice(0, -1);
      } else if(key === "000"){
        customInput.value += "000";
      } else {
        customInput.value += key;
      }

      updatePrice();
    });
  });

  // ===== Custom Pay Button =====
  if(customPayBtn){
    customPayBtn.disabled = true;
    customPayBtn.classList.add("disabled");

    customPayBtn.addEventListener("click", () => {
      const coins = Number(customInput.value);
      if(!coins || coins <= 0){
        customInput.focus();
        return;
      }

      const username = userInput.value.trim();
      if(!username){
        userInput.focus();
        userInput.style.border = "2px solid red";
        setTimeout(() => userInput.style.border = "", 1500);
        return;
      }

      localStorage.setItem("customCoins", coins);
      localStorage.setItem("tiktokUsername", username);
      window.location.href = "PaymentSucces.html";
    });
  }

  // ===== Pay Button =====
  if(payBtn){
    payBtn.addEventListener("click", () => {
      const username = userInput.value.trim();
      if(!username){
        userInput.focus();
        userInput.style.border = "2px solid red";
        setTimeout(() => userInput.style.border = "", 1500);
        return;
      }
      localStorage.setItem("tiktokUsername", username);

      const activeCoin = document.querySelector('.coin-option.active');
      if(activeCoin && activeCoin.id !== "customCoinOption"){
        localStorage.setItem("customCoins", activeCoin.getAttribute('data-price'));
      }

      if(!loader || !card) return;
      loader.style.display = "flex";
      card.style.display = "none";
      payBtn.disabled = true;

      setTimeout(() => {
        loader.style.display = "none";
        card.style.display = "block";
        payBtn.disabled = false;
      }, 40000);
    });
  }

  // ===== Payment Success Page =====
  if(backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");
  if(thanksText && coinAmount){
    const savedUsername = localStorage.getItem("tiktokUsername");
    const savedCoins = localStorage.getItem("customCoins");
    if(savedUsername) thanksText.textContent = `You topup @${savedUsername} has been processing 24 hours.`;
    if(savedCoins) coinAmount.textContent = `Amount topup: ${savedCoins}. While waiting, you can gift to the other using virtual gift.`;
  }

  // ===== Disable mobile keyboard dan bold input =====
  if(customInput){
    customInput.setAttribute("readonly", true);
    customInput.style.fontWeight = "bold";
    customPriceText.textContent = ""; // hilangkan harga awal
  }
});
