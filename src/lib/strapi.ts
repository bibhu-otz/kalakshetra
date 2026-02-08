const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// API fetch timeout in milliseconds
const FETCH_TIMEOUT = 5000;

interface FetchOptions {
  locale?: string;
  populate?: string | object;
  filters?: object;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

/**
 * Fetch data from Strapi CMS with timeout and error handling
 * Returns null if fetch fails (allowing fallback data to be used)
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const { locale = 'en', populate = '*', filters, sort, pagination } = options;

  const params = new URLSearchParams();
  params.append('locale', locale);

  if (typeof populate === 'string') {
    params.append('populate', populate);
  } else if (populate) {
    params.append('populate', JSON.stringify(populate));
  }

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`filters[${key}]`, String(value));
    });
  }

  if (sort) {
    sort.forEach((s, i) => {
      params.append(`sort[${i}]`, s);
    });
  }

  if (pagination) {
    if (pagination.page) {
      params.append('pagination[page]', String(pagination.page));
    }
    if (pagination.pageSize) {
      params.append('pagination[pageSize]', String(pagination.pageSize));
    }
  }

  const url = `${STRAPI_URL}/api/${endpoint}?${params.toString()}`;

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      signal: controller.signal,
      next: {
        revalidate: 60, // Revalidate every 60 seconds for ISR
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status} for ${endpoint}`);
      return null;
    }

    return response.json();
  } catch (error) {
    // Log error but don't throw - allow fallback data to be used
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn(`Strapi API timeout for ${endpoint}`);
      } else {
        console.warn(`Strapi API error for ${endpoint}:`, error.message);
      }
    }
    return null;
  }
}

// Events
export async function getEvents(locale: string, upcoming = true) {
  return fetchAPI('events', {
    locale,
    populate: '*',
    filters: { isUpcoming: upcoming },
    sort: ['date:asc'],
  });
}

export async function getEventBySlug(slug: string, locale: string) {
  return fetchAPI('events', {
    locale,
    filters: { slug },
    populate: {
      image: true,
      gallery: true,
    },
  });
}

// Programs
export async function getPrograms(locale: string) {
  return fetchAPI('programs', {
    locale,
    populate: '*',
    sort: ['order:asc'],
  });
}

export async function getProgramBySlug(slug: string, locale: string) {
  return fetchAPI('programs', {
    locale,
    filters: { slug },
    populate: {
      image: true,
    },
  });
}

// Leadership
export async function getLeaders(locale: string, category?: string) {
  return fetchAPI('leaders', {
    locale,
    populate: '*',
    ...(category && { filters: { category } }),
    sort: ['order:asc'],
  });
}

// Gallery
export async function getGalleryItems(locale: string, category?: string) {
  return fetchAPI('gallery-items', {
    locale,
    populate: '*',
    ...(category && { filters: { category } }),
    sort: ['date:desc'],
  });
}

// Awards
export async function getAwards(locale: string, year?: number) {
  return fetchAPI('awards', {
    locale,
    populate: '*',
    ...(year && { filters: { year } }),
    sort: ['year:desc'],
  });
}

// Press
export async function getPressItems(locale: string, type?: string) {
  return fetchAPI('press-items', {
    locale,
    populate: '*',
    ...(type && { filters: { type } }),
    sort: ['date:desc'],
  });
}

// Helper to get image URL with fallback
export function getStrapiMediaUrl(url: string | null | undefined, fallbackIndex = 1): string {
  // Use numbered fallback images (1.jpeg - 74.jpeg exist in public/images)
  const fallbackImage = `/images/${((fallbackIndex - 1) % 74) + 1}.jpeg`;
  
  if (!url) return fallbackImage;
  // If URL starts with http or is already a local path, return as-is
  if (url.startsWith('http') || url.startsWith('/images/')) return url;
  return `${STRAPI_URL}${url}`;
}

// Site settings
export async function getSiteSettings(locale: string) {
  return fetchAPI('site-setting', {
    locale,
    populate: '*',
  });
}

// Check if CMS is available
export async function isCMSAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(`${STRAPI_URL}/api/health`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}
