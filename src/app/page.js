import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the home page.</p>
      <Link href="/module1" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Module 1
      </Link>
      <br></br>
      <Link href="/module2" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Module 2
      </Link>
    </div>
  );
}
