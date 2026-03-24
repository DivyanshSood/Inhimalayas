// ═══════════════════════════════════════════════════════════════
// INHIMALAYS — Three.js 3D Mountain Scene
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  let scene, camera, renderer, clock;
  let terrain, starField, snowParticles, prayerFlagLines;
  let animationId;

  const COLORS = {
    sky: 0x0B1D33,
    fog: 0x0B1D33,
    snow: 0xD4E5F7,
    rock: 0x2C3E50,
    gold: 0xD4A853,
    sunset: 0xE8764A,
    forest: 0x1a3c2a,
    ambient: 0x334466,
    sun: 0xFFE4B0
  };

  function init() {
    const canvas = document.getElementById('mountain-canvas');
    if (!canvas) return;

    clock = new THREE.Clock();

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.fog, 0.0012);
    scene.background = new THREE.Color(COLORS.sky);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 80, 350);
    camera.lookAt(0, 40, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    createLighting();
    createTerrain();
    createStars();
    createSnow();
    createPrayerFlags();

    window.addEventListener('resize', onResize);
    animate();
  }

  // ─── Lighting ───
  function createLighting() {
    // Ambient — cold moonlight
    const ambient = new THREE.AmbientLight(COLORS.ambient, 0.4);
    scene.add(ambient);

    // Sun — warm golden
    const sunLight = new THREE.DirectionalLight(COLORS.sun, 0.8);
    sunLight.position.set(200, 150, -100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Sunset glow from horizon
    const sunsetLight = new THREE.PointLight(COLORS.sunset, 0.5, 800);
    sunsetLight.position.set(-200, 20, -300);
    scene.add(sunsetLight);

    // Hemisphere for natural sky/ground color
    const hemi = new THREE.HemisphereLight(0x5B9BD5, COLORS.forest, 0.3);
    scene.add(hemi);
  }

  // ─── Terrain ───
  function createTerrain() {
    const width = 1200;
    const depth = 800;
    const segW = 200;
    const segD = 150;

    const geometry = new THREE.PlaneGeometry(width, depth, segW, segD);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const colors = [];

    // Define mountain peaks
    const peaks = [
      { x: 0, z: -100, h: 180, s: 150 },
      { x: -250, z: -150, h: 140, s: 120 },
      { x: 200, z: -200, h: 160, s: 130 },
      { x: -400, z: -50, h: 110, s: 100 },
      { x: 350, z: -100, h: 120, s: 110 },
      { x: -150, z: -250, h: 130, s: 95 },
      { x: 100, z: -50, h: 90, s: 80 },
      { x: -350, z: -200, h: 100, s: 90 },
      { x: 450, z: -200, h: 95, s: 85 },
      { x: 50, z: -300, h: 150, s: 120 },
    ];

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      let y = 0;

      // Sum contributions from each peak
      peaks.forEach(peak => {
        const dx = x - peak.x;
        const dz = z - peak.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        y += peak.h * Math.exp(-(dist * dist) / (2 * peak.s * peak.s));
      });

      // Add noise for natural variation
      y += Math.sin(x * 0.02) * 8 + Math.cos(z * 0.03) * 6;
      y += Math.sin(x * 0.05 + z * 0.04) * 4;
      y += (Math.random() - 0.5) * 3;

      positions.setY(i, y);

      // Color based on altitude
      const color = new THREE.Color();
      if (y > 140) {
        // Snow caps
        color.setHex(COLORS.snow);
        color.lerp(new THREE.Color(0xffffff), (y - 140) / 60);
      } else if (y > 100) {
        // Rocky slopes
        color.lerpColors(new THREE.Color(0x4a5568), new THREE.Color(COLORS.snow), (y - 100) / 40);
      } else if (y > 50) {
        // Alpine meadow with rocks
        color.lerpColors(new THREE.Color(COLORS.forest), new THREE.Color(0x4a5568), (y - 50) / 50);
      } else if (y > 10) {
        // Forest
        color.setHex(COLORS.forest);
        const variation = Math.random() * 0.15;
        color.r += variation * 0.3;
        color.g += variation;
      } else {
        // Valley floor
        color.lerpColors(new THREE.Color(0x1a2f1a), new THREE.Color(COLORS.forest), y / 10);
      }

      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({
      vertexColors: true,
      flatShading: false,
    });

    terrain = new THREE.Mesh(geometry, material);
    terrain.receiveShadow = true;
    scene.add(terrain);
  }

  // ─── Stars ───
  function createStars() {
    const geo = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = Math.random() * 600 + 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });

    starField = new THREE.Points(geo, mat);
    scene.add(starField);
  }

  // ─── Snow Particles ───
  function createSnow() {
    const geo = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = Math.random() * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: -(Math.random() * 0.5 + 0.2),
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    snowParticles = new THREE.Points(geo, mat);
    snowParticles.userData.velocities = velocities;
    scene.add(snowParticles);
  }

  // ─── Prayer Flags (3D) ───
  function createPrayerFlags() {
    const flagColors = [0x2563eb, 0xdc2626, 0x16a34a, 0xeab308, 0xf97316];
    const group = new THREE.Group();

    // String between two poles
    const startX = -80;
    const endX = 80;
    const y = 120;
    const z = -50;
    const flagCount = 15;

    for (let i = 0; i < flagCount; i++) {
      const t = i / (flagCount - 1);
      const x = startX + (endX - startX) * t;
      // Catenary curve
      const sagY = y - 15 * Math.pow((t - 0.5) * 2, 2) * -1 - 10;

      const flagGeo = new THREE.PlaneGeometry(8, 12, 4, 6);
      const flagMat = new THREE.MeshLambertMaterial({
        color: flagColors[i % flagColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });

      const flag = new THREE.Mesh(flagGeo, flagMat);
      flag.position.set(x, sagY, z);
      flag.userData.basePositions = flagGeo.attributes.position.array.slice();
      flag.userData.offset = i * 0.5;

      group.add(flag);
    }

    prayerFlagLines = group;
    scene.add(group);
  }

  // ─── Animation ───
  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Subtle camera sway
    camera.position.x = Math.sin(elapsed * 0.08) * 15;
    camera.position.y = 80 + Math.sin(elapsed * 0.12) * 5;
    camera.lookAt(0, 40, 0);

    // Star twinkle
    if (starField) {
      starField.material.opacity = 0.5 + Math.sin(elapsed * 0.5) * 0.2;
    }

    // Snow fall
    if (snowParticles) {
      const pos = snowParticles.geometry.attributes.position;
      const vels = snowParticles.userData.velocities;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i) + vels[i].x + Math.sin(elapsed + i) * 0.1;
        let y = pos.getY(i) + vels[i].y;
        let z = pos.getZ(i) + vels[i].z;

        // Reset snowflake if it falls below ground
        if (y < -5) {
          y = 300 + Math.random() * 100;
          x = (Math.random() - 0.5) * 800;
          z = (Math.random() - 0.5) * 600;
        }

        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;
    }

    // Prayer flag wave
    if (prayerFlagLines) {
      prayerFlagLines.children.forEach(flag => {
        const geo = flag.geometry;
        const pos = geo.attributes.position;
        const base = flag.userData.basePositions;
        const offset = flag.userData.offset;

        for (let i = 0; i < pos.count; i++) {
          const baseX = base[i * 3];
          const baseY = base[i * 3 + 1];
          const baseZ = base[i * 3 + 2];

          // Vertical position determines wave amplitude
          const vFactor = (baseY + 6) / 12; // 0 at top, 1 at bottom
          const wave = Math.sin(elapsed * 2.5 + offset + baseY * 0.3) * 3 * vFactor;
          const wave2 = Math.cos(elapsed * 1.8 + offset + baseX * 0.2) * 1.5 * vFactor;

          pos.setZ(i, baseZ + wave + wave2);
          pos.setX(i, baseX + wave2 * 0.3);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
      });
    }

    renderer.render(scene, camera);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // ─── Public API ───
  window.HimalayaScene = {
    init,
    destroy: function() {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
