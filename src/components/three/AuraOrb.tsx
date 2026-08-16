import { useEffect, useRef } from "react";
import * as THREE from "three";

function makeSprite(): THREE.CanvasTexture {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function capsule(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, r1: number, r2 = r1) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const a1 = Math.atan2(ny, nx);
  ctx.beginPath();
  ctx.moveTo(x1 + nx * r1, y1 + ny * r1);
  ctx.lineTo(x2 + nx * r2, y2 + ny * r2);
  ctx.arc(x2, y2, r2, a1, a1 - Math.PI, true);
  ctx.lineTo(x1 - nx * r1, y1 - ny * r1);
  ctx.arc(x1, y1, r1, a1 - Math.PI, a1, true);
  ctx.closePath();
  ctx.fill();
}

function smoothBlob(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  const n = pts.length;
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ];
  ctx.beginPath();
  const start = mid(pts[n - 1], pts[0]);
  ctx.moveTo(start[0], start[1]);
  for (let i = 0; i < n; i++) {
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const m = mid(cur, next);
    ctx.quadraticCurveTo(cur[0], cur[1], m[0], m[1]);
  }
  ctx.closePath();
  ctx.fill();
}

const SIL_W = 320;
const SIL_H = 520;

// side profile, facing right (+x = front of body)
function drawFatProfile(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#fff";
  smoothBlob(ctx, [
    [150, 16], // head top
    [196, 44], // forehead
    [182, 88], // chin
    [164, 102], // neck front
    [188, 124], // upper chest
    [300, 205], // belly apex (big bulge)
    [296, 255], // belly lower
    [260, 300], // lower belly front
    [232, 305], // hip front
    [212, 385], // thigh front
    [198, 450], // shin front
    [222, 480], // toe
    [222, 494], // foot bottom front
    [150, 496], // foot bottom back
    [128, 480], // heel
    [140, 410], // calf back
    [128, 330], // thigh back
    [110, 290], // glute
    [112, 225], // lower back
    [122, 150], // upper back
    [132, 100], // back of neck
    [118, 60], // back of head
  ]);
  // hanging arm
  capsule(ctx, 205, 132, 222, 225, 26, 22);
  capsule(ctx, 222, 225, 208, 300, 20, 17);
}

function drawAthleticProfile(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#fff";
  smoothBlob(ctx, [
    [155, 12], // head top
    [186, 32], // forehead
    [176, 60], // chin
    [166, 74], // neck front
    [206, 98], // puffed chest
    [192, 140], // upper abs
    [178, 182], // narrow waist
    [184, 202], // hip front
    [196, 268], // thigh front
    [188, 344], // knee
    [178, 420], // shin front
    [202, 460], // toe
    [204, 472], // foot bottom front
    [156, 474], // foot bottom back
    [136, 460], // heel
    [128, 400], // calf back
    [120, 320], // thigh back
    [110, 265], // glute (defined)
    [104, 195], // lower back (arched)
    [110, 145], // mid back
    [122, 105], // shoulder blade
    [132, 78], // back of neck
    [116, 48], // back of head
  ]);
  // flexed arm
  capsule(ctx, 192, 106, 216, 152, 18, 14);
  capsule(ctx, 216, 152, 190, 188, 14, 12);
}

