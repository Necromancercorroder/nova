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

    // Create 3D printed dragon
    const shapes: THREE.Mesh[] = [];
    
    // Create dragon body (elongated ellipsoid)
    const dragonBodyGeometry = new THREE.CylinderGeometry(0.8, 1.2, 4, 12);
    const dragonBodyMaterial = new THREE.MeshPhongMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    
    const dragonBody = new THREE.Mesh(dragonBodyGeometry, dragonBodyMaterial);
    dragonBody.position.set(0, 0, 0);
    dragonBody.rotation.z = Math.PI / 2; // Rotate to horizontal

    // Create dragon head
    const dragonHeadGeometry = new THREE.ConeGeometry(1, 2, 8);
    const dragonHeadMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    
    const dragonHead = new THREE.Mesh(dragonHeadGeometry, dragonHeadMaterial);
    dragonHead.position.set(3, 0, 0);
    dragonHead.rotation.z = -Math.PI / 2;

    // Create dragon wings
    const wingGeometry = new THREE.ConeGeometry(1.5, 3, 3);
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.5, 2, 0);
    leftWing.rotation.z = Math.PI / 4;
    
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(-0.5, -2, 0);
    rightWing.rotation.z = -Math.PI / 4;

    // Create dragon tail
    const tailGeometry = new THREE.ConeGeometry(0.3, 3, 6);
    const tailMaterial = new THREE.MeshPhongMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.7
    });
    
    const dragonTail = new THREE.Mesh(tailGeometry, tailMaterial);
    dragonTail.position.set(-4, 0, 0);
    dragonTail.rotation.z = Math.PI / 2;

    // Create dragon legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 6);
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.8
    });
    
    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(1, 0, -1.5);
    
    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(-1, 0, -1.5);

    // Create dragon spikes along the back
    const spikeGeometry = new THREE.ConeGeometry(0.2, 0.8, 4);
    const spikeMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4500,
      transparent: true,
      opacity: 0.9
    });

    // Group all dragon parts together
    const dragonGroup = new THREE.Group();
    
    // Add all dragon parts to the group
    dragonGroup.add(dragonBody);
    dragonGroup.add(dragonHead);
    dragonGroup.add(leftWing);
    dragonGroup.add(rightWing);
    dragonGroup.add(dragonTail);
    dragonGroup.add(leg1);
    dragonGroup.add(leg2);
    
    // Add spikes to the group
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      spike.position.set(-2 + i * 1, 0, 1.5);
      dragonGroup.add(spike);
    }
    
    // Position the entire dragon
    dragonGroup.position.set(0, 0, 0);
    dragonGroup.scale.set(1.5, 1.5, 1.5);
    scene.add(dragonGroup);

    // Add some floating particles around the dragon
    const dragonParticleCount = isMobile ? 30 : 50;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(dragonParticleCount * 3);
    
    for (let i = 0; i < dragonParticleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff8c00,
      size: 0.08,
      transparent: true,
      opacity: 0.4
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

      // Rotate the entire dragon
      dragonGroup.rotation.y += 0.005;
      dragonGroup.rotation.z += 0.002;
      
      // Gentle floating motion for the dragon
      dragonGroup.position.y = Math.sin(Date.now() * 0.001) * 0.5;
      
      // Animate wings flapping
      const wingFlap = Math.sin(Date.now() * 0.003) * 0.3;
      leftWing.rotation.y = wingFlap;
      rightWing.rotation.y = -wingFlap;
      
      // Animate particles floating around
      const particlePositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlePositions.length; i += 3) {
        particlePositions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
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