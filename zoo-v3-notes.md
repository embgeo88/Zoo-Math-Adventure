# Zoo Math Adventure — v3 bundle (Singapore math + economy rebalance)

**Base:** current repo file + v2 bundle (animated shop cards, read-aloud, streak celebrations).
The v2 bundle was never applied to the repo, so this file includes everything — one upload covers it all.

## Files to upload (same 3-file process as before)
1. `zoo-math-game.html` → repo root (overwrite)
2. `questions.js` → repo root (overwrite) — now carries the named strategy labels
3. `sw.js` → repo root (overwrite) — cache bumped **v7 → v8**

## What's new

**1. Named mental strategies in hints** — every hint now opens with a labeled strategy chip:
Make Ten, Count On, Regroup (Borrow Ten), Column Subtraction, Count Up, Break Apart,
Skip-Count, Think Multiplication, Equal Sharing, Two Steps, Unit Facts.
Kids start attaching names to the tools they use — that's the replicable part of the research.

**2. Mastery stars per operation** — the op picker buttons now show ☆☆☆ → ★★★ under each
operation name. Thresholds: 25 / 60 / 120 lifetime correct per op type. Cosmetic only —
nothing is ever gated or locked. Progress persists in the save file.

**3. Bar models for emergencies** — every 🚨 Zoo Emergency now has a collapsed
"📊 Bar Model" toggle (same pattern as the Conversion Guide). Opens an inline SVG bar:
- Addition → two parts labeled, whole = ?
- Subtraction → whole labeled, known part shaded, remainder = ?
- Multiplication → N equal groups (caps at 10 shown for big numbers like 35 kg weights)
- Division → whole split into N equal "?" parts
Collapsed by default so the emergency keeps its stakes.

**4. Economy rebalance (slower progression, same fairness)**
- Per-question earnings halved: $6/$12/$18 → **$3/$6/$9** (wrong-answer penalties halved symmetrically — no cheating)
- Streak bonuses roughly halved
- Quest rewards halved ($15–$50)
- Food Match / Memory Match: +$3/−$1 per item, end bonuses halved
- Random zoo events, animal income/upkeep, and emergency cost mechanics unchanged

**Pacing estimate:** ~$27k of total buyable content ÷ ~$525/week (3 sessions × 30 questions at ~78% correct)
≈ **~52 weeks to buy everything**. Early game still feels rewarding (cheapest animal ≈ 6–8 correct answers).

## Testing done
- All 25 build assertions pass; both inline scripts + questions.js parse clean in node
- Bar model generator tested against all 6 emergency shapes (incl. 35-segment cap and b>a guard)
- Mastery thresholds verified at boundaries (24→☆☆☆, 25→★☆☆, 60→★★☆, 120→★★★)
- v2 features (TTS, confetti, shop animations, movement archetypes) confirmed still intact

## After uploading
Hard-refresh (Ctrl+Shift+R). If anything looks stale, the service worker may need one
more cycle — same as the v2 rollout.
