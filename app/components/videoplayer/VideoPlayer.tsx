'use client'

import React from 'react'
import styles from './videoplayer.module.scss'

interface VideoPlayerProps {
  url: string
  title?: string
  className?: string
}

export default function VideoPlayer({ url, title, className }: VideoPlayerProps) {
  const getEmbedUrl = (url: string): string => {
    let videoId = ''

    if (url.includes('watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0]
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    } else if (url.includes('shorts/')) {
      videoId = url.split('shorts/')[1]?.split('?')[0]
    } else if (url.includes('embed/')) {
      return `${url}?rel=0&modestbranding=1&controls=1&playsinline=1`
    }

    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1`
  }

  const embedUrl = getEmbedUrl(url)

  const isVertical = url.includes('shorts/')

  return (
    <div
      className={`${styles.videoContainer} ${isVertical ? styles.vertical : styles.horizontal} ${
        className || ''
      }`}>
      <iframe
        src={embedUrl}
        title={title || 'YouTube Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
