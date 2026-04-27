// ─────────────────────────────────────────────────
//  QUESTION GENERATION  (loaded before main script)
//  Globals used at call-time: S, ANIMALS
// ─────────────────────────────────────────────────

// ── Shared utilities (also used by main script) ──
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }

// ── Question content data ──
const CRTRS=[
    {n:'lions',e:'🦁'},{n:'penguins',e:'🐧'},{n:'monkeys',e:'🐒'},{n:'giraffes',e:'🦒'},
    {n:'elephants',e:'🐘'},{n:'tigers',e:'🐯'},{n:'pandas',e:'🐼'},{n:'flamingos',e:'🦩'},
    {n:'zebras',e:'🦓'},{n:'hippos',e:'🦛'},{n:'gorillas',e:'🦍'},{n:'rhinos',e:'🦏'},
];
const FOODS=['fish','bananas','apples','carrots','peanuts','bamboo shoots','watermelons'];

// ── Standard question makers (levels 1–3) ──
function makeAdd(lv){
    const hi=lv<=1?20:lv<=2?50:99;
    const tier=lv<=1?1:2;  // earnTier: 1=$6, 2=$12
    const a=rnd(5,hi), b=rnd(3,Math.max(3,hi-a));
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'➕ Addition', opType:'add', answer:a+b, a, b, earnTier:tier, text:pick([
        `Your zoo has ${a} ${c.e} ${c.n}. A wildlife truck delivers ${b} more today! How many ${c.n} do you have now?`,
        `The morning keeper count shows ${a} ${c.e} ${c.n} in the north enclosure and ${b} in the new habitat. How many total?`,
        `You prepared ${a} portions of ${f} for the morning feed and ${b} more for the afternoon. How many portions in all?`,
        `The east gate counted ${a} visitors and the west gate counted ${b}. How many visitors entered today?`,
        `You earned $${a} from ticket sales and $${b} from the souvenir stand. How much did the zoo earn?`,
        `Your zoo rescued ${a} animals this month and a partner reserve sent ${b} more. How many rescues total?`,
        `The gift shop had ${a} plush toys and received a delivery of ${b} more. How many are in stock?`,
    ])};
}
function makeSub(lv){
    const hi=lv<=1?25:lv<=2?60:99;
    const tier=lv<=1?1:2;
    const b=rnd(2,Math.floor(hi/2));
    const a=b+rnd(3,hi-b);
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'➖ Subtraction', opType:'sub', answer:a-b, a, b, earnTier:tier, text:pick([
        `Your zoo had ${a} ${c.e} ${c.n}. ${b} were transferred to a conservation reserve. How many remain?`,
        `You had $${a} in the feeding budget. You spent $${b} on ${f}. How much budget is left?`,
        `${a} visitors were enjoying the zoo. ${b} left after the afternoon show. How many are still here?`,
        `The food store had ${a} bags of ${f}. The keepers used ${b} bags during feeding. How many bags are left?`,
        `Your zoo needs $${a} to sponsor a new animal. You've raised $${b} so far. How much more is needed?`,
        `The enclosure started with ${a} ${c.e} ${c.n}. ${b} were moved to the breeding program. How many are left?`,
        `${a} kg of ${f} was delivered this morning. The animals ate ${b} kg at feeding time. How many kg remain?`,
    ])};
}
function makeMul(lv){
    // lv 1=tiny (≤5×5), lv 2=small (≤7×7), lv 3+=medium (≤9×10)
    const mA=lv<=1?5:lv<=2?7:9, mB=lv<=1?5:lv<=2?7:10;
    const a=rnd(2,mA), b=rnd(2,mB);
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'✖️ Multiplication', opType:'mul', answer:a*b, a, b, earnTier:1, text:pick([
        `You have ${a} enclosures, each housing ${b} ${c.e} ${c.n}. How many ${c.n} in total?`,
        `Each ${c.n.slice(0,-1)} eats ${b} portions of ${f} per day. You have ${a} of them. How many portions do you need daily?`,
        `Each of ${a} feeding stations needs ${b} kg of food stocked up. How many kg do you need in total?`,
        `A zoo ticket costs $${b}. A school group of ${a} students visits. How much do you collect?`,
        `Your ${a} keepers each look after ${b} animals today. How many animals are being cared for?`,
        `The zoo train makes ${a} trips, carrying ${b} passengers each time. How many passengers in total?`,
        `Each of ${a} animal exhibits needs ${b} buckets of water today. How many buckets in all?`,
    ])};
}
function makeDiv(){
    const div=rnd(2,9), quo=rnd(2,9), dvd=div*quo;
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'➗ Division', opType:'div', answer:quo, a:dvd, b:div, earnTier:2, text:pick([
        `You have ${dvd} ${c.e} ${c.n} to place equally into ${div} enclosures. How many per enclosure?`,
        `${dvd} kg of ${f} must be split equally among ${div} feeding stations. How many kg per station?`,
        `You have ${dvd} animals to assign equally to ${div} keepers on duty. How many animals per keeper?`,
        `The zoo earned $${dvd} evenly across ${div} days of the festival. How much per day?`,
        `A delivery of ${dvd} enrichment toys must be shared equally across ${div} animal zones. How many per zone?`,
        `${dvd} school children are split equally into ${div} tour groups. How many children per group?`,
    ])};
}

