'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  );
};

const LazyVideo = ({
  src,
  poster,
  alt,
  className = '',
  sizes,
  preloadVisible = 'metadata',
  preloadHidden = 'none',
  interactive = true,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isInViewport, setIsInViewport] = useState(false);
  const [hasUserIntent, setHasUserIntent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  // We only assign <video src> when it is near viewport OR user interacted.
  const shouldLoad = isInViewport || hasUserIntent;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsInViewport(true);
      },
      { root: null, rootMargin: '250px 0px', threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = async () => {
    if (reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;
    try {
      await v.play();
      setIsPlaying(true);
    } catch {
      // ignore (autoplay policies or decoding)
    }
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleByClick = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (!shouldLoad) setHasUserIntent(true);
    if (v.paused) {
      if (!shouldLoad) {
        requestAnimationFrame(() => {
          void play();
        });
        return;
      }
      await play();
      return;
    }
    pause();
  };

  return (
    <div
      ref={containerRef}
      className={`group relative w-full h-full ${className}`}
      onMouseEnter={() => {
        if (!shouldLoad) return;
        if (reduceMotion) return;
        void play();
      }}
      onMouseLeave={() => {
        if (!isPlaying) return;
        pause();
      }}
      onFocus={() => {
        if (!shouldLoad) return;
        if (reduceMotion) return;
        void play();
      }}
      onBlur={() => {
        if (!isPlaying) return;
        pause();
      }}
    >
      {/* Poster (always rendered to avoid CLS and keep Next optimization) */}
      <Image
        src={poster}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
      />

      {/* Video (only attaches src when needed) */}
      {src ? (
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          preload={shouldLoad ? preloadVisible : preloadHidden}
          muted
          playsInline
          poster={poster}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            shouldLoad ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {/* Interaction overlay (a11y + explicit intent) */}
      {src && interactive ? (
        <button
          type="button"
          onClick={toggleByClick}
          className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626]"
          aria-label={isPlaying ? 'Mettre en pause la vidéo' : 'Lire la vidéo'}
        >
          <span className="sr-only">{isPlaying ? 'Pause' : 'Lecture'}</span>
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 px-4 py-2 text-xs tracking-[0.2em] uppercase text-white ring-1 ring-white/15 transition-opacity duration-300 ${
              isPlaying
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
            }`}
          >
            Lire
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default LazyVideo;
