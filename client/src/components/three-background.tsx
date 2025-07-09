import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Performance optimization for mobile
    const isMobile = window.innerWidth < 768;
    const objectCount = isMobile ? 8 : 12;

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

    // Create 3D printed objects
    const objects: THREE.Mesh[] = [];
    
    // Create 3D printed gears
    for (let i = 0; i < Math.floor(objectCount * 0.3); i++) {
      const gearGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 8);
      const gearMaterial = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xff8c00 : 0xffd700,
        transparent: true,
        opacity: 0.6,
        shininess: 100
      });
      
      const gear = new THREE.Mesh(gearGeometry, gearMaterial);
      gear.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      
      scene.add(gear);
      objects.push(gear);
    }

    // Create 3D printed miniature figures
    for (let i = 0; i < Math.floor(objectCount * 0.3); i++) {
      const figureGeometry = new THREE.ConeGeometry(0.5, 2, 6);
      const figureMaterial = new THREE.MeshPhongMaterial({
        color: 0xff4500,
        transparent: true,
        opacity: 0.7,
        shininess: 80
      });
      
      const figure = new THREE.Mesh(figureGeometry, figureMaterial);
      figure.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      
      scene.add(figure);
      objects.push(figure);
    }

    // Create 3D printed vases
    for (let i = 0; i < Math.floor(objectCount * 0.25); i++) {
      const vaseGeometry = new THREE.LatheGeometry([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.5, 0.5),
        new THREE.Vector2(0.8, 1),
        new THREE.Vector2(0.6, 1.5),
        new THREE.Vector2(0.4, 2)
      ]);
      const vaseMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.5,
        shininess: 120
      });
      
      const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
      vase.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      vase.scale.set(0.5, 0.5, 0.5);
      
      scene.add(vase);
      objects.push(vase);
    }

    // Create 3D printed mechanical parts
    for (let i = 0; i < Math.floor(objectCount * 0.15); i++) {
      const partGeometry = new THREE.BoxGeometry(1, 0.3, 1);
      const partMaterial = new THREE.MeshPhongMaterial({
        color: 0xff8c00,
        transparent: true,
        opacity: 0.8,
        wireframe: i % 2 === 0
      });
      
      const part = new THREE.Mesh(partGeometry, partMaterial);
      part.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35
      );
      
      scene.add(part);
      objects.push(part);
    }

    // Create floating particles
    const particleCount = isMobile ? 50 : 100;
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
    camera.position.z = 20;

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

      // Rotate all 3D printed objects
      objects.forEach((object, index) => {
        object.rotation.x += 0.001 + (index * 0.0005);
        object.rotation.y += 0.001 + (index * 0.0005);
        object.rotation.z += 0.0005 + (index * 0.0003);
        
        // Gentle floating motion
        object.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Animate particles
      const particlePositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlePositions.length; i += 3) {
        particlePositions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;

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