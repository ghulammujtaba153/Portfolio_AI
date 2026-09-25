import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "lenis/dist/lenis.css";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghulam Mujtaba | AI Engineer",
  description:
    "AI Engineer in Islamabad — deep learning, computer vision, NLP, XAI, React Native, and production ML systems. Open to full-time and contract.",
  openGraph: {
    title: "Ghulam Mujtaba | AI Engineer",
    description:
      "Medical imaging, NLU research, generative AI products, and freelance React Native / MERN delivery.",
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
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ThemeProvider>
          <SmoothScroll>
            <ScrollProgress />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
