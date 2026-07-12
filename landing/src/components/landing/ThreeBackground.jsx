import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ortho ThreeBackground — a very subtle rotating "repository graph"
 * cluster of nodes + connecting lines that sits behind the whole
 * landing page. Fixed, pointer-events-none, extremely low opacity so
 * it never fights with content.
 *
 * Palette: mono white with amber-highlighted nodes to match the
 * existing editorial identity.
 */
export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Respect user preference for reduced motion.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getSize = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    const { w, h } = getSize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const nodeGroup = new THREE.Group();
    const nodes = [];
    const nodeCount = 44;
    const nodeGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const whiteMat = new THREE.MeshBasicMaterial({
      color: 0xf4f4f4,
      transparent: true,
      opacity: 0.55,
    });
    const amberMat = new THREE.MeshBasicMaterial({
      color: 0xffb000,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(
        nodeGeo,
        Math.random() > 0.82 ? amberMat : whiteMat
      );
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      nodeGroup.add(mesh);
      nodes.push(mesh);
    }

    // Edges — connect close nodes with dim lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xf4f4f4,
      transparent: true,
      opacity: 0.08,
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 3) {
          const points = [
            nodes[i].position.clone(),
            nodes[j].position.clone(),
          ];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, lineMat);
          nodeGroup.add(line);
        }
      }
    }

    scene.add(nodeGroup);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      if (!prefersReduced) {
        nodeGroup.rotation.y = t * 0.05;
        nodeGroup.rotation.x = Math.sin(t * 0.03) * 0.15;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const { w: nw, h: nh } = getSize();
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Pause the loop when the tab is hidden to save CPU
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
      nodeGeo.dispose();
      whiteMat.dispose();
      amberMat.dispose();
      lineMat.dispose();
      // detach canvas
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="three-background"
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
