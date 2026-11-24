import {clean, validateContact, houseKey, personKey, planImport} from './domain.js';

const STORAGE_KEY='gyventoju-info-apklausos-demo-v1';
const same=(a,b)=>String(a)===String(b);
const clone=value=>JSON.parse(JSON.stringify(value));
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
class AppError extends Error{constructor(message,status=400){super(message);this.status=status}}
const fail=(message,status=400)=>{throw new AppError(message,status)};

function readStore(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(saved?.state&&Number.isInteger(saved.revision)){
      let changed=false;const fixtures=window.GI_SEED.houses.flatMap(h=>h.residents);
      saved.state.houses.flatMap(h=>h.residents).forEach(r=>{if(!r.formToken){r.formToken=fixtures.find(f=>same(f.id,r.id))?.formToken||crypto.randomUUID();changed=true}});
      if(changed)writeStore(saved);return saved;
    }
  }catch{}
  const initial={revision:0,state:clone(window.GI_SEED)};
  localStorage.setItem(STORAGE_KEY,JSON.stringify(initial));
  return initial;
}
function writeStore(store){localStorage.setItem(STORAGE_KEY,JSON.stringify(store))}
const canSee=(user,id)=>user.role==='admin'||user.houseIds.some(x=>same(x,id));
function currentUser(state,headers){
  const preview=headers.get('X-Demo-User');
  return state.users.find(u=>same(u.id,preview))||state.users[0];
}
function scope(state,user,revision){
  const houses=state.houses.filter(h=>canSee(user,h.id));
  const history=state.history.map(h=>({...h,recipients:h.recipients.filter(r=>canSee(user,r.houseId))})).filter(h=>h.recipients.length).map(h=>({...h,houseIds:[...new Set(h.recipients.map(r=>r.houseId))],count:h.recipients.length}));
  return {revision,houses,history,users:user.role==='admin'?state.users:[],currentUser:user,canPreview:true,previewUsers:state.users.map(({id,name,role})=>({id,name,role})),surveys:(state.surveys||[]).filter(s=>s.houseIds.some(id=>canSee(user,id))).map(s=>({...s,houseIds:s.houseIds.filter(id=>canSee(user,id)),responses:s.responses.filter(r=>canSee(user,r.houseId))})),feedback:(state.feedback||[]).filter(f=>canSee(user,f.houseId)),personalDemo:true};
}
const admin=user=>{if(user.role!=='admin')fail('Šį veiksmą gali atlikti tik administratorius.',403)};
function getHouse(state,id,user){const house=state.houses.find(h=>same(h.id,id));if(!house||!canSee(user,id))fail('Objektas nepasiekiamas.',403);return house}
function contactFrom(payload){
  const resident={apt:clean(payload.apt),name:clean(payload.name),phone:clean(payload.phone),email:clean(payload.email).toLowerCase()};
  const error=validateContact(resident);if(error)fail(error);return resident;
}
function mutate(state,user,body){
  const p=body.payload||{};
  switch(body.action){
    case 'house.save':{
      admin(user);const item={street:clean(p.street),number:clean(p.number),city:clean(p.city),apartments:Number(p.apartments)};
      if(!item.street||!item.number||!item.city||!Number.isInteger(item.apartments)||item.apartments<1)fail('Patikrinkite adresą ir butų skaičių.');
      if(state.houses.some(h=>houseKey(h)===houseKey(item)&&!same(h.id,p.id)))fail('Toks objektas jau yra registre.');
      if(p.id)Object.assign(getHouse(state,p.id,user),item);else state.houses.unshift({id:crypto.randomUUID(),...item,active:true,residents:[]});break;
    }
    case 'house.delete':{
      admin(user);getHouse(state,p.id,user);state.houses=state.houses.filter(h=>!same(h.id,p.id));state.users.forEach(u=>u.houseIds=u.houseIds.filter(id=>!same(id,p.id)));break;
    }
    case 'contact.save':{
      admin(user);const house=getHouse(state,p.houseId,user),resident=contactFrom(p);
      if(house.residents.some(r=>personKey(r)===personKey(resident)&&!same(r.id,p.id)))fail('Šis gyventojas jau yra šiame bute.');
      if(p.id){const existing=house.residents.find(r=>same(r.id,p.id));if(!existing)fail('Kontaktas neberastas.',409);Object.assign(existing,resident)}else house.residents.push({id:crypto.randomUUID(),formToken:crypto.randomUUID(),...resident});break;
    }
    case 'contact.delete':{
      admin(user);const house=getHouse(state,p.houseId,user);house.residents=house.residents.filter(r=>!same(r.id,p.id));break;
    }
    case 'user.save':{
      admin(user);const name=clean(p.name),email=clean(p.email).toLowerCase(),role=p.role;
      if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!['admin','employee'].includes(role))fail('Patikrinkite naudotojo vardą, el. paštą ir rolę.');
      if(state.users.some(u=>u.email.toLowerCase()===email&&!same(u.id,p.id)))fail('Naudotojas tokiu el. paštu jau yra.');
      const houseIds=Array.isArray(p.houseIds)?[...new Set(p.houseIds.map(String))]:[];
      const item={name,email,role,houseIds:role==='admin'?[]:houseIds};
      if(p.id){const existing=state.users.find(u=>same(u.id,p.id));if(!existing)fail('Naudotojas neberastas.',409);Object.assign(existing,item)}else state.users.push({id:crypto.randomUUID(),...item});break;
    }
    case 'import':{
      admin(user);const plan=planImport(p.rows,state.houses);if(plan.errors.length)fail(`Importas neatliktas. Eilutė ${plan.errors[0].row}: ${plan.errors[0].message}`);
      if(!plan.newContacts)fail('Naujų kontaktų nėra. Visi įrašai jau egzistuoja.');state.houses=plan.houses;state.houses.flatMap(h=>h.residents).forEach(r=>r.formToken||=crypto.randomUUID());return {newHouses:plan.newHouses,newContacts:plan.newContacts,skipped:plan.skipped};
    }
    case 'survey.save':{
      const houseIds=[...new Set((p.houseIds||[]).map(String))];
      if(!clean(p.title)||!houseIds.length||!p.questions?.length)fail('Įrašykite pavadinimą, klausimus ir pasirinkite objektus.');
      houseIds.forEach(id=>{if(!getHouse(state,id,user).active)fail('Pasirinkite administruojamus objektus.');});
      if(!/^\d{4}-\d{2}-\d{2}$/.test(p.deadline)||new Date(p.deadline+'T23:59:59')<new Date())fail('Pasirinkite būsimą apklausos pabaigos datą.');
      const questions=p.questions.map(q=>{
        const type=q.type,options=[...new Set((q.options||[]).map(clean).filter(Boolean))];
        if(!clean(q.title)||!['single','multiple','text'].includes(type)||type!=='text'&&options.length<2)fail('Kiekvienam klausimui įrašykite tekstą ir bent du skirtingus pasirinkimus.');
        return {id:crypto.randomUUID(),title:clean(q.title),type,options:type==='text'?[]:options};
      });
      state.surveys||=[];state.surveys.unshift({id:crypto.randomUUID(),title:clean(p.title),description:clean(p.description),houseIds,questions,deadline:p.deadline,status:'active',created:new Date().toISOString(),responses:[]});break;
    }
    case 'survey.close':{
      const s=state.surveys?.find(s=>same(s.id,p.id));if(!s||!s.houseIds.every(id=>canSee(user,id)))fail('Apklausa nepasiekiama.',403);s.status='closed';break;
    }
    case 'survey.vote':{
      const s=state.surveys?.find(s=>same(s.id,p.id));if(!s||s.status!=='active'||new Date(s.deadline+'T23:59:59')<new Date())fail('Apklausa jau baigta.');
      const house=getHouse(state,p.houseId,user),resident=house.residents.find(r=>same(r.id,p.residentId));
      if(!resident||!s.houseIds.some(id=>same(id,house.id)))fail('Ši apklausa šiam gyventojui nepriskirta.',403);
      if(s.responses.some(r=>same(r.residentId,resident.id)))fail('Šio gyventojo atsakymas jau pateiktas.');
      const answers=s.questions.map(q=>{
        const a=p.answers?.[q.id];
        if(q.type==='text'){if(!clean(a)||clean(a).length>2000)fail('Atsakykite į visus klausimus (iki 2000 simbolių).');return {questionId:q.id,value:clean(a)}}
        const values=Array.isArray(a)?a:[];
        if(!values.length||q.type==='single'&&values.length!==1||values.some(v=>!q.options.includes(v)))fail('Pasirinkite atsakymus į visus klausimus.');
        return {questionId:q.id,value:[...new Set(values)]};
      });s.responses.push({residentId:resident.id,houseId:house.id,date:new Date().toISOString(),answers});break;
    }
    case 'feedback.create':{
      const house=getHouse(state,p.houseId,user),resident=house.residents.find(r=>same(r.id,p.residentId));
      if(!resident||!house.active)fail('Pasirinkite gyventoją iš administruojamo objekto.');
      if(!clean(p.title)||!clean(p.text)||clean(p.text).length>3000)fail('Įrašykite žinutės temą ir tekstą (iki 3000 simbolių).');
      const photos=p.photos||[];if(photos.length>4||photos.some(f=>!/^data:image\/(jpeg|png|webp);base64,/.test(f.data)||f.data.length>500000))fail('Pridėkite iki 4 tinkamų nuotraukų.');
      let related=null;if(p.messageId){related=state.history.find(m=>same(m.id,p.messageId)&&m.recipients.some(r=>same(r.id,resident.id)));if(!related)fail('Susietas pranešimas nepasiekiamas.');}
      state.feedback||=[];state.feedback.unshift({id:crypto.randomUUID(),houseId:house.id,residentId:resident.id,name:resident.name,apt:resident.apt,title:clean(p.title),text:clean(p.text),photos,status:'new',date:new Date().toISOString(),messageId:related?.id||null,replies:[]});break;
    }
    case 'feedback.update':{
      const f=state.feedback?.find(f=>same(f.id,p.id));if(!f)fail('Žinutė nerasta.');getHouse(state,f.houseId,user);
      if(!['new','inprogress','done'].includes(p.status))fail('Pasirinkite būseną.');f.status=p.status;
      if(clean(p.reply)){if(clean(p.reply).length>3000)fail('Atsakymas per ilgas.');f.replies.push({text:clean(p.reply),date:new Date().toISOString(),sender:user.name});}break;
    }
    case 'message.demo':{
      const channel=p.channel;if(!['sms','email','both'].includes(channel))fail('Pasirinkite siuntimo kanalą.');
      const sms=clean(p.sms),emailText=clean(p.emailText),subject=clean(p.subject);if(channel!=='email'&&!sms)fail('Įrašykite SMS tekstą.');if(channel!=='sms'&&(!subject||!emailText))fail('Įrašykite el. laiško temą ir tekstą.');
      const requested=new Set((p.recipientIds||[]).map(String));if(!requested.size)fail('Pasirinkite gavėjus.');
      const recipients=state.houses.filter(h=>h.active&&canSee(user,h.id)).flatMap(h=>h.residents.filter(r=>requested.has(String(r.id))).map(r=>({...r,houseId:h.id,address:`${h.street} ${h.number}, ${h.city}`,channels:[...(channel!=='email'&&r.phone?['sms']:[]),...(channel!=='sms'&&r.email?['email']:[])]})));
      if(recipients.length!==requested.size)fail('Dalis gavėjų nepasiekiama. Patikrinkite pasirinkimą.',403);
      const messageId=crypto.randomUUID();recipients.forEach(r=>{const u=new URL('./gyventojui.html',location.href);u.hash=new URLSearchParams({token:r.formToken,...(p.surveyId?{survey:p.surveyId}:{message:messageId})});r.formUrl=u.href;const substitute=t=>t.replace(/https?:\/\/[^\s]+#survey=[^\s]+&token=\{asmenine-nuoroda\}/g,u.href);r.sms=substitute(sms);r.emailText=substitute(emailText);if(!p.surveyId){r.sms+=`\nAtsakyti: ${u.href}`;r.emailText+=`\n\nAtsakyti ir pridėti nuotraukų: ${u.href}`;}});
      state.history.unshift({id:messageId,date:new Date().toISOString(),subject:channel==='sms'?'SMS pranešimas':subject,sms:channel==='email'?'':sms,emailText:channel==='sms'?'':emailText,text:channel==='email'?emailText:sms,channel,mode:'demo',sender:user.name,houseIds:[...new Set(recipients.map(r=>r.houseId))],recipients,count:recipients.length});break;
    }
    default:fail('Nežinomas veiksmas.');
  }
  return {};
}

function residentRequest(store,init){
 const body=JSON.parse(init.body||'{}');
 const house=store.state.houses.find(h=>h.active&&h.residents.some(r=>r.formToken===body.token));
 const resident=house?.residents.find(r=>r.formToken===body.token);
 if(!resident)fail('Ši nuoroda negalioja. Paprašykite administratoriaus naujos nuorodos.',404);
 const survey=body.survey?store.state.surveys?.find(s=>same(s.id,body.survey)&&s.houseIds.some(id=>same(id,house.id))):null;
 const message=body.message?store.state.history.find(m=>same(m.id,body.message)&&m.recipients.some(r=>same(r.id,resident.id))):null;
 if(body.survey&&!survey||body.message&&!message)fail('Forma pagal šią nuorodą nepasiekiama.',404);
 if(body.action){
   if(body.revision!==store.revision)fail('Duomenys pasikeitė. Atnaujinkite formą ir bandykite dar kartą.',409);
   if(!['feedback.create','survey.vote'].includes(body.action)||body.action==='survey.vote'&&!survey)fail('Veiksmas nepasiekiamas.',403);
   const payload={...(body.payload||{}),houseId:house.id,residentId:resident.id,id:survey?.id,messageId:message?.id};
   mutate(store.state,{role:'employee',houseIds:[house.id]}, {action:body.action,payload});
   store.revision++;writeStore(store);
 }
 return json({revision:store.revision,address:`${house.street} ${house.number}`,apt:resident.apt,survey:survey?{id:survey.id,title:survey.title,description:survey.description,deadline:survey.deadline,status:survey.status,questions:survey.questions,answered:survey.responses.some(r=>same(r.residentId,resident.id))}:null,message:message?{subject:message.subject,text:message.emailText||message.text||message.sms}:null,submitted:!!body.action});
}

const nativeFetch=window.fetch.bind(window);
window.fetch=async(input,init={})=>{
  const url=new URL(typeof input==='string'?input:input.url,location.href);
  if(!['/api/state','/api/action','/api/resident'].includes(url.pathname))return nativeFetch(input,init);
  try{
    const headers=new Headers(init.headers||{}),store=readStore(),user=currentUser(store.state,headers);
    if(url.pathname==='/api/resident')return residentRequest(store,init);
    if(url.pathname==='/api/state')return json(scope(store.state,user,store.revision));
    const body=JSON.parse(init.body||'{}');if(body.revision!==store.revision)fail('Duomenys pasikeitė kitame lange. Atnaujinkite ir bandykite dar kartą.',409);
    const result=mutate(store.state,user,body);store.revision+=1;writeStore(store);
    return json({...scope(store.state,currentUser(store.state,headers),store.revision),result});
  }catch(error){return json({error:error instanceof AppError?error.message:'Nepavyko įkelti arba išsaugoti duomenų.'},error.status||500)}
};

await import(document.body.dataset.residentForm?'./resident.js':'./app.js');

