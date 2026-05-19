import { useEffect, useRef } from 'react';

interface City {
  lat: number;
  lon: number;
  pulse: boolean;
}

const CITIES: City[] = [
  { lat: 35.68, lon: 139.69, pulse: true },   // Tokyo
  { lat: 40.71, lon: -74.01, pulse: true },   // New York
  { lat: 51.51, lon: -0.13,  pulse: false },  // London
  { lat: 48.86, lon: 2.35,   pulse: false },  // Paris
  { lat: 25.20, lon: 55.27,  pulse: true },   // Dubai
  { lat: 37.57, lon: 126.98, pulse: true },   // Seoul
  { lat: -23.55, lon: -46.63, pulse: false }, // São Paulo
  { lat: -33.87, lon: 151.21, pulse: false }, // Sydney
  { lat: 19.43, lon: -99.13,  pulse: false }, // Mexico City
  { lat: 55.75, lon: 37.62,   pulse: false }, // Moscow
  { lat: 28.61, lon: 77.21,   pulse: false }, // Delhi
  { lat: 1.35,  lon: 103.82,  pulse: true },  // Singapore
  { lat: 41.01, lon: 28.98,   pulse: false }, // Istanbul
  { lat: 59.33, lon: 18.07,   pulse: false }, // Stockholm
  { lat: 31.22, lon: 121.46,  pulse: true },  // Shanghai
  { lat: 47.38, lon: 8.54,    pulse: true },  // Zurich
  { lat: 45.46, lon: 9.19,    pulse: true },  // Milan
  { lat: -34.60, lon: -58.38, pulse: false }, // Buenos Aires
  { lat: 43.70, lon: -79.42,  pulse: false }, // Toronto
  { lat: 13.75, lon: 100.52,  pulse: false }, // Bangkok
];

