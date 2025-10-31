# URL Shortener Application

**URL Shortener** is a web-based application that allows users to shorten long URLs into compact, shareable links. The system supports user management, link analytics, and an administrative dashboard for monitoring usage. This project is designed as a Proof of Concept (POC) for clean architecture, scalability, and maintainability.

---

## **Table of Contents**

- [URL Shortener Application](#url-shortener-application)
  - [**Table of Contents**](#table-of-contents)
  - [**Features**](#features)
  - [**Tech Stack**](#tech-stack)
  - [**System Architecture**](#system-architecture)
  - [**Installation**](#installation)
  - [**Usage**](#usage)
  - [**API Endpoints**](#api-endpoints)
  - [**Future Enhancements**](#future-enhancements)
  - [**Contributing**](#contributing)
  - [**License**](#license)

---

## **Features**

* Shorten long URLs into short, easy-to-share links.
* Custom alias for shortened URLs.
* User authentication and management.
* Dashboard for managing URLs and viewing analytics (clicks, timestamps, sources).
* Admin panel for monitoring all users and links.
* REST API for programmatic access to URL shortening.

---

## **Tech Stack**

* **Frontend:** React, TailwindCSS
* **Backend:** Node.js, NestJS / Express
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Docker, CI/CD ready

---

## **System Architecture**

```
[ User / Browser ] → [ Web UI / API ] → [ Backend Server ] → [ Database ]
```

**Components:**

1. **Frontend:** URL input, dashboard, and admin panel UI.
2. **Backend API:** URL shortening, redirection, analytics tracking, and authentication.
3. **Database:** Stores users, URLs, and click analytics.

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/url-shortener.git
cd url-shortener
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configure environment variables:

```env
# .env example
DATABASE_URL=postgres://user:password@localhost:5432/urlshortener
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Run the application:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```

---

## **Usage**

1. Open the web application in your browser: `http://localhost:3000`
2. Enter a long URL and click **Shorten**.
3. Copy or share your short link.
4. For registered users, log in to manage URLs and view analytics.
5. Admins can monitor all users and system-wide statistics.

---

## **API Endpoints**

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/shorten`       | Create a short URL       |
| GET    | `/api/:code`         | Redirect to original URL |
| GET    | `/api/urls`          | Retrieve all user URLs   |
| POST   | `/api/auth/login`    | User login               |
| POST   | `/api/auth/register` | User registration        |

---

## **Future Enhancements**

* QR code generation for each short URL.
* Bulk URL shortening (CSV upload).
* Expiration and deletion scheduling.
* Custom domain support for premium users.
* Advanced analytics with charts and reports.

---

## **Contributing**

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

---

## **License**

This project is licensed under the MIT License.
