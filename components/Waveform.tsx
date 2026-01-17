'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';
import clsx from 'clsx';

interface WaveformProps {
    url: string;
    height?: number;
    waveColor?: string;
    progressColor?: string;
    className?: string;
    onFinish?: () => void;
    onReady?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
}

export interface WaveformRef {
    play: () => void;
    pause: () => void;
    isPlaying: () => boolean;
}

const Waveform = forwardRef<WaveformRef, WaveformProps>(({
    url,
    height = 50,
    waveColor = '#e5e7eb', // gray-200
    progressColor = '#facc15', // yellow-400
    className,
    onFinish,
    onReady,
    onPlay,
    onPause,
}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isReady, setIsReady] = useState(false);

    useImperativeHandle(ref, () => ({
        play: () => wavesurfer.current?.play(),
        pause: () => wavesurfer.current?.pause(),
        isPlaying: () => wavesurfer.current?.isPlaying() ?? false,
    }));

    useEffect(() => {
        if (!containerRef.current) return;

        // Prevent double initialization in Strict Mode
        if (wavesurfer.current) return;

        const ws = WaveSurfer.create({
            container: containerRef.current,
            waveColor,
            progressColor,
            height,
            barWidth: 3,
            barGap: 3,
            barRadius: 2,
            cursorWidth: 0,
            url: url,
        });

        ws.on('ready', () => {
            setIsReady(true);
            onReady?.();
        });

        ws.on('finish', () => {
            onFinish?.();
        });

        ws.on('play', () => {
            onPlay?.();
        });

        ws.on('pause', () => {
            onPause?.();
        });

        ws.on('error', (err) => {
            console.error('WaveSurfer Error:', err);
        });

        wavesurfer.current = ws;

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
                wavesurfer.current = null;
            }
        };
    }, [url, height, waveColor, progressColor]);

    return (
        <div className={clsx("w-full relative", className)}>
            {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
                </div>
            )}
            <div ref={containerRef} />
        </div>
    );
});

Waveform.displayName = 'Waveform';

export default Waveform;
