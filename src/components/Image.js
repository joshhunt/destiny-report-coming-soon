import React, { useMemo, useState, useCallback } from 'react'
import * as THREE from 'three/src/Three'
import { useSpring, a } from 'react-spring/three'

/** This component loads an image and projects it onto a plane */
export default function Image({ url, opacity, scale, ...props }) {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url])
  // texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.y = -1
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1 })

  return (
    <a.mesh {...props} onHover={hover} onUnhover={unhover} scale={factor.interpolate(f => [scale * f, scale * f, 1])}>
      <planeBufferGeometry attach="geometry" args={[7, 4]} />
      <a.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </a.meshLambertMaterial>
    </a.mesh>
  )
}
