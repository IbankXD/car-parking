export const asset = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slashes
  let cleanPath = path.replace(/^\/+/, '');

  // Strip any repo prefix ('car-parking/') repeatedly if present
  while (cleanPath.startsWith('car-parking/')) {
    cleanPath = cleanPath.slice('car-parking/'.length);
  }

  // Also remove any remaining leading slashes
  cleanPath = cleanPath.replace(/^\/+/, '');

  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;

  return `${prefix}${cleanPath}`;
};
