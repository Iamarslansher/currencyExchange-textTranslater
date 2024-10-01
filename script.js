function switchTab(tab) {
  document.getElementById("exchange").style.display =
    tab === "exchange" ? "block" : "none";
  document.getElementById("translator").style.display =
    tab === "translator" ? "block" : "none";

  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  event.target.classList.add("active");

  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = null;
  });
}

//  CURRENCY EXCHANGE
async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const resultDiv = document.getElementById("result");

  if (!amount.trim()) {
    resultDiv.innerHTML = "Please enter Amount.";
    return;
  }

  const apiKey = "0bd74c52b6a59b10438f681e";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.result === "success") {
      const exchangeRate = data.conversion_rate;
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      document.getElementById(
        "result"
      ).innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
      document.getElementById("result").innerText =
        "Error fetching exchange rate.";
    }
  } catch (error) {
    document.getElementById("result").innerText =
      "Error connecting to the API.";
    console.error(error);
  }
}

//  TEXT TRANSLATOR

async function translateText() {
  const text = document.getElementById("text-to-translate").value;
  const sourceLang = document.getElementById("source-lang").value;
  const targetLang = document.getElementById("target-lang").value;
  const resultDiv = document.getElementById("translatedText");

  if (!text.trim()) {
    resultDiv.innerHTML = "Please enter text to translate.";
    return;
  }

  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${sourceLang}|${targetLang}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data.responseStatus === 200 && data.responseData.translatedText) {
      resultDiv.innerHTML = data.responseData.translatedText;
    } else {
      resultDiv.innerHTML = "Translation failed. Please try again.";
      console.error("API response:", data);
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = "An error occurred. Please try again later.";
  }

  return;
}
