'use client'

import React, { useState } from 'react'
import styles from './videoplayer.module.scss'

interface VideoPlayerProps {
  url: string
  title?: string
  className?: string
}

export default function VideoPlayer({ url, title, className }: VideoPlayerProps) {
  const [muted, setMuted] = useState(true)

  const getVideoId = (url: string): string => {
    if (url.includes('watch?v=')) return url.split('v=')[1]?.split('&')[0] || ''
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0] || ''
    if (url.includes('shorts/')) return url.split('shorts/')[1]?.split('?')[0] || ''
    if (url.includes('embed/')) return url.split('embed/')[1]?.split('?')[0] || ''
    return ''
  }

  const videoId = getVideoId(url)
  const isVertical = url.includes('shorts/')

  // Базовые параметры
  const baseParams = `rel=0&modestbranding=1&playsinline=1&enablejsapi=1`

  // Для Shorts добавляем автоплей и цикл
  const embedUrl = isVertical
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&${baseParams}&mute=${
        muted ? 1 : 0
      }&controls=0`
    : `https://www.youtube.com/embed/${videoId}?${baseParams}&controls=1`

  const toggleMute = () => {
    if (!isVertical) return
    setMuted((prev) => !prev)
  }

  return (
    <div
      className={`${styles.videoContainer} ${isVertical ? styles.vertical : styles.horizontal} ${
        className || ''
      }`}>
      <iframe
        key={`${videoId}-${muted}`} // обновляем iframe при изменении mute
        src={embedUrl}
        title={title || 'YouTube Video'}
        allow="autoplay; encrypted-media; clipboard-write; accelerometer; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {isVertical && (
        <button
          className={`${styles.muteButton} ${!muted ? styles.unmuted : ''}`}
          onClick={toggleMute}
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}>
          {muted ? '🔇' : '🔊'}
        </button>
      )}
    </div>
  )
}
