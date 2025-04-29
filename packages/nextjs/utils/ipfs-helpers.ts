/**
 * Helper utilities for IPFS compatibility
 */

/**
 * Gets the correct path prefix for assets when deployed to IPFS
 * This ensures assets are loaded properly regardless of the IPFS gateway
 */
export const getIPFSPrefix = () => {
  // For client-side paths, we use relative paths
  return typeof window !== 'undefined' ? './' : '';
};

/**
 * Creates a path that's compatible with IPFS by ensuring it starts with the proper prefix
 */
export const ipfsPath = (path: string) => {
  const prefix = getIPFSPrefix();
  
  // If the path already starts with the prefix or is an absolute URL, return it as is
  if (path.startsWith(prefix) || path.startsWith('http') || path.startsWith('//')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Return the path with the proper prefix
  return `${prefix}${cleanPath}`;
};