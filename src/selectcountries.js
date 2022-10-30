import { createCountryMap } from './countrymap';

import euCountries from "./data/eu.json";
import europeCountries from "./data/europe.json";
import gdprCountries from "./data/gdpr.json";
import worldCountries from "./data/world.json";
import countries from "./data/countries.json";
import all from "./data/all.json";

const gdprSet = new Set(gdprCountries.map(c => c.code.value))
const euSet = new Set(euCountries.map(c => c.code))

const newCountries = all.map(c => {
  const code = c["alpha-2"];
  let regions = [c.region.toLowerCase(), "world"];
  if (!c.region) {
    return null;
  }
  let naCodes = ["CA", "US", "MX", "GL", "CU", "JM", "PA", "PR", "CR", "GT", "HT", "DO", "BS", "HN", "BZ", "BB", "NI", "SV"];
  if (naCodes.includes(code)) {
    regions.push("north-america")
  }
  if (!naCodes.includes(code) && regions.includes("americas")) {
    regions.push("south-america")
  }
  if (gdprSet.has(code)) {
    regions.push("gdpr");
  }
  if (euSet.has(code)) {
    regions.push("eu")
  }
  return {
    name: c.name,
    code: c["alpha-2"],
    regions
  }
})

const newCountriesValid = newCountries.filter(c => c != null);
// console.log(JSON.stringify(newCountriesValid))

const map = createCountryMap();

let toggledLinks = [];

const finishEl = document.querySelector(".finish");

const linkEls = document.querySelectorAll(".quick-links__link");
linkEls.forEach(linkEl => {
  const regionName = linkEl.dataset.region;
  const statusEl = linkEl.querySelector(".quick-links__status");
  const codes = countries.filter(c => c.regions.includes(regionName)).map(c => c.code);

  linkEl.addEventListener("click", () => {
    if (toggledLinks.includes(regionName)) {
      map.removeRegions(codes);
      toggledLinks = toggledLinks.filter(l => l !== regionName);
      statusEl.classList.remove("quick-links__status--active");
    } else {
      map.addRegions(codes);
      toggledLinks.push(regionName);
      statusEl.classList.add("quick-links__status--active");
    }
  });
});


