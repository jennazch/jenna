
import React, { useEffect, useRef } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Globe = ({ isDarkMode = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Increase radius slightly since we are hiding half
    const globeRadius = Math.min(width, height) * 0.45;
    const dots = [];
    // Increased number of dots for more detail
    const numDots = 800;

    // Initialize dots on a sphere
    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(-1 + (2 * i) / numDots);
      const theta = Math.sqrt(numDots * Math.PI) * phi;
      dots.push({
        x: globeRadius * Math.cos(theta) * Math.sin(phi),
        y: globeRadius * Math.sin(theta) * Math.sin(phi),
        z: globeRadius * Math.cos(phi),
      });
    }

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      // Position center at the bottom to show only top half
      const cy = height; 

      // Slowed down animation speed
      angleY += 0.001; 
      angleX += 0.0005;

      // Draw standard decorative ring
      ctx.beginPath();
      // Adjust ring color based on mode
      ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      // Adjust ring position relative to new center
      ctx.ellipse(cx, cy, globeRadius * 1.5, globeRadius * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();

      dots.forEach((dot) => {
        // Rotate around Y
        let x = dot.x * Math.cos(angleY) - dot.z * Math.sin(angleY);
        let z = dot.z * Math.cos(angleY) + dot.x * Math.sin(angleY);
        
        // Rotate around X
        let y = dot.y * Math.cos(angleX) - z * Math.sin(angleX);
        z = z * Math.cos(angleX) + dot.y * Math.sin(angleX);

        // Project 3D to 2D
        const scale = 300 / (300 + z);
        const px = cx + x * scale;
        const py = cy + y * scale;

        const alpha = Math.max(0.1, (z + globeRadius) / (2 * globeRadius)); // Depth fading

        // Only draw if it's somewhat within visible bounds
        ctx.beginPath();
        // Dot color based on mode
        ctx.fillStyle = isDarkMode 
            ? `rgba(255, 255, 255, ${alpha})` 
            : `rgba(0, 0, 0, ${alpha})`;
            
        ctx.arc(px, py, 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isDarkMode]);

  return html`
    <div className="w-full h-48 md:h-64 flex items-center justify-center overflow-hidden relative">
        <div className=${`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t z-10 ${isDarkMode ? 'from-black to-transparent' : 'from-gray-50 to-transparent'}`}></div>
        <canvas ref=${canvasRef} className="w-full h-full" style=${{ width: '100%', height: '100%' }} />
    </div>
  `;
};

export default Globe;
