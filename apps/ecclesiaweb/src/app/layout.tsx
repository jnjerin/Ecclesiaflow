import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";

// Font configurations
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ecclesiaflow - AI-Powered Church Management",
  description: "Streamline church operations with collaborative AI agents, smart workflows, and data intelligence.",
  keywords: ["church management","church operations", "AI", "automation", "community"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background">
        {/* Main Navigation */}
        <Navigation />
        
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer - to add later */}
      </body>
    </html>
  );
}
