import React, { useMemo } from 'react'
import { useThree } from 'react-three-fiber'
import { a } from 'react-spring/three'

var PIXEL_RATIO = (function() {
  var ctx = document.createElement('canvas').getContext('2d'),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1
  return dpr / bsr
})()

function createRetinaCanvas(w, h, ratio) {
  if (!ratio) {
    ratio = PIXEL_RATIO
  }
  var can = document.createElement('canvas')
  can.width = w * ratio
  can.height = h * ratio
  can.style.width = w + 'px'
  can.style.height = h + 'px'
  can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
  return can
}

/** This renders text via canvas and projects it as a sprite */
export default function Text({ children, position, opacity, color = 'white', fontSize = 410 }) {
  const {
    // size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()

  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight

  const canvas = useMemo(() => {
    const width = 2048
    const height = 2048
    // const canvas = createRetinaCanvas(width, height, PIXEL_RATIO)
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = color
    context.fillText(children, 1024, 1024 - 410 / 2)

    return canvas
  }, [children, color, fontSize /*, width, height*/])

  return (
    <a.sprite scale={[scale, scale, 1]} position={position}>
      <a.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={s => (s.needsUpdate = true)} />
      </a.spriteMaterial>
    </a.sprite>
  )
}
