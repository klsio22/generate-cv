# Curriculum Generator (React + TypeScript + Vite)

A simple application to create, edit and export resumes using the ABNT format with an A4 preview and PDF export. The app includes a field editor (name, contact, experience, education, etc.), A4 preview, and PDF generation.

Live demo: https://generate-curriculum-professional.vercel.app/

**Main features**
- Field editor with basic validation and local persistence
- A4 preview and PDF export
- Multiple resumes support (create, duplicate, delete)
- Responsive styles using Tailwind CSS

**Tech stack (approximate versions)**
- React 19
- TypeScript (~5.9)
- Vite
- Tailwind CSS + DaisyUI
- `react-hook-form` (form handling)
- `@react-pdf/renderer` (PDF generation)
- `react-to-print` (printing/export)
- `lucide-react` (icons)

See `package.json` for exact versions.

Getting started (development)

```bash
npm install
npm run dev
```

Build for production

```bash
npm run build
```

Preview the production build locally

```bash
npm run preview
```

Useful project files
- [src/components/CVForm.tsx](src/components/CVForm.tsx) — resume form component
- [src/components/PDFPreview.tsx](src/components/PDFPreview.tsx) — preview and `CVDocument` (PDF)
- [src/components/Sidebar.tsx](src/components/Sidebar.tsx) — resume list and actions
- [src/hooks/useCVStorage.ts](src/hooks/useCVStorage.ts) — local storage and CRUD operations
- [src/data/defaultCV.ts](src/data/defaultCV.ts) — default resume data
- [src/styles/pdfStyles.ts](src/styles/pdfStyles.ts) — PDF styles

Deploying to Vercel

1. Connect the repository to Vercel (or deploy using the Vercel CLI).
2. Environment variables: none required by default.
3. Vercel will detect the project as a Vite/React app; use the standard build command (`npm run build`).

Manual deploy via CLI:

```bash
npm run build
vercel --prod
```

Notes & best practices
- Adjust print settings and PDF margins in [src/styles/pdfStyles.ts](src/styles/pdfStyles.ts).
- Change initial/default values in [src/data/defaultCV.ts](src/data/defaultCV.ts).

Contributing
- Open issues for bugs and feature requests.
- For contributions, create a branch and open a pull request with a description and tests when applicable.

License
- No license included by default. Add a `LICENSE` file (e.g., MIT) if you want to publish under a license.

Contact
- Live project: https://generate-curriculum-professional.vercel.app/

---
If you want, I can:
- add a dedicated `README.en.md` instead of replacing `README.md`;
- create a `LICENSE` file (MIT) and commit it;
- run `git` commands to commit and push these changes for you.

