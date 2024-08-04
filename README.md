# middleware + pages routes + getInitialProps + 404 = hard route

This repo demonstrates an issue we are seeing with the following setup:
- Next.js Middleware.
- Pages Router
- Dynamic page using `getInitialProps`
- getInitialProps

## Issue

- Client navigation from `/` -> `/soft` will do a soft route to the new page as expected.
- Client navigation from `/` -> `/dynamic/test` will do a hard route to the new page **which is NOT expected**.


The following URL of `/_next/data/development/dynamic/test.json?slug=test` is routed to the page `src/pages/dynamic/[...slug].tsx` because of Next.js middleware.
This unexpected URL does not match the expected path structure we look for in the `getInitialProps` function of our `src/pages/dynamic/[...slug].tsx` page.

We do not find the correct ID of `test` because of the extra path structure `/_next/data/development` which gives us the result of `data` instead.

We return a `404` here since the result of our pretend DB lookup is not found when our ID is not `test`.

The returning `404` from the `/_next/data/development/dynamic/test.json?slug=test` request causes middleware/Next.js to hard route to this page instead of soft routing.
