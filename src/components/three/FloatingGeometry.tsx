import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

export default function FloatingGeometry() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * 0.15
    meshRef.current.rotation.z = clock.elapsedTime * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[3, 0, -2]} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#b000ff"
          emissive="#6a00a0"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </Float>
  )
}
