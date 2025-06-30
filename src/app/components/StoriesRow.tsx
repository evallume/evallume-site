"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Расширяем интерфейс window
declare global {
  interface Window {
    _storyStartTime?: number;
  }
}

const HOLD_TIME = 300;

const stories = [
  {
    title: "Devices",
    items: [
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/devices-1-lEqWioH1Q2CpX7kr1hJhmNW48BAI7s.mp4" },
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/devices-2-F9ZcltLPYvWKpNvNtEq7rvswJlHuby.mp4" },
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/devices-3-syiPEe65TrWqdXyx53eF0C2nEUpRDN.mp4" },
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/devices-4-1FSQ7XhSEcZDVq1xfNR198iCLA8ufR.mp4" },
    ],
    alt: "Evallume - Devices",
  },
  {
    title: "Partners",
    items: [
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/partners-1-tcb9PhXrdd7C5dZeJnUN4VTXaVuxnQ.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/partners-2-aH27iIkG3Zt1YQvwBXJy2vYvUljutA.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/partners-3-gjdWUI4NwUU75X7615lCEhUPGDBTCV.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/partners-4-4ODYYMuJ9TW6GeZEejRNVPSPGNwvc8.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/partners-5-80MlYe3WCDqOjHpdWvcXoM85DvhUBO.jpg" },
    ],
    alt: "Evallume - Partners",
  },
  {
    title: "Clients",
    items: [
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/clients-1-4R8Jui49Sx3kMJqmRIujGLoQ9sug5N.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/clients-2-C7oAf1CS9q5oo5OWhAoMxKiIne5cPS.jpg" },
      { image: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/clients-3-yfROxnRGMc9l84GD4S6dmEghn0oiK0.jpg" },
    ],
    alt: "Evallume - Clients",
  },
  {
    title: "Factory",
    items: [
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/factory-1-TLlxDVEUXpbggAxcBkDSwKxa4pGqln.mp4" },
      { video: "https://klfmasfbi2f0kmeu.public.blob.vercel-storage.com/stories/factory-2-JIHpzWHimITyp5CxAKBkjmDxUUqzV3.mp4" },
    ],
    alt: "Evallume - Factory",
  },
];

type StoryProgressBarProps = {
  count: number;
  active: number;
  progress: number;
};

function StoryProgressBar({ count, active, progress }: StoryProgressBarProps){
  return (
    <div className="flex gap-1 px-4 pt-3 absolute top-0 left-0 w-full z-30 select-none">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-1 h-1.5 rounded bg-white/30 overflow-hidden">
          <div
            className="h-full rounded bg-white transition-all duration-100"
            style={{
              width:
                i < active
                  ? "100%"
                  : i === active
                  ? `${Math.round(progress * 100)}%`
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function StoriesRow() {
  const [activeImages, setActiveImages] = useState(Array(stories.length).fill(0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const swipeStartX = useRef(0);
  const isSwiping = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holding = useRef(false);
  const tapped = useRef(false);
  const locked = useRef(false);

  const goNext = useCallback(() => {
  if (!locked.current && activeIndex !== null) {
    locked.current = true;
    setStoryProgress(0);
    setActiveImages(prev => {
      return prev.map((imgIdx, i) => {
        if (i !== activeIndex) return imgIdx;
        const count = stories[i].items.length;
        // Если на последнем файле кружка — возвращаемся к 0, а ниже сдвигаем activeIndex на следующий кружок
        if (imgIdx + 1 < count) {
          return imgIdx + 1;
        }
        return 0; // Это будет проигнорировано, мы поменяем кружок!
      });
    });
    // Проверяем: если это был последний слайд последнего кружка — закрываем сторис
    setTimeout(() => {
  locked.current = false;
  if (activeImages[activeIndex] + 1 < stories[activeIndex].items.length) {
  return;
} else if (activeIndex < stories.length - 1) {
  // Открываем первый слайд следующего кружка
  setActiveIndex(activeIndex + 1);
  setActiveImages(prev =>
    prev.map((imgIdx, i) => (i === activeIndex + 1 ? 0 : imgIdx))
  );
  setStoryProgress(0);
  setPaused(false);
  window._storyStartTime = Date.now();
  return;
} else {
  // Всё, сторис кончились — закрываем
  setActiveIndex(null);
}
    }, 350);
  }
}, [activeIndex, activeImages]);


  const goPrev = useCallback(() => {
  if (!locked.current && activeIndex !== null) {
    locked.current = true;
    setStoryProgress(0);
    setTimeout(() => {
      locked.current = false;
      if (activeImages[activeIndex] > 0) {
        // Просто предыдущий слайд в текущем кружке
        setActiveImages(prev =>
          prev.map((imgIdx, i) =>
            i === activeIndex
              ? Math.max(imgIdx - 1, 0)
              : imgIdx
          )
        );
      } else if (activeIndex > 0) {
        // Перейти на последний слайд предыдущего кружка
        setActiveIndex(activeIndex - 1);
        setActiveImages(prev =>
          prev.map((imgIdx, i) =>
            i === activeIndex - 1
              ? stories[activeIndex - 1].items.length - 1
              : imgIdx
          )
        );
        setStoryProgress(0);
        setPaused(false);
        window._storyStartTime = Date.now();
      }
      // Если это был первый слайд первого кружка — можно ничего не делать или закрывать сторис, по желанию
    }, 350);
  }
}, [activeIndex, activeImages]);


  useEffect(() => {
    if (activeIndex === null) return;
    const currentItem = stories[activeIndex].items[activeImages[activeIndex]];
    let rafId: number;
    const duration = "image" in currentItem ? 10000 : 15000;
    const tick = () => {
      if (paused) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      let prog;
      if ("video" in currentItem && videoRef.current) {
        const el = videoRef.current as HTMLVideoElement;
        prog = Math.min(el.currentTime / (duration / 1000), 1);
      } else {
        prog = Math.min((Date.now() - (window._storyStartTime || Date.now())) / duration, 1);
      }
      setStoryProgress(prog);
      if (prog < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPaused(false);
        goNext();
      }
    };
    window._storyStartTime = Date.now();
    tick();
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [activeIndex, activeImages, paused, goNext]);

  const pauseStory = () => {
    setPaused(true);
    if (videoRef.current) (videoRef.current as HTMLVideoElement).pause();
  };
  const resumeStory = () => {
    setPaused(false);
    if (videoRef.current) (videoRef.current as HTMLVideoElement).play();
  };

  const handleOpen = (idx: number) => {
  setActiveIndex(idx);
  setActiveImages(prev => prev.map((imgIdx, i) => (i === idx ? 0 : imgIdx)));
  setStoryProgress(0);
  setPaused(false);
  window._storyStartTime = Date.now();
};

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  tapped.current = false;
  if ('touches' in e) {
    swipeStartX.current = e.touches[0].clientX;
  } else {
    swipeStartX.current = (e as React.MouseEvent<HTMLDivElement>).clientX;
  }
  isSwiping.current = false;
  holding.current = false;
  holdTimer.current = setTimeout(() => {
    holding.current = true;
    pauseStory();
  }, HOLD_TIME);
};

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  if (locked.current) return;
  if (isSwiping.current) return;
  let x: number;
  if ('touches' in e) {
    x = e.touches[0].clientX;
  } else {
    x = (e as React.MouseEvent<HTMLDivElement>).clientX;
  }
  const diff = x - swipeStartX.current;
  if (Math.abs(diff) > 40) {
    isSwiping.current = true;
    clearTimeout(holdTimer.current!);
    if (diff > 0) {
      goPrev();
    } else {
      goNext();
    }
  }
};

  const handlePointerUp = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  clearTimeout(holdTimer.current!);
  if (isSwiping.current) {
    isSwiping.current = false;
    return;
  }
  if (holding.current) {
    holding.current = false;
    resumeStory();
    return;
  }
  if (!tapped.current) {
    tapped.current = true;
    if (!activeIndex && activeIndex !== 0) return;
    const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    let x: number;
    if ('changedTouches' in e) {
      x = e.changedTouches[0].clientX;
    } else {
      x = (e as React.MouseEvent<HTMLDivElement>).clientX;
    }
    const relativeX = x - bounds.left;
    if (relativeX < bounds.width / 3) {
      goPrev();
    } else if (relativeX > bounds.width * 2 / 3) {
      goNext();
    }
  }
};

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  setActiveIndex(null);
};
  return (
    <>
      {/* Кружки */}
      <div className="w-full flex flex-row gap-4 md:gap-10 justify-center items-end px-2 mt-6 overflow-x-auto md:overflow-x-visible">
        {stories.map((story, idx) => {
          const items = story.items || [];
          const current = items[activeImages[idx]] || items[0];
          if (!current) return null;

          return (
            <div
              key={idx}
              className="flex flex-col items-center group min-w-[64px] cursor-pointer"
              onClick={() => handleOpen(idx)}
            >
              <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.07 }}>
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-gray-200 bg-white shadow group-hover:scale-110 group-hover:border-[#9d5a4d] transition-all">
                  {"image" in current ? (
  <motion.img
    src={current.image}
    alt={story.alt}
    className="object-cover w-full h-full select-none pointer-events-none"
    draggable={false}
    whileHover={{ scale: 1.11, filter: "brightness(1.12)" }}
  />
) : "video" in current ? (
  <video
    src={current.video}
    className="object-cover w-full h-full pointer-events-none"
    autoPlay
    loop
    playsInline
    muted
  />
) : null}
                </div>
                <div className="relative mt-2 md:mt-3 flex flex-col items-center" style={{ width: 48 }}>
                  <span className="text-sm md:text-base font-semibold text-center transition-all group-hover:text-[#9d5a4d]">
                    {story.title}
                  </span>
                  <span className="absolute left-0 bottom-[-8px] h-1 rounded-full bg-gradient-to-r from-[#bfcbd8] to-[#9d5a4d] w-0 group-hover:w-full transition-all" />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Модальное окно сторис */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StoryProgressBar
              count={stories[activeIndex].items.length}
              active={activeImages[activeIndex]}
              progress={storyProgress}
            />

            <div className="flex items-center gap-3 absolute top-5 left-5 z-40">
              <div className="text-white font-semibold text-base drop-shadow-lg">
                {stories[activeIndex].title}
              </div>
            </div>

            <button
              className="story-close absolute top-6 right-6 text-white text-3xl z-50"
              onClick={handleClose}
            >
              ×
            </button>

            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{ touchAction: "pan-y", userSelect: "none" }}
              onMouseDown={handlePointerDown}
              onMouseUp={handlePointerUp}
              onMouseLeave={() => {
  if (holdTimer.current) clearTimeout(holdTimer.current);
  if (holding.current) {
    holding.current = false;
    resumeStory();
  }
}}
              onTouchStart={handlePointerDown}
              onTouchEnd={handlePointerUp}
              onTouchCancel={() => {
  if (holdTimer.current) clearTimeout(holdTimer.current);
  if (holding.current) {
    holding.current = false;
    resumeStory();
  }
}}
              onTouchMove={handlePointerMove}
            >
              {(() => {
                const items = stories[activeIndex]?.items || [];
                const current = items[activeImages[activeIndex]] || items[0];
                if (!current) return null;

                if ("image" in current)
                  return (
                    <Image
                      src={current.image}
                      alt={stories[activeIndex].alt}
                      width={1080}    
                      height={1920}
                      className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-xl select-none"
                      style={{
                      objectFit: "contain",    // не crop-ит, не растягивает
                      width: "100%",
                      height: "auto",
                      maxWidth: 600,
                      maxHeight: 600,
                      }}
                      sizes="(max-width: 768px) 90vw, 600px"
                    />
                  );
                if ("video" in current)
                  return (
                    <video
                      ref={videoRef}
                      src={current.video}
                      autoPlay
                      playsInline 
                      className="max-w-[90%] max-h-[90%] rounded-xl select-none"
                      controls={false}
                      onEnded={goNext}
                    />
                  );
                return null;
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
