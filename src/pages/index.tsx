import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/soft">Soft</Link>
        </li>
        <li>
          <Link href="/dynamic/test">Dynamic/test</Link>
        </li>
      </ul>
    </div>
  );
}
