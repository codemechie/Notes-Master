import { useEffect, useState } from 'react';

const RateLimitedUI = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 10 seconds
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 10000);

    // Hide component immediately when the user interacts with the page (focuses anywhere)
    const handleInteraction = () => {
      setIsFading(true);
    };

    // Listen for interactions on capture phase to ensure they are caught
    document.addEventListener('mousedown', handleInteraction, true);
    document.addEventListener('keydown', handleInteraction, true);
    document.addEventListener('touchstart', handleInteraction, true);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleInteraction, true);
      document.removeEventListener('keydown', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
    };
  }, []);

  // Remove the component from the DOM after the 300ms fade transition finishes
  useEffect(() => {
    let removeTimer;
    if (isFading) {
      removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // 300ms matches Tailwind's duration-300
    }
    return () => clearTimeout(removeTimer);
  }, [isFading]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-lg shadow-xl max-w-lg w-full flex gap-3">
        <div className="flex-shrink-0 text-xl">
          ⚠️
        </div>
        <div>
          <h3 className="text-lg font-bold text-orange-800 mb-1">
            Rate Limit Reached
          </h3>
          <p className="text-sm text-orange-700 mb-1">
            You've made too many requests in a short period. Please wait a moment.
          </p>
          <p className="text-sm font-medium text-orange-800">
            Try again in a few minutes for the best experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;