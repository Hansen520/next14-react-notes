/*
 * @Date: 2024-01-24 18:01:39
 * @Description: description {}
 */
import "./style.css";
import Sidebar from "@/components/Sidebar";
import Header from '@/components/Header';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
