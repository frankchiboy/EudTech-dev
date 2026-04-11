// 動畫轉場工具
export type TransitionType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip';
export type Direction = 'up' | 'down' | 'left' | 'right';
export type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce';

interface TransitionConfig {
  duration?: number;
  delay?: number;
  easing?: Easing;
  direction?: Direction;
}

// 預定義的轉場動畫
export const transitions = {
  fade: (config: TransitionConfig = {}) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: config.duration || 0.3,
      delay: config.delay || 0,
      ease: config.easing || 'ease-out'
    }
  }),

  slide: (config: TransitionConfig = {}) => {
    const { direction = 'up' } = config;
    const slideVariants = {
      up: { initial: { y: 20 }, animate: { y: 0 }, exit: { y: -20 } },
      down: { initial: { y: -20 }, animate: { y: 0 }, exit: { y: 20 } },
      left: { initial: { x: 20 }, animate: { x: 0 }, exit: { x: -20 } },
      right: { initial: { x: -20 }, animate: { x: 0 }, exit: { x: 20 } }
    };

    return {
      ...slideVariants[direction],
      transition: {
        duration: config.duration || 0.3,
        delay: config.delay || 0,
        ease: config.easing || 'ease-out'
      }
    };
  },

  scale: (config: TransitionConfig = {}) => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      duration: config.duration || 0.3,
      delay: config.delay || 0,
      ease: config.easing || 'ease-out'
    }
  }),

  rotate: (config: TransitionConfig = {}) => ({
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
    transition: {
      duration: config.duration || 0.5,
      delay: config.delay || 0,
      ease: config.easing || 'ease-out'
    }
  }),

  flip: (config: TransitionConfig = {}) => ({
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
    transition: {
      duration: config.duration || 0.4,
      delay: config.delay || 0,
      ease: config.easing || 'ease-out'
    }
  })
};

// 組合轉場效果
export const combineTransitions = (...transitionConfigs: any[]) => {
  const combined = transitionConfigs.reduce((acc, config) => {
    return {
      initial: { ...acc.initial, ...config.initial },
      animate: { ...acc.animate, ...config.animate },
      exit: { ...acc.exit, ...config.exit }
    };
  }, { initial: {}, animate: {}, exit: {} });

  return combined;
};

// 交錯動畫
export const staggerChildren = (staggerDelay: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay
    }
  }
});

// 序列動畫
export const sequence = (keyframes: any[], timing?: number[]) => ({
  animate: {
    ...keyframes.reduce((acc, frame, index) => {
      const key = `step${index}`;
      acc[key] = frame;
      return acc;
    }, {}),
    transition: {
      times: timing || keyframes.map((_, i) => i / (keyframes.length - 1))
    }
  }
});

// 彈性動畫
export const spring = (config: { stiffness?: number; damping?: number; mass?: number } = {}) => ({
  transition: {
    type: 'spring',
    stiffness: config.stiffness || 300,
    damping: config.damping || 30,
    mass: config.mass || 1
  }
});

// 常用的頁面轉場
export const pageTransitions = {
  fadeSlide: combineTransitions(
    transitions.fade({ duration: 0.2 }),
    transitions.slide({ direction: 'up', duration: 0.3 })
  ),
  
  scaleRotate: combineTransitions(
    transitions.scale({ duration: 0.4 }),
    transitions.rotate({ duration: 0.4 })
  ),
  
  slideScale: combineTransitions(
    transitions.slide({ direction: 'right', duration: 0.3 }),
    transitions.scale({ duration: 0.3 })
  )
};