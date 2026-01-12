import React, { useCallback, useEffect, useState, type JSX } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';

import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface Tip {
  image: string;
}

interface LoadingCarouselProps {
  tips?: Tip[];
  className?: string;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide';
  textPosition?: 'top' | 'bottom';
  onTipChange?: (index: number) => void;
  backgroundTips?: boolean;
  backgroundGradient?: boolean;
  shuffleTips?: boolean;
  animateText?: boolean;
}

const defaultTips: Tip[] = [
  {
    image: '/slider1.jpg',
  },
  {
    image: '/slider2.jpg',
  },
  {
    image: '/slider3.jpg',
  },
  {
    image: '/slider4.jpg',
  },
  {
    image: '/slider5.jpg',
  },
  {
    image: '/slider6.jpg',
  },
  {
    image: '/slider7.jpg',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

const aspectRatioClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  wide: 'aspect-[2/1]',
};

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = 'video',
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = 'bottom',
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  animateText = true,
}: LoadingCarouselProps) {
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips,
  );

  const autoplay = Autoplay({
    delay: autoplayInterval,
    stopOnInteraction: false,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current,
    );

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      setDirection(api.scrollSnapList().indexOf(newIndex) - current);
      onTipChange?.(newIndex);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, current, onTipChange]);

  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 2; //  smoother progress increment
        return Math.min(oldProgress + diff, 100);
      });
    }, autoplayInterval / 50);

    return () => {
      clearInterval(timer);
    };
  }, [showProgress, autoplayInterval]);

  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0);
        controls.set({ scaleX: 1 });
      });
    } else {
      controls.start({ scaleX: progress / 100 });
    }
  }, [progress, controls]);

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(' max-w-7xl ', className)}
      >
        <div className=" rounded-lg">
          <Carousel
            setApi={setApi}
            plugins={[autoplay]}
            className=" h-full w-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="h-full ">
              <AnimatePresence initial={false} custom={direction}>
                {(displayTips || []).map((tip, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      variants={carouselVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={direction}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className={` ${aspectRatioClasses[aspectRatio]}h-full w-full overflow-hidden`}
                    >
                      <img
                        src={tip.image}
                        alt={``}
                        className="object-cover w-full"
                      />
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
          </Carousel>
        </div>
      </motion.div>
    </>
  );
}
