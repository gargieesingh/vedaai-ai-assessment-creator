<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gargieesingh/vedaai-ai-assessment-creator">
    <img src="frontend/public/logo 2.svg" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">VedaAI</h3>

  <p align="center">
    The smartest way to create AI-powered question papers
    <br />
    <a href="https://github.com/gargieesingh/vedaai-ai-assessment-creator"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://vedaai-ai-assessment-creator.vercel.app">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

VedaAI is a full-stack, state-of-the-art web application designed for educators, teachers, and examiners to seamlessly create and manage professional question papers in seconds. Generating comprehensive test assessments manually is a tedious, repetitive task; VedaAI solves this by leveraging Google Gemini's advanced generative capabilities to produce structured, curriculum-compliant assessments and complete answer keys with customizable parameters.

Here's why VedaAI stands out:
* **Efficiency First** — Save valuable preparation hours by letting AI draft highly customized question pools.
* **Curriculum Fit** — Fully configure questions based on subject, target grade/class, specific topics, multiple formats, and weightage.
* **Real-time Processing** — Live progress feedback through real-time socket connections, preventing timeouts on complex generations.
* **Professional Layouts** — Auto-generated clean PDF export directly downloadable for immediate classroom printouts.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section lists the primary frameworks, languages, and core libraries used to bootstrap the application.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![Clerk][Clerk]][Clerk-url]
* [![Express][Express]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Redis][Redis]][Redis-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To set up a local copy of VedaAI on your machine for development and testing, follow these steps.

### Prerequisites

* **Node.js**
  Make sure you have Node.js version 18.x or above installed.
  ```sh
  node --version
  ```
* **NPM Package Manager**
  ```sh
  npm install npm@latest -g
  ```
* **External Services Setup**
  * A free **Clerk** account for user authentication.
  * A **Google Gemini API Key** for artificial intelligence model access.
  * A **MongoDB** database instance (Atlas cloud or local).
  * A **Redis** server instance (Upstash or local) to support the background BullMQ generation queue.

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/gargieesingh/vedaai-ai-assessment-creator.git
   ```
2. Set up the Backend
   ```sh
   cd vedaai-ai-assessment-creator/backend
   npm install
   ```
3. Configure Backend Environment Variables
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://your_mongodb_connection_string
   REDIS_URL=redis://your_redis_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   FRONTEND_URL=http://localhost:3001
   ```
4. Start the Backend API Server
   ```sh
   npm run dev
   ```
5. Set up the Frontend
   Open a new terminal window:
   ```sh
   cd vedaai-ai-assessment-creator/frontend
   npm install
   ```
6. Configure Frontend Environment Variables
   Create a `.env.local` file in the `frontend` folder:
   ```env
   PORT=3001
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```
7. Start the Frontend Development Server
   ```sh
   npm run dev
   ```
8. Open [http://localhost:3001](http://localhost:3001) in your browser to view VedaAI.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

VedaAI provides an intuitive, high-performance interface to orchestrate assessment tasks:

* **Assignment List Dashboard** — Visually inspect previously created assignments, query details, check statuses, and manage items with single-click deletes.
* **Interactive Assessment Wizard** — A dynamic, highly interactive step-by-step creation flow allowing detailed parameterization: subjects, grade level, topics, question counts, target marks, and customized due dates.
* **Live Creation Tracker** — BullMQ queues coordinate generations off the main threads, sending instant progress steps back to the user interface using socket connections.
* **Curated Output Page** — Fully compiled assessment lists complete with organized answer keys, complete with ready-to-print PDF outputs utilizing `@react-pdf/renderer`.

### App Pages and Routes

| Route | Description | Auth Required |
|---|---|---|
| `/` | Root portal redirecting users based on authentication status | No |
| `/sign-in` | Highly customized centered Clerk credentials gate | No |
| `/sign-up` | Highly customized centered Clerk registration gate | No |
| `/assignments` | Main list panel showcasing existing assignments and status indicators | Yes |
| `/assignments/create` | Interactive multi-step form wizard to request new paper configurations | Yes |
| `/assignments/output` | High-fidelity presentation panel for final exam prints, key sheets, and PDF actions | Yes |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://vedaai-ai-assessment-creator.vercel.app](https://vedaai-ai-assessment-creator.vercel.app) 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/gargieesingh/vedaai-ai-assessment-creator.svg?style=for-the-badge
[contributors-url]: https://github.com/gargieesingh/vedaai-ai-assessment-creator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gargieesingh/vedaai-ai-assessment-creator.svg?style=for-the-badge
[forks-url]: https://github.com/gargieesingh/vedaai-ai-assessment-creator/network/members
[stars-shield]: https://img.shields.io/github/stars/gargieesingh/vedaai-ai-assessment-creator.svg?style=for-the-badge
[stars-url]: https://github.com/gargieesingh/vedaai-ai-assessment-creator/stargazers
[issues-shield]: https://img.shields.io/github/issues/gargieesingh/vedaai-ai-assessment-creator.svg?style=for-the-badge
[issues-url]: https://github.com/gargieesingh/vedaai-ai-assessment-creator/issues
[license-shield]: https://img.shields.io/github/license/gargieesingh/vedaai-ai-assessment-creator.svg?style=for-the-badge
[license-url]: https://github.com/gargieesingh/vedaai-ai-assessment-creator/blob/main/LICENSE
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Clerk]: https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white
[Clerk-url]: https://clerk.com/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Redis]: https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
