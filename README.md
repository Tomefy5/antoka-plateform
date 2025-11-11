<div align="center">

# 🔐 Antoka

**AI-Powered Legal Document Platform for Madagascar**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

Antoka is a decentralized platform that combines **artificial intelligence** and **blockchain technology** to democratize access to legal documents in Madagascar. We automate legal document generation, detect abusive clauses, enable blockchain-backed electronic signatures, and provide instant verification—all while supporting offline functionality for low-connectivity areas.

### 🎯 Mission

Reduce fraud, accelerate administrative processes, and provide verifiable proof instantly to establish lasting trust between citizens, businesses, and administrations.

### 🌍 Context

In Madagascar, document falsification, identity theft, and lack of reliable proofs slow down contracts, recruitment, and public procedures, costing time and money while increasing inequalities in access to rights.

---

## ✨ Features

### 🤖 AI-Powered Document Generation
- Generate legal documents compliant with Malagasy law from natural language input
- Dual AI strategy: Ollama (local) + Gemini API (cloud fallback)
- Response time target: <30 seconds
- Bilingual support: French & Malagasy

### ⚖️ Automated Clause Analysis
- TensorFlow.js-powered detection of abusive, ambiguous, or illegal clauses
- Risk scoring and detailed explanations
- Automatic correction suggestions
- Real-time document quality assessment

### ⛓️ Blockchain-Backed Signatures
- Tamper-proof signatures anchored on Hedera Testnet
- Immutable hash generation with consensus timestamp
- Fallback to Polygon for high availability
- Verifiable proof generation

### 🔍 One-Click Verification
- Public verification via QR code or link
- Instant authenticity check without login
- Complete audit trail (who, what, when)
- Shareable proof with blockchain explorer link

### 🤝 Real-Time Collaboration
- Multi-user document editing via Google Docs API
- WebSocket-powered live updates
- Version history and comments
- Participant notifications

### 📱 Progressive Web App
- Full offline support with IndexedDB
- Automatic sync when connection restored
- Responsive design for mobile/tablet/desktop
- Installable as native app

### 📊 Analytics & Dashboard
- Document tracking (draft, in review, signed, archived)
- Risk metrics and statistics
- DuckDB-powered analytics
- Exportable reports (CSV/JSON)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Interface Layer                      │
│              (React PWA + Dashboard)                    │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  API Gateway (Express.js)               │
│         Auth -  Routing -  Rate Limiting -  Logs           │
└──┬────────┬────────┬────────┬────────┬────────┬─────────┘
   │        │        │        │        │        │
   ▼        ▼        ▼        ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Auth │ │DocGen│ │Clause│ │Collab│ │Block │ │ ...  │
│      │ │      │ │Analyz│ │      │ │chain │ │      │
└───┬──┘ └───┬──┘ └───┬──┘ └───┬──┘ └───┬──┘ └──────┘
    │        │        │        │        │
    ▼        ▼        ▼        ▼        ▼
┌───────────────────────────────────────────────────────┐
│         Supabase -  IndexedDB -  Google Docs            │
│         Ollama -  Gemini -  TensorFlow -  Hedera         │
└───────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend Services
- **Runtime:** Node.js 18+ with TypeScript
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Authentication:** Supabase Auth with MFA support

### AI & ML
- **Local Generation:** Ollama (privacy-first, offline-capable)
- **Cloud Fallback:** Google Gemini API
- **Clause Detection:** TensorFlow.js with custom models
- **Translation:** Bilingual support (French/Malagasy)

### Blockchain
- **Primary:** Hedera Testnet (Consensus Service)
- **Fallback:** Polygon Testnet
- **SDKs:** @hashgraph/sdk, ethers.js

### Frontend
- **Framework:** React 18 with TypeScript
- **State:** Redux Toolkit / Zustand
- **UI:** Material-UI / TailwindCSS
- **PWA:** Workbox for offline support
- **Real-time:** Socket.io for WebSocket

### Infrastructure
- **Orchestration:** Docker & Docker Compose
- **Monitoring:** Prometheus + Grafana
- **Quality:** SonarQube Community
- **Analytics:** DuckDB
- **Deployment:** Ubuntu/Linux with Nginx

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Docker** & Docker Compose
- **Git**
- **Supabase** account (or self-hosted instance)
- **API Keys:**
  - Gemini API key
  - Google Cloud credentials (for Docs API)
  - Hedera testnet account (operator ID & key)

### Installation

1. **Clone the repository**
```
git clone https://github.com/your-org/antoka-plateform.git
cd antoka-plateform
```

2. **Install dependencies**
```
npm install
```

3. **Configure environment**
```
# Copy example env file
cp infra/env/.env.example infra/env/.env.local

# Edit .env.local with your credentials
nano infra/env/.env.local
```

