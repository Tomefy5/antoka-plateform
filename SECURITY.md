# Security Policy

## Our Commitment

At Antoka, we take the security of our platform and users' data seriously. We appreciate the efforts of security researchers and the community in helping us maintain the security and privacy of our platform.

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

**Note:** Only the latest minor version of each major release receives security updates.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability, please report it by emailing:

**security@antoka.app**

### What to Include in Your Report

To help us understand and address the issue quickly, please include:

1. **Description**: A clear description of the vulnerability
2. **Impact**: What an attacker could achieve by exploiting it
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Proof of Concept**: Code, screenshots, or videos demonstrating the vulnerability (if possible)
5. **Affected Components**: Which parts of Antoka are affected (e.g., API Gateway, DocGen service, PWA)
6. **Affected Versions**: Which version(s) are vulnerable
7. **Suggested Fix**: If you have recommendations (optional)
8. **Your Contact Information**: How we can reach you for follow-up

### Example Report Format

```
Subject: [SECURITY] SQL Injection in Document API

Description:
SQL injection vulnerability in the /api/v1/documents endpoint allows 
attackers to execute arbitrary SQL queries.

Impact:
An attacker could read, modify, or delete sensitive document data from 
the database.

Steps to Reproduce:
1. Send POST request to /api/v1/documents
2. In the 'type' parameter, inject: ' OR '1'='1
3. Observe unauthorized data access

Proof of Concept:
[attached screenshot or code]

Affected Components:
- API Gateway: services/api-gateway/src/routes/documents.ts
- Database: All document queries

Affected Versions:
v1.2.0 - v1.3.5

Suggested Fix:
Use parameterized queries instead of string concatenation
```

## Response Timeline

We strive to respond to security reports as quickly as possible:

- **Initial Response**: Within 48 hours
- **Triage & Assessment**: Within 7 days
- **Fix Development**: Within 30 days (depending on severity)
- **Public Disclosure**: After fix is released and deployed

### Severity Levels

We classify vulnerabilities using the following severity levels:

| Severity | Description | Response Time |
|----------|-------------|---------------|
| **Critical** | Allows unauthorized access to user data, authentication bypass, or remote code execution | Fix within 7 days |
| **High** | Significant impact on security or privacy, but requires specific conditions | Fix within 30 days |
| **Medium** | Limited impact or requires user interaction | Fix within 60 days |
| **Low** | Minimal security impact or theoretical vulnerability | Fix in next release |

## Disclosure Policy

We follow **coordinated vulnerability disclosure**:

1. **You report** the vulnerability privately to security@antoka.app
2. **We acknowledge** your report within 48 hours
3. **We investigate** and develop a fix
4. **We notify you** when the fix is ready for testing
5. **We deploy** the fix to production
6. **We publicly disclose** the vulnerability 30 days after the fix is deployed (or sooner with your agreement)
7. **We credit you** in our security advisory (if you wish)

### Embargo Period

We request that you keep the vulnerability confidential until:
- A fix has been deployed to production
- 30 days have passed since disclosure to us
- We have explicitly agreed to public disclosure

## Scope

### In-Scope

The following components are in scope for vulnerability reports:

✅ **Backend Services**
- API Gateway (`services/api-gateway`)
- Authentication Service (`services/auth`)
- Document Generation Service (`services/docgen`)
- Clause Analyzer Service (`services/clause-analyzer`)
- Blockchain Service (`services/blockchain`)
- Collaboration Service (`services/collaboration`)

✅ **Frontend**
- Progressive Web App (`web/`)

✅ **Infrastructure**
- Docker configurations
- CI/CD pipelines
- Deployment scripts

✅ **Dependencies**
- Critical vulnerabilities in npm packages
- Outdated libraries with known security issues

### Out-of-Scope

The following are NOT eligible for security reports:

❌ **Low-Impact Issues**
- Missing HTTP security headers (CSP, X-Frame-Options, etc.) without demonstrated impact
- Missing rate limiting without proof of exploitation
- Self-XSS (requires user to paste malicious code)
- Reports from automated scanners without manual verification

❌ **Known Issues**
- Vulnerabilities in development/staging environments
- Issues already reported and acknowledged

❌ **Social Engineering**
- Phishing attacks
- Physical attacks
- Social engineering of staff or users

❌ **Denial of Service**
- DDoS attacks
- Resource exhaustion through automated tools

❌ **Third-Party Services**
- Vulnerabilities in Supabase, Hedera, Google Docs API, or other external services
  (please report these directly to the respective vendors)

## Safe Harbor

We support safe harbor for security researchers who:

- Make a good faith effort to avoid privacy violations, data destruction, and service interruption
- Only interact with accounts you own or with explicit permission from the account holder
- Do not exploit a security vulnerability beyond the minimal amount necessary to prove it exists
- Comply with this security policy

We will not pursue legal action against researchers who follow these guidelines.

## Bug Bounty Program

We currently do **not** offer a paid bug bounty program. However:

- We publicly acknowledge security researchers who report valid vulnerabilities (with their permission)
- We may offer Antoka credits or swag for significant reports
- We are considering launching a formal bug bounty program in Q2 2026

## Recognition

We maintain a [Security Hall of Fame](docs/SECURITY_HALL_OF_FAME.md) to recognize researchers who have helped improve Antoka's security.

## Security Best Practices for Contributors

If you're contributing code to Antoka:

- ✅ Use parameterized queries (never concatenate SQL)
- ✅ Validate and sanitize all user inputs
- ✅ Use secure authentication (JWT with short expiry)
- ✅ Keep dependencies up-to-date (`npm audit`)
- ✅ Never commit secrets or credentials
- ✅ Follow OWASP Top 10 guidelines
- ✅ Write security-focused tests

## Security Updates

We publish security advisories at:

- **GitHub Security Advisories**: [https://github.com/your-org/antoka/security/advisories](https://github.com/your-org/antoka/security/advisories)
- **Email Notifications**: Subscribe at security@antoka.app
- **Status Page**: [https://status.antoka.app](https://status.antoka.app)

## Contact

For security-related questions or concerns:

- **Email**: security@antoka.app
- **PGP Key**: [Download our PGP key](docs/security-pgp-key.asc) for encrypted communications
- **Response Time**: We aim to respond within 48 hours

For general questions, please use:
- **General Support**: support@antoka.app
- **GitHub Discussions**: [https://github.com/your-org/antoka/discussions](https://github.com/your-org/antoka/discussions)

---

**Thank you for helping keep Antoka and our users safe! 🔒**
