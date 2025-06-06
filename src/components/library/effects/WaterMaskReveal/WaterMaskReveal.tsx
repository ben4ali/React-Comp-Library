import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import student from '../../../../assets/images/WaterMaskReveal/purple_flowers.jpg';

interface WaterMaskRevealProps {
  radiusSpeed?: number;
  noiseScale?: number;
  softnessVariation?: number;
  imageWidth?: number;
  imageHeight?: number;
}

const IMAGE_WIDTH = 9;
const IMAGE_HEIGHT = 7;
const INITIAL_RADIUS = -0.7;
const RADIUS_SPEED = 0.5;
let EFFECT_DURATION = (0.5 / RADIUS_SPEED) * 2.7;
const INITIAL_SOFTNESS = 0.1;
const NOISE_SCALE = 6.0;
const SOFTNESS_VARIATION = 0.5;

const WaterMaskPlane = ({
  imageTexture,
  radiusSpeed,
  noiseScale,
  softnessVariation,
  imageWidth,
  imageHeight,
}: {
  imageTexture: THREE.Texture;
  radiusSpeed: number;
  noiseScale: number;
  softnessVariation: number;
  imageWidth: number;
  imageHeight: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { size } = useThree();

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_texture: { value: imageTexture },
      u_radiusSpeed: { value: radiusSpeed },
      u_initialRadius: { value: INITIAL_RADIUS },
      u_initialSoftness: { value: INITIAL_SOFTNESS },
      u_noiseScale: { value: noiseScale },
      u_softnessVariation: { value: softnessVariation },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    precision mediump float;

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform sampler2D u_texture;
    uniform float u_radiusSpeed;
    uniform float u_initialRadius;
    uniform float u_initialSoftness;
    uniform float u_noiseScale;
    uniform float u_softnessVariation;

    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p ,vec2(127.1,311.7))) * 43758.5453);
    }

    float noise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float softCircle(vec2 uv, vec2 center, float radius, float softness) {
      float d = length(uv - center) - radius;
      return 1.0 - smoothstep(0.0, softness, d);
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;

      // easing out sine sur le temps normalisé entre 0 et 1
      float t = clamp(u_time / ${EFFECT_DURATION.toFixed(8)}, 0.0, 1.0);
      float ease = sin(t * 1.57079632679); // PI/2

      // rayon avec easing
      float radius = u_initialRadius + ease * u_radiusSpeed * ${EFFECT_DURATION.toFixed(
        8
      )};
      float softness = u_initialSoftness + noise(uv * u_noiseScale + u_time) * u_softnessVariation;
      float mask = softCircle(uv, vec2(0.0, 0.0), radius, softness);

      vec4 texColor = texture2D(u_texture, vUv);
      gl_FragColor = vec4(texColor.rgb, texColor.a * mask);
    }
  `,
    transparent: true,
  });

  materialRef.current = shaderMaterial;

  useEffect(() => {
    shaderMaterial.uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, shaderMaterial.uniforms.u_resolution.value]);

  useFrame(({ clock }) => {
    shaderMaterial.uniforms.u_time.value = Math.min(
      clock.getElapsedTime(),
      EFFECT_DURATION
    );
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_radiusSpeed.value = radiusSpeed;
      materialRef.current.uniforms.u_noiseScale.value = noiseScale;
      materialRef.current.uniforms.u_softnessVariation.value =
        softnessVariation;
    }
    EFFECT_DURATION = (0.5 / radiusSpeed) * 2.7;
  }, [radiusSpeed, noiseScale, softnessVariation]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[imageWidth, imageHeight]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

const WaterMaskReveal: React.FC<WaterMaskRevealProps> = ({
  radiusSpeed = RADIUS_SPEED,
  noiseScale = NOISE_SCALE,
  softnessVariation = SOFTNESS_VARIATION,
  imageWidth = IMAGE_WIDTH,
  imageHeight = IMAGE_HEIGHT,
}) => {
  const imageTexture = useLoader(THREE.TextureLoader, student);
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setKey(k => k + 1);
  }, [radiusSpeed, noiseScale, softnessVariation]);

  return (
    <div className="w-full h-[400px] relative">
      <Canvas className="absolute inset-0 z-10" key={key}>
        <WaterMaskPlane
          imageTexture={imageTexture}
          radiusSpeed={radiusSpeed}
          noiseScale={noiseScale}
          softnessVariation={softnessVariation}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      </Canvas>
    </div>
  );
};

export default WaterMaskReveal;
