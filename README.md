# TaskFlow - Modern Task Management Application

A beautiful, interactive task management web application with a distinctive brutalist-meets-modern aesthetic. Built with vanilla JavaScript, CSS3, and HTML5, containerized with Docker for easy deployment.

![TaskFlow](https://img.shields.io/badge/version-1.0-blue)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Beautiful UI/UX**: Modern, bold design with smooth animations and transitions
- **Task Management**: Create, complete, and delete tasks with ease
- **Priority Levels**: Organize tasks by High, Medium, or Low priority
- **Smart Filtering**: View all tasks, pending only, or completed only
- **Real-time Stats**: Live dashboard showing total, completed, and pending tasks
- **Local Storage**: Tasks persist across browser sessions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Press `Ctrl/Cmd + K` to focus task input
- **Accessibility**: Built with accessibility best practices
- **Docker Ready**: Easy deployment with Docker and Docker Compose

## 🎨 Design Highlights

- Custom color palette with vibrant accents (Orange, Yellow, Cyan)
- Distinctive typography using Archivo Black and DM Sans
- Animated backgrounds and micro-interactions
- Brutalist-inspired card design with bold borders
- Smooth state transitions and loading animations

## 🚀 Quick Start

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

### Using Docker Compose (Recommended)

1. **Clone or download the project files**

2. **Build and run the container:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Using Docker

1. **Build the Docker image:**
   ```bash
   docker build -t taskflow-app .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 8080:80 --name taskflow taskflow-app
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:8080`

4. **Stop and remove the container:**
   ```bash
   docker stop taskflow
   docker rm taskflow
   ```

### Without Docker

Simply open `index.html` in a modern web browser. For best results, use a local development server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (http-server)
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then navigate to `http://localhost:8080`

## 📦 Project Structure

```
taskflow/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Application logic and interactivity
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose orchestration
├── nginx.conf          # Custom Nginx configuration
├── .dockerignore       # Docker ignore patterns
└── README.md           # This file
```

## 🎯 Usage Guide

### Adding a Task
1. Type your task in the input field
2. Select priority level (Low, Medium, High)
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete**: Click the checkbox to mark as complete
- **Delete**: Click the "Delete" button on any task
- **Filter**: Use tabs to view All, Pending, or Completed tasks

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Focus task input field
- `Enter`: Add new task (when input is focused)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Nginx (Alpine Linux)
- **Containerization**: Docker & Docker Compose
- **Storage**: Browser LocalStorage
- **Fonts**: Google Fonts (Archivo Black, DM Sans)

## 🔧 Configuration

### Port Configuration
Default port is `8080`. To change it, edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:80"
```

### Nginx Configuration
Custom Nginx settings are in `nginx.conf`. Includes:
- Gzip compression
- Security headers
- Static asset caching
- Error page handling

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #FF6B35;      /* Main accent color */
    --secondary: #F7F052;    /* Secondary accent */
    --background: #0A0E27;   /* Background */
    /* ... more variables */
}
```

### Fonts
Change fonts in the HTML `<head>` and CSS:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📊 Performance

- Lightweight: < 50KB total size
- Fast load times with Nginx
- Optimized CSS animations
- Efficient DOM manipulation
- Gzip compression enabled

## 🔒 Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header
- Referrer-Policy configuration
- Hidden files protection

## 🚀 Deployment Options

### Docker Hub
```bash
# Tag the image
docker tag taskflow-app your-username/taskflow:1.0

# Push to Docker Hub
docker push your-username/taskflow:1.0
```

### Cloud Platforms
- **AWS ECS/Fargate**: Use the Dockerfile
- **Google Cloud Run**: Deploy container directly
- **Azure Container Instances**: Use Docker image
- **Heroku**: Deploy with container registry
- **DigitalOcean App Platform**: Deploy from GitHub

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- [ ] User authentication
- [ ] Cloud sync
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Dark/Light theme toggle
- [ ] Export/Import tasks
- [ ] Task search functionality
- [ ] Drag and drop reordering
- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support

## 🙏 Acknowledgments

- Google Fonts for typography
- Nginx for reliable web serving
- Docker for containerization
- The open-source community

## 📧 Contact

For questions or feedback, please open an issue on the project repository.

---

**Built with ❤️**
