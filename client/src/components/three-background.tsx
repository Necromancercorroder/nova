import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Performance optimization for mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 100;
    const shapeCount = isMobile ? 6 : 8;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Create rotating cubes with different materials
    for (let i = 0; i < shapeCount; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xff8c00 : 0xffd700, // Orange and yellow
        transparent: true,
        opacity: 0.3,
        wireframe: i % 3 === 0
      });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(cube);
      shapes.push(cube);
    }

    // Create dodecahedrons (more complex 3D shapes)
    for (let i = 0; i < Math.floor(shapeCount * 0.6); i++) {
      const geometry = new THREE.DodecahedronGeometry(0.8);
      const material = new THREE.MeshPhongMaterial({
        color: 0xff4500,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });
      
      const dodecahedron = new THREE.Mesh(geometry, material);
      dodecahedron.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      
      scene.add(dodecahedron);
      shapes.push(dodecahedron);
    }

    // Create torus shapes (donut-like)
    for (let i = 0; i < Math.floor(shapeCount * 0.5); i++) {
      const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.25
      });
      
      const torus = new THREE.Mesh(geometry, material);
      torus.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      
      scene.add(torus);
      shapes.push(torus);
    }

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff8c00,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    shapes.push(particles as any);

    // Create wireframe spheres
    for (let i = 0; i < Math.floor(shapeCount * 0.4); i++) {
      const geometry = new THREE.SphereGeometry(1.5, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff4500,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35
      );
      
      scene.add(sphere);
      shapes.push(sphere);
    }

    // Create helix-like structures
    for (let i = 0; i < (isMobile ? 1 : 2); i++) {
      const points = [];
      for (let j = 0; j < 100; j++) {
        const angle = (j / 100) * Math.PI * 4;
        const radius = 2;
        const x = radius * Math.cos(angle);
        const y = (j / 100) * 8 - 4;
        const z = radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.4
      });
      
      const helix = new THREE.Line(geometry, material);
      helix.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      scene.add(helix);
      shapes.push(helix as any);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff8c00, 0.5, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 + (index * 0.0005);
        shape.rotation.y += 0.001 + (index * 0.0005);
        shape.rotation.z += 0.0005 + (index * 0.0003);
        
        // Gentle floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
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