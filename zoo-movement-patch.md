# Zoo Math Adventure — Animal Movement Patch (lowest-LOE tier)

What this does: replaces the single generic bounce on every zoo animal with
13 movement archetypes (hop, waddle, flap, swim, slither, scurry, stomp,
gallop, swing, float, crawl, prowl, breathe). All 90 animals are mapped;
e.g. all 10 flying birds share `flap`.

Risk: very low. This only touches presentation:
- one new CSS block (paste into `<style>`)
- one new JS lookup table + one class added in `_encHtml`
- no changes to game logic, state, question pipeline, or economy

After applying, bump the service-worker `CACHE_NAME` in `sw.js`
(`zoo-math-v5` → `zoo-math-v6`) or players will keep seeing the old build
from cache.

---

## STEP 1 — CSS: paste right after the `.z-bob` rule (~line 219)

```css
/* ── Animal movement archetypes ──
   Applied as mv-<name> on the .z-bob wrapper in _encHtml.
   Per-walker animation-delay/duration stay inline, so timing varies naturally. */
.z-bob.mv-hop     { animation-name: mvHop; }
.z-bob.mv-waddle  { animation-name: mvWaddle; transform-origin: center bottom; }
.z-bob.mv-flap    { animation-name: mvFlap; }
.z-bob.mv-swim    { animation-name: mvSwim; }
.z-bob.mv-slither { animation-name: mvSlither; }
.z-bob.mv-scurry  { animation-name: mvScurry; }
.z-bob.mv-stomp   { animation-name: mvStomp; transform-origin: center bottom; }
.z-bob.mv-gallop  { animation-name: mvGallop; }
.z-bob.mv-swing   { animation-name: mvSwing; transform-origin: top center; }
.z-bob.mv-float   { animation-name: mvFloat; }
.z-bob.mv-crawl   { animation-name: mvCrawl; }
.z-bob.mv-prowl   { animation-name: mvProwl; }
.z-bob.mv-breathe { animation-name: mvBreathe; }

@keyframes mvHop     { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-14px)} 55%{transform:translateY(0) scaleY(.94)} 70%{transform:translateY(-3px)} }
@keyframes mvWaddle  { 0%,100%{transform:rotate(-8deg) translateY(0)} 50%{transform:rotate(8deg) translateY(-3px)} }
@keyframes mvFlap    { 0%,100%{transform:translateY(-6px) scaleY(1.06)} 50%{transform:translateY(2px) scaleY(.94)} }
@keyframes mvSwim    { 0%,100%{transform:translateX(-4px) rotate(-4deg)} 50%{transform:translateX(4px) rotate(4deg)} }
@keyframes mvSlither { 0%,100%{transform:translateX(-6px) skewX(8deg)} 50%{transform:translateX(6px) skewX(-8deg)} }
@keyframes mvScurry  { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-4px)} 50%{transform:translateY(0)} 75%{transform:translateY(-4px)} }
@keyframes mvStomp   { 0%,100%{transform:translateY(0) scaleY(1)} 50%{transform:translateY(-4px) scaleY(1.03)} }
@keyframes mvGallop  { 0%,100%{transform:translateY(0) rotate(0)} 35%{transform:translateY(-9px) rotate(-6deg)} 70%{transform:translateY(0) rotate(3deg)} }
@keyframes mvSwing   { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} }
@keyframes mvFloat   { 0%,100%{transform:translateY(-5px) scale(1.02)} 50%{transform:translateY(5px) scale(.98)} }
@keyframes mvCrawl   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
@keyframes mvProwl   { 0%,100%{transform:translateY(0) scaleY(1)} 40%{transform:translateY(-5px) scaleY(1.04) scaleX(.98)} 80%{transform:translateY(-1px)} }
@keyframes mvBreathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }

/* Respect reduced-motion: animals go still, everything else keeps working */
@media (prefers-reduced-motion: reduce) {
  .z-bob { animation: none !important; }
}
```

## STEP 2 — JS: paste the lookup table right after the `SPRITE_SHEETS` block (~line 2232)

