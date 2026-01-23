#!/bin/bash

# Script to start all three design variations in separate terminals

echo "🎨 Starting all design variations..."
echo ""

# Define worktree paths
ZEN_GARDEN="../soc-ops-zen-garden"
RETRO_ARCADE="../soc-ops-retro-arcade"
BRUTALIST_TERMINAL="../soc-ops-brutalist-terminal"

# Color codes
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}📋 Design Variations:${NC}"
echo -e "${CYAN}1. Zen Garden${NC}        - http://localhost:5173"
echo -e "${YELLOW}2. Retro Arcade${NC}      - http://localhost:5174"
echo -e "${GREEN}3. Brutalist Terminal${NC} - http://localhost:5175"
echo ""

# Check if directories exist
if [ ! -d "$ZEN_GARDEN" ]; then
    echo "❌ Error: $ZEN_GARDEN not found"
    exit 1
fi

if [ ! -d "$RETRO_ARCADE" ]; then
    echo "❌ Error: $RETRO_ARCADE not found"
    exit 1
fi

if [ ! -d "$BRUTALIST_TERMINAL" ]; then
    echo "❌ Error: $BRUTALIST_TERMINAL not found"
    exit 1
fi

# Install dependencies if needed
echo "📦 Checking dependencies..."
for dir in "$ZEN_GARDEN" "$RETRO_ARCADE" "$BRUTALIST_TERMINAL"; do
    if [ ! -d "$dir/node_modules" ]; then
        echo "Installing dependencies in $dir..."
        (cd "$dir" && npm install)
    fi
done

echo ""
echo "🚀 Starting development servers..."
echo "Press Ctrl+C to stop all servers"
echo ""

# Start all three dev servers in background with different ports
(cd "$ZEN_GARDEN" && npm run dev -- --port 5173) &
PID1=$!

(cd "$RETRO_ARCADE" && npm run dev -- --port 5174) &
PID2=$!

(cd "$BRUTALIST_TERMINAL" && npm run dev -- --port 5175) &
PID3=$!

# Wait a bit for servers to start
sleep 3

echo ""
echo -e "${GREEN}✅ All servers started!${NC}"
echo ""
echo "🌐 Access the designs at:"
echo -e "  ${CYAN}Zen Garden:${NC}        http://localhost:5173"
echo -e "  ${YELLOW}Retro Arcade:${NC}      http://localhost:5174"
echo -e "  ${GREEN}Brutalist Terminal:${NC} http://localhost:5175"
echo ""
echo "Press Ctrl+C to stop all servers"

# Trap Ctrl+C and kill all processes
trap "echo ''; echo '🛑 Stopping all servers...'; kill $PID1 $PID2 $PID3 2>/dev/null; exit" INT

# Wait for all background processes
wait
