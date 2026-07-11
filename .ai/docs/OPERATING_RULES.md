# AI Operating Rules

These rules govern how AI agents should interact with this repository to ensure consistency, safety, and high quality.

## Development Workflow

1.  **Single Source of Truth**: GitHub is the definitive source of truth. All changes must be committed to GitHub.
2.  **Commit Often**: Make logical, atomic commits with clear messages.
3.  **Verify Before Push**: Always run `pnpm build`, `pnpm lint`, and TypeScript checks before pushing changes.
4.  **Lovable Synchronization**: Use Lovable only for live preview and visual verification after syncing from GitHub.

## Coding Standards

- **TypeScript**: Use strict typing. Avoid `any` at all costs.
- **Tailwind CSS**: Prefer utility classes over custom CSS. Use Tailwind 4 features correctly.
- **Components**: Keep components small and focused. Follow the Single Responsibility Principle.
- **Naming**: Use PascalCase for components and camelCase for variables and functions.

## Deployment & Verification

- **Production Build**: Ensure `pnpm build` succeeds without warnings.
- **Responsiveness**: Verify the UI across mobile, tablet, and desktop viewports.
- **Accessibility**: Follow WCAG guidelines. Use semantic HTML and ARIA labels where necessary.
- **Performance**: Monitor bundle size and optimize assets.
