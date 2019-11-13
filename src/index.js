// copied from the react-three-fibre examples

import ReactDOM from 'react-dom'
import React, { useRef, useCallback } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useSpring, a, interpolate } from 'react-spring/three'

import './setupGlobalEffects'

import Image from './components/Image'
import Text from './components/Text'
import Stars from './components/Stars'
import Background from './components/Background'
import GlitchEffects from './components/GlitchEffects'

import data from './data'
import './styles.css'

/** This component creates a bunch of parallaxed images */
function Images({ top, mouse, scrollMax }) {
  return data.map(([url, x, y, factor, z, scale], index) => (
    <Image
      key={index}
      url={url}
      scale={scale}
      opacity={top.interpolate([0, 500], [0, 1])}
      position={interpolate([top, mouse], (top, mouse) => [
        (-mouse[0] * factor) / 50000 + x,
        (mouse[1] * factor) / 50000 + y * 1.15 + ((top * factor) / scrollMax) * 2,
        z + top / 2000
      ])}
    />
  ))
}

/** This component maintains the scene */
function Scene({ scrollPosition, mouse }) {
  const { size } = useThree()

  const scrollMax = size.height * 4.5

  const firstTextPos = scrollPosition.interpolate(pos => [0, -1 + (pos * 3) / scrollMax, 0])
  const secondTextPos = scrollPosition.interpolate(pos => [0, -20 + ((pos * 10) / scrollMax) * 2, 0])

  const glitchFactor = scrollPosition.interpolate([0, scrollMax * 0.1, scrollMax * 0.4, scrollMax * 0.8, scrollMax * 0.99], [0, 0, 1, 1, 0.1])

  return (
    <>
      <a.spotLight intensity={1.2} color="white" position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])} />

      <GlitchEffects factor={glitchFactor} />

      <Background color={scrollPosition.interpolate([0, scrollMax * 0.25, scrollMax * 0.8, scrollMax], ['#27282F', '#247BA0', '#70C1B3', '#f8f3f1'])} />
      <Stars position={scrollPosition.interpolate(pos => [0, -1 + pos / 20, 0])} />
      <Images top={scrollPosition} mouse={mouse} scrollMax={scrollMax} />

      <Text opacity={scrollPosition.interpolate([0, 1000], [1, 0])} position={firstTextPos} fontSize={150}>
        coming soon
      </Text>

      <Text position={secondTextPos} color="black" fontSize={150} opacity={1}>
        @joshhunt
      </Text>
    </>
  )
}

export default function Main() {
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [set])
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [set])

  return (
    <>
      <Canvas className="canvas" pixelRatio={window.devicePixelRatio}>
        <Scene scrollPosition={top} mouse={mouse} />
        {/* <a.mesh castShadow>
          <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
          <meshNormalMaterial attach="material" />
        </a.mesh> */}
      </Canvas>
      <div className="scroll-container" onScroll={onScroll} onMouseMove={onMouseMove}>
        <div style={{ height: '525vh' }} />
      </div>
    </>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