// ── Medium-difficulty 2-digit add/sub with carrying/borrowing ($12) ──
function makeMedAdd(){
    let a,b;
    do { a=rnd(14,58); b=rnd(13,39); } while((a%10)+(b%10)<10);
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'➕ Addition ★', opType:'add', answer:a+b, a, b, earnTier:2, text:pick([
        `Your zoo has ${a} ${c.e} ${c.n}. A wildlife rescue truck delivers ${b} more! How many do you have now?`,
        `${a} school children visited in the morning, then ${b} more arrived after lunch. How many students visited in all?`,
        `You received ${a} kg of ${f} from one supplier and ${b} kg from another. How many kg total?`,
        `The zoo raised $${a} from ticket sales and $${b} from the gift shop today. How much altogether?`,
        `The north enclosure holds ${a} animals and the new south habitat holds ${b}. How many animals in total?`,
        `Your veterinary team completed ${a} health checks in the morning and ${b} in the afternoon. How many in all?`,
        `The morning shift counted ${a} visitors and the afternoon shift counted ${b}. What is the day's total?`,
    ])};
}
function makeMedSub(){
    let a,b;
    do { b=rnd(13,39); a=b+rnd(11,35); } while((a%10)>=(b%10));
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'➖ Subtraction ★', opType:'sub', answer:a-b, a, b, earnTier:2, text:pick([
        `Your zoo had ${a} ${c.e} ${c.n}. ${b} were transferred to a wildlife reserve. How many are left?`,
        `You had $${a} in the animal care budget. Vet treatment cost $${b}. How much remains?`,
        `${a} visitors were enjoying the zoo. ${b} left early to catch the bus. How many stayed?`,
        `You had ${a} bags of ${f} in storage. After the feeding rounds, ${b} bags were used. How many remain?`,
        `The zoo started the week with $${a}. After buying enrichment equipment for $${b}, how much is left?`,
        `The enclosure had ${a} ${c.e} ${c.n}. ${b} were moved to the breeding sanctuary. How many remain?`,
    ])};
}

// ── Level 4: 3-digit arithmetic with carrying/borrowing ──
function makeHardAdd(){
    // Ensure carrying occurs in at least one column
    let a, b;
    do { a=rnd(112,499); b=rnd(108,499); } while((a%10)+(b%10)<10 && Math.floor(a/10)%10+Math.floor(b/10)%10<10);
    const c=pick(CRTRS);
    return { tag:'➕ Addition ★★', opType:'add', answer:a+b, a, b, earnTier:3, text:pick([
        `The north zone of your zoo houses ${a} ${c.e} ${c.n} and the south zone has ${b}. How many total?`,
        `${a} visitors came on Saturday and ${b} on Sunday. How many people visited over the weekend?`,
        `The zoo spent $${a} on nutrition supplies and $${b} on veterinary care this month. What is the total cost?`,
        `The zoo raised $${a} from ticket sales and $${b} from the conservation gala. How much in total?`,
        `Your zoo logged ${a} animal health checks in spring and ${b} in summer. How many checks total?`,
        `The feed warehouse received ${a} kg of produce on Monday and ${b} kg on Wednesday. Total kg received?`,
    ])};
}
function makeHardSub(){
    // Ensure borrowing is required (ones or tens digit of a < b)
    let a, b;
    do { b=rnd(101,350); a=b+rnd(50,350); } while((a%10)>=(b%10) && Math.floor(a/10)%10>=Math.floor(b/10)%10);
    const c=pick(CRTRS);
    return { tag:'➖ Subtraction ★★', opType:'sub', answer:a-b, a, b, earnTier:3, text:pick([
        `Your zoo had ${a} ${c.e} ${c.n}. After transferring ${b} to a partner conservation park, how many remain?`,
        `The zoo's monthly budget was $${a}. After spending $${b} on new enclosure upgrades, how much is left?`,
        `${a} visitors bought tickets. ${b} used free conservation passes. How many paid full price?`,
        `The feed warehouse stored ${a} kg of animal feed. After this week's nutrition program, ${b} kg was used. How much remains?`,
        `Your zoo's annual visitor target is ${a}. You've welcomed ${b} guests so far. How many more to reach the goal?`,
        `The enrichment program budget was $${a}. After purchasing habitat items costing $${b}, what remains?`,
    ])};
}
function makeHardMul(){
    // 2-digit × 1-digit requiring regrouping
    const a=rnd(12,35), b=rnd(4,9);
    const c=pick(CRTRS), f=pick(FOODS);
    return { tag:'✖️ Multiplication ★★', opType:'mul', answer:a*b, a, b, earnTier:3, text:pick([
        `You have ${a} enclosures, each home to ${b} ${c.e} ${c.n}. How many ${c.n} in total?`,
        `Each of ${a} animals on the nutrition plan needs ${b} kg of ${f} per week. How many kg in total?`,
        `The zoo train makes ${a} runs today, each carrying ${b} passengers. How many riders in total?`,
        `A zookeeper earns $${b} per hour and worked ${a} hours this month. What are their total earnings?`,
        `Each of ${a} animal zones needs ${b} enrichment activities set up this week. How many activities in total?`,
        `You take ${a} school tour groups around the zoo, each with ${b} students. How many students in total?`,
    ])};
}

