import '../components/Navbar';
import '../../style.css'; // Global styles

export const metadata = {
  title: 'Vishal Bansal | Senior UI/UX Developer',
  description: 'Professional Portfolio of Vishal Bansal - Senior UI/UX + WordPress Developer. Discover stunning designs and pixel-perfect code.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
