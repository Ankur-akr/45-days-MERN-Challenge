# MERN Ascent - Day 18: API Deployment & Production

This repository includes a production-ready API scaffold (Express + MongoDB) plus deployment artifacts:
- Docker multi-stage build
- docker-compose for local production environment
- Kubernetes manifests for scalable deployment
- GitHub Actions CI/CD example
- Prometheus metrics endpoint and Winston logging
- Security middleware (Helmet, rate limiting), JWT auth, redis for caching

See `server/` for the API code. Copy `.env.example` to `.env` and edit secrets before running.