// ── Fraction questions (always produces a whole-number answer) ──
function makeFraction(diff){
    const c=pick(CRTRS), f=pick(FOODS);
    const pool=[];

    // Type A: 1/d of a whole → answer = whole/d (integer)
    const denoms = diff>=3 ? [2,3,4,5,6,8,10] : diff>=2 ? [2,3,4,5,10] : [2,4,5,10];
    const denom  = pick(denoms);
    const quot   = rnd(2, diff<=1?6:diff<=2?10:15);
    const whole  = denom * quot;
    pool.push({ tag:'½ Fractions', opType:'frac', answer:quot, a:whole, b:denom,
        earnTier: diff<=1?1:2,
        text:pick([
            `Your zoo has ${whole} ${c.e} ${c.n}. You feed 1/${denom} of them in the morning. How many ${c.n} get morning food?`,
            `There are ${whole} portions of ${f} in the store. The keeper takes 1/${denom} for the first enclosure. How many portions is that?`,
            `${whole} visitors are at the zoo. 1/${denom} of them join the keeper tour. How many visitors go on the tour?`,
            `The vet has ${whole} health checks booked. 1/${denom} are for ${c.e} ${c.n}. How many ${c.n} checks are there?`,
        ]),
        choices:_convChoices(quot, whole, denom, quot+denom),
    });

    // Type B: find the value of one fractional part
    // "You split 20 kg into d equal parts. How many kg in each part?" → 20/d
    {
        const denom2 = pick(diff>=3?[3,4,5,6,8]:[2,4,5,10]);
        const partSize = rnd(2, diff<=1?8:diff<=2?12:18);
        const totalAmt = denom2 * partSize;
        pool.push({ tag:'½ Fractions', opType:'frac', answer:partSize, a:totalAmt, b:denom2,
            earnTier: diff<=1?1:2,
            text:pick([
                `You divide ${totalAmt} kg of ${f} equally into ${denom2} daily feeds. How many kg is each feed?`,
                `${totalAmt} ${c.e} ${c.n} are split equally across ${denom2} enclosures. How many per enclosure?`,
                `The zoo earns $${totalAmt} over ${denom2} days equally. How much per day?`,
                `${totalAmt} enrichment toys are shared equally among ${denom2} zones. How many toys per zone?`,
            ]),
            choices:_convChoices(partSize, totalAmt, totalAmt+denom2, denom2),
        });
    }

    return pick(pool);
}

// ── Multi-step problems (two operations in sequence) ──
function makeMultiStep(diff){
    const c=pick(CRTRS), c2=pick(CRTRS), f=pick(FOODS);
    const pool=[];
    const mA=diff<=1?4:diff<=2?6:8, mB=diff<=1?4:diff<=2?6:8;

    // Type A: (a × b) + c — multiply then add
    {
        let a,b,extra,ans;
        do { a=rnd(2,mA); b=rnd(2,mB); extra=rnd(1,diff<=1?8:15); ans=a*b+extra; } while(ans>180);
        pool.push({ tag:'🔢 Multi-step', opType:'multi', answer:ans, a, b,
            earnTier:2, _step1:a*b, _op1:'×', _op2:'+', _c:extra,
            text:pick([
                `${a} ${c.e} ${c.n} each eat ${b} kg of ${f} a day, plus ${extra} kg set aside for cubs. Total kg needed?`,
                `The keeper fills ${a} enclosures with ${b} animals each, then adds ${extra} animals to a rescue pen. How many animals in all?`,
                `Each of ${a} zoo trains carries ${b} passengers per trip. After the last run, ${extra} staff members board. How many people total?`,
            ]),
        });
    }

    // Type B: (a + b) × c — add then multiply
    {
        let a,b,mult,ans;
        do { a=rnd(2,8); b=rnd(1,6); mult=rnd(2,diff<=1?4:6); ans=(a+b)*mult; } while(ans>180);
        pool.push({ tag:'🔢 Multi-step', opType:'multi', answer:ans, a, b,
            earnTier:2, _step1:a+b, _op1:'+', _op2:'×', _c:mult,
            text:pick([
                `${a} ${c.e} ${c.n} and ${b} ${c2.e} ${c2.n} all need ${mult} kg of food each. How many kg altogether?`,
                `You have ${a} adult ${c.n} and ${b} young ${c.n}. Each needs $${mult} of care per day. Total daily cost?`,
                `${a} morning visitors and ${b} afternoon visitors each pay $${mult} entry. Total ticket money?`,
            ]),
        });
    }

    // Type C: a × b × c — three factors (diff 2+)
    if(diff>=2){
        let a,b,mult,ans;
        do { a=rnd(2,5); b=rnd(2,5); mult=rnd(2,4); ans=a*b*mult; } while(ans>180);
        pool.push({ tag:'🔢 Multi-step ★', opType:'multi', answer:ans, a, b,
            earnTier:3, _step1:a*b, _op1:'×', _op2:'×', _c:mult,
            text:pick([
                `You have ${a} zones, each with ${b} enclosures, each holding ${mult} ${c.e} ${c.n}. How many ${c.n} total?`,
                `The zoo runs ${a} shows a day for ${b} days, each with ${mult} ${c.e} ${c.n} performing. Total animal-performances?`,
                `${a} keepers each look after ${b} enclosures. Each enclosure needs ${mult} kg of ${f} daily. Total kg?`,
            ]),
        });
    }

    return pick(pool);
}