const toRad = (d: number) => (d * Math.PI) / 180;

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const rotY      = useRef(0);
  const pulseTick = useRef(0);
  const mouse     = useRef({ y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Star = { x: number; y: number; r: number; a: number };
    const stars: Star[] = [];

    // -- resize: reset canvas pixel buffer + regen stars ----------------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = canvas.offsetWidth;
      const h   = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      // Setting canvas.width resets context transform; apply dpr scale fresh
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      for (let i = 0; i < 260; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.2,
          a: Math.random() * 0.6 + 0.1,
        });
      }
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // -- orthographic projection of sphere point onto screen -------------
    const project = (lat: number, lon: number, R: number, ry: number, tilt: number) => {
      const φ = toRad(lat);
      const λ = toRad(lon) + ry;
      const x =  Math.cos(φ) * Math.sin(λ);
      const y = -Math.sin(φ);
      const z =  Math.cos(φ) * Math.cos(λ);
      // Apply tilt around X-axis
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      return { sx: x * R, sy: y2 * R, z: z2 };
    };

    // -- draw a meridian (constant longitude, sweep latitude) ------------
    const drawMeridian = (lon: number, cx: number, cy: number, R: number, ry: number, tilt: number) => {
      ctx.beginPath();
      let started = false;
      for (let lat = -88; lat <= 88; lat += 2) {
        const { sx, sy, z } = project(lat, lon, R, ry, tilt);
        if (z >= 0) {
          if (!started) { ctx.moveTo(cx + sx, cy + sy); started = true; }
          else            ctx.lineTo(cx + sx, cy + sy);
        } else {
          started = false; // break line; don't moveTo back-side coord
        }
      }
      ctx.strokeStyle = 'rgba(80,160,255,0.13)';
      ctx.lineWidth   = 0.5;
      ctx.stroke();
    };

    // -- draw a parallel (constant latitude, sweep longitude) ------------
    const drawParallel = (lat: number, alpha: number, lw: number, cx: number, cy: number, R: number, ry: number, tilt: number) => {
      ctx.beginPath();
      let started = false;
      for (let lon = 0; lon <= 362; lon += 2) {
        const { sx, sy, z } = project(lat, lon, R, ry, tilt);
        if (z >= 0) {
          if (!started) { ctx.moveTo(cx + sx, cy + sy); started = true; }
          else            ctx.lineTo(cx + sx, cy + sy);
        } else {
          started = false;
        }
      }
      ctx.strokeStyle = `rgba(0,210,255,${alpha})`;
      ctx.lineWidth   = lw;
      ctx.stroke();
    };

    // -- main render loop ------------------------------------------------
    const frame = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      // Skip frames until the element has layout
      if (W <= 0 || H <= 0) {
        animRef.current = requestAnimationFrame(frame);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const R  = Math.min(W, H) * 0.41;

      rotY.current   += 0.0035;
      pulseTick.current += 0.05;

      const tilt = mouse.current.active
        ? (mouse.current.y - 0.5) * 0.5
        : Math.sin(rotY.current * 0.25) * 0.07;

      // ① Stars — only draw outside the sphere circle
      stars.forEach(s => {
        const dx = s.x - cx;
        const dy = s.y - cy;
        if (dx * dx + dy * dy > R * R * 1.05) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${s.a})`;
          ctx.fill();
        }
      });

      // ② Outer atmosphere rings (unclipped, outside sphere)
      for (let i = 4; i >= 1; i--) {
        const ir = R * 0.9;
        const or = R * (1 + i * 0.15);
        const g  = ctx.createRadialGradient(cx, cy, ir, cx, cy, or);
        g.addColorStop(0,   `rgba(0,200,255,${0.08 / i})`);
        g.addColorStop(0.5, `rgba(100,50,255,${0.04 / i})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, or, 0, Math.PI * 2);
        ctx.fill();
      }

      // ③ Clip everything inside the sphere from here onward
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Ocean base gradient (fills the clipped sphere)
      const ocean = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, 0, cx, cy, R);
      ocean.addColorStop(0,    'rgba(0,55,110,0.97)');
      ocean.addColorStop(0.35, 'rgba(0,20,60,0.98)');
      ocean.addColorStop(0.7,  'rgba(2,4,30,0.99)');
      ocean.addColorStop(1,    'rgba(0,0,18,1)');
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, W, H);

      // Directional night-side shadow (right + bottom dark band)
      const shadow = ctx.createRadialGradient(cx + R * 0.45, cy + R * 0.25, 0, cx + R * 0.4, cy + R * 0.2, R * 1.4);
      shadow.addColorStop(0, 'rgba(0,0,12,0.75)');
      shadow.addColorStop(1, 'rgba(0,0,12,0)');
      ctx.fillStyle = shadow;
      ctx.fillRect(0, 0, W, H);

      // Meridians (longitude lines)
      for (let lon = 0; lon < 360; lon += 30) {
        drawMeridian(lon, cx, cy, R, rotY.current, tilt);
      }

      // Parallels (latitude lines)
      for (let lat = -60; lat <= 60; lat += 30) {
        const isEquator = lat === 0;
        drawParallel(lat, isEquator ? 0.32 : 0.11, isEquator ? 1 : 0.5, cx, cy, R, rotY.current, tilt);
      }

      // ④ City dots
      CITIES.forEach(city => {
        const { sx, sy, z } = project(city.lat, city.lon, R, rotY.current, tilt);
        if (z < 0) return;
        const vis = Math.min(1, (z / R) * 1.6);
        const sx2 = cx + sx;
        const sy2 = cy + sy;

        if (city.pulse) {
          // Expanding ring
          const t  = (Math.sin(pulseTick.current + city.lat * 0.07) + 1) / 2;
          const pr = 4 + t * 10;
          const pa = (1 - t) * 0.65 * vis;
          ctx.beginPath();
          ctx.arc(sx2, sy2, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,212,255,${pa})`;
          ctx.lineWidth   = 1.5;
          ctx.stroke();

          // Soft glow behind dot
          const glow = ctx.createRadialGradient(sx2, sy2, 0, sx2, sy2, 13);
          glow.addColorStop(0, `rgba(0,220,255,${0.5 * vis})`);
          glow.addColorStop(1,  'rgba(0,220,255,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx2, sy2, 13, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.fillStyle = city.pulse
          ? `rgba(0,212,255,${vis})`
          : `rgba(140,90,255,${0.75 * vis})`;
        ctx.beginPath();
        ctx.arc(sx2, sy2, city.pulse ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restore clip
      ctx.restore();

      // ⑤ Rim glow (applied after clip restore, appears on sphere edge)
      const rim = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R);
      rim.addColorStop(0,   'rgba(0,0,0,0)');
      rim.addColorStop(0.7, 'rgba(0,200,255,0.03)');
      rim.addColorStop(1,   'rgba(0,180,255,0.25)');
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // ⑥ Specular highlight (top-left sheen)
      const spec = ctx.createRadialGradient(
        cx - R * 0.44, cy - R * 0.42, 0,
        cx - R * 0.32, cy - R * 0.32, R * 0.5
      );
      spec.addColorStop(0, 'rgba(255,255,255,0.11)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);

    // Mouse / touch interaction
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.y = (e.clientY - r.top) / r.height;
    };
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.y = (e.touches[0].clientY - r.top) / r.height;
    };
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('touchmove',  onTouch, { passive: true });
    canvas.addEventListener('mouseenter', () => { mouse.current.active = true;  });
    canvas.addEventListener('mouseleave', () => { mouse.current.active = false; });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove',  onMove);
      canvas.removeEventListener('touchmove',  onTouch);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}
