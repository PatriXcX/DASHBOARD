import './global.css';
import { Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Asegúrate de incluir los pesos que necesitas
});



export const metadata = {
  title: 'photo viewer',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,}: {children: React.ReactNode}) {

  return (
    <html lang="en" className={montserrat.className}>
      <body> 
        <h1 className="photo-viewer-title">
          Photo Viewer
        </h1>
        {children}
      </body>
    </html>
  )
}
