'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { Sound } from '@/lib/data';
import Waveform, { WaveformRef } from './Waveform';
import { clsx } from 'clsx';

interface SoundCardProps {
    sound: Sound;
    language: 'ja' | 'en';
}

export default function SoundCard({ sound, language }: SoundCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const waveformRef = useRef<WaveformRef>(null);

    const togglePlay = () => {
        if (waveformRef.current) {
            if (waveformRef.current.isPlaying()) {
                waveformRef.current.pause();
            } else {
                waveformRef.current.play();
            }
        }
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = sound.url;
        link.download = `${sound.title_en}.mp3`; // Always use English safe filename or maybe title_ja is fine? Let's use sound.url basename or stick to safety.
        // Actually, user didn't specify filename for download. I'll use title_en for safety or keep generic.
        // Let's safe-guard:
        link.download = `onara_${sound.id}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const displayTitle = language === 'ja' ? sound.title_ja : sound.title_en;
    const downloadLabel = language === 'ja' ? 'ダウンロード' : 'Download';
    const playText = language === 'ja' ? '再生' : 'Play';
    const stopText = language === 'ja' ? '停止' : 'Stop';

    return (
        <div className="group relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl flex flex-col p-8 gap-8 border border-orange-100/20">
            {/* Header: Title & Download */}
            <div className="flex justify-between items-start gap-4 h-14">
                <h3 className="font-extrabold text-slate-800 text-lg leading-snug line-clamp-2">
                    {displayTitle}
                </h3>
                <button
                    onClick={handleDownload}
                    className="shrink-0 p-2.5 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                    title={downloadLabel}
                >
                    <Download size={20} />
                </button>
            </div>

            {/* Waveform Area */}
            <div className="w-full">
                <Waveform
                    ref={waveformRef}
                    url={sound.url}
                    height={48}
                    waveColor="#c2410c" // orange-700 (terracotta)
                    progressColor="#eab308" // yellow-500 (gold)
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onFinish={() => setIsPlaying(false)}
                />
            </div>

            {/* Footer: Wide Action Button */}
            <div className="mt-2">
                <button
                    onClick={togglePlay}
                    className={clsx(
                        "w-full py-5 rounded-2xl shadow-lg shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden",
                        "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-lg tracking-wide ring-1 ring-white/20",
                        "hover:scale-[1.02] hover:shadow-orange-500/40 hover:brightness-105 active:scale-[0.98] active:brightness-95"
                    )}
                >
                    {isPlaying ? (
                        <>
                            <Pause size={24} fill="currentColor" />
                            <span>{stopText}</span>
                        </>
                    ) : (
                        <>
                            <Play size={24} fill="currentColor" />
                            <span>{playText}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