// ── Conversion questions (units: kg↔g, L↔mL, m↔cm, medicine dosing) ──
function _convChoices(correct, ...wrongs){
    // Build a set of 4 unique positive choices
    const pool=new Set([correct]);
    for(const w of wrongs){ if(w>0 && w!==correct) pool.add(w); }
    let pad=1;
    while(pool.size<4){ if(correct+pad!==correct) pool.add(correct+pad); pad++; }
    return shuffle([...pool]);
}
function makeConversion(diff){
    const pool=[];
    const c=pick(CRTRS), f=pick(FOODS);

    // ── kg → g (×1000) — all levels ───────────────────────────────────────
    {
        const kg=rnd(1, diff>=3?8:4);
        const ans=kg*1000;
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:2,
            convFact:'1 kg = 1 000 g',
            text:pick([
                `Your ${c.e} ${c.n.slice(0,-1)} needs ${kg} kg of ${f} today. The food dispenser measures in grams. How many grams do you need?`,
                `The vet ordered ${kg} kg of special feed pellets. Your kitchen scale shows grams. How many grams is that?`,
                `You're restocking ${kg} kg of ${f} for the enclosure. The container label asks for grams. How many grams?`,
            ]),
            choices:_convChoices(ans, kg*100, kg*10, kg),
        });
    }

    // ── L → mL (×1000) — all levels ───────────────────────────────────────
    {
        const L=rnd(1, diff>=3?6:3);
        const ans=L*1000;
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:2,
            convFact:'1 L = 1 000 mL',
            text:pick([
                `The vet needs ${L} litre${L>1?'s':''} of saline solution. The syringe is marked in millilitres. How many mL?`,
                `You need to add ${L} litre${L>1?'s':''} of vitamins to the water tank. The pump measures in mL. How many millilitres?`,
                `The cleaning team needs ${L} litre${L>1?'s':''} of disinfectant. Their spray bottle shows mL. How many mL?`,
            ]),
            choices:_convChoices(ans, L*100, L*10, L),
        });
    }

    // ── Medicine dosing: dose (mg/kg) × body weight — all levels ──────────
    {
        const wt=rnd(3, diff>=3?25:12);   // animal weight kg
        const mgPerKg=rnd(2,6);            // mg per kg
        const ans=wt*mgPerKg;
        const cA=pick(CRTRS);
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:3,
            convFact:`dose = ${mgPerKg} mg × weight in kg`,
            text:pick([
                `Your ${cA.e} ${cA.n.slice(0,-1)} weighs ${wt} kg. The pain medication needs ${mgPerKg} mg for every kg of body weight. How many mg should you give?`,
                `The vet prescribes ${mgPerKg} mg of antibiotic per kg of body weight. Your ${cA.e} ${cA.n.slice(0,-1)} weighs ${wt} kg. What is the correct dose in mg?`,
                `A vitamin supplement requires ${mgPerKg} mg per kg of body weight. Your ${cA.e} ${cA.n.slice(0,-1)} weighs ${wt} kg. How many mg in total?`,
            ]),
            choices:_convChoices(ans, wt+mgPerKg, Math.max(1,wt-mgPerKg), mgPerKg*2),
        });
    }

    // ── m → cm (×100) — diff 2+ ───────────────────────────────────────────
    if(diff>=2){
        const m=rnd(2, diff>=3?12:6);
        const ans=m*100;
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:2,
            convFact:'1 m = 100 cm',
            text:pick([
                `The new ${c.n.slice(0,-1)} enclosure needs a fence ${m} metres long. The supplier measures in centimetres. How many cm of fencing?`,
                `Your zoo's new habitat is ${m} metres wide. The builder needs the measurement in centimetres. How many cm?`,
                `A keeper needs ${m} metres of rope for the enrichment area. The rope is sold per centimetre. How many cm?`,
            ]),
            choices:_convChoices(ans, m*1000, m*10, m),
        });
    }

    // ── Minutes → seconds (×60) — diff 2+ ────────────────────────────────
    if(diff>=2){
        const mins=rnd(2, diff>=3?8:4);
        const ans=mins*60;
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:2,
            convFact:'1 min = 60 s',
            text:pick([
                `The automated feeder runs for ${mins} minute${mins>1?'s':''} per session. The timer counts in seconds. How many seconds is that?`,
                `The zoo train completes one loop in ${mins} minute${mins>1?'s':''} . How many seconds is that?`,
                `A keeper spends ${mins} minute${mins>1?'s':''} cleaning each habitat. The log records time in seconds. How many seconds?`,
            ]),
            choices:_convChoices(ans, mins*100, mins*6, mins*12),
        });
    }

    // ── "1 g per every X kg" dosing (÷) — diff 3+ ────────────────────────
    if(diff>=3){
        const ratio=rnd(2,5);                // 1 g per ratio kg
        const wt=ratio*rnd(2,6);             // weight is a clean multiple
        const ans=wt/ratio;                  // integer result
        const cA=pick(CRTRS);
        pool.push({ tag:'🔄 Conversion', opType:'conv', answer:ans, earnTier:3,
            convFact:`1 g per every ${ratio} kg`,
            text:pick([
                `Your ${cA.e} ${cA.n.slice(0,-1)} weighs ${wt} kg. The medication is 1 g per every ${ratio} kg of body weight. How many grams should you give?`,
                `A painkiller is dosed at 1 g per ${ratio} kg. Your ${cA.e} ${cA.n.slice(0,-1)} weighs ${wt} kg. What is the correct dose in grams?`,
            ]),
            choices:_convChoices(ans, wt*ratio, Math.max(1,ans-1), ans+ratio),
        });
    }

    return pick(pool);
}

// ── Economy question (uses player's actual zoo) ──
function makeEcon(){
    const ids=Object.keys(S.animals);
    if(!ids.length) return null;
    const id=pick(ids), a=ANIMALS.find(x=>x.id===id), cnt=S.animals[id];
    const cycles=rnd(2,5), useUpkeep=Math.random()<.5;
    if(useUpkeep){
        return { tag:'✖️ Multiplication', opType:'mul', answer:a.upkeep*cnt*cycles, a:a.upkeep*cnt, b:cycles,
            text:`Your ${cnt>1?cnt+' ':''}${a.emoji} ${a.name}${cnt>1?'s':''} cost${cnt===1?'s':''} $${a.upkeep} upkeep per cycle. How much total after ${cycles} cycles?` };
    } else {
        return { tag:'✖️ Multiplication', opType:'mul', answer:a.income*cnt*cycles, a:a.income*cnt, b:cycles,
            text:`Each of your ${cnt} ${a.emoji} ${a.name}${cnt>1?'s':''} earns $${a.income} in tickets per cycle. How much in ${cycles} cycles?` };
    }
}

