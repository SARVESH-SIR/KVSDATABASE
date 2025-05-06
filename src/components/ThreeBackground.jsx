
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
      
      // Scale
      scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(scaleArray, 1)
    );
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x3b82f6, 0x1e3a8a);
    gridHelper.position.y = -3;
    scene.add(gridHelper);
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Move particles based on mouse
      particlesMesh.position.x = mouseX * 0.1;
      particlesMesh.position.y = mouseY * 0.1;
      
      // Rotate grid
      gridHelper.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 opacity-40"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default ThreeBackground;
