#!/bin/zsh
set -e
cd "${0:A:h}"

# The project-local runtime works without a global Node.js installation.
if [[ -x "$PWD/.runtime/node/bin/node" ]]; then
  export PATH="$PWD/.runtime/node/bin:$PATH"
elif ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  print 'Node.js is missing. Install Node.js 22 LTS from https://nodejs.org, then try again.'
  read '?Press Enter to close.'
  exit 1
fi
if [[ ! -d node_modules ]]; then
  npm ci
fi
print 'LockStock Games: http://127.0.0.1:5173/'
print 'Use the Network URL below on a phone connected to the same Wi-Fi.'
exec npm run dev
