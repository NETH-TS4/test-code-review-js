# KBase – Mini Knowledge-Base Demo Repo

This repository is purposely small so a code-review bot can be exercised
against realistic* pull-requests.

*“Realistic” = every new feature is useful to a human developer yet
quietly sneaks in 2–3 defects chosen from:

1. Static analysis & style  
2. Single-file functional bug  
3. Cross-file interface bug  
4. Dependency / version issue  
5. Tests / coverage gap  
6. Security smell  
7. Performance / maintainability issue  

---

## Branch Matrix

| Branch              | Features that work                                                                                                         | Intentionally present issues (should be found by reviewer)                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **main**            | • Add article (title + content) <br> • List all articles <br> • Rate article via REST (UI not wired yet)                   | none – clean baseline                                                                                                                             |
| **feature/tagging** | • Add tags when creating an article <br> • `/api/tags` endpoint returns tag cloud <br> • UI shows tag chips & filters list | Static/Style (2), Single-file (1), Cross-file (1), Security (1), Performance (1), Tests/coverage (1) – see below for details on errors |

More feature branches (search, live-ratings, markdown import/export) will
follow the same pattern.

---

## Getting Started

```bash
npm install          # root – installs workspaces
npm run -w backend dev     # backend on :4000
npm run -w frontend dev    # frontend on :5173
```

Open <http://localhost:5173> and start adding articles.

---

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) runs on every push / PR:

* `npm run lint` — ESLint + Prettier (zero warnings on **main**)
* `npm run -w backend test` — Jest unit tests (green on **main**)

---

## License

MIT (see LICENSE file).