4. **Start services**
```
# Bootstrap infrastructure
make bootstrap

# Start all services
make up

# View logs
make logs
```

5. **Access the application**
- Frontend: http://localhost:3000
- API Gateway: http://localhost:3000/api/v1
- API Docs: http://localhost:3000/api-docs
- Prometheus: http://localhost:9090
- SonarQube: http://localhost:9000

### Quick Development Setup

```
# Start in development mode with hot reload
npm run dev

# Run specific service
npm run dev -w @antoka/docgen

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

---

## 📁 Project Structure

```
antoka/
├── .github/              # GitHub Actions workflows
├── assets/               # Images, logos, screenshots
├── docs/                 # Documentation
│   ├── architecture/     # Architecture diagrams & ADRs
│   ├── api/              # API documentation
│   └── guides/           # User & developer guides
├── infra/                # Infrastructure configs
│   ├── env/              # Environment templates
│   └── scripts/          # Deployment scripts
├── services/             # Backend microservices
│   ├── api-gateway/      # Main API entry point
│   ├── auth/             # Authentication service
│   ├── docgen/           # Document generation
│   ├── clause-analyzer/  # Risk detection
│   ├── collaboration/    # Real-time editing
│   └── blockchain/       # Signature anchoring
├── web/                  # React PWA frontend
├── shared/               # Shared types & utils
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Common utilities
│   └── constants/        # Enums & configs
├── monitoring/           # Prometheus configs
├── analytics/            # DuckDB scripts
├── tests/                # Integration & E2E tests
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🔧 Configuration

### Required Environment Variables

```
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# AI Services
OLLAMA_BASE_URL=http://ollama:11434
GEMINI_API_KEY=your-gemini-key

# Google Docs
GOOGLE_DOCS_API_CREDENTIALS_PATH=/path/to/credentials.json

# Hedera Blockchain
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.xxxxx
HEDERA_OPERATOR_KEY=your-private-key

# Security
JWT_SECRET=your-strong-secret
CORS_ORIGINS=http://localhost:3000

# Timeouts (milliseconds)
GENERATION_TIMEOUT_MS=30000
API_TIMEOUT_MS=10000
```

See `infra/env/.env.example` for complete list.

---

## 🧪 Testing

```
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific service tests
npm test -w @antoka/docgen

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Load testing
npm run test:load
```

**Coverage Requirements:**
- Critical services: 80%+
- All services: 70%+

---

## 📈 Monitoring & Observability

### Prometheus Metrics

Services expose `/metrics` endpoints with:
- `documents_generated_total`
- `clauses_analyzed_total`
- `signatures_created_total`
- `generation_duration_seconds`
- `http_requests_total`

### Alerts

Configured alerts for:
- Service downtime (>1min)
- High latency (p95 >5s)
- Error rate spike (>5%)
- Blockchain transaction failures

### Logs

Structured JSON logs with:
- Request ID correlation
- User context
- Service name
- Timestamp
- Level (error, warn, info)

---

## 🚢 Deployment

### Production Deployment

```
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to server
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl https://api.antoka.app/health
```

### SSL/TLS Setup

We recommend using Caddy for automatic HTTPS:

```
# Install Caddy
sudo apt install caddy

# Configure reverse proxy
sudo nano /etc/caddy/Caddyfile
```

### Backup Strategy

- **Database:** Daily Supabase backups (automatic)
- **Documents:** Versioned in Supabase with S3 integration
- **Blockchain:** Immutable records on Hedera (no backup needed)
- **Logs:** 30-day retention, archived to S3

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) first.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit with conventional commits (`feat:`, `fix:`, `docs:`)
4. Push to your fork
5. Open a Pull Request

### Code Standards

- **TypeScript:** Strict mode enabled
- **Linting:** ESLint + Prettier
- **Testing:** Jest with 80% coverage minimum
- **Documentation:** JSDoc for all public APIs

### Getting Help

- 📫 **Email:** dev@antoka.app
- 💬 **Discord:** [Join our community](https://discord.gg/antoka)
- 🐛 **Issues:** [GitHub Issues](https://github.com/your-org/antoka/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Hedera Hashgraph for blockchain infrastructure
- Google Gemini for AI capabilities
- Supabase for database and authentication
- The open-source community

---

## 📊 Project Status

🚧 **Active Development** - Currently in MVP phase

- ✅ Core document generation
- ✅ Clause analysis
- ✅ Blockchain signatures
- ✅ Offline support
- 🚧 Real-time collaboration (in progress)
- 📅 KYC verification (planned Q1 2026)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

<div align="center">

**Built with ❤️ in Madagascar**

[Website](https://antoka.app) • [Docs](https://docs.antoka.app) • [API](https://api.antoka.app) • [Status](https://status.antoka.app)

</div>