// ── Zoo Emergency Challenges ──
function makeChallenge(){
    const lv=getLevelDifficulty();
    const ids=Object.keys(S.animals);
    const ra=ids.length>0 ? ANIMALS.find(x=>x.id===pick(ids)) : pick(ANIMALS);
    const pool=[];

    // 1. Sick animal — multiplication (level 2+)
    if(lv>=2){
        const dosePerKg=rnd(2,5), wt=rnd(30,180), ans=dosePerKg*wt;
        const cheap=rnd(25,50), exp=cheap+rnd(35,65);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'mul', answer:ans, a:dosePerKg, b:wt, isChallenge:true,
            situation:`🤒 Sick ${ra.name}!`,
            text:`🤒 ${ra.emoji} Your ${ra.name} is sick! The right medicine needs exactly ${dosePerKg} mg per kg of body weight. Your ${ra.name} weighs ${wt} kg. What is the total dosage in mg?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Correct dosage! Got the $${cheap} treatment — saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong dosage! Had to use the expensive $${exp} treatment.`,
        });
    }

    // 2. Escaped animals — subtraction (all levels)
    {
        const total=rnd(20,60), safe=rnd(8,total-5), escaped=total-safe;
        const cheap=rnd(20,40), exp=cheap+rnd(30,55);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'sub', answer:escaped, a:total, b:safe, isChallenge:true,
            situation:`🔍 Escape Alert!`,
            text:`🔍 Escape alert at the ${ra.emoji} ${ra.name} enclosure! You had ${total} animals. Keepers found ${safe} safe. How many are still missing?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Correct count! Targeted search cost just $${cheap}. Saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong count! Had to lock down the whole zoo — cost $${exp}.`,
        });
    }

    // 3. Emergency vet visit — addition (all levels)
    {
        const east=rnd(12,45), west=rnd(10,38), ans=east+west;
        const cheap=rnd(25,45), exp=cheap+rnd(30,55);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'add', answer:ans, a:east, b:west, isChallenge:true,
            situation:`🩺 Emergency Vet Visit`,
            text:`🩺 Emergency vet needed! East wing has ${east} animals, west wing has ${west}. Correct total = group discount ($${cheap}). Wrong total = expensive individual visits ($${exp}). How many animals need checking?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Right count! Group discount secured for $${cheap}. Saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong count! Individual vet visits cost $${exp} total.`,
        });
    }

    // 4. Emergency feeding — division (level 3+)
    if(lv>=3){
        const n=rnd(3,8), pp=rnd(4,9), total=n*pp;
        const cheap=rnd(15,35), exp=cheap+rnd(25,45);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'div', answer:pp, a:total, b:n, isChallenge:true,
            situation:`🥩 Emergency Feeding`,
            text:`🥩 Feeding crisis! You have ${total} kg of meat for ${n} ${ra.emoji} ${ra.name}s. Equal portions = efficient delivery ($${cheap}). Wrong amount = wasteful reorder ($${exp}). How many kg per ${ra.name}?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Perfect portions! Efficient delivery cost $${cheap}. Saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong portions! Wasteful reorder cost $${exp}.`,
        });
    }

    // 5. Heat wave — multiplication (level 2+)
    if(lv>=2){
        const tanks=rnd(3,9), lit=rnd(4,12), ans=tanks*lit;
        const cheap=rnd(20,40), exp=cheap+rnd(30,55);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'mul', answer:ans, a:tanks, b:lit, isChallenge:true,
            situation:`☀️ Heat Wave Crisis`,
            text:`☀️ Heat wave! ${tanks} animal water tanks each need ${lit} liters. Right answer = efficient pump ($${cheap}). Wrong = emergency truck ($${exp}). Total liters needed?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Exactly right! Efficient pump cost $${cheap}. Saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong amount! Emergency truck cost $${exp}.`,
        });
    }

    // 6. Storm damage (3-digit subtraction, level 4+)
    if(lv>=4){
        const a=rnd(150,450), b=rnd(80,200), ans=a-b;
        const cheap=rnd(35,65), exp=cheap+rnd(45,85);
        pool.push({ tag:'🚨 Zoo Emergency!', opType:'sub', answer:ans, a, b, isChallenge:true,
            situation:`🌪️ Storm Damage`,
            text:`🌪️ Storm hit! The enclosure held ${a} animals, but ${b} had to be evacuated. Correct shelter count = targeted repairs ($${cheap}). Wrong = full rebuild ($${exp}). How many animals stayed?`,
            correctCost:cheap, wrongCost:exp,
            correctOutcome:`✅ Precise count! Targeted repairs cost $${cheap}. Saved $${exp-cheap}!`,
            wrongOutcome:`❌ Wrong count! Full rebuild cost $${exp}.`,
        });
    }

    return pool.length>0 ? pick(pool) : null;
}

