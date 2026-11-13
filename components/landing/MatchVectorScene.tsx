"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface MatchVectorSceneProps {
  matchScore: number;
  skillWeight: number;
  hub: string;
}

export function MatchVectorScene({
  matchScore,
  skillWeight,
  hub,
}: MatchVectorSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRadiusRef = useRef(1.8);
  const currentRadiusRef = useRef(1.8);
  const targetSpeedRef = useRef(0.003);
  const currentSpeedRef = useRef(0.003);

  // Update animation targets when score/skill changes
  useEffect(() => {
    // Higher score = tighter, more cohesive vector cluster
    const normalizedScore = (matchScore - 70) / 30; // 0 to 1
    targetRadiusRef.current = 2.4 - normalizedScore * 0.9; // 2.4 down to 1.5
    targetSpeedRef.current = 0.002 + (skillWeight / 100) * 0.004;
  }, [matchScore, skillWeight]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      return; // Graceful fallback to static UI
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 340;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // Group for rotation
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // 1. Central Candidate Core
    const coreGeometry = new THREE.SphereGeometry(0.18, 24, 24);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x141413,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    clusterGroup.add(coreMesh);

    // Core Outer Pulse Ring
    const ringGeometry = new THREE.RingGeometry(0.24, 0.28, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x769fcd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    clusterGroup.add(ringMesh);

    // 2. Orbital Tech & Employer Nodes
    const NODE_COUNT = 20;
    const basePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    const employerNodeGeom = new THREE.SphereGeometry(0.065, 16, 16);
    const accentNodeMat = new THREE.MeshBasicMaterial({ color: 0x769fcd });
    const inkNodeMat = new THREE.MeshBasicMaterial({ color: 0x141413 });

    // Fibonacci sphere distribution for harmonious spacing
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      basePositions.push(new THREE.Vector3(x, y, z));

      const isAccent = i % 3 === 0;
      const node = new THREE.Mesh(
        employerNodeGeom,
        isAccent ? accentNodeMat : inkNodeMat
      );
      node.position.set(x * 1.8, y * 1.8, z * 1.8);
      clusterGroup.add(node);
      nodeMeshes.push(node);
    }

    // 3. Dynamic Vector Lines (Connecting Central Core to Matching Nodes)
    const linePositions = new Float32Array(NODE_COUNT * 6);
    const lineColors = new Float32Array(NODE_COUNT * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    // Line material with vertex colors
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      linewidth: 1,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    clusterGroup.add(lines);

    // 4. Subtle Orbital Coordinate Rings
    const orbitRadius = 2.1;
    const orbitGeom = new THREE.BufferGeometry();
    const orbitPoints: number[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      orbitPoints.push(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * orbitRadius);
    }
    orbitGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(orbitPoints, 3)
    );
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0xb9d7ea,
      transparent: true,
      opacity: 0.35,
    });
    const orbitLine = new THREE.Line(orbitGeom, orbitMat);
    clusterGroup.add(orbitLine);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = y * 0.8;
    };

    container.addEventListener("pointermove", handlePointerMove);

    // Animation Loop
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      // Smoothly interpolate radius and speed
      currentRadiusRef.current +=
        (targetRadiusRef.current - currentRadiusRef.current) * 0.05;
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * 0.05;

      // Rotate the cluster
      clusterGroup.rotation.y += currentSpeedRef.current;
      clusterGroup.rotation.x +=
        (targetRotX - clusterGroup.rotation.x) * 0.05;
      clusterGroup.rotation.z +=
        (targetRotY - clusterGroup.rotation.z) * 0.05;

      // Pulse the ring mesh
      const ringScale = 1 + Math.sin(time * 3) * 0.08;
      ringMesh.scale.set(ringScale, ringScale, ringScale);

      // Update node positions based on current interpolated radius
      const r = currentRadiusRef.current;
      const positionsAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const colorsAttr = lineGeometry.attributes.color as THREE.BufferAttribute;

      const posArray = positionsAttr.array as Float32Array;
      const colArray = colorsAttr.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const bp = basePositions[i];
        // Slight organic oscillation
        const wave = Math.sin(time * 2 + i) * 0.06;
        const currentR = r + wave;

        const nx = bp.x * currentR;
        const ny = bp.y * currentR;
        const nz = bp.z * currentR;

        nodeMeshes[i].position.set(nx, ny, nz);

        // Vector line from origin (0,0,0) to node
        const idx = i * 6;
        posArray[idx] = 0;
        posArray[idx + 1] = 0;
        posArray[idx + 2] = 0;
        posArray[idx + 3] = nx;
        posArray[idx + 4] = ny;
        posArray[idx + 5] = nz;

        // Line color (#769FCD to light blue)
        colArray[idx] = 0.46; // R = 118/255
        colArray[idx + 1] = 0.62; // G = 159/255
        colArray[idx + 2] = 0.8; // B = 205/255

        colArray[idx + 3] = 0.73; // R = 185/255
        colArray[idx + 4] = 0.84; // G = 215/255
        colArray[idx + 5] = 0.92; // B = 234/255
      }

      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      employerNodeGeom.dispose();
      accentNodeMat.dispose();
      inkNodeMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      orbitGeom.dispose();
      orbitMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[340px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
      {/* Three.js canvas mount point */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating 3D status badge */}
      <div className="absolute top-3 left-3 pointer-events-none px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs border border-[#E2DDD3] text-[10px] font-mono font-bold text-[#141413] shadow-xs flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#769FCD] animate-pulse" />
        <span>3D VECTOR SIMULATOR · {hub.toUpperCase()}</span>
      </div>

      {/* Dynamic centroid distance badge */}
      <div className="absolute bottom-3 right-3 pointer-events-none px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs border border-[#E2DDD3] text-[10px] font-mono text-[#74726A] shadow-xs">
        Cosine Sim: <span className="font-bold text-[#141413]">{(matchScore / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}

