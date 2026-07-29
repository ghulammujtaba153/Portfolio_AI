import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import CursorGlow from "@/components/layout/CursorGlow";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ghulam Mujtaba | AI Full Stack Engineer",
  description:
    "AI Full Stack Engineer in Islamabad — MERN, LangGraph, RAG systems, and production AI products from research to cloud deployment.",
  openGraph: {
    title: "Ghulam Mujtaba | AI Full Stack Engineer",
    description:
      "Portfolio of AI-integrated products — RAG pipelines, multimodal agents, and full-stack MERN systems.",
    url: "https://portfolio-uay6.vercel.app/",
    type: "website",
  },
};

const themeInitScript = `
(function(){
  try {
    var key = 'portfolio-theme';
    var mode = localStorage.getItem(key) || 'dark';
    var dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ThemeProvider>
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
