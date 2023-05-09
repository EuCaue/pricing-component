const $pageViews = document.querySelector(".price > small "),
  $pagePrice = document.querySelector(".price > p"),
  $slider = document.querySelector("input[type='range']"),
  $bilingToggle = document.querySelector('input[type="checkbox"]');

const pageViewsArray = [10, 50, 100, 500, 1];
const pagePriceArray = [8, 12, 16, 24, 36];

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumIntegerDigits: 1,
});

// blink/webkit fix
const sliderWebkitFix = () => {
  if (window.navigator.userAgent.indexOf("AppleWebKit") > -1) {
    const progress =
      ($slider.value - $slider.min) / ($slider.max - $slider.min);
    const $webkitSlider = document.querySelector("input[type='range']");
    const bgFill =
      "linear-gradient(90deg,  hsl(174, 86%, 45%)" +
      progress * 100 +
      "%, hsl(224, 65%, 95%) " +
      progress * 100 +
      "%)";
    $webkitSlider.style.background = bgFill;
    $webkitSlider.style.height = "auto";
    $webkitSlider.style.padding = "0";
    $webkitSlider.style.borderRadius = "20px";
  }
};

const changeValues = () => {
  const discountValue =
    pagePriceArray[$slider.valueAsNumber - 1] -
    (25 / 100) * pagePriceArray[$slider.valueAsNumber - 1];

  const normalPrice = pagePriceArray[$slider.valueAsNumber - 1];

  $pageViews.innerText = `${pageViewsArray[$slider.valueAsNumber - 1]}${
    $slider.valueAsNumber == 5 ? "M" : "K"
  }  PAGEVIEWS`;
  $pagePrice.innerHTML = `${
    $bilingToggle.checked
      ? formatCurrency.format(discountValue)
      : formatCurrency.format(normalPrice)
  }<span>/ month</span>`;
};

$slider.addEventListener("change", () => {});

window.addEventListener("load", () => {
  sliderWebkitFix();
});

$slider.addEventListener("change", () => {
  changeValues();
  sliderWebkitFix();
});

$bilingToggle.addEventListener("change", () => {
  changeValues();
});
