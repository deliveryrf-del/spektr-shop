export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="p-4">
        {children}
      </body>
    </html>
  );
}
