import '../globals.css';

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#AC884D" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-muted-50 to-white">
        {children}
      </body>
    </html>
  );
}
