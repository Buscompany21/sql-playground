import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the home page.</p>
      <Link href="/module/1/1" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Module 1
      </Link>
      <br />
      <Link href="/module/2/1" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Module 2
      </Link>
    </div>
  );
}
