import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { targetFrameTime } from './config'
import { useComponentSize, useSnowfallStyle, useSnowflakes } from './hooks'

export interface SnowfallProps {
  color?: string
  snowflakeCount?: number
  style?: React.CSSProperties
}

const Snowfall = ({ color = '#dee4fd', snowflakeCount = 150, style }: SnowfallProps = {}) => {
  const mergedStyle = useSnowfallStyle(style)

  const canvasRef = useRef<HTMLCanvasElement>()
  const canvasSize = useComponentSize(canvasRef)
  const animationFrame = useRef(0)

  const lastUpdate = useRef(Date.now())
  const config = useMemo(() => ({ color }), [color])
  const snowflakes = useSnowflakes(canvasRef, snowflakeCount, config)

  const updateCanvasRef = (element: HTMLCanvasElement) => {
    canvasRef.current = element
  }

  const render = useCallback(
    (framesPassed: number = 1) => {
      const canvas = canvasRef.current
      if (canvas) {
        // Update the positions of the snowflakes
        snowflakes.forEach(snowflake => snowflake.update(canvas, framesPassed))

        // Render them if the canvas is available
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

          snowflakes.forEach(snowflake => snowflake.draw(canvas, ctx))
        }
      }
    },
    [snowflakes],
  )

  const loop = useCallback(() => {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    const now = Date.now()
    const msPassed = Date.now() - lastUpdate.current
    lastUpdate.current = now

    // Frames that would have passed if running at 60 fps
    const framesPassed = msPassed / targetFrameTime

    render(framesPassed)

    animationFrame.current = requestAnimationFrame(loop)
  }, [render])

  useEffect(() => {
    loop()
    return () => cancelAnimationFrame(animationFrame.current)
  }, [loop])

  return <canvas ref={updateCanvasRef} height={canvasSize.height} width={canvasSize.width} style={mergedStyle} />
}

export default Snowfall
