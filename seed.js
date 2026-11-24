window.GI_SEED = {
  "houses": [
    {
      "id": 1,
      "street": "Žirmūnų g.",
      "number": "68A",
      "city": "Vilnius",
      "apartments": 48,
      "active": true,
      "residents": [
        {
          "id": 101,
          "apt": "12",
          "name": "Aistė Petrauskienė",
          "phone": "+370 612 34567",
          "email": "aiste.p@example.lt"
        },
        {
          "id": 102,
          "apt": "18",
          "name": "Marius Vaitkus",
          "phone": "+370 686 12456",
          "email": "marius.v@example.lt"
        },
        {
          "id": 103,
          "apt": "31",
          "name": "Dalia Rimkienė",
          "phone": "+370 699 88712",
          "email": ""
        },
        {
          "id": "demo-104",
          "apt": "6",
          "name": "Ieva Norkutė",
          "phone": "+370 611 45218",
          "email": "ieva.n@example.lt"
        },
        {
          "id": "demo-105",
          "apt": "24",
          "name": "Paulius Jankauskas",
          "phone": "",
          "email": "paulius.j@example.lt"
        },
        {
          "id": "demo-106",
          "apt": "38",
          "name": "Daiva Stonienė",
          "phone": "+370 687 55204",
          "email": ""
        }
      ]
    },
    {
      "id": 2,
      "street": "Kalvarijų g.",
      "number": "125",
      "city": "Vilnius",
      "apartments": 36,
      "active": true,
      "residents": [
        {
          "id": 201,
          "apt": "4",
          "name": "Tomas Jakštas",
          "phone": "+370 612 99123",
          "email": "tomas.j@example.lt"
        },
        {
          "id": 202,
          "apt": "22",
          "name": "Inga Balčiūnaitė",
          "phone": "",
          "email": "inga.b@example.lt"
        },
        {
          "id": "demo-203",
          "apt": "9",
          "name": "Lina Kazlauskienė",
          "phone": "+370 612 48819",
          "email": "lina.k@example.lt"
        },
        {
          "id": "demo-204",
          "apt": "17",
          "name": "Saulius Petrauskas",
          "phone": "+370 688 11342",
          "email": ""
        }
      ]
    },
    {
      "id": 3,
      "street": "Savanorių pr.",
      "number": "206",
      "city": "Kaunas",
      "apartments": 64,
      "active": true,
      "residents": [
        {
          "id": 301,
          "apt": "7",
          "name": "Jolanta Petraitienė",
          "phone": "+370 623 77541",
          "email": "jolanta.p@example.lt"
        },
        {
          "id": 302,
          "apt": "41",
          "name": "Andrius Mockus",
          "phone": "+370 699 11778",
          "email": "andrius.m@example.lt"
        },
        {
          "id": "demo-303",
          "apt": "15",
          "name": "Rasa Vaitkutė",
          "phone": "",
          "email": "rasa.v@example.lt"
        },
        {
          "id": "demo-304",
          "apt": "28",
          "name": "Darius Tamulis",
          "phone": "+370 699 42118",
          "email": "darius.t@example.lt"
        },
        {
          "id": "demo-305",
          "apt": "53",
          "name": "Kristina Rimkutė",
          "phone": "+370 620 77321",
          "email": ""
        }
      ]
    },
    {
      "id": 4,
      "street": "A. Juozapavičiaus pr.",
      "number": "17",
      "city": "Kaunas",
      "apartments": 24,
      "active": false,
      "residents": [
        {
          "id": 401,
          "apt": "2",
          "name": "Rūta Alksnienė",
          "phone": "+370 612 10001",
          "email": "ruta.a@example.lt"
        }
      ]
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Aistė Kazlauskaitė",
      "email": "aiste@example.lt",
      "role": "admin",
      "houseIds": []
    },
    {
      "id": 2,
      "name": "Mantas Žukauskas",
      "email": "mantas@example.lt",
      "role": "employee",
      "houseIds": [
        1,
        2
      ]
    },
    {
      "id": 3,
      "name": "Eglė Janulytė",
      "email": "egle@example.lt",
      "role": "employee",
      "houseIds": [
        3,
        4
      ]
    }
  ],
  "history": [
    {
      "id": "demo-history-3",
      "date": "2026-09-11 08:45",
      "subject": "Karšto vandens tiekimo sutrikimas",
      "sms": "Informuojame, kad šiandien iki 14:00 galimi karšto vandens tiekimo sutrikimai. Atsiprašome už nepatogumus.",
      "emailText": "Gerbiami gyventojai,\n\nŠiandien iki 14:00 dėl avarinių darbų galimi karšto vandens tiekimo sutrikimai. Atsiprašome už laikinus nepatogumus.\n\nAdministracija",
      "text": "Informuojame, kad šiandien iki 14:00 galimi karšto vandens tiekimo sutrikimai. Atsiprašome už nepatogumus.",
      "recipients": [
        {
          "id": 101,
          "apt": "12",
          "name": "Aistė Petrauskienė",
          "phone": "+370 612 34567",
          "email": "aiste.p@example.lt",
          "houseId": 1,
          "address": "Žirmūnų g. 68A, Vilnius",
          "channels": [
            "sms",
            "email"
          ]
        },
        {
          "id": "demo-104",
          "apt": "6",
          "name": "Ieva Norkutė",
          "phone": "+370 611 45218",
          "email": "ieva.n@example.lt",
          "houseId": 1,
          "address": "Žirmūnų g. 68A, Vilnius",
          "channels": [
            "sms",
            "email"
          ]
        },
        {
          "id": 201,
          "apt": "4",
          "name": "Tomas Jakštas",
          "phone": "+370 612 99123",
          "email": "tomas.j@example.lt",
          "houseId": 2,
          "address": "Kalvarijų g. 125, Vilnius",
          "channels": [
            "sms",
            "email"
          ]
        },
        {
          "id": "demo-203",
          "apt": "9",
          "name": "Lina Kazlauskienė",
          "phone": "+370 612 48819",
          "email": "lina.k@example.lt",
          "houseId": 2,
          "address": "Kalvarijų g. 125, Vilnius",
          "channels": [
            "sms",
            "email"
          ]
        }
      ],
      "count": 4,
      "channel": "both",
      "sender": "Aistė Kazlauskaitė",
      "mode": "demo",
      "houseIds": [
        1,
        2
      ]
    },
    {
      "id": "demo-history-4",
      "date": "2026-09-07 12:20",
      "subject": "Bendrojo naudojimo patalpų patikra",
      "text": "Rugsėjo 9 d. nuo 10:00 bus atliekama bendrojo naudojimo patalpų techninė patikra.",
      "sms": "Rugsėjo 9 d. nuo 10:00 bus atliekama bendrojo naudojimo patalpų techninė patikra.",
      "recipients": [
        {
          "id": 301,
          "apt": "7",
          "name": "Jolanta Petraitienė",
          "phone": "+370 623 77541",
          "email": "jolanta.p@example.lt",
          "houseId": 3,
          "address": "Savanorių pr. 206, Kaunas",
          "channels": [
            "sms"
          ]
        },
        {
          "id": 302,
          "apt": "41",
          "name": "Andrius Mockus",
          "phone": "+370 699 11778",
          "email": "andrius.m@example.lt",
          "houseId": 3,
          "address": "Savanorių pr. 206, Kaunas",
          "channels": [
            "sms"
          ]
        },
        {
          "id": "demo-304",
          "apt": "28",
          "name": "Darius Tamulis",
          "phone": "+370 699 42118",
          "email": "darius.t@example.lt",
          "houseId": 3,
          "address": "Savanorių pr. 206, Kaunas",
          "channels": [
            "sms"
          ]
        }
      ],
      "count": 3,
      "channel": "sms",
      "sender": "Eglė Janulytė",
      "mode": "demo",
      "houseIds": [
        3
      ]
    },
    {
      "date": "2026-09-10 14:32",
      "subject": "Vandens tiekimo darbai",
      "text": "Rugsėjo 12 d. nuo 9:00 iki 12:00 bus laikinai sustabdytas vandens tiekimas.",
      "recipients": [
        {
          "id": 101,
          "apt": "12",
          "name": "Aistė Petrauskienė",
          "phone": "+370 612 34567",
          "email": "aiste.p@example.lt",
          "houseId": 1,
          "address": "Žirmūnų g. 68A",
          "channels": [
            "sms",
            "email"
          ]
        },
        {
          "id": 102,
          "apt": "18",
          "name": "Marius Vaitkus",
          "phone": "+370 686 12456",
          "email": "marius.v@example.lt",
          "houseId": 1,
          "address": "Žirmūnų g. 68A",
          "channels": [
            "sms",
            "email"
          ]
        },
        {
          "id": 103,
          "apt": "31",
          "name": "Dalia Rimkienė",
          "phone": "+370 699 88712",
          "email": "",
          "houseId": 1,
          "address": "Žirmūnų g. 68A",
          "channels": [
            "sms"
          ]
        }
      ],
      "count": 3,
      "channel": "both",
      "sender": "Aistė Kazlauskaitė",
      "id": "seed-0",
      "mode": "demo",
      "houseIds": [
        1
      ]
    },
    {
      "date": "2026-09-09 10:15",
      "subject": "Laiptinės valymas",
      "text": "Informuojame apie numatomus laiptinės valymo darbus.",
      "recipients": [
        {
          "id": 201,
          "apt": "4",
          "name": "Tomas Jakštas",
          "phone": "+370 612 99123",
          "email": "tomas.j@example.lt",
          "houseId": 2,
          "address": "Kalvarijų g. 125",
          "channels": [
            "email"
          ]
        },
        {
          "id": 202,
          "apt": "22",
          "name": "Inga Balčiūnaitė",
          "phone": "",
          "email": "inga.b@example.lt",
          "houseId": 2,
          "address": "Kalvarijų g. 125",
          "channels": [
            "email"
          ]
        }
      ],
      "count": 2,
      "channel": "email",
      "sender": "Mantas Žukauskas",
      "id": "seed-1",
      "mode": "demo",
      "houseIds": [
        2
      ]
    },
    {
      "date": "2026-09-05 16:08",
      "subject": "Šildymo sistemos patikra",
      "text": "Rugsėjo 8 d. bus atliekama šildymo sistemos patikra.",
      "recipients": [
        {
          "id": 301,
          "apt": "7",
          "name": "Jolanta Petraitienė",
          "phone": "+370 623 77541",
          "email": "jolanta.p@example.lt",
          "houseId": 3,
          "address": "Savanorių pr. 206",
          "channels": [
            "sms"
          ]
        },
        {
          "id": 302,
          "apt": "41",
          "name": "Andrius Mockus",
          "phone": "+370 699 11778",
          "email": "andrius.m@example.lt",
          "houseId": 3,
          "address": "Savanorių pr. 206",
          "channels": [
            "sms"
          ]
        }
      ],
      "count": 2,
      "channel": "sms",
      "sender": "Eglė Janulytė",
      "id": "seed-2",
      "mode": "demo",
      "houseIds": [
        3
      ]
    }
  ],
  "prototypeDataVersion": 3
};

