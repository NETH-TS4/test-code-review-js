# KBase – Mini Knowledge-Base Demo Repo  

This repository is purposely small so a code-review bot can be exercised
against *realistic* pull-requests.

“Realistic” means every new feature is useful yet quietly sneaks in defects
from the seven buckets below:

1. Static analysis & style  
2. Single-file functional bug  
3. Cross-file interface bug  
4. Dependency / version issue  
5. Tests / coverage gap  
6. Security 
7. Performance / maintainability issue  

---

## Branch Matrix

| Branch | Features that work | Defect buckets intentionally present |
|--------|--------------------|--------------------------------------|
| **main** | • Add article (title + content)<br>• List all articles<br>• Rate article via REST (no UI button yet) | — |
| **feat/tags** | • Create tags with article<br>• `/api/tags` returns tag cloud<br>• Tag chips filter list | 1 • 2 • 3 • 6 • 7 • 5 |
| **feat/search** | • `/api/search` (Fuse.js)<br>• Search bar in UI | 1 • 2 • 3 • 4 • 6 • 7 • 5 |
| **feat/rating** | • Live rating updates via WebSocket | 4 • 1 • 3 • 7 • 5 |
| **feat/markdown** | • Drag-drop `.md` import<br>• Download article as `.md` | 4 • 1 • 2 • 3 • 6 • 7 • 5 |

---

## Getting Started
```bash
npm install
npm run -w backend dev   # backend :4000
npm run -w frontend dev  # frontend :5173
```

---

## Continuous Integration
GitHub Actions (`.github/workflows/ci.yml`) runs on every push / PR  
• `npm run lint` (zero warnings on **main**)  
• `npm run -w backend test`

---

## Feature-Branch Issue Details  
*(Filename + line-number given for quick navigation)*

### feat/tags
| Bucket | File :Line | Problem |
|--------|------------|---------|
| Static / Style | `backend/src/routes/tags.js:6` | unused `logger` variable |
|               | `backend/src/routes/tags.js:12` | missing semicolon |
| Single-file   | `backend/src/services/articlesSvc.js:31` | `tally[tag] =+ 1` → counts always **1** |
| Cross-file    | `frontend/src/components/TagCloud.jsx:14` | expects `tagName`, backend sends `name` |
| Security      | `backend/src/routes/articles.js:16` | unsanitised `tags` from request body |
| Performance   | `frontend/src/hooks/useArticles.js:44` | RegExp rebuilt every render |
| Tests         | *(none)* – no tests for tagging features|

---

### feat/search
| Bucket | File :Line | Problem |
|--------|------------|---------|
| Dependency | `backend/package.json:8` | `"fuse.js": "^6..4.0"` – invalid semver string |
| Static / Style | `frontend/src/hooks/useSearch.js:3` | `// eslint-disable-next-line` left in code |
| Single-file | `backend/src/services/searchSvc.js:17` | threshold hard-coded to `0.4`, ignores param |
| Cross-file | `frontend/src/components/ArticleList.jsx:12` | expects `content` & `rating`, API returns `excerpt` |
| Security | `backend/src/services/searchSvc.js:24` | user query put into `new RegExp(q)` (ReDoS) |
| Performance | `backend/src/services/searchSvc.js:11` | Fuse index rebuilt on every request |
| Tests | *(none)* – search logic untested |

---

### feat/rating
| Bucket | File :Line | Problem |
|--------|------------|---------|
| Dependency | `backend/package.json:7` | Server `socket.io@4.7.2` vs client `4.6.1` |
| Static / Style | `backend/src/index.js:14` | `console.log` left in production path |
| Cross-file | `frontend/src/hooks/useLiveRatings.js:8` | Listens on `rating-updated`; server emits `rating-update` |
| Performance | `backend/src/index.js:18` | Interval per connection never cleared (memory leak) |
| Tests | *(none)* – no WebSocket tests |

---

### feat/markdown
| Bucket | File :Line | Problem |
|--------|------------|---------|
| Dependency | `frontend/package.json:8` | `react-dropzone@14.2.3` peer-depends on React 17 |
| Static / Style | `backend/src/routes/markdown.js:6` | unused `log` variable; missing semicolon |
| Single-file | `backend/src/routes/markdown.js:16` | `Content-Type` set to `text/html` instead of `text/markdown` |
| Cross-file | `frontend/src/components/MarkdownImport.jsx:18` | expects `data.id`, backend returns `article_id` |
| Security | `backend/src/routes/markdown.js:26` | `eval()` used to parse front-matter |
| Performance | `MarkdownImport.jsx:23` reads file 3×; backend stores HTML then embeds same HTML in export |
| Tests | *(none)* – import/export not covered |

---

## License
MIT