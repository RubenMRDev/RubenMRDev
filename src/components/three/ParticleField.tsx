import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
}

export default function ParticleField({ count = 3000 }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Purple-ish colors with variation
      colors[i3] = 0.5 + Math.random() * 0.2       // R
      colors[i3 + 1] = 0.0 + Math.random() * 0.1   // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2    // B

      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return

    mouseRef.current.x += (pointer.x * 2 - mouseRef.current.x) * 0.02
    mouseRef.current.y += (pointer.y * 2 - mouseRef.current.y) * 0.02

    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1 + mouseRef.current.y * 0.1
    mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.1 + mouseRef.current.x * 0.1

    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(clock.elapsedTime * 0.3 + positions[i3] * 0.5) * 0.002
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
