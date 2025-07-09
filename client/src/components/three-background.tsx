import { useEffect, useRef } from "react";
import dragonImage from "@assets/61e5UdtNeFL._AC_SX569_1752072053841.jpg";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create multiple dragon instances for movement
    const dragons: HTMLDivElement[] = [];
    
    // Create 3 dragon instances
    for (let i = 0; i < 3; i++) {
      const dragonContainer = document.createElement('div');
      dragonContainer.className = 'dragon-container';
      dragonContainer.style.cssText = `
        position: absolute;
        width: 300px;
        height: 200px;
        opacity: 0.3;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1;
      `;
      
      const dragonImg = document.createElement('img');
      dragonImg.src = dragonImage;
      dragonImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(0.8) contrast(1.2);
      `;
      
      dragonContainer.appendChild(dragonImg);
      mountRef.current.appendChild(dragonContainer);
      dragons.push(dragonContainer);
      
      // Set initial positions
      dragonContainer.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
      dragonContainer.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      // Increase opacity when mouse is near dragons
      dragons.forEach(dragon => {
        const rect = dragon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        
        if (distance < 200) {
          dragon.style.opacity = '0.6';
        } else {
          dragon.style.opacity = '0.3';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      dragons.forEach((dragon, index) => {
        const time = Date.now() * 0.001;
        const speed = 0.5 + index * 0.2;
        
        // Circular movement with different patterns
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = 200 + index * 100;
        
        const x = centerX + Math.sin(time * speed) * radius - 150;
        const y = centerY + Math.cos(time * speed * 0.8) * (radius * 0.6) - 100;
        
        dragon.style.left = `${x}px`;
        dragon.style.top = `${y}px`;
        
        // Rotation animation
        const rotation = time * 20 + index * 120;
        dragon.style.transform = `rotate(${rotation}deg) scale(${0.8 + Math.sin(time * 2) * 0.2})`;
        
        // Floating animation
        dragon.style.transform += ` translateY(${Math.sin(time * 3 + index) * 20}px)`;
      });
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      // Reposition dragons on resize
      dragons.forEach(dragon => {
        const currentLeft = parseInt(dragon.style.left);
        const currentTop = parseInt(dragon.style.top);
        
        if (currentLeft > window.innerWidth - 300) {
          dragon.style.left = `${window.innerWidth - 300}px`;
        }
        if (currentTop > window.innerHeight - 200) {
          dragon.style.top = `${window.innerHeight - 200}px`;
        }
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      dragons.forEach(dragon => {
        if (mountRef.current && mountRef.current.contains(dragon)) {
          mountRef.current.removeChild(dragon);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)'
      }}
    />
  );
}