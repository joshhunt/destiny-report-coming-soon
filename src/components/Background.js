import React from 'react'
import { useThree } from 'react-three-fiber'
import { a } from 'react-spring/three'

/** This component creates a fullscreen colored plane */
export default function Background({ color }) {
  const { viewport } = useThree()
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  )
}
