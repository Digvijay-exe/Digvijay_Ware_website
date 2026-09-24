import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  reducedMotion?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all 3D objects
    const techGroup = new THREE.Group();
    scene.add(techGroup);

    // 1. Central Core: Icosahedron with custom glowing shader or dual wireframe + solid
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const coreMesh = new THREE.Mesh(coreGeometry, wireframeMaterial);
    techGroup.add(coreMesh);

    // Inner Glowing Core
    const innerGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    techGroup.add(innerMesh);

    // Outer Ring (Orbital Gyroscope Ring)
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.03, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Indigo
      transparent: true,
      opacity: 0.6
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    techGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    techGroup.add(ringMesh2);

    // Skill Nodes orbiting around the core
    const skillNodes: THREE.Mesh[] = [];
    const skillColors = [0x38bdf8, 0x10b981, 0xa855f7, 0xf59e0b, 0xec4899];
    const nodeCount = 5;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4;
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: skillColors[i],
        emissive: skillColors[i],
        emissiveIntensity: 0.8,
        roughness: 0.1
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * 0.8, Math.sin(angle) * radius);
      techGroup.add(node);
      skillNodes.push(node);
    }

    // Particle Cloud (Ambient Code/Data Dust)
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLight1.position.set(4, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 20);
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.8;
      mouseY = y * 0.8;
    };

    const onClick = () => {
      // Pulse animation
      setIsInteracting(true);
      coreMesh.scale.set(1.25, 1.25, 1.25);
      setTimeout(() => {
        coreMesh.scale.set(1, 1, 1);
        setIsInteracting(false);
      }, 350);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!reducedMotion) {
        // Continuous smooth rotation
        targetRotationY += 0.005;

        // Smooth lerp to mouse position
        techGroup.rotation.y += (targetRotationY + mouseX * 0.5 - techGroup.rotation.y) * 0.05;
        techGroup.rotation.x += (mouseY * 0.4 - techGroup.rotation.x) * 0.05;

        // Inner core counter-rotation
        innerMesh.rotation.y -= 0.01;
        innerMesh.rotation.z += 0.008;

        // Rings rotation
        ringMesh1.rotation.z = elapsedTime * 0.4;
        ringMesh2.rotation.y = elapsedTime * 0.35;

        // Orbital nodes
        skillNodes.forEach((node, i) => {
          const angle = (i / nodeCount) * Math.PI * 2 + elapsedTime * 0.5;
          const radius = 2.4;
          node.position.x = Math.cos(angle) * radius;
          node.position.z = Math.sin(angle) * radius;
          node.position.y = Math.sin(angle * 2) * 0.5;
        });

        // Slow ambient particle drift
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Clean up geometries and materials
      coreGeometry.dispose();
      innerGeometry.dispose();
      ringGeometry.dispose();
      particleGeometry.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      ringMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Engineering Core - Click to pulse or move cursor to rotate"
      />

      {/* Gamified 3D Status Overlay */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[11px] text-cyan-300">Three.js Kinetic Core // Interactive</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 font-mono text-[10px]">
          <span>Hover / Click to Interact</span>
        </div>
      </div>
    </div>
  );
};
