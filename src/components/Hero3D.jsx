"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── CINEMATIC 3D HERO ─────────────────────────────────────
// A slowly-rotating torus-knot "film reel" wrapped in a
// 2,400-particle constellation, lit purple + rose. Reacts
// subtly to mouse movement. Pure Three.js — no assets.

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── central knot (the "story core") ──
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.1, 0.55, 220, 32),
      new THREE.MeshStandardMaterial({
        color: 0x1c1a35,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x6c63ff,
        emissiveIntensity: 0.22,
      })
    );
    scene.add(knot);

    // wireframe overlay for premium tech feel
    const wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.16, 0.56, 110, 16),
      new THREE.MeshBasicMaterial({
        color: 0xa99dff,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    );
    scene.add(wire);

    // ── particle constellation ──
    const COUNT = 2400;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cPurple = new THREE.Color(0x6c63ff);
    const cRose = new THREE.Color(0xe879a0);
    const cTeal = new THREE.Color(0x2dd4bf);
    for (let i = 0; i < COUNT; i++) {
      const r = 4.5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() < 0.55 ? cPurple : Math.random() < 0.7 ? cRose : cTeal;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // ── lights ──
    scene.add(new THREE.AmbientLight(0x6c63ff, 0.5));
    const l1 = new THREE.PointLight(0x6c63ff, 60, 40);
    l1.position.set(6, 4, 6);
    scene.add(l1);
    const l2 = new THREE.PointLight(0xe879a0, 50, 40);
    l2.position.set(-6, -3, 5);
    scene.add(l2);
    const l3 = new THREE.PointLight(0x2dd4bf, 25, 40);
    l3.position.set(0, 6, -6);
    scene.add(l3);

    // ── mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.12;
      knot.rotation.y = t * 0.18;
      wire.rotation.x = t * 0.12;
      wire.rotation.y = t * 0.18;
      particles.rotation.y = t * 0.025;
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pGeo.dispose();
      knot.geometry.dispose();
      wire.geometry.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
