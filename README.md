# Eli Bendavid - Portfolio Website

Modern, responsive portfolio website showcasing my software engineering projects and skills. Features real-time analytics tracking powered by a custom-built event-driven backend, smooth animations, and a clean, professional design.

🌐 **Live Site**: [eliben8.github.io](https://eliben8.github.io)

## Features

- Modern glassmorphism design with gradient accents
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll animations and transitions
- Typewriter effect for dynamic text
- Real-time analytics dashboard (self-hosted microservices backend)
- GDPR-compliant analytics with consent banner
- Interactive project showcase with expandable sections
- Optimized performance and fast load times

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with Tailwind CDN for utilities
- **Vanilla JavaScript** - No frameworks, pure JS for optimal performance
- **Google Fonts** - Inter & JetBrains Mono typefaces
- **Custom Analytics Backend** - Self-hosted event streaming system ([View Backend Repo](https://github.com/EliBen8/portfolio-analytics))

## 📁 Project Structure
```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Custom styles and animations
├── js/
│   ├── main.js           # UI interactions and effects
│   └── analytics.js      # Analytics tracking integration
├── assets/
│   └── Eli_Bendavid_Resume.pdf
└── README.md
```

## 🎯 Sections

1. **Hero** - Introduction with typewriter effect and live analytics card
2. **About** - Background, experience overview, and interests
3. **Experience** - Professional work history with detailed descriptions
4. **Projects** - Featured projects with tech stacks and achievements
5. **Skills** - Technical skills organized by category
6. **Education** - Academic background and coursework
7. **Contact** - Multiple ways to connect (email, GitHub, LinkedIn)

## 📊 Custom Analytics System

This portfolio includes a production-grade analytics system built from scratch using microservices architecture:

**Tracked Events:**
- Page views and navigation patterns
- Button clicks and user interactions  
- Time spent on site
- Session tracking across visits

**Privacy-First Design:**
- ✅ GDPR compliant with consent banner
- ✅ No third-party trackers (Google Analytics, Facebook Pixel, etc.)
- ✅ Self-hosted and fully controlled
- ✅ Anonymous session tracking only
- ✅ User consent required before any tracking

**Technical Architecture:**
- **Producer Service**: HTTP API that receives events and queues them to Kafka
- **Consumer Service**: Background worker that processes events and saves to PostgreSQL
- **Message Queue**: Kafka (Redpanda) for reliable event streaming
- **Database**: PostgreSQL for analytics data persistence
- **Deployment**: Railway with independent service scaling

The analytics dashboard updates every 30 seconds, displaying real-time stats directly on the homepage.

**Backend Repository**: [github.com/EliBen8/portfolio-analytics](https://github.com/EliBen8/portfolio-analytics)

## 🚀 Local Development

### Prerequisites
- A local web server (Python, Node.js, or VS Code Live Server)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/EliBen8/eliben8.github.io.git
cd eliben8.github.io
```

2. **Serve locally** (choose one method)

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

3. **Visit** `http://localhost:8000`

## Key Features Explained

### Typewriter Effect
Dynamic text animation in the hero section that types out the subtitle character by character, creating an engaging introduction.

### Intersection Observer Animations
Elements smoothly fade in and slide up as you scroll down the page, providing a polished user experience without JavaScript animation libraries.

### Expandable Projects
"Show More Projects" button with smooth height transitions reveals additional work, keeping the initial page load focused on featured projects.

### GDPR Cookie Banner
Consent banner appears on first visit, storing user preferences in localStorage. Analytics only activate after explicit user consent.

### Live Analytics Dashboard
Real-time statistics display embedded in a code snippet on the hero section, updating every 30 seconds when analytics are enabled. Demonstrates the backend system in action.

## 🔒 Privacy & Security

This site is built with privacy as a core principle:
- Analytics only run with explicit user consent
- No personal identifying information collected
- Session IDs are anonymous and temporary
- All data stored securely in private backend
- Users can decline tracking entirely
- No data sold or shared with third parties

## 📬 Contact

**Eli Bendavid**  
Software Engineer | Full-Stack Developer

- 📧 **Email**: [elirbendavid@gmail.com](mailto:elirbendavid@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/eli-bendavid-0763141b8](https://linkedin.com/in/eli-bendavid-0763141b8/)
- 🐙 **GitHub**: [@EliBen8](https://github.com/EliBen8)
- 🌐 **Portfolio**: [eliben8.github.io](https://eliben8.github.io)

## 🎓 Learning Outcomes

Building this portfolio helped me develop skills in:
- Creating responsive, accessible web interfaces
- Implementing smooth animations without heavy libraries
- Building and deploying microservices architecture
- Event-driven system design with message queues
- GDPR compliance and privacy-first development
- Performance optimization and Core Web Vitals