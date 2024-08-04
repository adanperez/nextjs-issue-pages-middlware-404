import Link from 'next/link';
import { NextPageContext } from 'next/types';
import { useRouter } from 'next/router';

export default function Dynamic(props) {
  const router = useRouter();
  return (
    <div>
      <h1>Dynamic / {router.query.slug}</h1>
      <li>
        <Link href="/">Home</Link>
      </li>
    </div>
  );
}

Dynamic.getInitialProps = async (ctx: NextPageContext) => {
  // Lookup the route id after `/dynamic/`  Example: `/dynamic/:id`
  const idToLookUp = ctx.asPath?.split('/')[2];

  console.log('▼▼▼▼▼ Dynamic.getInitialProps ▼▼▼▼▼');
  console.table({ path: ctx.asPath, idToLookUp });
  /**
   * Pretend we only support the ID of `test` from our DB and if the ID is anything else
   * we will return 404 since it was not found in our DB.
   *
   * The following URL is routed here because of middleware: /_next/data/development/dynamic/test.json?slug=test
   * This breaks our split logic above since there are extra paths in the beginning of the URL: `/_next/data/development`
   * We do not find the correct ID of `test` because of those extra paths which gives us the result of `data` instead.
   * We return a 404 here since the result is an ID we don't support.
   * This causes middleware/Next.js to hard route to this page instead of soft routing.
   *
   *  ┌────────────┬─────────────────────────────────────────────┐
   *  │  (index)   │                   Values                    │
   *  ├────────────┼─────────────────────────────────────────────┤
   *  │    path    │ '/_next/data/development/dynamic/test.json' │
   *  │ idToLookUp │                   'data'                    │
   *  └────────────┴─────────────────────────────────────────────┘
   *  ┌────────────┬─────────────────┐
   *  │  (index)   │     Values      │
   *  ├────────────┼─────────────────┤
   *  │    path    │ '/dynamic/test' │
   *  │ idToLookUp │     'test'      │
   *  └────────────┴─────────────────┘
   *
   */
  if (idToLookUp !== 'test') {
    ctx.res!.statusCode = 404;
  }
  console.log('▲▲▲▲▲ Dynamic.getInitialProps ▲▲▲▲▲');
  return { test: true };
};
