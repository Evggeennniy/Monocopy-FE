import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Lottie from "lottie-react";

import rocketAnimation from "../assets/animations/rocket.json";

const MAX_PULL = 40;
const TRIGGER_PULL = 30;

// Оригинальная Lottie: 48 x 525.
// Жёстко фиксируем размер, чтобы ракета не сжималась.
const LOTTIE_BASE_WIDTH = 48;
const LOTTIE_BASE_HEIGHT = 525;
const LOTTIE_SCALE = 2;

const LOTTIE_WIDTH = LOTTIE_BASE_WIDTH * LOTTIE_SCALE; // 96
const LOTTIE_HEIGHT = LOTTIE_BASE_HEIGHT * LOTTIE_SCALE; // 1050

// Быстрее завершаем состояние полёта, чтобы навбар быстрее вернулся.
const FLY_DURATION = 1200;

// Ускоряем именно проигрывание Lottie после отпускания.
const FLIGHT_SPEED = 1;

// Задержка перед возвратом навбара после завершения полёта.
const NAVBAR_RETURN_DELAY = 800;

// Кадры:
// 0 → 112: ракета появляется / садится / подготавливается при pull.
// 280 → конец: быстрый старт взлёта без долгого простоя.
//
// Если всё ещё есть задержка — подними до 300.
// Если слишком резко и теряется красивый старт/дым — опусти до 250.
const LANDING_START_FRAME = 0;
const LANDING_END_FRAME = 112;
const FLIGHT_START_FRAME = 280;

// Позиция anchor-блока с ракетой при pull.
const ROCKET_PULL_BOTTOM_START = 200;
const ROCKET_PULL_BOTTOM_END = 238;

// Высота видимой зоны ракеты.
// Сам Lottie-canvas огромный, но anchor маленький.
const ROCKET_ANCHOR_HEIGHT = 70;

// Внутреннее смещение полного Lottie-canvas внутри anchor.
// Больше значение — Lottie ниже.
// Меньше / отрицательное — Lottie выше.
const LOTTIE_INNER_BOTTOM = -10;

const DraggableDownWrapper = ({ children, className = "", style = {}, setHasFlown, isOpen, offsetY, setOffsetY }) => {
  const [isFlying, setIsFlying] = useState(false);
  const [flyRect, setFlyRect] = useState(null);

  const startY = useRef(null);
  const isDragging = useRef(false);
  const blockRef = useRef(null);
  const containerRef = useRef(null);

  const resetNavbarTimerRef = useRef(null);

  const clearNavbarResetTimer = () => {
    if (resetNavbarTimerRef.current) {
      clearTimeout(resetNavbarTimerRef.current);
      resetNavbarTimerRef.current = null;
    }
  };

  const startFlying = () => {
    const target = blockRef.current;
    if (!target) return;

    // Важно: если новый полёт начался до возврата навбара,
    // старый reset-таймер не должен сработать посреди нового полёта.
    clearNavbarResetTimer();

    const rect = target.getBoundingClientRect();

    setFlyRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      bottom: rect.bottom,
    });

    setIsFlying(true);
  };

  const finishDrag = () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const shouldFly = offsetY >= TRIGGER_PULL;

    if (shouldFly) {
      startFlying();
    } else {
      setFlyRect(null);
      setIsFlying(false);
    }

    setOffsetY(0);
    document.body.style.userSelect = "";
  };

  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    isDragging.current = true;

    setIsFlying(false);
    setFlyRect(null);

    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const currentY = e.clientY;
    const delta = currentY - startY.current;
    const nextOffset = Math.max(0, Math.min(delta, MAX_PULL));

    setOffsetY(nextOffset);
  };

  const handleMouseUp = () => {
    finishDrag();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastOffset = 0;

    const onTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      isDragging.current = false;
      lastOffset = 0;

      setIsFlying(false);
      setFlyRect(null);
    };

    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = currentY - (startY.current ?? currentY);
      const nextOffset = Math.max(0, Math.min(delta, MAX_PULL));

      lastOffset = nextOffset;

      if (delta > 0 && window.scrollY === 0) {
        e.preventDefault();

        if (!isDragging.current) {
          isDragging.current = true;
        }

        setOffsetY(nextOffset);
      } else if (isDragging.current && delta <= 0) {
        setOffsetY(0);
      }
    };

    const onTouchEnd = () => {
      if (isDragging.current) {
        isDragging.current = false;

        if (lastOffset >= TRIGGER_PULL) {
          startFlying();
        } else {
          setFlyRect(null);
          setIsFlying(false);
        }

        setOffsetY(0);
      }

      lastOffset = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [setOffsetY]);

  useEffect(() => {
    if (!isFlying) return;

    setHasFlown(true);
    localStorage.setItem("finishedFlying", "true");

    const flyTimer = setTimeout(() => {
      setIsFlying(false);
      setFlyRect(null);

      resetNavbarTimerRef.current = setTimeout(() => {
        setHasFlown(false);
        localStorage.setItem("finishedFlying", "false");
        resetNavbarTimerRef.current = null;
      }, NAVBAR_RETURN_DELAY);
    }, FLY_DURATION);

    return () => {
      clearTimeout(flyTimer);

      /*
        ВАЖНО:
        Здесь НЕ чистим resetNavbarTimerRef.
        Иначе после setIsFlying(false) cleanup сработает и отменит возврат навбара.
      */
    };
  }, [isFlying, setHasFlown]);

  useEffect(() => {
    return () => {
      clearNavbarResetTimer();
      document.body.style.userSelect = "";
    };
  }, []);

  if (isOpen) return <>{children}</>;

  const shouldShowPullRocket = offsetY > 0 && !isFlying;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "visible",
        touchAction: "auto",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Lottie preview while pulling */}
      {shouldShowPullRocket && (
        <div
          ref={blockRef}
          style={{
            position: "absolute",
            bottom: `${offsetY < 38 ? offsetY + ROCKET_PULL_BOTTOM_START : ROCKET_PULL_BOTTOM_END}px`,

            left: "50%",
            width: LOTTIE_WIDTH,
            height: ROCKET_ANCHOR_HEIGHT,
            transform: "translateX(-50%)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            zIndex: 0,
            transition: isDragging.current ? "none" : "bottom 0.25s ease",
            opacity: 1,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          <PullRocketPreview offsetY={offsetY} />
        </div>
      )}

      {/* Full native Lottie flight after release */}
      {isFlying && flyRect && <NativeRocketFlight flyRect={flyRect} />}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          transform: `translateY(${offsetY}px)`,
          transition: isDragging.current ? "none" : "transform 0.25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const PullRocketPreview = ({ offsetY }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    const progress = Math.max(0, Math.min(offsetY / MAX_PULL, 1));

    const frame = LANDING_START_FRAME + progress * (LANDING_END_FRAME - LANDING_START_FRAME);

    lottieRef.current?.goToAndStop(frame, true);
  }, [offsetY]);

  return (
    <div
      style={{
        position: "relative",

        width: LOTTIE_WIDTH,
        minWidth: LOTTIE_WIDTH,
        maxWidth: LOTTIE_WIDTH,

        height: ROCKET_ANCHOR_HEIGHT,
        minHeight: ROCKET_ANCHOR_HEIGHT,
        maxHeight: ROCKET_ANCHOR_HEIGHT,

        pointerEvents: "none",
        overflow: "visible",
        contain: "none",
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: LOTTIE_INNER_BOTTOM,

          width: LOTTIE_WIDTH,
          minWidth: LOTTIE_WIDTH,
          maxWidth: LOTTIE_WIDTH,

          height: LOTTIE_HEIGHT,
          minHeight: LOTTIE_HEIGHT,
          maxHeight: LOTTIE_HEIGHT,

          overflow: "visible",
          pointerEvents: "none",
          contain: "none",
          flexShrink: 0,
          flexGrow: 0,
          transform: "translateZ(0)",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={rocketAnimation}
          loop={false}
          autoplay={false}
          renderer="svg"
          style={{
            width: LOTTIE_WIDTH,
            minWidth: LOTTIE_WIDTH,
            maxWidth: LOTTIE_WIDTH,

            height: LOTTIE_HEIGHT,
            minHeight: LOTTIE_HEIGHT,
            maxHeight: LOTTIE_HEIGHT,

            display: "block",
            overflow: "visible",
            pointerEvents: "none",
          }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: false,
            hideOnTransparent: false,
          }}
        />
      </div>
    </div>
  );
};

