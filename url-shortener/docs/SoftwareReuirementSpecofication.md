# **Software Requirements Specification (SRS)**

## **Project Title:** URL Shortener Application

## **Version:** 1.0

## **Date:** 31 October 2025

## **Author:** Tum-404
---

## **1. Introduction**

### **1.1 Purpose**

This document describes the detailed software requirements for the **URL Shortener Application**. It defines the system functionality, interfaces, performance, security, and design constraints necessary to develop and maintain the application. The target audience includes software developers, system architects, testers, and project managers.

### **1.2 Scope**

The URL Shortener Application enables users to generate short, easily shareable URLs from long web addresses. The system supports both guest and authenticated users, providing URL management, click analytics, and an administrative backend for oversight.
Deliverables include:

* Web-based UI
* RESTful API
* User management system
* Analytics reporting

### **1.3 Definitions and Acronyms**

| Term | Definition                               |
| ---- | ---------------------------------------- |
| URL  | Uniform Resource Locator (web address)   |
| API  | Application Programming Interface        |
| JWT  | JSON Web Token (authentication standard) |
| UI   | User Interface                           |
| DB   | Database                                 |

### **1.4 References**

* BRD: URL Shortener Application, Version 1.0
* IEEE Std 830-1998 – IEEE Recommended Practice for Software Requirements Specifications

---

## **2. Overall Description**

### **2.1 Product Perspective**

The system will operate as a **web-based client-server application** with REST API support.
It will consist of:

* **Frontend:** Web interface React for user interaction.
* **Backend:** API server Node.js/NestJS handling requests, authentication, and data logic.
* **Database:** Stores user accounts, URL mappings, and analytics data.

**Architecture Diagram (Conceptual):**

```
[ User / Browser ]
       ↓
   [ Web UI / API ]
       ↓
 [ Application Server ]
       ↓
     [ Database ]
```

### **2.2 Product Functions**

* Generate short URLs from long URLs.
* Redirect users from short to original URLs.
* Manage URLs through user accounts.
* Track and view analytics for each short link.
* Administer users and system-wide data.

### **2.3 User Classes and Characteristics**

| User Type       | Description                                               | Access Level |
| --------------- | --------------------------------------------------------- | ------------ |
| Guest           | Unauthenticated user; can shorten links only.             | Basic        |
| Registered User | Authenticated user; can create, manage, and analyze URLs. | Standard     |
| Administrator   | Manages users, URLs, and system configurations.           | Full         |

### **2.4 Operating Environment**

* **Frontend:** Modern browsers (Chrome, Edge, Safari, Firefox).
* **Backend:** Node.js 20+ runtime environment.
* **Database:** PostgreSQL.
* **Hosting:** Cloud (AWS / GCP / Azure).

### **2.5 Design and Implementation Constraints**

* RESTful API structure with JSON payloads.
* Must support JWT authentication.
* HTTPS for all endpoints.
* URL hash length: minimum 6 characters, alphanumeric.

### **2.6 User Documentation**

* Online user guide for registered users.
* API documentation (Swagger / OpenAPI).

---

## **3. System Features and Functional Requirements**

### **3.1 URL Shortening**

| **ID**          | **FR-01**                                                                   |
| --------------- | --------------------------------------------------------------------------- |
| **Description** | Users can input a long URL and generate a shortened version.                |
| **Inputs**      | Long URL (string).                                                          |
| **Process**     | System validates URL → generates hash → stores mapping → returns short URL. |
| **Outputs**     | Short URL (string).                                                         |
| **Priority**    | High                                                                        |
| **Exceptions**  | Invalid URL format → Error message.                                         |

---

### **3.2 URL Redirection**

| **ID**          | **FR-02**                                                                        |
| --------------- | -------------------------------------------------------------------------------- |
| **Description** | When a user accesses a short link, they are redirected to the original long URL. |
| **Process**     | System retrieves the original URL by hash and issues HTTP 301 redirect.          |
| **Outputs**     | Redirects to original destination.                                               |
| **Priority**    | High                                                                             |
| **Exceptions**  | If short URL not found → 404 page.                                               |

---

### **3.3 Custom Alias**

