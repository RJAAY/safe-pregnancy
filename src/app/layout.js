import "./globals.css";

export const metadata = {
  title: "Safe Pregnancy",
  description: "Application de suivi de grossesse personnalisée",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
