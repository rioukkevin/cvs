# Déploiement Vercel

Variables d'environnement à configurer, comment les obtenir, et comment les déclarer.

## Variables

### 1. `EDIT_PASSWORD`

Mot de passe que tu choisis. C'est ce que tu taperas sur `/login` pour accéder à l'édition.

Recommandé : 16+ caractères, mélange aléatoire. Génère-en un :

```bash
openssl rand -base64 24
```

### 2. `SESSION_SECRET`

Clé secrète pour signer le cookie de session. Pas saisie par toi, juste une chaîne aléatoire longue et imprévisible.

```bash
openssl rand -hex 32
```

Copie la sortie (64 caractères hex). Si tu la changes, toutes les sessions existantes sont invalidées (tu devras te reconnecter).

### 3. `GITHUB_TOKEN`

Token personnel GitHub avec droit d'écrire sur `rioukkevin/cvs`. **Fine-grained recommandé** (plus sûr que classic) :

1. Va sur https://github.com/settings/personal-access-tokens/new
2. **Token name** : `cv-edit-vercel`
3. **Expiration** : 1 an (max). Note la date pour le renouveler.
4. **Repository access** → *Only select repositories* → choisis `rioukkevin/cvs`
5. **Permissions** → *Repository permissions* :
   - **Contents** : `Read and write` (obligatoire — pour PUT le fichier)
   - **Metadata** : `Read-only` (auto-sélectionné)
   - Laisse tout le reste sur "No access"
6. *Generate token* → copie immédiatement (ne s'affichera plus jamais).

Le token commence par `github_pat_…`.

### 4. `GITHUB_OWNER`

Valeur : `rioukkevin`. Tiré de l'URL du repo (`github.com/rioukkevin/cvs`).

### 5. `GITHUB_REPO`

Valeur : `cvs`.

### 6. `GITHUB_BRANCH`

Valeur : `master`. Vérifie avec `git branch --show-current` si besoin.

### 7. `EDIT_DRY_RUN` (dev seulement)

Ne **pas** définir en prod (ou mettre `false`). En dev local seulement, `true` pour ne pas pousser sur GitHub — la route logge le payload côté serveur à la place.

---

## Ajouter sur Vercel

### Option A — Dashboard

1. https://vercel.com/dashboard → projet `cvs`
2. **Settings** → **Environment Variables**
3. Pour chaque variable :
   - **Key** : nom exact (ex. `EDIT_PASSWORD`)
   - **Value** : la valeur
   - **Environments** : coche **Production**, **Preview**, **Development** (les 3)
   - *Save*
4. Refais pour les 6 (pas `EDIT_DRY_RUN`).

⚠️ Après avoir ajouté/modifié des env vars, **redéploie** : *Deployments* → dernier déploiement → *Redeploy* (sans cache). Sinon Vercel sert l'ancien build qui ne les a pas.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel link            # une fois, dans le dossier du projet
vercel env add EDIT_PASSWORD production
# (te demande la valeur en interactif)
# refais pour chaque var, et choisis preview/development si tu veux les y propager
```

Pour récupérer en local :

```bash
vercel env pull .env.local
```

→ crée/écrase `.env.local` avec les vraies valeurs prod (utile pour tester en local contre le vrai GitHub).

---

## Vérification post-déploiement

Une fois déployé :

1. Ouvre l'URL Vercel → tu dois être redirigé vers `/login`
2. Tape `EDIT_PASSWORD` → tu atterris sur le CV
3. Clique crayon → sélectionne une section → édite → *Enregistrer*
4. Va sur https://github.com/rioukkevin/cvs/commits/master → tu dois voir un commit `chore(cv): edit via UI`
5. Vercel rebuild auto déclenché → ~30-60 s plus tard, la page reflète les changements

Si ça plante, regarde les logs Vercel : *Deployments* → run en cours → *Runtime Logs*. Les erreurs auth (401) ou GitHub (token invalide, sha mismatch) y apparaissent.
