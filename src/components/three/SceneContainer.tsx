import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

interface SceneContainerProps {
  particleCount?: number
}

export default function SceneContainer({ particleCount = 3000 }: SceneContainerProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true" role="presentation">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#b000ff" />
        <ParticleField count={particleCount} />
        <FloatingGeometry />
      </Canvas>
    </div>
  )
}
