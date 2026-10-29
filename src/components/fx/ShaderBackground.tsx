import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/scroll'

const VERTEX = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`

// Domain-warped fbm: two layers of noise feeding each other's coordinates give
// the slow, liquid folds. The pointer bends the warp field around it.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
out vec4 color;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float pull = exp(-3.5 * length(p - m));
  float t = uTime * 0.06;

  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 4.2));
  vec2 r = vec2(fbm(p * 1.4 + 3.0 * q + vec2(1.7, 9.2) + t * 1.4 + m * pull),
                fbm(p * 1.4 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.4 + 3.2 * r);

  vec3 base = vec3(0.031, 0.031, 0.04);
  vec3 violet = vec3(0.30, 0.20, 0.85);
  vec3 lime = vec3(0.78, 0.96, 0.26);
  vec3 col = mix(base, violet, smoothstep(0.35, 0.95, f) * 0.85);
  col = mix(col, lime, smoothstep(0.62, 0.98, f * length(r)) * 0.55);
  col += lime * pull * 0.06;

  // Fade into the page at the bottom and darken the corners.
  col *= smoothstep(0.0, 0.45, uv.y);
  col *= 1.0 - 0.55 * length(uv - 0.5);
  color = vec4(col, 1.0);
}`

/**
 * Full-bleed WebGL backdrop for the hero. Rendered at half resolution (the
 * noise is soft, nobody can tell) and paused whenever it is off-screen, so it
 * costs nothing once the reader has scrolled past.
 */
export default function ShaderBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')

    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.5
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * scale)
      canvas.height = Math.round(canvas.clientHeight * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const target = { x: 0.5, y: 0.6 }
    const mouse = { ...target }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const draw = (time: number) => {
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      gl.uniform1f(uTime, time / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Reduced motion gets one still frame of the same field.
    if (prefersReducedMotion()) {
      draw(12000)
      return () => {
        ro.disconnect()
        window.removeEventListener('pointermove', onMove)
      }
    }

    let frame = 0
    let visible = true
    const loop = (time: number) => {
      draw(time)
      frame = visible ? requestAnimationFrame(loop) : 0
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      // The gradient is the fallback when WebGL2 is unavailable.
      className={`bg-[radial-gradient(ellipse_at_30%_40%,#2a1f6b_0%,#08080a_65%)] ${className ?? ''}`}
    />
  )
}