| **ID**          | **FR-03**                                                            |
| --------------- | -------------------------------------------------------------------- |
| **Description** | Authenticated users can specify a custom alias for their short link. |
| **Inputs**      | Long URL + custom alias (optional).                                  |
| **Constraints** | Alias must be unique and alphanumeric.                               |
| **Priority**    | Medium                                                               |

---

### **3.4 User Authentication**

| **ID**             | **FR-04**                                                 |
| ------------------ | --------------------------------------------------------- |
| **Description**    | Users can register, log in, and manage sessions securely. |
| **Authentication** | JWT-based, stored in HTTP-only cookies or local storage.  |
| **Priority**       | High                                                      |

---

### **3.5 User Dashboard**

| **ID**             | **FR-05**                                                           |
| ------------------ | ------------------------------------------------------------------- |
| **Description**    | Authenticated users can view all their URLs and analytics data.     |
| **Displayed Data** | Short URL, original URL, total clicks, creation date, custom alias. |
| **Priority**       | High                                                                |

---

### **3.6 Analytics Tracking**

| **ID**          | **FR-06**                                                     |
| --------------- | ------------------------------------------------------------- |
| **Description** | Track link usage data: total clicks, timestamp, IP, referrer. |
| **Storage**     | Each access is logged into the analytics collection.          |
| **Priority**    | Medium                                                        |

---

### **3.7 Admin Management**

| **ID**          | **FR-07**                                            |
| --------------- | ---------------------------------------------------- |
| **Description** | Admin can view/manage all users and URLs.            |
| **Functions**   | Ban users, delete spam links, view global analytics. |
| **Priority**    | Medium                                               |

---

### **3.8 API Access**

| **ID**          | **FR-08**                                                               |
| --------------- | ----------------------------------------------------------------------- |
| **Description** | Expose public REST API endpoints for URL shortening and data retrieval. |
| **Format**      | JSON                                                                    |
| **Auth**        | API key or JWT                                                          |
| **Priority**    | Medium                                                                  |

---

## **4. Data Requirements**

### **4.1 Data Model (Conceptual)**

**Entities:**

1. **User**

   * id (UUID)
   * email
   * password_hash
   * role (user/admin)
   * created_at

2. **URL**

   * id (UUID)
   * original_url
   * short_code
   * custom_alias
   * user_id (nullable for guest)
   * created_at

3. **Analytics**

   * id (UUID)
   * url_id
   * click_time
   * ip_address
   * referrer

---

## **5. External Interface Requirements**

### **5.1 User Interface**

* **Homepage:** Input field for URL shortening.
* **Dashboard:** Displays list of URLs with analytics.
* **Login/Register:** Simple forms for authentication.
* **Admin Panel:** Displays all system records.

### **5.2 API Interface (Sample)**

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/shorten`       | Create short URL       |
| GET    | `/api/:code`         | Redirect to original   |
| GET    | `/api/urls`          | Retrieve all user URLs |
| POST   | `/api/auth/login`    | User login             |
| POST   | `/api/auth/register` | User registration      |

---

## **6. Non-Functional Requirements**

| **Category**        | **Requirement**                                  |
| ------------------- | ------------------------------------------------ |
| **Performance**     | Redirect within ≤ 200 ms                         |
| **Security**        | HTTPS only, input validation, JWT authentication |
| **Availability**    | ≥ 99.5% uptime                                   |
| **Scalability**     | Handle 10,000+ requests/sec                      |
| **Maintainability** | Modular architecture and code documentation      |
| **Usability**       | Simple and responsive UI                         |
| **Data Retention**  | Analytics data stored for 12 months by default   |

---

## **7. System Evolution and Future Enhancements**

* QR code generation for each shortened URL.
* Bulk URL shortening (CSV upload).
* URL expiration scheduling.
* Integration with third-party analytics (e.g., Google Analytics).
* Custom domain support for premium plans.

---

## **8. Appendices**

### **8.1 Tools and Technologies**

* **Backend:** Node.js, NestJS, Express.js
* **Frontend:** React, TailwindCSS
* **Database:** PostgreSQL
* **Auth:** JWT
* **Deployment:** Docker, CI/CD pipeline

---