```js
// ── Animal movement archetypes ────────────────────
// Maps animal id → one of 13 CSS movement styles (see .mv-* keyframes).
// Shared per body-type: all flying birds use 'flap', all big cats 'prowl', etc.
// Unknown ids fall back to 'breathe' (subtle, never looks broken).
const ANIMAL_MOVE = {
  // hop — frogs, hares, roos
  dart_frog:'hop', tree_frog:'hop', arctic_hare:'hop', kangaroo:'hop',
  quokka:'hop', mountain_goat:'hop',
  // waddle — penguins, waterfowl strut
  penguin:'waddle', emperor_penguin:'waddle', flamingo:'waddle',
  peacock:'waddle', capybara:'waddle',
  // flap — every flying bird shares this one
  macaw:'flap', bald_eagle:'flap', condor:'flap', red_hawk:'flap',
  snowy_owl:'flap', harpy_eagle:'flap', philippine_eagle:'flap',
  golden_eagle_m:'flap', kookaburra:'flap',
  // swim — fish, marine mammals, swimming reptiles
  clownfish:'swim', great_white:'swim', hammerhead:'swim', orca:'swim',
  dolphin:'swim', river_dolphin:'swim', manatee:'swim', axolotl:'swim',
  river_otter:'swim', platypus:'swim', sea_turtle:'swim', swan:'swim',
  sea_lion:'swim',
  // slither — snakes & eels
  king_cobra:'slither', anaconda:'slither', moray_eel:'slither',
  // scurry — small & quick
  meerkat:'scurry', marmot:'scurry', tasmanian_devil:'scurry',
  arctic_fox:'scurry', red_panda:'scurry', warthog:'scurry',
  // stomp — heavyweights
  elephant:'stomp', rhino:'stomp', hippo:'stomp', buffalo:'stomp',
  polar_bear:'stomp', grizzly:'stomp', walrus:'stomp', yak:'stomp',
  giraffe:'stomp', camel:'stomp', llama:'stomp',
  // gallop — runners
  zebra:'gallop', wild_dog:'gallop', gray_wolf:'gallop', dingo:'gallop',
  reindeer:'gallop', bighorn:'gallop', emu:'gallop', cassowary:'gallop',
  // swing — primates
  monkey:'swing', orangutan:'swing', gorilla:'swing', mandrill:'swing',
  snow_monkey:'swing',
  // float — drifters
  octopus:'float', pufferfish:'float',
  // crawl — slow low movers
  iguana:'crawl', bearded_dragon:'crawl', water_dragon:'crawl',
  nile_monitor:'crawl', komodo:'crawl', saltwater_croc:'crawl',
  nile_croc:'crawl', gharial:'crawl', lobster:'crawl',
  spider_crab:'crawl', wombat:'crawl', sloth:'crawl',
  // prowl — big cats & stalkers
  lion:'prowl', tiger:'prowl', sumatran_tiger:'prowl', white_tiger:'prowl',
  cheetah:'prowl', jaguar:'prowl', puma:'prowl', snow_leopard:'prowl',
  // breathe — calm default (koala, panda)
  koala:'breathe', panda:'breathe',
};
```

## STEP 3 — JS: one-line change inside `_encHtml` (the walkers loop, ~line 2298)

Find:
```js
        walkers+=`<div class="zoo-animal-walker" data-zid="${id}">
            <div class="z-bob" style="animation-delay:${delay}s;animation-duration:${dur}s">${innerHtml}</div>
        </div>`;
```

Replace with:
```js
        const mvCls = ANIMAL_MOVE[id] || 'breathe';
        walkers+=`<div class="zoo-animal-walker" data-zid="${id}">
            <div class="z-bob mv-${mvCls}" style="animation-delay:${delay}s;animation-duration:${dur}s">${innerHtml}</div>
        </div>`;
```

That's it. `_encHtml` is shared by `renderZoo()` and `renderZooView()`,
so both zoo views get the movement styles automatically. The shop keeps
using the static `spr()` preview (no change — 90 animated shop cards would
be visual noise and a perf hit).

## STEP 4 — bump the service worker

In `sw.js`, change `CACHE_NAME` from `zoo-math-v5` to `zoo-math-v6`.

## Why this is safe

- `.z-bob.mv-*` (specificity 0,2,0) beats `.z-bob` (0,1,0), so only the
  animation *name* changes; per-walker inline delay/duration still apply.
- The tap interactions (`.zoo-animal-walker.sliding .z-bob`,
  speed bursts, ripples) use `!important` / JS speed changes on the
  *outer* walker — untouched by this patch.
- Sprite-sheet walkers (giraffe PNG) live *inside* `.z-bob`, so they get
  the movement style too, on top of their frame animation.
- Unknown animal ids fall back to `breathe`, so a typo can never leave an
  animal frozen or broken.
