# Contributing to Antoka

First off, thank you for considering contributing to Antoka! 🎉 It's people like you who make Antoka a great platform for democratizing access to legal documents in Madagascar.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@antoka.app](mailto:conduct@antoka.app).

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/your-org/antoka/issues) to avoid duplicates.

When you create a bug report, include as many details as possible:

**Use this template:**

```
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Ubuntu 22.04]
 - Browser: [e.g. Chrome 120]
 - Node version: [e.g. 18.17.0]
 - Antoka version: [e.g. 1.2.3]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/your-org/antoka/issues).

**Use this template:**

```
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context, mockups, or screenshots about the feature request.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good-first-issue` - Simple issues perfect for beginners
- `help-wanted` - Issues where we'd appreciate community help
- `documentation` - Improvements to our docs

### Pull Requests

We actively welcome your pull requests! Here's how to contribute code:

1. Fork the repo and create your branch from `develop`
2. Make your changes following our [coding standards](#coding-standards)
3. Write or update tests as needed
4. Ensure all tests pass
5. Update documentation if you've changed APIs or behavior
6. Submit your pull request!

---

## Development Setup

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git
- pnpm (recommended) or npm

### Quick Start

```
# Clone your fork
git clone https://github.com/YOUR_USERNAME/antoka.git
cd antoka

# Add upstream remote
git remote add upstream https://github.com/your-org/antoka.git

# Install dependencies
npm install

# Copy environment template
cp infra/env/.env.example infra/env/.env.local

# Configure your .env.local with required credentials

# Start development environment
make bootstrap
make up

# Run tests
npm test
```

### Running Specific Services

```
# Start only the docgen service
npm run dev -w @antoka/docgen

# Start frontend only
npm run dev -w @antoka/web

# Run tests for specific service
npm test -w @antoka/auth
```

---

## Coding Standards

### TypeScript

- **Strict mode:** Always enabled
- **No `any`:** Use proper types or `unknown` with type guards
- **Explicit return types:** For all public functions/methods
- **Interface over Type:** Prefer `interface` for object shapes

```
// ✅ Good
interface DocumentRequest {
  type: DocumentType;
  content: string;
  language: Language;
}

async function generateDocument(
  request: DocumentRequest
): Promise<LegalDocument> {
  // ...
}

// ❌ Bad
function generateDocument(request: any) {
  // ...
}
```

### Naming Conventions

- **Files:** `kebab-case.ts` (e.g., `document-service.ts`)
- **Classes/Interfaces:** `PascalCase` (e.g., `DocumentGenerator`)
- **Functions/Variables:** `camelCase` (e.g., `generateDocument`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- **Private members:** Prefix with `_` (e.g., `_internalMethod`)

### Code Organization

```
// 1. Imports (grouped)
import { external } from 'external-package';
import { internal } from '@antoka/shared';

// 2. Types/Interfaces
interface ServiceConfig {
  timeout: number;
}

// 3. Constants
const DEFAULT_TIMEOUT = 30000;

// 4. Class/Function implementation
export class DocumentService {
  // ...
}
```

### Testing

- **Coverage:** Minimum 80% for critical services, 70% overall
- **Test files:** Co-located with source as `*.test.ts`
- **Structure:** Arrange-Act-Assert pattern
- **Naming:** `describe('what')` → `it('should do something')`

```
describe('DocumentService', () => {
  describe('generateDocument', () => {
    it('should generate document within 30 seconds', async () => {
      // Arrange
      const service = new DocumentService();
      const request = mockDocumentRequest();
      
      // Act
      const result = await service.generateDocument(request);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.content).toContain('expected text');
    });
  });
});
```

### Error Handling

- **Custom errors:** Extend `Error` class with meaningful names
- **Never swallow errors:** Always log or re-throw
- **Async/await:** Use try-catch blocks
- **User-facing messages:** Clear, actionable, translated

```
// ✅ Good
try {
  const doc = await generateDocument(request);
} catch (error) {
  logger.error('Document generation failed', { error, request });
  throw new DocumentGenerationError('Failed to generate document', { cause: error });
}

// ❌ Bad
try {
  const doc = await generateDocument(request);
} catch (error) {
  console.log(error); // Silent failure
}
```

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification for clear and automated release notes [web:63][web:70].

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature for the user
- **fix:** Bug fix for the user
- **docs:** Documentation only changes
- **style:** Code style changes (formatting, missing semicolons, etc.)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Performance improvement
- **test:** Adding or updating tests
- **build:** Changes to build system or dependencies
- **ci:** Changes to CI configuration files and scripts
- **chore:** Other changes that don't modify src or test files

### Scope

The scope should be the name of the affected package/service:

- `api-gateway`
- `auth`
- `docgen`
- `clause-analyzer`
- `blockchain`
- `collab`
- `web`
- `shared`

### Subject

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Maximum 72 characters

### Examples

```
# Feature
feat(docgen): add Malagasy language support

