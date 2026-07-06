const LLMS_LINK_VALUE = '</llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt"';

export default async (_request, context) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('text/html')) {
    return response;
  }

  const headers = new Headers(response.headers);
  const existingLink = headers.get('Link');
  headers.set('Link', existingLink ? `${existingLink}, ${LLMS_LINK_VALUE}` : LLMS_LINK_VALUE);
  headers.set('X-Llms-Txt', '/llms.txt');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};
