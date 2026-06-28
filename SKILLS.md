#!/bin/bash
# skills.sh — opencode context loader for Task Manager
# Run at the START of every opencode session (not just install)
# This injects all relevant context into the agent's working memory

echo "📋 Loading Task Manager context for opencode..."
echo ""

# ─── 1. Project Architecture (our custom context) ────────────────────────────
echo "════════════════════════════════════════"
echo "  AGENTS.MD — Architecture Rules"
echo "════════════════════════════════════════"
cat agents.md

echo ""
echo "════════════════════════════════════════"
echo "  DESIGN.MD — Design System"
echo "════════════════════════════════════════"
cat design.md

echo ""
echo "════════════════════════════════════════"
echo "  STRUCTURE.MD — File Tree"
echo "════════════════════════════════════════"
cat structure.md

echo ""

# ─── 2. Existing source files (reference for agent) ──────────────────────────
if [ -f "src/components/ui/button/button.tsx" ]; then
  echo "════════════════════════════════════════"
  echo "  EXISTING: button.tsx (reference)"
  echo "════════════════════════════════════════"
  cat src/components/ui/button/button.tsx
  echo ""
fi

if [ -f "src/components/ui/button/button.css" ]; then
  echo "════════════════════════════════════════"
  echo "  EXISTING: button.css (reference)"
  echo "════════════════════════════════════════"
  cat src/components/ui/button/button.css
  echo ""
fi

if [ -f "src/app/globals.css" ]; then
  echo "════════════════════════════════════════"
  echo "  EXISTING: globals.css (Tailwind theme)"
  echo "════════════════════════════════════════"
  cat src/app/globals.css
  echo ""
fi

# ─── 3. Current project structure snapshot ───────────────────────────────────
echo "════════════════════════════════════════"
echo "  CURRENT SRC/ STRUCTURE"
echo "════════════════════════════════════════"
if command -v tree &> /dev/null; then
  tree src/ -I 'node_modules|.next|*.test.*|*.spec.*' --dirsfirst 2>/dev/null
else
  find src/ -type f | grep -v node_modules | grep -v .next | sort
fi

echo ""
echo "════════════════════════════════════════"
echo "  INSTALLED SKILLS (via skills.sh)"
echo "════════════════════════════════════════"
echo "✓ next-best-practices        (Next.js 15 conventions + RSC)"
echo "✓ vercel-react-best-practices (70 performance rules)"
echo "✓ tailwind-design-system     (Tailwind v4 CSS-first + CVA)"
echo "✓ vercel-composition-patterns (compound components)"
echo "✓ typescript-advanced-types  (generics, discriminated unions)"
echo "✓ webapp-testing             (Playwright for React/Next.js)"

echo ""
echo "✅ Context loaded. Now give STEP 0 from prompts.md to start."