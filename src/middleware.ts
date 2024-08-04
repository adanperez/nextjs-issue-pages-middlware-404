import { NextResponse } from 'next/server';

export const middleware = () => {
  const requestHeaders = new Headers();
  requestHeaders.set('x-hello-from-middleware1', 'hello');
  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
};
