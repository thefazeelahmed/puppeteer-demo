const puppeteer = require("puppeteer");

(async () => {
  let data = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.yellowpages.ca/search/si/1/Dentists/Toronto+ON",
    {
      waitUntil: "networkidle2",
    }
  );

  var elements = await page.$$("div.listing__content__wrapper");
  for (const element of elements) {
    const name = await page.evaluate(
      (el) => el.querySelector("h3").textContent,
      element
    );

    const streetaddress = await page.evaluate(
      (el) => el.querySelector("[itemprop=streetAddress]").textContent,
      element
    );

    const addressLocality = await page.evaluate(
      (el) => el.querySelector("[itemprop=addressLocality]").textContent,
      element
    );

    const postalCode = await page.evaluate(
      (el) => el.querySelector("[itemprop=postalCode]").textContent,
      element
    );

    const nameAnt = await page.evaluate(
      (el) => el.querySelector("[itemprop=image]").getAttribute("src"),
      element
    );
    console.log(nameAnt);
    //listing__details__teaser

    data.push({
      name,
      address: streetaddress + " " + addressLocality + "," + postalCode,
      // opensAt,
      // image,
    });

    //console.log(data);
  }
})();
