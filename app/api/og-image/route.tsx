import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

// Define URL types
type UrlType = 'video' | 'image' | 'unknown';

// File extension configurations
const FILE_EXTENSIONS = {
  video: ['.mp4', '.webm', '.ogg', '.mov'],
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// Helper function to determine URL type
function getUrlType(url: string): UrlType {
  const lowercaseUrl = url.toLowerCase();

  if (FILE_EXTENSIONS.video.some(ext => lowercaseUrl.endsWith(ext))) {
    return 'video';
  }
  if (FILE_EXTENSIONS.image.some(ext => lowercaseUrl.endsWith(ext))) {
    return 'image';
  }

  return 'unknown';
}

// Config for ImageResponse
const IMAGE_CONFIG = {
  width: 1200,
  height: 630,
} as const;

export async function GET(request: NextRequest): Promise<ImageResponse> {
  try {
    const urlParam = new URL(request.url).searchParams.get('url');
    const thumbnailUrlParam = new URL(request.url).searchParams.get('thumbnail_url');

    if (!urlParam) {
      return new ImageResponse(
        (
          <div style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '32px', color: 'red' }}>
              URL or Thumbnail URL parameter is missing
            </div>
          </div>
        ),
        IMAGE_CONFIG
      );
    }

    const url = decodeURIComponent(urlParam);
    const urlType = getUrlType(url);

    switch (urlType) {
      case 'image': {
        return new ImageResponse(
          (
            <div style={{
              background: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <img
                src={url}
                alt="Preview"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          ),
          IMAGE_CONFIG
        );
      }

      case 'video': {
        const thumbUrl = thumbnailUrlParam ? decodeURIComponent(thumbnailUrlParam) : "";
        return new ImageResponse(
          (
            <div style={{
              background: '#000000',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Container with video URL as text */}
              <div style={{
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
              }}>
                <img
                  src={thumbUrl}
                  alt="Preview"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Play button */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="58"
                    fill="rgba(255, 255, 255, 0.2)"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="4"
                  />
                  <path
                    d="M82 60L47 80.7224L47 39.2776L82 60Z"
                    fill="rgba(255, 255, 255, 0.8)"
                  />
                </svg>
              </div>

              {/* Optional: Video duration or file size could be added here */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '16px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Video Preview
              </div>
            </div>
          ),
          IMAGE_CONFIG
        );
      }

      case 'unknown':
      default: {
        return new ImageResponse(
          (
            <div
              style={{
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'column',
                padding: '40px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '20px' }}>
                Unsupported File Type
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#666',
                  wordBreak: 'break-all',
                  textAlign: 'center',
                }}
              >
                {url}
              </div>
            </div>
          ),
          IMAGE_CONFIG
        );
      }
    }
  } catch (error) {
    return new ImageResponse(
      (
        <div style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{ fontSize: '32px', color: 'red' }}>
            {error instanceof Error ? error.message : 'Error generating preview'}
          </div>
        </div>
      ),
      IMAGE_CONFIG
    );
  }
}

export const runtime = 'edge';