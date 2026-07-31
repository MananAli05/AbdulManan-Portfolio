import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeJSParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle sparse neural data wave field
    const particleCount = 110;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const u = (i / particleCount) * Math.PI * 2;
      const x = (Math.sin(u * 1.5) * 1.8) + (Math.random() - 0.5) * 0.4;
      const y = (Math.cos(u * 2) * 1.4) + (Math.random() - 0.5) * 0.4;
      const z = (Math.sin(u * 3) * 0.8) + (Math.random() - 0.5) * 0.3;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions.push({
        x,
        y,
        z,
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Muted olive sparse particle points
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8E9B4D,
      size: 0.032,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Subtle curved line connections with low opacity
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8E9B4D,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p1 = initialPositions[i];
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = initialPositions[j];
        const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);
        if (dist < 0.85) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 4.2;

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.005;

      const currentPos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const init = initialPositions[i];
        currentPos[i * 3 + 1] = init.y + Math.sin(time * init.speed + init.phase) * 0.08;
        currentPos[i * 3] = init.x + Math.cos(time * init.speed * 0.5 + init.phase) * 0.05;
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.04;
      lines.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