// ── Hint generator — called on wrong answer ──
function makeHint(q){
    const {opType,a,b,answer}=q;
    if(!opType||opType==='econ') return null;

    if(opType==='add'){
        const oA=a%10, oB=b%10, oSum=oA+oB;
        const tA=Math.floor(a/10)%10, tB=Math.floor(b/10)%10;
        if(a>=100||b>=100){
            const carry1=oSum>=10, carry2=(tA+tB+(carry1?1:0))>=10;
            const tip=carry1||carry2
                ? `Carrying needed! When a column adds to 10 or more, write the ones digit and carry 1 to the next column.`
                : `Add column by column, right to left: ones, tens, then hundreds.`;
            return { text:tip, work:buildAddWork(a,b), extra:conceptCard('add_carry') };
        }
        if(oSum>=10){
            const nl=makeNumberLine(a, b, answer, 'add');
            return { text:`Ones place: ${oA}+${oB}=${oSum} — that's 10 or more! Write the ${oSum%10}, carry 1 to the tens place.`, work:buildAddWork(a,b), extra:nl };
        }
        const nl=makeNumberLine(Math.max(a,b), Math.min(a,b), answer, 'add');
        return { text:`Try counting on from the bigger number: start at ${Math.max(a,b)}, count up ${Math.min(a,b)} more.`, work:null, extra:nl };
    }

    if(opType==='sub'){
        const oA=a%10, oB=b%10;
        const tA=Math.floor(a/10)%10, tB=Math.floor(b/10)%10;
        const needBorrow1=oA<oB;
        const tAeff=needBorrow1?tA-1:tA;
        const needBorrow2=tAeff<tB;
        if(needBorrow1||needBorrow2){
            const tip=`Regrouping (borrowing): ${oA} is smaller than ${oB}, so borrow 10 from the tens column → ${oA+10}−${oB}=${oA+10-oB}. Reduce the tens by 1!`;
            return { text:tip, work:buildSubWork(a,b), extra:a>=100?conceptCard('sub_borrow'):null };
        }
        if(a>=100)
            return { text:`Subtract column by column from right to left. Check each column — if top < bottom, regroup (borrow)!`, work:buildSubWork(a,b), extra:conceptCard('sub_borrow') };
        const nl=makeNumberLine(a, b, answer, 'sub');
        return { text:`Try counting up from ${b} to ${a}. How many steps did you take?`, work:null, extra:nl };
    }

    if(opType==='mul'){
        const small=Math.min(a,b), big=Math.max(a,b);
        const skip=[...Array(Math.min(big,8))].map((_,i)=>small*(i+1)).join(', ');
        if(big>10)
            return { text:`Break it apart: ${big}×${small} = (${Math.floor(big/10)*10}×${small}) + (${big%10}×${small}) = ${Math.floor(big/10)*10*small} + ${(big%10)*small} = ${a*b}.`, work:null, extra:conceptCard('mul_break') };
        return { text:`Skip-count by ${small}: ${skip}${big>8?'…':''} — stop when you've counted ${big} groups.`, work:null, extra:null };
    }

    if(opType==='div'){
        const skip=[...Array(Math.min(answer,8))].map((_,i)=>b*(i+1)).join(', ');
        return { text:`Think: what × ${b} = ${a}? Count up by ${b}: ${skip}${answer>8?'…':''} — stop when you reach ${a}!`, work:null, extra:null };
    }

    if(opType==='frac'){
        return { text:`Fractions mean equal sharing. To find 1/${q.b} of ${q.a}: divide ${q.a} ÷ ${q.b} = ${q.answer}.`,
            work:null,
            extra:`<div style="margin-top:8px;background:#fff3e0;border:2px solid #ffb74d;border-radius:10px;padding:10px 12px">
                <div style="font-weight:900;color:#e65100;font-size:.82em;margin-bottom:6px">🍕 Fractions = Equal Parts</div>
                <div style="font-size:.76em;color:#333;line-height:1.9">
                    1/${q.b} of ${q.a} = ${q.a} ÷ ${q.b} = <strong>${q.answer}</strong><br>
                    Think: split ${q.a} into ${q.b} equal groups — how many in each?
                </div>
            </div>` };
    }

    if(opType==='multi'){
        const s1=q._step1, op1=q._op1||'×', op2=q._op2||'+', extra=q._c;
        const step2desc = op2==='×' ? `${s1} × ${extra} = ${q.answer}` : `${s1} + ${extra} = ${q.answer}`;
        return { text:`Two-step problem! Solve it in two parts — one step at a time.`,
            work:null,
            extra:`<div style="margin-top:8px;background:#e8f5e9;border:2px solid #66bb6a;border-radius:10px;padding:10px 12px">
                <div style="font-weight:900;color:#2e7d32;font-size:.82em;margin-bottom:6px">📐 Two Steps</div>
                <div style="font-size:.76em;color:#333;line-height:1.9">
                    Step 1: ${q.a} ${op1} ${q.b} = <strong>${s1}</strong><br>
                    Step 2: ${step2desc}
                </div>
            </div>` };
    }

    if(opType==='conv'){
        const fact=q.convFact||'check the units!';
        return { text:`Unit conversion: ${fact}. Make sure you're multiplying or dividing by the right number!`, work:null,
            extra:`<div style="margin-top:8px;background:#e8f5e9;border:2px solid #81c784;border-radius:10px;padding:10px 12px">
                <div style="font-weight:900;color:#2e7d32;font-size:.82em;margin-bottom:6px">📏 Key Conversions</div>
                <div style="font-size:.76em;color:#333;line-height:1.8">
                    1 kg = 1 000 g<br>
                    1 L = 1 000 mL<br>
                    1 m = 100 cm<br>
                    1 min = 60 seconds<br>
                    Medicine dose = mg/kg × body weight
                </div>
            </div>` };
    }
    return null;
}

// ── Number line visual (for small numbers ≤ 25) ──
function makeNumberLine(from, steps, ans, op){
    const maxN=Math.max(from, ans)+1;
    if(maxN>25||from<0||ans<0) return null;
    const cells=[];
    for(let i=0;i<=maxN;i++){
        const isFrom=i===from, isAns=i===ans;
        const isPath=op==='add'?(i>from&&i<ans):(i>ans&&i<from);
        const bg=isFrom?'#42a5f5':isAns?'#4caf50':isPath?'#ffe082':'#f0f0f0';
        const bd=isFrom?'#1565c0':isAns?'#2e7d32':isPath?'#f9a825':'#ccc';
        cells.push(`<span style="display:inline-flex;flex-direction:column;align-items:center;margin:0 1px">
            <span style="font-size:.6em;height:11px;font-weight:700;color:${isFrom||isAns?'#333':'#aaa'}">${isFrom||isAns||isPath?i:''}</span>
            <span style="width:20px;height:20px;border-radius:50%;background:${bg};border:2px solid ${bd};display:inline-block;flex-shrink:0"></span>
        </span>`);
    }
    const dir=op==='add'?`Start at ${from}, hop forward ${steps}`:`Start at ${from}, hop back ${steps}`;
    return `<div style="margin-top:8px"><div style="font-size:.72em;font-weight:700;color:#555;margin-bottom:3px">🔢 Number line — ${dir}:</div>
        <div style="overflow-x:auto;white-space:nowrap;padding:2px 0">${cells.join('')}</div></div>`;
}

