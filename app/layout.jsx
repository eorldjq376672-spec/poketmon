import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: '포켓몬 가치(Value) 체크',
  description: '실시간 포켓몬 카드 시세 및 정보 확인',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
