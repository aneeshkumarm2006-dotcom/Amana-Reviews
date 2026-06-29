import { NextResponse, type NextRequest } from 'next/server';
import { affiliateUrl } from '@/data/brokers';

/**
 * Cloaked, tracked affiliate redirect: /go/<broker-slug>.
 * Logs the click (broker, referrer, timestamp) then 307-redirects to the partner URL.
 */
export function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const target = affiliateUrl(params.slug);
  // Click tracking hook — wire to analytics / DB here.
  console.log('[affiliate-click]', JSON.stringify({ broker: params.slug, ref: req.headers.get('referer') || null }));
  return NextResponse.redirect(target, 307);
}
