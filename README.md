# Gyventojų informavimas ir apklausos

Interaktyvi demonstracija su objektų ir gyventojų kontaktų valdymu, SMS bei el. pašto pranešimų imitavimu, apklausomis ir gyventojų tekstinėmis žinutėmis bei nuotraukomis.

## Funkcijos

- Objektai, gyventojų kontaktai, pradinis Excel importas ir gavėjų atranka.
- Pranešimų ruošimas ir demonstracinė siuntimo istorija.
- Apklausos su vienu ar keliais pasirinkimais, tekstiniais klausimais, terminais, rezultatų suvestine ir Excel eksportu.
- Atskiros gyventojų formos pagal asmeninę nuorodą, be registracijos ir prisijungimo; iki 4 nuotraukų.
- Gautų žinučių peržiūra, nuotraukos, būsenos ir administratoriaus atsakymų istorija.

## GitHub Pages

1. Repozitorijoje atidarykite **Settings → Pages**.
2. Pasirinkite **Deploy from a branch**.
3. Pasirinkite **main** šaką ir **/(root)** katalogą, tada **Save**.

Visi svetainės failai yra pagrindiniame kataloge; jokių diegimo ar build priklausomybių nereikia. Vietiniam paleidimui pateikite šį katalogą HTTP serveriu. `file://` netinka ES moduliams.

## Demonstracijos ribos

SMS ir el. laiškai realiai nesiunčiami. Duomenys saugomi tik toje pačioje naršyklėje (`localStorage`), bendros serverio duomenų bazės nėra. Asmeninės nuorodos naujiems demonstracijoje sukurtiems įrašams skirtos tikrinti ta pačia naršykle. Pateikus formą kitame įrenginyje, duomenys nepersiduoda į administratoriaus naršyklę.

Naudojami išgalvoti pavyzdiniai duomenys. Naudotojų peržiūros imituoja roles. Produkcijoje administratoriaus prisijungimas ir gyventojo asmeninės nuorodos tikrinimas turi vykti serveryje; gyventojas paskyros nekuria. Į šį demonstracinį paketą tikroji autentifikacija, duomenų sauga, API ir pranešimų siuntimo paslaugos neįtrauktos. Apklausos nėra formalus savininkų balsavimo modulis.

## Įdiegimas kaip programėlės

Atidarykite paskelbtą GitHub Pages demo per HTTPS. Palaikomose naršyklėse pasirodo įdiegimo piktograma arba mygtukas „Įdiegti programėlę“. „Microsoft Edge“ taip pat galima rinktis **… → More tools → Apps → Install this site as an app**. Įdiegta programėlė atsidaro atskirame lange. Įdiegimas nekeičia demonstracijos duomenų saugojimo ir neprideda bendros serverio duomenų bazės. Naudojimui reikalingas internetas; veikimas neprisijungus nenumatytas.
