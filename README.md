# 🎮 E-Sports & Gaming Social Platform API

A robust, scalable RESTful API built for competitive gaming and e-sports platforms. This project utilizes a strictly decoupled **Layered Architecture** (Controller -> Service -> Repository -> Model) to ensure clean code, easy maintenance, and high scalability.

## ✨ Key Features

* **🔐 Authentication & Authorization:** Secure user registration and login using JWT and bcrypt.
* **⚔️ Match & Elo System:** Automated matchmaking result processing. Calculates and updates player Elo ratings dynamically based on match outcomes.
* **🪙 Virtual Economy (E-Coin):** Integrated wallet system. Players earn coins by winning matches.
* **🛒 In-Game Store:** Players can spend their earned E-Coins to buy virtual items (avatars, frames). Includes balance and inventory checks.
* **🤝 Social / Friendship System:** Complete friend request flow (send, accept, reject) using a junction table model to prevent database bloat.
* **🛡️ Global Error Handling:** Centralized error management middleware for consistent API responses.
* **🔌 Real-time Ready:** Pre-configured Socket.io integration for future live chat and matchmaking queues.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Security:** JSON Web Token (JWT), bcrypt
* **Real-time:** Socket.io

## 📂 Architecture (Layered Pattern)

The project follows a strict separation of concerns:
* **Routes:** Directs incoming HTTP requests to the appropriate controllers.
* **Controllers:** Extracts data from requests (params, body, tokens) and passes it to services.
* **Services:** Contains the core business logic and validations.
* **Repositories:** Handles all direct database operations and Mongoose queries.
* **Models:** Defines the MongoDB schemas.

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* MongoDB connection URI

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/emirhan4K/E-Spor-Matchmaking.git](https://github.com/emirhan4K/E-Spor-Matchmaking.git)

