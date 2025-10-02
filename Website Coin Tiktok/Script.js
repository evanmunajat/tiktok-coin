document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const card = document.querySelector(".card-topup");
  const payBtn = document.getElementById("payBtn");
  const profileInput = document.getElementById("profileImgInput");
  const profilePreview = document.getElementById("profileImgPreview");
  const userInput = document.getElementById("userIdInput");
  const coinOptions = document.querySelectorAll('.coin-option');
  const paymentOptions = document.querySelectorAll('.payment-option');

  if (loader) loader.style.display = "none";
  if (card) card.style.display = "block";

  let selectedMethod = "Credit Card";

  coinOptions.forEach(option => {
    option.addEventListener('click', () => {
      coinOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      const price = option.getAttribute('data-price');
      if (payBtn) payBtn.textContent = `Pay $${Number(price).toFixed(2)}`;
    });
  });

  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      selectedMethod = option.getAttribute("data-method");
    });
  });

  if (profileInput && profilePreview) {
    profileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => profilePreview.src = reader.result;
        reader.readAsDataURL(file);
      } else {
        profilePreview.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
      }
    });
  }

  if (payBtn) {
    payBtn.addEventListener("click", () => {
      const username = userInput.value.trim();
      if (!username) {
        userInput.focus();
        userInput.style.border = "2px solid red";
        setTimeout(() => userInput.style.border = "", 1500);
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem("tiktokUsername", username);
      const activeCoin = document.querySelector('.coin-option.active');
      if (activeCoin) {
        localStorage.setItem("customCoins", activeCoin.getAttribute('data-price'));
      }

      // Loader
      if (!loader || !card) return;
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

  const thanksText = document.getElementById("thanks-text");
  const coinAmount = document.getElementById("coin-amount");
  const backBtn = document.querySelector(".back-button");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "Index.html";
    });
  }

  if (thanksText && coinAmount) {
    const savedUsername = localStorage.getItem("tiktokUsername");
    const savedCoins = localStorage.getItem("customCoins");
    if (savedUsername) thanksText.textContent = `You topup @${savedUsername} has been processing 24 hours.`;
    if (savedCoins) coinAmount.textContent = `Amount topup: ${savedCoins}. While waiting, you can gift to the other using virtual gift.`;
  }
});