// ── Concept tip card (step-by-step method card) ──
function conceptCard(type){
    const cards={
        add_carry:{
            title:'📐 Column Addition with Carrying',
            steps:['Line up the numbers by place value (ones, tens, hundreds)',
                   'Start in the ONES column (right side)',
                   'If ones add to 10 or more → write the ones digit, carry 1 to tens',
                   'Add the TENS column + any carry',
                   'If tens ≥ 10 → write tens digit, carry 1 to hundreds',
                   'Add HUNDREDS column + any carry'],
        },
        sub_borrow:{
            title:'📐 Column Subtraction with Borrowing',
            steps:['Start in the ONES column (right side)',
                   'If top digit < bottom digit → BORROW from the tens column',
                   'Borrowing: top ones becomes (ones + 10), tens column shrinks by 1',
                   'Now subtract the ones column normally',
                   'Move to TENS column — check if you need to borrow from hundreds',
                   'Repeat until all columns done'],
        },
        mul_break:{
            title:'✖️ Breaking Apart to Multiply',
            steps:['Split the bigger number by place value',
                   'Example: 24 × 3 = (20 × 3) + (4 × 3)',
                   '         = 60 + 12 = 72',
                   'Multiply each part, then add them together'],
        },
    };
    const c=cards[type];
    if(!c) return '';
    return `<div style="margin-top:10px;background:#fffde7;border:2px solid #ffd740;border-radius:10px;padding:10px 12px">
        <div style="font-weight:900;color:#e65100;font-size:.82em;margin-bottom:6px">${c.title}</div>
        ${c.steps.map((s,i)=>`<div style="font-size:.76em;color:#333;margin:3px 0;display:flex;gap:6px;align-items:flex-start">
            <span style="background:#ff7043;color:#fff;border-radius:50%;min-width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:.7em;font-weight:900;flex-shrink:0">${i+1}</span>
            <span>${s}</span></div>`).join('')}
    </div>`;
}

// ── Column-arithmetic work-through builders ──
function pad(n,w){ return String(n).padStart(w,' '); }
function buildAddWork(a,b){
    const ans=a+b, w=Math.max(String(a).length,String(b).length,String(ans).length)+1;
    const oA=a%10,oB=b%10,oS=oA+oB,c1=oA+oB>=10?1:0;
    const tA=Math.floor(a/10)%10,tB=Math.floor(b/10)%10,tS=tA+tB+c1,c2=tS>=10?1:0;
    let carry='';
    if(c1||c2){ carry=(c2?'  1':' ')+' '+(c1?'1':' ')+'\n'; }
    return `${carry}  ${pad(a,w)}\n+ ${pad(b,w)}\n${'─'.repeat(w+2)}\n  ${pad(ans,w)}`;
}
function buildSubWork(a,b){
    const ans=a-b, w=Math.max(String(a).length,String(b).length,String(ans).length)+1;
    return `  ${pad(a,w)}\n- ${pad(b,w)}\n${'─'.repeat(w+2)}\n  ${pad(ans,w)}`;
}

// ── Difficulty tier from 10 levels (1=small, 2=medium, 3=large, 4=3-digit) ──
function getLevelDifficulty(){
    if(S.level<=2) return 1;
    if(S.level<=5) return 2;
    if(S.level<=8) return 3;
    return 4;
}

// ── Adaptive op selection ──
function pickOp(){
    // If in forced practice, return that type (only if it's still active)
    if(S.practiceLeft>0){
        S.practiceLeft--;
        if(S.activeOps.includes(S.practiceType)||S.practiceType==='div') return S.practiceType;
    }

    const diff=getLevelDifficulty();
    // User's selected ops are always honoured — activeOps is the primary pool
    const pool=[...S.activeOps];
    // Automatically add division at higher difficulties (not user-toggleable)
    if(diff>=3 && !pool.includes('div')){ pool.push('div'); }
    if(diff>=4 && !pool.includes('div')){ pool.push('div'); } // extra weight at diff 4
    // Conversion questions auto-added at diff 2+
    if(diff>=2){ pool.push('conv'); }
    // Fractions auto-added at diff 3+ (user can also toggle on earlier)
    if(diff>=3 && !pool.includes('frac')){ pool.push('frac'); }
    // Multi-step: opt-in only via toggle (stays user-controlled)
    if(!pool.length) pool.push('add'); // safety fallback

    // Adaptive weighting: push recently-wrong ops to practise more
    const counts={};
    for(const t of S.recentWrong) counts[t]=(counts[t]||0)+1;
    const weighted=[...pool];
    for(const [t,n] of Object.entries(counts)){
        if(pool.includes(t)){
            for(let i=0;i<Math.min(n,3);i++) weighted.push(t);
        }
    }
    return pick(weighted);
}

