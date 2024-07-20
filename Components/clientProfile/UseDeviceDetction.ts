'use client';
import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
  const [device, setDevice] = useState('');
  const [browserInfo, setBrowserInfo] = useState({ browserName: '', userAgent: '' });

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipod|android|blackberry|windows phone|webos|opera mini|opera mobi|iemobile|wpdesktop|playbook|silk|kindle|avantgo|plucker|xiino|blazer|elaine|hiptop|vodafone|pocket|psp|series60|symbian|smartphone|up.browser|up.link|wap|phone|tablet|mobile/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (/iphone|ipod/.test(userAgent)) {
        setDevice('iPhone');
      } else if (isMobile) {
        setDevice('Mobile');
      } else if (isTablet) {
        setDevice('Tablet');
      } else {
        setDevice('Desktop');
      }

      // Determine browser name
      let browserName = 'Unknown';

      if (userAgent.includes('firefox')) {
        browserName = 'Mozilla Firefox';
      } else if (userAgent.includes('samsungbrowser')) {
        browserName = 'Samsung Internet';
      } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
        browserName = 'Opera';
      } else if (userAgent.includes('trident')) {
        browserName = 'Microsoft Internet Explorer';
      } else if (userAgent.includes('edge')) {
        browserName = 'Microsoft Edge';
      } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        browserName = 'Google Chrome';
      } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        browserName = 'Apple Safari';
      }

      setBrowserInfo({ browserName, userAgent });
    };

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

    return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  return { device, browserInfo };
};

export default useDeviceDetection;
