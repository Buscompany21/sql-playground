import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the home page.</p>
      <Link href="/trendy-sql-editor" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Trendy SQL Editor
      </Link>
    </div>
  );
}
