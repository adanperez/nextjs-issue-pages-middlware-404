import Link from 'next/link';

export default function Soft() {
  return (
    <div>
      <h1>Soft</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dynamic/test">Dynamic/test</Link>
        </li>
      </ul>
    </div>
  );
}
