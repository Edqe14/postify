import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="container">
      <div>
        <Link href="/">Postify</Link>
      </div>
    </nav>
  );
};
