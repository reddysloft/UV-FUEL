// Potential Savings calculator
// Savings = (dailyDistance / mileage) * fuelCost * 365 * years

const DAYS_PER_YEAR = 365;

const dailyDistanceEl = document.getElementById("daily-distance");
const mileageEl = document.getElementById("mileage");
const fuelCostEl = document.getElementById("fuel-cost");
const yearsEl = document.getElementById("years");

const dailyDistanceValueEl = document.getElementById("daily-distance-value");
const mileageValueEl = document.getElementById("mileage-value");
const amountEl = document.getElementById("savings-amount");
const yearsCaptionEl = document.getElementById("years-caption");

// Indian number formatting (e.g. 66,917)
const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function getValues() {
  return {
    dailyDistance: Number(dailyDistanceEl.value),
    mileage: Number(mileageEl.value),
    fuelCost: Number(fuelCostEl.dataset.value),
    years: Number(yearsEl.dataset.value),
  };
}

function calculateSavings({ dailyDistance, mileage, fuelCost, years }) {
  if (!mileage) return 0;
  return (dailyDistance / mileage) * fuelCost * DAYS_PER_YEAR * years;
}

// Position the custom fill + thumb for a range input
function paintSlider(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const val = Number(input.value);
  const pct = ((val - min) / (max - min)) * 100;

  const slider = input.closest("[data-slider]");
  slider.querySelector(".slider-fill").style.width = pct + "%";
  slider.querySelector(".slider-thumb").style.left = pct + "%";
}

function render() {
  const values = getValues();

  dailyDistanceValueEl.textContent = values.dailyDistance;
  mileageValueEl.textContent = values.mileage;
  yearsCaptionEl.textContent = values.years;

  const savings = calculateSavings(values);
  amountEl.textContent = "INR " + inrFormatter.format(Math.round(savings));

  paintSlider(dailyDistanceEl);
  paintSlider(mileageEl);
}

// Sliders
dailyDistanceEl.addEventListener("input", render);
mileageEl.addEventListener("input", render);

// Steppers (+ / -)
document.querySelectorAll(".stepper-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    const step = Number(btn.dataset.step);
    const min = Number(target.dataset.min);
    const stepSize = Number(target.dataset.step);
    let next = Number(target.dataset.value) + step * stepSize;
    if (next < min) next = min;
    target.dataset.value = next;
    target.textContent = next;
    render();
  });
});

// Close button (demo: hides the card)
document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".card").style.display = "none";
});

render();