const NativeRocketFlight = ({ flyRect }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      lottieRef.current?.setSpeed?.(FLIGHT_SPEED);
      lottieRef.current?.goToAndPlay(FLIGHT_START_FRAME, true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return createPortal(
    <div
      style={{
        position: "fixed",

        /*
          Это тот же anchor 96x70, который был при pull.
          Поэтому release-анимация стартует ровно с того же места.
        */
        left: flyRect.left,
        top: flyRect.top,

        width: LOTTIE_WIDTH,
        minWidth: LOTTIE_WIDTH,
        maxWidth: LOTTIE_WIDTH,

        height: ROCKET_ANCHOR_HEIGHT,
        minHeight: ROCKET_ANCHOR_HEIGHT,
        maxHeight: ROCKET_ANCHOR_HEIGHT,

        pointerEvents: "none",
        zIndex: 999999,
        overflow: "visible",
        contain: "none",

        flexShrink: 0,
        flexGrow: 0,
        transform: "translateZ(0)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: LOTTIE_INNER_BOTTOM,

          width: LOTTIE_WIDTH,
          minWidth: LOTTIE_WIDTH,
          maxWidth: LOTTIE_WIDTH,

          height: LOTTIE_HEIGHT,
          minHeight: LOTTIE_HEIGHT,
          maxHeight: LOTTIE_HEIGHT,

          overflow: "visible",
          pointerEvents: "none",
          contain: "none",
          flexShrink: 0,
          flexGrow: 0,
          transform: "translateZ(0)",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={rocketAnimation}
          loop={false}
          autoplay={false}
          renderer="svg"
          style={{
            width: LOTTIE_WIDTH,
            minWidth: LOTTIE_WIDTH,
            maxWidth: LOTTIE_WIDTH,

            height: LOTTIE_HEIGHT,
            minHeight: LOTTIE_HEIGHT,
            maxHeight: LOTTIE_HEIGHT,

            display: "block",
            overflow: "visible",
            pointerEvents: "none",
          }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: false,
            hideOnTransparent: false,
          }}
        />
      </div>
    </div>,
    document.body,
  );
};

export default DraggableDownWrapper;
