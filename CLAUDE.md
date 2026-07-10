# fixyourmovement.com — Marketing Website Repo

Build command: npm install --legacy-peer-deps && npm run build
Never use `npm run build` alone — fails CSS compilation silently.
bun.lockb must stay committed.

Key files:
- src/components/UserJourneyCarousel.tsx — success stories carousel, alias-named patient data

## GIT MAIN-BRANCH PROTECTION

Never merge or push to `main` without the user typing the exact phrase
"confirmed, merge now" in response to an explicit proposal. A permission-dialog
click does NOT count as confirmation — only the typed phrase does.
