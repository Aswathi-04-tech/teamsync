# TeamSync — Multi-Developer Contribution Guide

Welcome to the TeamSync engineering repository. This guide defines the workflow standards to ensure clean, conflict-free collaboration across multiple engineers and designers.

---

## 1. Git Branching Strategy

We adhere to a streamlined Trunk/Feature-branching model:

- `main`: Production-ready release branch. Directly protected; direct pushes are disabled.
- `develop`: Integration branch for active sprint features.
- `feature/<ticket-or-name>`: Scoped branches for new capabilities (e.g. `feature/jwt-auth`, `feature/chat-socket`).
- `bugfix/<ticket-or-name>`: Targeted defect repairs (e.g. `bugfix/sidebar-overflow`).
- `chore/<name>`: Dependency bumps, tooling changes, or refactoring.

### Branch Creation Workflow
```bash
# 1. Always branch from updated develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/kanban-drag-drop
```

---

## 2. Commit Message Convention

We follow the **Conventional Commits** standard:

```
<type>(<scope>): <short description in present tense>

[optional body explaining context or rationale]

[optional footer referencing issue/ticket, e.g. Fixes #104]
```

### Approved Types:
- `feat`: A new user-facing feature or API endpoint
- `fix`: A bug fix
- `docs`: Documentation updates only
- `style`: Changes that do not affect the meaning of code (formatting, CSS tweaks)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Build scripts, packages, tooling changes

### Examples:
- `feat(client): add stage advancement buttons to Kanban task cards`
- `fix(server): handle missing MONGODB_URI gracefully in db connection module`
- `docs: add multi-developer contribution guidelines`

---

## 3. Pull Request (PR) Workflow

1. **Self-Review**:
   - Verify that your code builds locally:
     ```bash
     npm run build:client
     ```
   - Verify that no sensitive files (`.env`, `.pem`, credentials) are staged:
     ```bash
     git status
     ```
2. **Push to Remote**:
   ```bash
   git push origin feature/kanban-drag-drop
   ```
3. **Open Pull Request**:
   - Target `develop` as the base branch.
   - Fill in the PR template:
     - **Summary of changes**
     - **Testing performed**
     - **Screenshots / GIFs** (for frontend UI changes)
4. **Peer Review**:
   - Require at least 1 approval from a peer before merging.
   - Squash and merge to maintain a linear commit history on `develop`.

---

## 4. Secret & Credential Management Policy

> [!CAUTION]
> **Strict Rule:** Never commit credentials, connection strings with real passwords, or private API keys to GitHub.

- The repository `.gitignore` automatically blocks `.env`, `.env.local`, and `*.env`.
- If a new environment variable is introduced:
  1. Add a dummy placeholder entry in `server/.env.example` or `client/.env.example`.
  2. Document its purpose in `README.md`.
  3. Inform team members in the `#releases-and-ops` channel.

---

## 5. Code Style & Best Practices

- **React / Frontend**:
  - Keep components modular, reusable, and placed in `client/src/components/common/` if shared.
  - Route all external API calls through `client/src/api/axiosClient.js`.
  - Maintain color coherence using defined Tailwind classes (`brand-500`, `purpleBrand-500`, `slate-900`, `slate-950`).
- **Express / Backend**:
  - Do not hardcode HTTP status codes; use `server/utils/apiResponse.js`.
  - Pass errors to `next(error)` so they are caught and formatted uniformly by `errorHandler.js`.
  - Define new Mongoose schemas in `server/models/` with timestamps and type validations enabled.