function sampleSilhouette(draw: (ctx: CanvasRenderingContext2D) => void, count: number, targetHeight: number): Float32Array {
  const c = document.createElement("canvas");
  c.width = SIL_W;
  c.height = SIL_H;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, SIL_W, SIL_H);
  draw(ctx);
  const data = ctx.getImageData(0, 0, SIL_W, SIL_H).data;

  const xs: number[] = [];
  const ys: number[] = [];
  let minY = SIL_H;
  let maxY = 0;
  for (let y = 0; y < SIL_H; y++) {
    for (let x = 0; x < SIL_W; x++) {
      const idx = (y * SIL_W + x) * 4;
      if (data[idx + 3] > 128) {
        xs.push(x);
        ys.push(y);
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const total = xs.length;
  const cx = SIL_W / 2;
  const cy = (minY + maxY) / 2;
  const pixelHeight = Math.max(maxY - minY, 1);
  const SCALE = targetHeight / pixelHeight;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const idx = total ? Math.floor(Math.random() * total) : 0;
    const px = (xs[idx] ?? cx) + (Math.random() - 0.5) * 1.2;
    const py = (ys[idx] ?? cy) + (Math.random() - 0.5) * 1.2;
    positions[i * 3] = (px - cx) * SCALE;
    positions[i * 3 + 1] = -(py - cy) * SCALE;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return positions;
}

function makeOrbPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * radiusAtY * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
  }
  return positions;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function AuraOrb({ className, paused }: { className?: string; paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(!!paused);
  pausedRef.current = !!paused;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = container.clientWidth < 640;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmall, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const group = new THREE.Group();
    scene.add(group);

    const COUNT = isSmall ? 1800 : 8000;
    const FIGURE_HEIGHT = 3.6;
    const ORB_RADIUS = 1.7;

    const shapes = [
      makeOrbPositions(COUNT, ORB_RADIUS),
      sampleSilhouette(drawFatProfile, COUNT, FIGURE_HEIGHT),
      sampleSilhouette(drawAthleticProfile, COUNT, FIGURE_HEIGHT),
    ];
    const shapeColors = [
      new THREE.Color("#8fae1a"), // orb — visible neutral
      new THREE.Color("#7a8f22"), // heavy — muted but clearly visible
      new THREE.Color("#ccff00"), // athletic — full brand energy
    ];

    const positions = new Float32Array(shapes[0]);
    const colors = new Float32Array(COUNT * 3);
    const tmpColor = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      colors[i * 3] = shapeColors[0].r;
      colors[i * 3 + 1] = shapeColors[0].g;
      colors[i * 3 + 2] = shapeColors[0].b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sprite = makeSprite();
    const material = new THREE.PointsMaterial({
      size: isSmall ? 0.058 : 0.05,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
      opacity: 0.92,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const colorAttr = geometry.attributes.color as THREE.BufferAttribute;

    const mouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    let lastMove = performance.now();
    let prevRotY = 0;
    let energy = 0; // drives the orb -> heavy -> athletic -> orb cycle; movement speeds it up

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      lastMove = performance.now();
    }
    window.addEventListener("pointermove", onPointerMove);

    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;
    let prevT = 0;
    let frameCount = 0;
    const CYCLE_SECONDS = 9; // full orb -> heavy -> athletic -> orb loop at rest

    function animate() {
      frameId = requestAnimationFrame(animate);

      if (pausedRef.current) return; // e.g. hidden behind the application modal — save CPU

      frameCount++;
      if (isSmall && frameCount % 2 !== 0) return; // halve the CPU-heavy work on mobile

      const t = clock.getElapsedTime();
      const dt = Math.min(t - prevT, 0.1);
      prevT = t;

      const idle = performance.now() - lastMove > 1800;
      targetRot.y = mouse.x * 0.3;
      targetRot.x = -mouse.y * 0.14;
      group.rotation.y += (targetRot.y - group.rotation.y) * 0.045 + (idle ? 0.001 : 0.0003);
      group.rotation.x += (targetRot.x - group.rotation.x) * 0.045;

      if (!reducedMotion) {
        const rotDelta = Math.abs(group.rotation.y - prevRotY);
        prevRotY = group.rotation.y;
        energy += dt / CYCLE_SECONDS;
        energy += rotDelta * 6; // interacting with the orb accelerates the transformation

        const cyclePos = energy % 3;
        const idx0 = Math.floor(cyclePos);
        const idx1 = (idx0 + 1) % 3;
        const localT = cyclePos - idx0;
        const HOLD = 0.62; // spend most of each segment holding a clear, readable shape
        const eased =
          localT < HOLD ? 0 : smoothstep((localT - HOLD) / (1 - HOLD));

        const shapeA = shapes[idx0];
        const shapeB = shapes[idx1];
        const colorA = shapeColors[idx0];
        const colorB = shapeColors[idx1];

        for (let i = 0; i < COUNT; i++) {
          const ax = shapeA[i * 3];
          const ay = shapeA[i * 3 + 1];
          const az = shapeA[i * 3 + 2];
          const bx = shapeB[i * 3];
          const by = shapeB[i * 3 + 1];
          const bz = shapeB[i * 3 + 2];

          const wobble = Math.sin(t * 1.3 + i * 0.31) * 0.006;

          posAttr.array[i * 3] = ax + (bx - ax) * eased + wobble;
          posAttr.array[i * 3 + 1] = ay + (by - ay) * eased + wobble * 0.6;
          posAttr.array[i * 3 + 2] = az + (bz - az) * eased;

          tmpColor.copy(colorA).lerp(colorB, eased);
          colorAttr.array[i * 3] = tmpColor.r;
          colorAttr.array[i * 3 + 1] = tmpColor.g;
          colorAttr.array[i * 3 + 2] = tmpColor.b;
        }
        posAttr.needsUpdate = true;
        colorAttr.needsUpdate = true;

        const breathe = 1 + Math.sin(t * 0.6) * 0.02;
        group.scale.set(breathe, breathe, breathe);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
