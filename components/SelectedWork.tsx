'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_GAP = 24;

export default function SelectedWork() {
  const [offset, setOffset] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const offsetRef = useRef(0);
  const maxScrollRef = useRef(0);
  const slideWidthRef = useRef(0);
  const targetOffsetRef = useRef<number | null>(null);
  const isAnimatingToTargetRef = useRef(false);
  const stepRef = useRef<() => void>(() => {});

  // Sync refs with state
  offsetRef.current = offset;
  maxScrollRef.current = maxScroll;

  // Calculate slide dimensions and maximum scroll distance so the last slide centers in the container
  const calculateMetrics = useCallback(() => {
    if (!trackRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;

    const slides = trackRef.current.querySelectorAll('.sw-slide');
    if (slides.length === 0) return;

    const firstSlide = slides[0] as HTMLElement;
    const slideWidth = firstSlide.offsetWidth;
    slideWidthRef.current = slideWidth;

    const lastSlideIndex = slides.length - 1;
    const lastSlide = slides[lastSlideIndex] as HTMLElement;
    const lastSlideWidth = lastSlide.offsetWidth;

    // The starting position of the last slide along the track content
    const lastSlideStart = lastSlideIndex * (slideWidth + SLIDE_GAP);

    // Center the last slide precisely within the container when reaching the end
    const calculatedMax = Math.max(0, lastSlideStart - (slideWidth - lastSlideWidth) / 2);

    setMaxScroll(calculatedMax);
    maxScrollRef.current = calculatedMax;
  }, []);

  useEffect(() => {
    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);
    return () => window.removeEventListener('resize', calculateMetrics);
  }, [calculateMetrics]);

  // Observer to trigger auto-scroll only when visible on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous animation loop (slow auto-scroll + smooth programmatic snapping)
  useEffect(() => {
    const speed = 0.250; // 10% slower than 0.55 for smoother motion

    const step = () => {
      // 1. Programmatic smooth transition towards a target slide
      if (isAnimatingToTargetRef.current && targetOffsetRef.current !== null) {
        const diff = targetOffsetRef.current - offsetRef.current;
        if (Math.abs(diff) < 0.6) {
          offsetRef.current = targetOffsetRef.current;
          setOffset(targetOffsetRef.current);
          isAnimatingToTargetRef.current = false;
          targetOffsetRef.current = null;
        } else {
          const stepDelta = diff * 0.12;
          const clamped = Math.abs(stepDelta) < 1 ? Math.sign(diff) * 1 : stepDelta;
          const next = offsetRef.current + clamped;
          offsetRef.current = next;
          setOffset(next);
        }
        animFrameRef.current = requestAnimationFrame(step);
        return;
      }

      // 2. Slow continuous scroll when visible and not hovered
      if (isVisible && !isHovered) {
        const current = offsetRef.current;
        const max = maxScrollRef.current;
        if (max > 0 && current < max) {
          const next = Math.min(max, current + speed);
          offsetRef.current = next;
          setOffset(next);
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Reached the end, pause loop until woken up by handlePrev / touch / resize
          animFrameRef.current = null;
        }
      } else {
        // Paused or not visible
        animFrameRef.current = null;
      }
    };

    stepRef.current = step;

    if (isVisible || isAnimatingToTargetRef.current) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isVisible, isHovered, maxScroll]);

  // Programmatically trigger a smooth slide transition to a target offset
  const animateTo = (target: number) => {
    targetOffsetRef.current = target;
    isAnimatingToTargetRef.current = true;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      stepRef.current();
    });
  };

  // Determine snap positions for each slide ([0, pitch, ..., max])
  const getSnapPoints = () => {
    const pitch = (slideWidthRef.current || containerRef.current?.clientWidth || 1000) + SLIDE_GAP;
    const max = maxScrollRef.current;
    const slides = trackRef.current?.querySelectorAll('.sw-slide');
    const count = slides?.length || 3;
    const points: number[] = [];
    for (let i = 0; i < count - 1; i++) {
      points.push(i * pitch);
    }
    points.push(max);
    return points;
  };

  // Next / Prev button logic: moves smoothly to the next or previous slide
  const handleNext = () => {
    const current = offsetRef.current;
    const snapPoints = getSnapPoints();
    const nextTarget = snapPoints.find((pt) => pt > current + 5);

    if (nextTarget !== undefined) {
      animateTo(nextTarget);
    } else {
      animateTo(snapPoints[snapPoints.length - 1]);
    }
  };

  const handlePrev = () => {
    const current = offsetRef.current;
    const snapPoints = getSnapPoints();
    const prevPoints = snapPoints.filter((pt) => pt < current - 5);

    if (prevPoints.length > 0) {
      animateTo(prevPoints[prevPoints.length - 1]);
    } else {
      animateTo(0);
    }
  };

  // Touch swipe support for mobile devices
  const touchStartXRef = useRef<number | null>(null);
  const touchStartOffsetRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    isAnimatingToTargetRef.current = false;
    targetOffsetRef.current = null;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchStartXRef.current - e.touches[0].clientX;
    const max = maxScrollRef.current;
    const newOffset = Math.max(0, Math.min(max, touchStartOffsetRef.current + deltaX));
    offsetRef.current = newOffset;
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      stepRef.current();
    });
  };

  return (
    <section id="work" className="selected-work-section" ref={sectionRef}>
      <div className="lule-container" ref={containerRef}>
        {/* Section Header */}
        <div className="selected-work-header" data-aos="fade-up">
          <div className="selected-work-title-group">
            <span className="selected-work-tag">Selected Work</span>
            <h2 className="selected-work-heading">Different needs. One clear, connected approach</h2>
            <p className="selected-work-desc">
              Brand identity, websites, online stores, applications, presentations and marketing materials.
            </p>
          </div>

          {/* Navigation Controls (Top Right) */}
          <div
            className="selected-work-controls"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              className="selected-work-btn"
              onClick={handlePrev}
              disabled={offset <= 2}
              aria-label="Previous work slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="selected-work-btn"
              onClick={handleNext}
              disabled={maxScroll > 0 && offset >= maxScroll - 2}
              aria-label="Next work slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Grid Slider */}
      <div
        className="selected-work-slider-viewport"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="selected-work-grid-track"
          ref={trackRef}
          style={{
            transform: `translate3d(-${offset}px, 0, 0)`,
          }}
        >
          {/* SLIDE 1: 2 columns (60% / 40%), Column 2 has 2 stacked rows */}
          <div className="sw-slide">
            <div className="sw-col-60">
              <Image
                src="/slide-1.jpg"
                width={1752}
                height={1150}
                alt="Selected Work Slide 1"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
                className='image-radius'
              />
            </div>
            <div className="sw-col-40 sw-col-stacked">
              <div className="sw-stacked-row">
                <Image
                  src="/slide-2.jpg"
                  width={1000}
                  height={670}
                  alt="Selected Work Slide 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className='image-radius'
                />
              </div>
              <div className="sw-stacked-row">
                <Image
                  src="/slide-3.jpg"
                  width={1000}
                  height={670}
                  alt="Selected Work Slide 3"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className='image-radius'
                />
              </div>
            </div>
          </div>

          {/* SLIDE 2: 2 columns (60% / 40%) */}
          <div className="sw-slide">
            <div className="sw-col-60">
              <Image
                src="/slide-4.jpg"
                width={1288}
                height={1288}
                alt="Selected Work Slide 4"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className='image-radius'
              />
            </div>
            <div className="sw-col-40">
              <Image
                src="/slide-5.jpg"
                width={380}
                height={644}
                alt="Selected Work Slide 5"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className='image-radius'
              />
            </div>
          </div>

          {/* SLIDE 3: 100% width with slide-6.jpg */}
          <div className="sw-slide sw-slide-full">
            <div className="sw-col-100">
              <Image
                src="/slide-6.jpg"
                width={1758}
                height={1148}
                alt="Selected Work Slide 6"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                className='image-radius'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
