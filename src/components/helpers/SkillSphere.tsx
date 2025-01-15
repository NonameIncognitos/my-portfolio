import React, { useEffect, useRef } from 'react';
import TagCloud, { TagCloudOptions } from 'TagCloud';

interface SkillSphereProps {
  skills: string[];
}

interface MyTagCloudOptions extends TagCloudOptions {
    direction: number;
  }

const SkillSphere: React.FC<SkillSphereProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      TagCloud([containerRef.current], skills, {
        radius: 300,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
      } as MyTagCloudOptions);
    }
  }, [skills]);

  return <div ref={containerRef} className="text-sphere"></div>;
};

export default SkillSphere;