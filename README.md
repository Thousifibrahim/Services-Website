# 🎓 Startup-web

Modern, high-performance web application built with **React 19**, **TypeScript**, and **Tailwind CSS**. This repository features a professional-grade CI/CD pipeline with automated testing, staging environments, and manual production gates.

#

###  Deployment Status

🚀 **Production** [redcrew.pages.dev](https://redcrew.pages.dev) 

🌐 **Staging**    [bca-website-80i.pages.dev](https://bca-website-80i.pages.dev)

### *Branch Strategy* :
```text
feature/xyz  ──►  sprint  ──►  master (Staging)  ──►  production
   (Dev)         (Auto CI)      (Auto Deploy)        (Manual Gate)

```

### **Status Indicators**

* 🟢 **Ready** - All checks passed, ready for next stage.
* 🟡 **In Progress** - CI running, tests in progress.
* 🔴 **Failed** - Issues found, manual fix required.
* ⏳ **Waiting** - Awaiting manual approval for production.

---

## 🛠️ Tech Stack

* **Frontend**: React 19.2.0, TypeScript 5.6.3
* **Styling**: Tailwind CSS 4.1.14
* **Build Tool**: Vite 7.1.9
* **CI/CD**: GitHub Actions (with manual gates)
* **Hosting**: Cloudflare Pages
* **Analytics**: Google Analytics 4 (`G-ZN8TFPGQ9H`)

---

## 🏗️ Project Structure

```text
bca-website/
├── .github/workflows/   # CI/CD Pipeline Definitions
├── public/              # Static Assets (Images, Icons)
├── src/
│   ├── components/      # UI Atoms & Molecules
│   ├── pages/           # Route-level Components
│   ├── hooks/           # Custom React Logic
│   ├── utils/           # Helper Functions
│   └── types/           # Global TypeScript Interfaces
├── dist/                # Optimized Production Output
└── tailwind.config.js   # Design System Configuration

```

---

## 🚀 Getting Started

### **Local Development**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# URL: http://localhost:5173/

# Build for production locally
npm run build:prod

```

### **Deployment Commands**

* **Sprint Integration**: `git push origin sprint` triggers auto-merge to master.
* **Production Deployment**: Navigate to GitHub Actions → "Manual Production Deployment" → Click **Run workflow** → Type `DEPLOY`.

---

## Pipeline Details

### **1. Sprint Pipeline (`sprint` branch)**

* 🔍 **Quality Check**: ESLint, TypeScript, and Build validation.
* ⚡ **Auto Merge**: Merges to `master` automatically if all checks pass.

### **2. Master Pipeline (`master` branch)**

* 🧪 **Full CI**: Comprehensive testing suite.
* 🌐 **Staging Deploy**: Automatic deployment to the staging environment.
* 📋 **Production Gate**: System waits for manual admin approval.

### **3. Production Pipeline (Manual)**

* 🔒 **Pre-deployment**: Final validation of the production branch.
* 🚀 **Live**: Master merged to Production; site updated via Cloudflare.

---

## 🚨 Maintenance & Emergency

### **Rollback Production**

```bash
git checkout production
git reset --hard <previous-stable-commit>
git push origin production --force

```

### **Hotfix Process**

1. Create `hotfix/` branch from `production`.
2. Apply critical fix and verify.
3. Merge back to both `production` and `master`.

---

**🏆 Built with professional DevOps practices to ensure 99.9% deployment stability.**