# Bug fix
fix(auth): resolve JWT token expiration issue

# Documentation
docs(readme): update installation instructions

# Breaking change
feat(api)!: remove deprecated /v1/documents endpoint

BREAKING CHANGE: The /v1/documents endpoint has been removed. 
Use /v2/documents instead.

# With body
fix(blockchain): handle Hedera network timeout gracefully

When Hedera Testnet is unreachable, the service now falls back to 
Polygon instead of throwing an error. Added retry logic with 
exponential backoff.

Fixes #123
```

### Commit Message Validation

We use [commitlint](https://commitlint.js.org/) to enforce these conventions. Your commit will be rejected if it doesn't follow the format [web:70].

---

## Pull Request Process

### Before Submitting

- [ ] **Run tests:** `npm test` - All tests must pass
- [ ] **Run linter:** `npm run lint` - No linting errors
- [ ] **Check coverage:** Coverage should not decrease
- [ ] **Update docs:** If you changed APIs or behavior
- [ ] **Self-review:** Review your own code first
- [ ] **Rebase:** Ensure your branch is up-to-date with `develop`

### Pull Request Size [web:68][web:71]

Keep PRs **small and focused**:

- **Small PRs** (<200 lines): Easier to review, faster to merge
- **Medium PRs** (200-500 lines): Should be well-structured with clear scope
- **Large PRs** (>500 lines): Break into smaller PRs if possible

If you must submit a large PR:
- Provide detailed description
- Break commits into logical chunks
- Consider using stacked PRs [web:71]

### PR Title Format [web:66]

Use Conventional Commits format:

```
<type>(<scope>): <description>
```

Examples:
- `feat(docgen): add batch document generation`
- `fix(auth): resolve session timeout issue`
- `docs: update contributing guidelines`

### PR Description Template

```
## Description
Brief description of what this PR does and why.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Related Issue
Closes #[issue number]

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe the tests you ran and how to reproduce:
1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### PR Workflow

1. **Create PR** against `develop` branch (not `main`)
2. **CI checks** must pass (tests, lint, build)
3. **Request reviewers** (at least 1, preferably 2)
4. **Address feedback** promptly and professionally
5. **Resolve conflicts** if develop has moved forward
6. **Squash and merge** once approved

---

## Code Review Guidelines

### For Authors [web:69][web:72]

**Before requesting review:**
- [ ] Code is complete and tested
- [ ] All CI checks pass
- [ ] Self-reviewed for obvious issues
- [ ] Documentation updated
- [ ] No debug code, console.logs, or commented code
- [ ] Commits are well-organized and follow conventions

**During review:**
- Respond to feedback within 24-48 hours
- Ask for clarification if feedback is unclear
- Be open to suggestions - reviewers want to help!
- Don't take criticism personally
- Mark conversations as resolved after addressing

### For Reviewers [web:69][web:72]

**Review checklist:**
- [ ] **Functionality:** Does it work as intended?
- [ ] **Tests:** Are changes covered by tests?
- [ ] **Code quality:** Is it readable and maintainable?
- [ ] **Standards:** Follows project conventions?
- [ ] **Performance:** No obvious bottlenecks?
- [ ] **Security:** No vulnerabilities introduced?
- [ ] **Documentation:** Clear and up-to-date?

**Providing feedback:**
- Be respectful and constructive
- Explain *why* something should change
- Distinguish between blocking and non-blocking comments
- Praise good code - positive feedback matters!
- Use GitHub suggestions for small fixes
- Provide examples when possible

**Comment prefixes:**
- `🔴 Blocker:` Must be fixed before merge
- `🟡 Suggestion:` Nice to have but not required
- `💡 Nitpick:` Minor style preference
- `❓ Question:` Seeking clarification
- `✅ Looks good!` Positive reinforcement

### Review Response Time

- **Initial review:** Within 1 business day
- **Follow-up reviews:** Within 1 business day
- **Urgent/Hotfix PRs:** Within 4 hours

If you can't review in time, assign another reviewer or comment on the PR.

### Approval Requirements

- **Minimum:** 1 approval from a maintainer
- **Recommended:** 2 approvals for critical changes
- **Required:** 2+ approvals for:
  - Breaking changes
  - Security-related changes
  - Database migrations
  - Infrastructure changes

---

## Community

### Getting Help

- **Discord:** [Join our community](https://discord.gg/antoka)
- **GitHub Discussions:** For questions and discussions
- **Email:** dev@antoka.app for private inquiries

### Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Invited to monthly contributor calls

---

## License

By contributing to Antoka, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing to Antoka! 🚀**

Together, we're building a platform that democratizes access to legal documents in Madagascar.
