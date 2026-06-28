#!/bin/bash
# install-skills.sh — Install all skills.sh skills for opencode
# Run once in the root of your project

set -e

echo "🚀 Installing skills for Task Manager (opencode)..."
echo ""

# ─── TIER 1: Core (ضروری — همیشه نصب کن) ────────────────────────────────────

echo "📦 [1/6] next-best-practices — Next.js 15 file conventions, RSC boundaries, async APIs"
npx skills add https://github.com/vercel-labs/next-skills --skill next-best-practices

echo ""
echo "📦 [2/6] vercel-react-best-practices — 70 rules for React/Next.js performance"
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices

echo ""
echo "📦 [3/6] tailwind-design-system — Tailwind v4 CSS-first config, tokens, CVA patterns"
npx skills add https://github.com/wshobson/agents --skill tailwind-design-system

echo ""
echo "📦 [4/6] vercel-composition-patterns — Compound components, prop patterns, React 19"
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-composition-patterns

echo ""

# ─── TIER 2: Quality (توصیه شده) ─────────────────────────────────────────────

echo "📦 [5/6] typescript-advanced-types — Generic types, discriminated unions, Zod patterns"
npx skills add https://github.com/wshobson/agents --skill typescript-advanced-types

echo ""
echo "📦 [6/6] webapp-testing — Playwright testing for React/Next.js apps"
npx skills add https://github.com/anthropics/skills --skill webapp-testing

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All skills installed!"
echo ""
echo "Next step: open opencode and run:"
echo "  bash skills.sh"
echo "Then start with STEP 0 from prompts.md"