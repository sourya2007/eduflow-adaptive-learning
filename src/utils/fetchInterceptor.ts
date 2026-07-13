export function initFetchInterceptor() {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      if (!response.ok && response.status >= 500) {
        // Log 5xx errors to analytics service
        console.error(`[Analytics] API Error: ${response.status} on ${args[0]}`);
        
        // Example payload for an analytics service
        const analyticsPayload = {
          event: 'api_error',
          url: args[0],
          status: response.status,
          timestamp: new Date().toISOString(),
        };
        
        // In a real app, this would be a beacon or fire-and-forget request
        // navigator.sendBeacon('/api/analytics', JSON.stringify(analyticsPayload));
        console.log('[Analytics] Payload logged:', analyticsPayload);
      }
      return response;
    } catch (error) {
      console.error(`[Analytics] Network Error on ${args[0]}:`, error);
      throw error;
    }
  };
}
