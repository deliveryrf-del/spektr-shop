#!/usr/bin/env bash
set -euo pipefail

echo "==> Проверка, что мы в корне проекта..."
test -f package.json || { echo "Не вижу package.json. Сделай: cd ~/Downloads/spektr-shop-starter"; exit 1; }

sedd() { sed -i '' "$@"; }

# 1) Удалим импорт глобальных стилей из админского layout (если он остался)
if [ -f app/admin/layout.tsx ]; then
  sedd '1{/import ..\/globals\.css.;/d;}' app/admin/layout.tsx || true
fi

# 2) Заменяем алиасы на относительные пути во ВСЕХ файлах админки
# страницах
sedd 's|@/lib/db|../../../lib/db|g; s|@/lib/admin|../../../lib/admin|g' app/admin/products/page.tsx
sedd 's|@/lib/db|../../../../lib/db|g; s|@/lib/admin|../../../../lib/admin|g' app/admin/products/\[id\]/page.tsx
sedd 's|@/lib/db|../../../lib/db|g; s|@/lib/admin|../../../lib/admin|g' app/admin/categories/page.tsx
sedd 's|@/lib/admin|../../lib/admin|g' app/admin/page.tsx

# api-роуты
sedd 's|@/lib/db|../../../lib/db|g; s|@/lib/admin|../../../lib/admin|g' app/api/admin/products/route.ts
sedd 's|@/lib/db|../../../../lib/db|g; s|@/lib/admin|../../../../lib/admin|g' app/api/admin/products/\[id\]/route.ts
sedd 's|@/lib/admin|../../../lib/admin|g' app/api/admin/login/route.ts
sedd 's|@/lib/admin|../../../lib/admin|g' app/api/admin/logout/route.ts
sedd 's|@/lib/db|../../../lib/db|g; s|@/lib/admin|../../../lib/admin|g' app/api/admin/categories/route.ts
sedd 's|@/lib/db|../../../../lib/db|g; s|@/lib/admin|../../../../lib/admin|g' app/api/admin/categories/\[id\]/route.ts

echo "==> Готово. Теперь запусти сервер: npm run dev"
