import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface BlackHoleCursorProps {
  backgroundUrl?: string;
  force?: number;
  showBlackHole?: boolean;
}

const DEFAULT_BG =
  'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?cs=srgb&dl=pexels-philippedonn-1169754.jpg&fm=jpg';

const BlackHoleCursor: React.FC<BlackHoleCursorProps> = ({
  backgroundUrl = DEFAULT_BG,
  force = 0.08,
  showBlackHole = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const getDims = () => {
      if (!mountRef.current) return { width: 800, height: 400 };
      const w = mountRef.current.offsetWidth;
      const h = mountRef.current.offsetHeight;
      if (w / h > 2) return { width: w, height: w / 2 };
      return { width: w, height: h };
    };
    const { width, height } = getDims();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(backgroundUrl);
    const distortionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 1.0 },
        u_mouse: { value: new THREE.Vector2() },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_texture: { value: backgroundTexture },
        u_force: { value: force },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform sampler2D u_texture;
        uniform float u_force;
        varying vec2 vUv;
        void main() {
          vec2 st = vUv;
          vec2 mouse = u_mouse / u_resolution;
          mouse.y = 1.0 - mouse.y;
          float aspectRatio = u_resolution.x / u_resolution.y;
          vec2 scaledSt = st * vec2(aspectRatio, 1.0);
          float dist = distance(scaledSt, mouse * vec2(aspectRatio, 1.0));
          float distortion = u_force / dist;
          vec2 distortedUv = st + (mouse - st) * distortion;
          gl_FragColor = texture2D(u_texture, distortedUv);
        }
      `,
    });
    const aspectRatio = width / height;
    const size = 7.65;
    const planeWidth = size * aspectRatio;
    const planeHeight = size;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    distortionMaterial.uniforms.u_resolution.value.set(width, height);
    const blackHoleMesh = new THREE.Mesh(geometry, distortionMaterial);
    scene.add(blackHoleMesh);
    let running = true;
    function animate() {
      if (!running) return;
      distortionMaterial.uniforms.u_time.value -= 0.05;
      distortionMaterial.uniforms.u_mouse.value.set(
        mouse.current.x,
        mouse.current.y
      );
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
    const handleResize = () => {
      if (!mountRef.current) return;
      const { width: newW, height: newH } = getDims();
      renderer.setSize(newW, newH);
      distortionMaterial.uniforms.u_resolution.value.set(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    const handleCustomResize = () => handleResize();
    window.addEventListener('blackholecursor-resize', handleCustomResize);
    const mount = mountRef.current;
    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blackholecursor-resize', handleCustomResize);
      renderer.dispose();
      if (mount) mount.removeChild(renderer.domElement);
    };
  }, [backgroundUrl, force]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      if (blackHoleRef.current) {
        gsap.to(blackHoleRef.current, {
          left: mouse.current.x - 25,
          top: mouse.current.y - 25,
          duration: 0,
        });
      }
    };
    const handleDown = () => {
      if (blackHoleRef.current) {
        gsap.to(blackHoleRef.current, {
          scale: 2,
          duration: 0.25,
          ease: 'back',
        });
      }
    };
    const handleUp = () => {
      if (blackHoleRef.current) {
        gsap.to(blackHoleRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'back',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[40vw] max-h-[80vh] min-h-[300px]"
      style={{ cursor: 'none', overflow: 'hidden' }}
    >
      <div
        ref={blackHoleRef}
        className="blackHole pointer-events-none"
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'black',
          zIndex: 100,
          display: showBlackHole ? 'block' : 'none',
        }}
      />
    </div>
  );
};

export default BlackHoleCursor;