// ── Master question generator ──
function generateQuestion(){
    // Check for zoo emergency (~every 14-18 answered questions)
    // Counter always resets when it hits 0 — even with no animals — so it
    // never accumulates a large negative value that would front-load emergencies.
    S.nextChallenge--;
    if(S.nextChallenge<=0){
        S.nextChallenge=rnd(14,18);
        if(Object.keys(S.animals).length>0){
            const ch=makeChallenge();
            if(ch) return ch;
        }
    }
    // Economy question (player has animals, difficulty 2+)
    const diff=getLevelDifficulty();
    if(Object.keys(S.animals).length>0 && diff>=2 && Math.random()<.12){
        const eq=makeEcon(); if(eq) return eq;
    }

    // ── Cyclic difficulty: 2 easy → 5 medium → 4 hard → repeat (11-question cycle) ──
    // At higher player levels (diff 4+) the floor rises: easy→med, med→hard
    // Guard against NaN (e.g. corrupted save) by defaulting to 0
    if(typeof S.diffSlot !== 'number' || isNaN(S.diffSlot)) S.diffSlot = 0;
    const slot = S.diffSlot % 11;
    S.diffSlot = (S.diffSlot + 1) % 11;
    // Determine tier from slot, adjusted upward at higher levels
    let tier;
    if(slot < 2)      tier = diff >= 4 ? 'med'  : 'easy';
    else if(slot < 7) tier = diff >= 4 ? 'hard' : 'med';
    else              tier = 'hard';

    const op = pickOp();

    if(tier === 'hard'){
        if(op==='conv')  return makeConversion(diff);
        if(op==='frac')  return makeFraction(diff);
        if(op==='multi') return makeMultiStep(diff);
        if(op==='add')   return makeHardAdd();
        if(op==='sub')   return makeHardSub();
        if(op==='mul')   return makeHardMul();
        return makeDiv();
    }
    if(tier === 'med'){
        if(op==='conv')  return makeConversion(diff);
        if(op==='frac')  return makeFraction(diff);
        if(op==='multi') return makeMultiStep(diff);
        if(op==='add')   return makeMedAdd();
        if(op==='sub')   return makeMedSub();
        if(op==='mul')   return makeHardMul();
        return makeDiv();
    }
    // easy
    if(op==='conv')  return makeConversion(diff);
    if(op==='frac')  return makeFraction(diff);
    if(op==='multi') return makeMultiStep(diff);
    if(op==='add')   return makeAdd(diff);
    if(op==='sub')   return makeSub(diff);
    if(op==='mul')   return makeMul(diff);
    return makeDiv();
}

// ── Work-step choice generator ──
// Returns 4 shuffled choices including the correct answer and plausible distractors
function _stepChoices(ans){
    const set=new Set([ans]);
    const spread=Math.max(1,Math.round(ans*0.12));
    const tries=[
        Math.floor(ans/10)*10,         // round to nearest 10 (common error)
        ans+spread, ans-spread,
        ans+spread*2, ans-spread*2,
        ans+1, ans-1,
        Math.round(ans*1.1), Math.round(ans*0.9),
    ];
    for(const v of tries){
        if(v>0 && v!==ans) set.add(v);
        if(set.size>=4) break;
    }
    let pad=1;
    while(set.size<4){ set.add(ans+pad); pad++; }
    return shuffle([...set]).slice(0,4);
}

// ── Interactive "Show Your Work" step generator ──
// Returns an array of step objects, or null if this question type doesn't need scaffolding.
// Each step: { prompt, answer, choices, tip }
function makeWorkSteps(q){
    if(!q || q.isChallenge || q.opType==='econ') return null;

    // ── 2-digit × 1-digit: distributive property ──
    if(q.opType==='mul' && q.a>=10 && q.a%10!==0){
        const a=q.a, b=q.b;
        const tens=Math.floor(a/10)*10, ones=a%10;
        const p1=tens*b, p2=ones*b;
        return [
            { prompt:`Step 1 of 3 — What is ${tens} × ${b}?`,
              answer:p1, choices:_stepChoices(p1),
              tip:`${tens} × ${b} = ${p1}` },
            { prompt:`Step 2 of 3 — What is ${ones} × ${b}?`,
              answer:p2, choices:_stepChoices(p2),
              tip:`${ones} × ${b} = ${p2}` },
            { prompt:`Step 3 of 3 — Add the parts: ${p1} + ${p2} = ?`,
              answer:q.answer, choices:_stepChoices(q.answer),
              tip:`${p1} + ${p2} = ${q.answer} ✅` },
        ];
    }

    // ── Multi-step problems: use existing _step1/_op1/_op2/_c fields ──
    if(q.opType==='multi' && q._step1!==undefined){
        const {a,b,_step1,_op1,_op2,_c,answer}=q;
        const step1Text=_op1==='×'
            ? `Step 1 of 2 — What is ${a} × ${b}?`
            : `Step 1 of 2 — What is ${a} + ${b}?`;
        const step2Text=_op2==='×'
            ? `Step 2 of 2 — Multiply the result: ${_step1} × ${_c} = ?`
            : `Step 2 of 2 — Add the extra: ${_step1} + ${_c} = ?`;
        return [
            { prompt:step1Text, answer:_step1, choices:_stepChoices(_step1),
              tip:`${a} ${_op1} ${b} = ${_step1}` },
            { prompt:step2Text, answer:answer, choices:_stepChoices(answer),
              tip:`${_step1} ${_op2} ${_c} = ${answer} ✅` },
        ];
    }

    return null;
}

// ── Answer choices (scale spread by answer magnitude) ──
function makeChoices(answer){
    const pool=new Set([answer]);
    // Scale spread so 3-digit answers get more spread-out distractors
    const spread=Math.max(1, Math.round(answer*0.09));
    const offsets=[-1,1,-2,2,-3,3,-5,5].map(o=>o*spread).sort(()=>Math.random()-.5);
    for(const d of offsets){
        if(answer+d>0) pool.add(answer+d);
        if(pool.size>=4) break;
    }
    while(pool.size<4) pool.add(answer+pool.size*spread+spread);
    return [...pool].sort(()=>Math.random()-.5);
}
