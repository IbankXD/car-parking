import Header from './Header';
import Navbar from './Navbar';

export default function MobileLayout({ children, hideNav = false, hideHeader = false }) {
  return (
    <div className="app-viewport">
      <div className="mobile-shell">
        {!hideHeader && <Header />}
        <main className="content-scrollable">
          {children}
        </main>
        {!hideNav && <Navbar />}
      </div>
    </div>
  );
}