window.GI_SEED.surveys=[
 {id:'survey-light',title:'Laiptinės apšvietimo atnaujinimas',description:'Norime sužinoti jūsų nuomonę apie ekonomiškesnį laiptinės apšvietimą. Atsakymai padės suplanuoti darbus.',houseIds:['1','2'],deadline:'2026-12-08',status:'active',created:'2026-11-20T08:00:00',questions:[{id:'q-light',title:'Ar pritariate LED apšvietimo įrengimui laiptinėje?',type:'single',options:['Taip, pritariu','Ne, nepritariu','Reikia daugiau informacijos']},{id:'q-comment',title:'Ką dar norėtumėte patobulinti bendrose erdvėse?',type:'text',options:[]}],responses:[{residentId:102,houseId:1,date:'2026-11-21T09:00:00',answers:[{questionId:'q-light',value:['Taip, pritariu']},{questionId:'q-comment',value:'Būtų naudinga pakeisti ir lauko šviestuvą prie įėjimo.'}]},{residentId:201,houseId:2,date:'2026-11-22T12:00:00',answers:[{questionId:'q-light',value:['Taip, pritariu']},{questionId:'q-comment',value:'Siūlau judesio daviklius.'}]},{residentId:'demo-203',houseId:2,date:'2026-11-23T10:00:00',answers:[{questionId:'q-light',value:['Reikia daugiau informacijos']},{questionId:'q-comment',value:'Norėčiau žinoti numatomą darbų kainą.'}]}]},
 {id:'survey-clean',title:'Bendrųjų patalpų priežiūra',description:'Kurioms bendrosioms patalpoms reikėtų skirti daugiau dėmesio? Galite pasirinkti kelis variantus.',houseIds:['3'],deadline:'2026-12-05',status:'active',created:'2026-11-22T10:00:00',questions:[{id:'q-clean',title:'Kur reikėtų dažnesnės priežiūros?',type:'multiple',options:['Laiptinėje','Rūsyje','Kieme','Prie atliekų konteinerių']}],responses:[{residentId:302,houseId:3,date:'2026-11-23T08:00:00',answers:[{questionId:'q-clean',value:['Kieme','Prie atliekų konteinerių']}]}]},
 {id:'survey-meeting',title:'Gyventojų susitikimo laikas',description:'Išrinktas gyventojams patogiausias susitikimo laikas.',houseIds:['1'],deadline:'2026-11-19',status:'closed',created:'2026-11-15T08:00:00',questions:[{id:'q-time',title:'Kada jums patogiausia dalyvauti?',type:'single',options:['Darbo dieną 18:00','Šeštadienį 11:00']}],responses:[{residentId:101,houseId:1,date:'2026-11-16T09:00:00',answers:[{questionId:'q-time',value:['Darbo dieną 18:00']}]},{residentId:102,houseId:1,date:'2026-11-16T13:00:00',answers:[{questionId:'q-time',value:['Darbo dieną 18:00']}]}]}
];
window.GI_SEED.feedback=[
 {id:'feedback-door',houseId:1,residentId:101,name:'Aistė Petrauskienė',apt:'12',title:'Neužsidaro laiptinės durys',text:'Sveiki, laiptinės durys nebeužsidaro iki galo. Dėl to į laiptinę patenka šaltas oras. Prašau patikrinti durų pritraukėją.',photos:[],status:'new',date:'2026-11-24T08:15:00',messageId:null,replies:[]},
 {id:'feedback-water',houseId:2,residentId:201,name:'Tomas Jakštas',apt:'4',title:'Dėl karšto vandens tiekimo',text:'Po atliktų darbų karštas vanduo vis dar vos šiltas. Ar galėtumėte patikslinti, kada tiekimas bus visiškai atstatytas?',photos:[],status:'inprogress',date:'2026-11-23T15:20:00',messageId:'demo-history-3',replies:[{text:'Dėkojame, informaciją perdavėme prižiūrėtojui. Patikrinsime sistemą ir pranešime apie rezultatą.',sender:'Aistė Kazlauskaitė',date:'2026-11-23T16:05:00'}]},
 {id:'feedback-lamp',houseId:3,residentId:301,name:'Jolanta Petraitienė',apt:'7',title:'Neveikia šviestuvas prie įėjimo',text:'Prie pagrindinio įėjimo nebešviečia lauko šviestuvas. Vakare sunku matyti laiptelius.',photos:[],status:'done',date:'2026-11-21T17:10:00',messageId:null,replies:[{text:'Šviestuvas pakeistas. Ačiū, kad pranešėte!',sender:'Eglė Janulytė',date:'2026-11-22T11:30:00'}]}
];

