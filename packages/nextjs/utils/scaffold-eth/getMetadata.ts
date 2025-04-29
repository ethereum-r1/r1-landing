import type { Metadata } from "next";
import { ipfsPath } from "../ipfs-helpers";

// Determine if we're building for IPFS
const isIpfsBuild = process.env.NEXT_PUBLIC_IPFS_DEPLOYMENT === 'true' || 
                   process.env.NEXT_PUBLIC_IPFS_BUILD === 'true' || 
                   true; // Force IPFS mode for static exports

// For IPFS builds, we use relative URLs rather than absolute ones
const baseUrl = isIpfsBuild
  ? '' // Empty for IPFS to ensure relative paths
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;
    
const titleTemplate = "%s | Stealth Transfer";

export const getMetadata = ({
  title,
  description,
  imageRelativePath = "thumbnail.jpg", // Remove leading slash for IPFS compatibility
  icons,
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
  icons?: { icon?: string | { url: string; sizes?: string; type?: string }[] };
}): Metadata => {
  // For IPFS, we use relative paths without the baseUrl prefix
  const imageUrl = isIpfsBuild 
    ? ipfsPath(imageRelativePath) 
    : `${baseUrl}/${imageRelativePath.replace(/^\//, '')}`;

  // Base metadata object
  const metadata: Metadata = {
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
  };
  
  // For IPFS builds, we need to set a dummy metadataBase
  // This is required by Next.js but will be ignored in the static output
  try {
    metadata.metadataBase = isIpfsBuild 
      ? new URL('http://localhost:3000') 
      : new URL(baseUrl || 'http://localhost:3000');
  } catch (e) {
    console.warn('Invalid baseUrl for metadataBase:', baseUrl);
    // Fallback to localhost
    metadata.metadataBase = new URL('http://localhost:3000');
  }
  
  // OpenGraph and Twitter cards (with IPFS-compatible paths)
  metadata.openGraph = {
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    images: [
      {
        url: imageUrl,
      },
    ],
  };
  
  metadata.twitter = {
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    images: [imageUrl],
  };
  
  // Handle icons with IPFS-compatible paths
  metadata.icons = icons || {
    icon: [{ 
      url: ipfsPath("favicon-eth.png"), 
      sizes: "32x32", 
      type: "image/png" 
    }],
  };
  
  return metadata;
};
