/**
 * Mock API Latency Controller
 *
 * In production or high-performance browsing mode, artificial delays are set to 0ms
 * to eliminate render-blocking waterfalls and prevent artificial spin/loading screen lockups.
 * Set NEXT_PUBLIC_ENABLE_MOCK_DELAY="true" in .env.local if you want to simulate network latency.
 */
const IS_DELAY_ENABLED =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_ENABLE_MOCK_DELAY === "true";

export async function mockDelay(ms: number = 0): Promise<void> {
  if (IS_DELAY_ENABLED && ms > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
