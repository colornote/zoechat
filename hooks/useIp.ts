import { useState, useEffect } from 'react';

interface IpInfo {
  ip: string;
  country: string;
  region: string;
  city: string;
}

export const useIp = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        // 使用 ipapi.co 的免费服务
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setIpInfo({
          ip: data.ip,
          country: data.country_name,
          region: data.region,
          city: data.city,
        });
      } catch (error) {
        console.error('获取IP信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIp();
  }, []);

  return { ipInfo, loading };
};
