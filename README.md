# KBase – Mini Knowledge-Base Demo Repo

This repository is purposely small so a code-review bot can be exercised
against *realistic* pull-requests.

“Realistic” means every new feature is genuinely useful yet quietly sneaks in
defects chosen from the seven buckets below:

1. Static analysis & style  
2. Single-file functional bug  
3. Cross-file interface bug  
4. Dependency / version issue  
5. Tests / coverage gap  
6. Security
7. Performance / maintainability issue  

---

## Branch Matrix

| Branch            | Features that work                                                                                                     | Defect buckets intentionally present                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **main**          | • Add article (title + content) <br> • List all articles <br> • Rate article via REST (no UI button yet)               | none – clean baseline                                                                 |
| **feat/tags**     | • Add tags when creating an article <br> • `/api/tags` returns tag cloud <br> • Tag chips filter the list              | Static/Style • Single-file • Cross-file • Security • Performance • Tests              |
| **feat/search**   | • Full-text search endpoint (`/api/search`) powered by Fuse.js <br> • Search bar in UI (results *should* replace list) | Static/Style • Single-file • Cross-file • Dependency • Security • Performance • Tests |
| **feat/rating**   | • WebSocket pushes live rating updates to all browsers                                                                 | Dependency • Static/Style • Cross-file • Performance • Tests                          |
| **feat/markdown** | • Drag-and-drop `.md` import <br> • Download any article as `<id>.md`                                                  | Dependency • Static/Style • Single-file • Cross-file • Security • Performance • Tests |

---

## Getting Started

```bash
npm install                 # root – installs workspaces
npm run -w backend dev      # backend on :4000
npm run -w frontend dev     # frontend (Vite) on :5173
```

Open <http://localhost:5173> and begin adding articles.

---

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) runs on every push / PR:

* `npm run lint` — ESLint + Prettier (zero warnings on **main**)  
* `npm run -w backend test` — Jest unit tests (green on **main**)

---

## Feature-Branch Issue Details

### feat/tags – Issues to catch
* Static/Style – `backend/src/routes/tags.js` has an unused `logger` variable and a missing semicolon.  
* Single-file – `articlesSvc.uniqueTags()` uses `tally[tag] =+ 1`, so every tag count remains **1**.  
* Cross-file – Backend returns `{ name }`, but `TagCloud` expects `tagName`.  
* Security – Unsanitised `tags` array accepted in POST `/api/articles`.  
* Performance – `useArticles` builds a new `RegExp` on every render while filtering.  
* Tests – No tests added for tagging; coverage drops.

---

### feat/search – Issues to catch
* Dependency – `backend/package.json` lists `"fuse.js": "^6..4.0"` (typo, invalid semver).  
* Static/Style – ESLint disable comment left in `useSearch.js`.  
* Single-file – `querySearch()` always passes hard-coded `0.4` threshold, ignoring user value.  
* Cross-file – Search API returns `{ id, title, excerpt }`; `ArticleList` expects `content` and `rating`, so results don’t render.  
* Security – User query fed straight into `new RegExp(q)` (ReDoS risk).  
* Performance – Builds a new Fuse index on **every** request instead of caching.  
* Tests – No tests for search path; coverage drops.

---

### feat/rating – Issues to catch
* Dependency – Server runs `socket.io@4.7.2`, client runs `socket.io-client@4.6.1` (version skew).  
* Static/Style – `console.log` left in production code.  
* Cross-file – Server emits `rating-update`; client listens for `rating-updated`.  
* Performance – Interval inside WebSocket `connection` handler never cleared → memory leak.  
* Tests – No tests for WebSocket feature.

---

### feat/markdown – Issues to catch
* Dependency – Adds `react-dropzone@14.2.3` whose peer range targets React 17 (warning).  
* Static/Style – Unused `log` variable and missing semicolon in `routes/markdown.js`.  
* Single-file – Export route sets `Content-Type: text/html` instead of `text/markdown`.  
* Cross-file – Backend returns `{ article_id }`, frontend expects `data.id`.  
* Security – Uses `eval()` to parse front-matter.  
* Performance – `MarkdownImport` reads the same file three times; backend stores HTML then re-embeds it in exported Markdown.  
* Tests – No tests for import/export logic; coverage drops.

---

## License

MIT (see LICENSE file)