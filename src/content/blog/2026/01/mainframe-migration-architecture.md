---
title: "Mainframe Migration Strategies: Modular Monoliths & Security"
description: "A comprehensive guide to replacing legacy mainframe systems with modern Java architectures, featuring Modular Monoliths, centralized transactions, and RACF-style security."
pubDate: "2026-01-26"
categories: ["Architecture", "Migration"]
tags: ["mainframe", "migration", "architecture", "security", "keycloak", "quarkus"]
heroImage: "/images/mainframe-to-cloud.png"
author: "Divya van Mahajan"
draft: true
---

# Introduction

Replacing legacy mainframe systems is one of the toughest challenges in software engineering. This article dives into how to replace systems like CICS and RACF with modern Java architectures, focusing on **modular monoliths** and **centralized transactions**. We'll look at why 'modern' microservices aren't always the answer and how to apply mainframe discipline to distributed systems.

We examine how to bring mainframe-inspired discipline to modern Java monoliths, through **modular design, centralized transaction management, batch and online processing integration, and RACF-style authorization**. Using Keycloak, a monolith can enforce centralized, auditable, resource-based access controls similar to RACF, with stable resource names, explicit action checks, and comprehensive auditing. Compared with SAP-style authorization, Keycloak provides more flexible hierarchical resources and better cloud integration while maintaining centralized policy decision-making. The overarching lesson is that modern systems often layer complexity to compensate for flexibility, whereas the **mainframe principles of discipline, cohesion, and predictable transactions** remain highly effective when consciously applied.

---

## 1. Replacing Mainframe Applications

- Principle: prioritize **correctness and predictability**
- Architecture: modular monolith first, microservices later
- Recommended stack:
  - **Runtime:** Quarkus (JVM mode initially)
  - **Architecture:** Modular Monolith
  - **Domain:** Clean Architecture / DDD
  - **Persistence:** RDBMS + JPA
  - **Transactions:** JTA
  - **APIs:** JAX-RS
  - **Messaging:** Kafka for integration
  - **Security:** OIDC / IAM
  - **Deployment:** Containers or VMs

- Batch workloads:
  - Spring Batch or scheduled jobs
  - Reuse same services for batch and online processing

- Key migration principle: **Strangler Pattern**
  - Wrap mainframe APIs
  - Incrementally replace capabilities
  - Dual-run and reconcile outputs

---

## 2. CICS and DB2 Replacements

- **CICS replacement:**
  - Java service classes + JTA transactions
  - Explicit resource handling
  - REST endpoints or message handlers replace synchronous CICS programs
- **DB2 / Database workloads:**
  - Relational databases remain (PostgreSQL, Oracle, DB2)
  - JPA for access, SQL for heavy transactions
  - Batch processing handled with frameworks and scheduling
- Core challenge: recreate **CICS predictability** in distributed systems

---

## 3. Why Modern Replacements Are Complex

- CICS is compact due to:
  - Vertical integration
  - Locality assumptions
  - Implicit discipline
- Modern systems are distributed:
  - Multiple components (DB, MQ, schedulers, IAM)
  - Explicit transaction boundaries
  - Fault tolerance across nodes
- Many cloud services are “mainframe concepts with new names”:
  - **Lambda → CICS transactions**
  - **RDS / Aurora → DB2 / VSAM**
  - **SQS / PubSub → TSQ / TDQ**
  - **Step Functions → JCL workflows**
  - **IAM → RACF**
  - **CloudWatch → SMF / RMF**
  - **Auto-scaling → Workload Manager**
- Complexity often compensates for flexibility and lack of centralized discipline

---

## 4. Modular Monolith Design (CICS-style)

- Structure:

```
app/
├── core-domain/
│   ├── account/
│   ├── ledger/
│   ├── customer/
├── application/
│   ├── usecases/
│   ├── transactions/
├── infrastructure/
│   ├── persistence/
│   ├── messaging/
│   ├── security/
├── interfaces/
│   ├── rest/
│   ├── batch/
│   ├── messaging/
```

- Rules:
  - Core domain is framework-agnostic
  - Modules communicate via interfaces only
  - Transactions centralized (JTA)
  - Bounded thread pools, backpressure, reject early
  - Batch and online processing share code paths

---

## 5. RACF-Style Authorization

- Centralized, auditable, resource-based
- Concepts:
  - **Subject:** User / Service
  - **Resource:** Stable, hierarchical name (`ACCOUNT:12345`, `LEDGER:POST`)
  - **Action:** READ, UPDATE, EXECUTE
- Enforcement pattern:

```java
public class AccountService {
    private final KeycloakAuthService auth;

    public void withdrawMoney(Subject subject, String accountId, BigDecimal amount) {
        auth.check(subject, "ACCOUNT:" + accountId, Action.UPDATE);
        // business logic follows
    }
}
```

* Policies stored in Keycloak as data, not code
* Default deny if no match
* Full audit trail
* Enforce at **use-case boundaries**, not controllers or repositories

---

## 6. Keycloak vs SAP Authorization

| Aspect      | Keycloak (RACF-style)      | SAP                                         |
| ----------- | -------------------------- | ------------------------------------------- |
| Model       | Subject-Resource-Action    | User-Role-Object-Activity                   |
| Enforcement | Central API or JWT         | Embedded in app/module                      |
| Granularity | Fine-grained, hierarchical | Coarse to medium                            |
| Policy      | Data-driven, dynamic       | Role assignments; admin-heavy               |
| Audit       | Central logs + events      | Logs + table-driven checks                  |
| Flexibility | High, dynamic resources    | Limited; adding new objects is admin effort |
| Cloud-ready | Yes                        | Limited (SAP modules only)                  |

* RACF-style can mimic SAP object/activity model with more flexibility and hierarchical resources

---

## 7. Honest Lessons

* Modern complexity is often unnecessary:

  * Microservices inside a single domain
  * Event-driven logic for CRUD
  * Kubernetes, service meshes, reactive programming for transactional code
* Real benefits come from:

  * Centralized transaction management
  * Modular monolith discipline
  * Explicit, auditable authorization
  * Stable resource naming and policy enforcement
* Mainframe principles of discipline, cohesion, and predictable transactions still apply and reduce operational and security complexity

---

## 8. Summary

* Modern Java can replace mainframes using **modular monoliths**, **centralized transactions**, and **RACF-style authorization**, leveraging frameworks like **Quarkus** and **Keycloak**.
* Cloud services often replicate mainframe features under new names.
* CICS and RACF lessons — compact, integrated, auditable, predictable systems — are still highly relevant.
* Avoid unnecessary complexity by enforcing discipline at the architecture level, centralizing transactions, and treating authorization and audit as first-class concerns.
