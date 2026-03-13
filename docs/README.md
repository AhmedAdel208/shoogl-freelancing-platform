# 📚 Shoogl Platform Architecture & Documentation

Welcome to the official developer documentation for **Shoogl**. This guide is designed to be modern, incredibly detailed, and highly visual.

Whether you're onboarding a new developer, reviewing architecture decisions, or trying to trace a bug through our React Query lifecycles, these guides cover every facet of our core systems.

---

## 🌟 Deep Dive Feature Guides

We have mapped out our most complex systems with Mermaid sequence diagrams, flow charts, and line-by-line TypeScript analysis.

### 1. [💬 The Real-Time Chat System](./chat-system.md)
Discover how we built our ultra-responsive multi-layered messaging ecosystem.
* **Architecture:** SignalR (WebSockets) + React Query + Zustand.
* **Topics Covered:** 
  * Hub Transport Layer & Reconnection Strategies.
  * Message invalidation lifecycles.
  * "Message Me" URL Injection & Auto-Routing.
  * Creating resilient optimistic state updates.

### 2. [🔔 The Notification Ecosystem](./notification-system.md)
Learn about our lightning-fast asynchronous notification delivery system.
* **Architecture:** React Query (Smart Polling + Optimistic Integrations) + REST APIs.
* **Topics Covered:** 
  * Deep dive into cross-tab background synchronization.
  * The Magic of Optimistic UI updates (0ms latency UI changes).
  * The internal Dynamic Routing logic for action-driven events.

---

> **💡 Best Practices Tip:** 
> Our entire application leans heavily on `React Query` serving as a centralized, reactive state manager. Before diving into the feature documents, make sure you understand the difference between `queryClient.setQueryData` (synchronous UI updates) and `queryClient.invalidateQueries` (asynchronous server synchronization).
