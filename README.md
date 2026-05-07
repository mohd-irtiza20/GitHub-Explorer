# Gitfolio — AI-Powered GitHub Analytics Dashboard

Gitfolio is a professional, data-driven dashboard that transforms your GitHub profile into a premium visual experience. Powered by Gemini AI, it provides personalized career guidance, developer persona insights, and deep analytics on your contribution performance.

![Gitfolio Screenshot](./public/screenshot.png)

## 🚀 Key Features

- **🤖 AI Persona Insight**: Dynamically generated developer personas based on your top languages and repository topics.
- **💡 AI Learning Path**: Personalized career recommendations and specific documentation links to help you level up your stack.
- **🔥 Performance Analytics**: Real-time tracking of stars, forks, repositories, and contribution streaks.
- **🎨 Material Design UI**: A perfectly polished, bright, and airy dashboard inspired by Google Workspace design, featuring Material Design 3 elevations, rounded cards, and standard brand colors.
- **📸 Card Export**: Save and share your GitHub profile card as a high-quality image.
- **🌐 Global Search**: Explore any GitHub user instantly with real-time data fetching.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini API (via `@google/generative-ai`)
- **Icons**: Lucide React
- **Analytics**: GitHub REST API, GitHub Contributions API

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohd-irtiza20/Gitfolio.git
   cd Gitfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(See `.env.example` for a template)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔒 Production Readiness

Gitfolio is built with production resilience in mind:
- **Multi-Model Fallback**: The AI engine automatically tries multiple Gemini models (`gemini-flash-latest`, `gemini-1.5-flash`, etc.) to ensure high availability.
- **Secure Configuration**: Environment variables are managed securely, and sensitive files are pre-configured in `.gitignore`.
- **Robust Parsing**: Advanced regex-based JSON extraction handles potential noise in AI responses.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for new features or improvements.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Handcrafted with ❤️ by [Mohd Irtiza](https://mohdirtiza.vercel.app/)*
