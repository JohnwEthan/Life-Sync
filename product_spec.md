# LifeSync: Product Specification

## 1) NORTH STAR
- **Positioning:** LifeSync is a private holistic cockpit designed to align your physical output with your mental, spiritual, emotional, and financial intentions.
- **The Daily Moment:** The **Nightly Closeout**. At 9:00 PM, LifeSync transitions into a minimalist reflection mode, helping users reconcile their day's intentions before resting.
- **3 Core Use Cases:**
  1. **Holistic Alignment:** Tracking prayers and family connection with the same fidelity as physical reps.
  2. **Automated Physical Monitoring:** Invisible data ingestion via HealthKit (Garmin -> Health -> LifeSync).
  3. **Trend-Based Projection:** Visualizing long-term consistency without the anxiety of daily perfection.
- **3 Non-Goals:**
  1. **Social Gamification:** No public streaks, leaderboards, or sharing metrics.
  2. **Clinical Diagnosis:** No body-shaming or medical advice regarding weight or health scores.
  3. **High-Friction Manual Entry:** Avoiding repetitive typing for metrics already captured by sensors.
- **6 Apple-like Product Principles:**
  1. **Privacy as a Human Right:** E2E encryption via iCloud; on-device processing only.
  2. **Invisible Integration:** Leveraging HealthKit for a "it just works" data experience.
  3. **Clarity over Clutter:** Utilizing Large Titles and generous whitespace (SF Symbols/HIG).
  4. **Subtle Interaction:** Meaningful haptics and spring-based animations.
  5. **Respectful Communication:** Calm, non-punitive notifications.
  6. **Design for Everyone:** Comprehensive Dynamic Type and VoiceOver support.

## 2) INFORMATION ARCHITECTURE + NAVIGATION
- **Tab Bar (3 Tabs):**
  1. **Today:** Action-oriented checklist and alignment rings. (Root: Large Title)
  2. **Trends:** Long-term charts and the "Weekly Review" trigger. (Root: Large Title)
  3. **Me:** Profile stats, goals configuration, and privacy settings. (Root: Large Title)
- **Navigation Map:**
  - **Today -> Habit Detail:** Push (NavigationLink) for history; Sheet for manual entry adjust.
  - **Trends -> Weekly Review:** Modal Sheet (Full Screen or Page Sheet with grabber).
  - **Me -> Edit Goals:** Pushed Form for granular control.
- **iOS-Native Logic:** Follows the flat hierarchy of Apple Health/Fitness. Sheets are used for ephemeral actions (logging), while Pushes are used for deep-diving into data.

## 3) KEY SCREENS
### A) Onboarding
- **Screen 1:** "Sync Your Life." (Icon + Title + Subtitle).
- **Screen 2:** "Privacy is Fundamental." (Shield Icon + Copy about on-device data).
- **Screen 3:** "Connect Everything." (Apple Health button + "Garmin users: Ensure Garmin Connect writes to Health").
### B) Health Permissions
- **Copy:** "LifeSync requests access to Steps and Weight to automatically align your physical domain."
- **Permissions:** `HKStepCount`, `HKBodyMass`.
### C) Today (Hero)
- **Sections:** Header (Date), Insight Card (Calm sentence), Alignment Rings, Domain Sections (Physical, Mental, etc.).
- **Components:** `HabitCard` (custom), `ProgressRing`.
### D) Add/Edit Goal
- **Sections:** Title, Icon Picker, Domain Picker, Goal Type (Checkbox, Count, Metric), Target Value.
- **Components:** `Form`, `Section`, `Stepper`.
### E) Progress
- **Sections:** Weight Trend (Line Chart), Steps (Bar Chart), Holistic Consistency (Area Chart).
- **Components:** `Recharts` (Line/Bar/Area).
### F) Weekly Review
- **Flow:** Summary of wins -> One question: "Where do you want to be more present next week?" -> Set Intent.
### G) Me/Settings
- **Sections:** Profile (Latest Weight/Height), My Goals, Integrations (HealthKit/iCloud), Data (Export/Reset).

## 4) DESIGN SYSTEM
- **Typography:** `LargeTitle` (34pt), `Title2` (22pt), `Headline` (17pt/Semibold), `Body` (17pt), `Caption2` (11pt).
- **Spacing:** 8pt grid. 20pt horizontal margins. 12pt inner-card padding.
- **Color:** `SystemBackground`, `SecondarySystemBackground`. Accent: `SystemBlue`.
- **SF Symbols:** `figure.walk` (Steps), `dumbbell` (Strength), `book` (Mental), `hands.sparkles` (Spiritual), `heart` (Emotional), `dollarsign` (Financial).

## 5) "ONLY APPLE WOULD SHIP IT LIKE THIS" FEATURES
1. **Interactive Widget:** Mark "10 Pages Read" from the Home Screen via `App Intents`.
2. **Lock Screen Rings:** Step progress and Daily Intentions visible on Always-On display.
3. **Focus Filter:** Hide "Financial" goals during "Personal" Focus mode.
4. **Siri Shortcut:** "Siri, I prayed" increments the prayer count instantly.
5. **StandBy Glance:** Landscape charging mode shows a large 5-domain ring.
6. **iCloud E2E:** Transparent security badges in the Me tab.

## 6) DATA MODEL + ENGINEERING
- **Goal:** `{ id: UUID, title: String, domain: Domain, type: GoalType, target: Double, isAuto: Bool }`
- **DailyCheckIn:** `{ date: Date, goalId: UUID, value: Double }`
- **WeeklyReview:** `{ weekId: String, reflection: String, topIntent: String }`
- **HealthKit Strategy:** `HKStatisticsCollectionQuery` for 90-day step history to compute baselines.
- **Garmin Fallback:** If HealthKit permissions are denied, offer OAuth redirect to Garmin API (Phase 2).

## 7) NOTIFICATIONS
1. **Morning Intention (8:00 AM):** "Set your alignment. 5 intentions remain for today."
2. **Step Nudge (4:00 PM):** "A short walk would bring you into physical alignment."
3. **Evening Close (9:00 PM):** "The day is ending. How was your family connection today?"

## 8) MICROCOPY PACK
- **Value Prop:** "Align your reps with your prayers."
- **Today Encouragement:** "Small movements, total alignment."
- **Streak Break:** "Yesterday was a pause. Today is a beginning."
- **Review Prompt:** "In which domain did you feel most present this week?"