const demoFormTokens=["1e820316-4575-43c4-a455-c24792c039a4", "30c6d2d0-4bdd-4ea8-b97b-bbd3b1cbdc80", "e32a0494-c2c4-47bd-8d55-3969cd8e6453", "88d3946f-ce70-4f3a-8f3f-65dfe5f317ef", "9e8e23b6-2bc1-4e46-bdec-d02ffa2f6fe9", "58cdeacd-236c-4956-b4f7-ab8c3700df7d", "d2062412-c097-475a-9001-8264053f8f2f", "1dd70aa4-21c6-4612-af72-131b4393a936", "159c3c98-2980-42cd-a02e-adde79ac0bed", "5043be1c-715d-412c-8a60-73abfa0b7014", "1c2f2ccc-6154-44ad-b255-78fbd5cfd038", "dd8c234d-c586-48f3-a332-4d2ed430d0b1", "9a7bcc12-f50a-4f08-8e84-7c86f65fec98", "b58cf6cd-cba6-4b27-b997-62f1abfc2279", "72829a64-432d-4974-91ad-db17073f1b62", "883863f6-84b6-444b-be72-ad84efa45b9c"];
window.GI_SEED.houses.flatMap(h=>h.residents).forEach((r,i)=>r.formToken=demoFormTokens[i]);
