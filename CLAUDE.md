# Zoo Math Adventure — Project Map

## Files
| File | Purpose |
|------|---------|
| `zoo-math-game.html` | Full game (~2750 lines). HTML + CSS + main game logic in one `<script>` |
| `questions.js` | All question generation. Loaded before the main script. |

## questions.js — Function Map
| Function | What it does |
|----------|-------------|
| `rnd(a,b)` / `pick(arr)` / `shuffle(arr)` | Shared utilities (also used by main script via global scope) |
| `CRTRS` / `FOODS` | Generic animal + food name arrays used in question text |
| `makeAdd(lv)` | Easy addition (lv 1–3 scales max operand: 20/50/99) |
| `makeSub(lv)` | Easy subtraction (same scaling) |
| `makeMul(lv)` | Easy multiplication (lv 1: ≤5×5, lv 2: ≤7×7, lv 3: ≤9×10) |
| `makeDiv()` | Division (divisor 2–9, quotient 2–9) |
| `makeMedAdd()` | 2-digit addition with guaranteed carrying |
| `makeMedSub()` | 2-digit subtraction with guaranteed borrowing |
| `makeHardAdd()` | 3-digit addition with carrying (112–499 range) |
| `makeHardSub()` | 3-digit subtraction with borrowing |
| `makeHardMul()` | 2-digit × 1-digit with regrouping (12–35 × 4–9) |
| `makeEcon()` | Uses player's actual animals; upkeep or income × cycles |
| `makeChallenge()` | Zoo emergency with monetary stakes (6 scenario types) |
| `makeHint(q)` | Hint generator called on wrong answer |
| `makeNumberLine()` / `conceptCard()` | Visual aids for hints |
| `buildAddWork()` / `buildSubWork()` | Column-arithmetic work-through |
| `getLevelDifficulty()` | Maps player level → diff tier (1–4) |
| `pickOp()` | Adaptive op selection; weights recently-wrong ops 2–3× |
| `generateQuestion()` | Master generator: emergency → econ → cyclic difficulty |
| `makeChoices(answer)` | 4 multiple-choice options with scaled distractors |

## zoo-math-game.html — Key Section Line Refs (approx.)
| Section | ~Line |
|---------|-------|
| CSS styles (incl. visual zoo + chart classes) | 1–355 |
| `<script src="questions.js">` tag | ~356 |
| Main `<script>` opens | ~357 |
| Game state `S` (incl. `recentStreaks: []`) | ~720–804 |
| GAME LOGIC (`loadQuestion`, `checkAnswer`) | ~830 |
| Level-up / reward system | ~950 |
| `renderZoo()` — animated visual zone map | ~1316 |
| `renderShop()` | ~1400 |
| `switchTab()` / `renderProgress()` | ~1559 |
| `renderProgress()` — charts, pie, sparkline, dashboard | ~1573 |
| `renderZooView()` — Visit tab zoo animation | ~1830 |
| `buildingsSectionHtml()` | ~1730 |
| `_setupAnimalWalkers()` / `_zvLoop` animation | ~1900 |
| Match game | ~2000 |
| `saveGame()` / `loadGame()` | ~2145 |

## New Visual Features (latest update)
- **Visual Zoo (My Zoo tab)**: `renderZoo()` now builds animated zone-based map. All 8 zones shown — unlocked zones display walking animals via `_setupAnimalWalkers()` + `_startZvAnim()`, locked zones show greyed-out placeholder. Day/night sky, stats bar, trophy case, buildings section.
- **Data Visualizations (Progress tab)**:
  - `compareHtml` — All-time vs Today side-by-side (`.compare-row`)
  - `dashCards` — 3×2 zoo health grid (`.zoo-dash-grid`, `.zoo-dash-card`)
  - `accBarHtml` — Vertical bar chart per op type (`.acc-chart-wrap`, `.acc-bar-col`)
  - `pieHtml` — CSS `conic-gradient` pie chart by question type (`.pie-wrap`, `.pie-circle`)
  - `sparkHtml` — SVG `<polyline>` streak sparkline from `S.recentStreaks` (`.spark-wrap`)
- **`S.recentStreaks`**: Persisted array (max 10) of streak lengths captured when streak resets to 0 in `checkAnswer()`.

## Architecture Notes
- **Difficulty tiers**: lv 1–2 → diff 1, lv 3–5 → diff 2, lv 6–8 → diff 3, lv 9+ → diff 4
- **Cyclic pattern**: 2 easy → 5 medium → 4 hard → repeat (11-question cycle, slot 0–10 via `S.diffSlot`)
- **At diff 4+**: floor rises — easy slots become medium, medium slots become hard
- **earnTier**: 1 = $6, 2 = $12, 3 = $18 reward per correct answer
- **Emergency trigger**: every 14–18 questions (`S.nextChallenge`), only if player owns animals
- **Adaptive practice**: `S.recentWrong` tracks last 5 wrong op types; weighted in `pickOp()`
- **Animal data**: 60+ species across 8 zones (Tropical, Savanna, Arctic, Rainforest, River, Mountain, Oceania, Aquarium). Each has `id`, `name`, `emoji`, `zone`, `upkeep`, `income`.

## Question Themes (questions.js)
Questions are thematically structured around zoo operations:
- **Addition** → arrivals & deliveries (wildlife trucks, rescues, visitor gate counts, stock deliveries)
- **Subtraction** → departures & consumption (conservation transfers, food eaten, budget spent, breeding moves)
- **Multiplication** → feeding programs & operations (portions × animals, keepers × animals, school groups × tickets)
- **Division** → fair allocation (rations per station, animals per keeper, enrichment toys per zone)
- **Emergencies** → high-stakes zoo crises (sick animal dosage, escape alerts, vet visits, heat waves, storms)
