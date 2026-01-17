'use client';

import { Fragment } from 'react';
import { sounds } from '@/lib/data';
import SoundCard from '@/components/SoundCard';
import { Cloud, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '@/components/Footer';

export default function Home() {
  const { language, toggleLanguage } = useLanguage();

  const content = {
    ja: {
      title: 'Onara Sound MP3',
      subtitle: 'おなら効果音フリー素材サイト',
      description: '高品質おなら音源が完全フリー！商用利用・加工もOK。視聴して気に入ったらすぐにダウンロード！',
    },
    en: {
      title: 'Fart Sound MP3',
      subtitle: 'Free Fart Sound Effects Site',
      description: 'High quality fart sounds, completely free! Commercial use and modification allowed. Listen and download instantly!',
    }
  };

  const t = content[language];

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-8 text-center py-16 px-8 bg-white/70 backdrop-blur-xl border-b border-white/20 rounded-[2.5rem] shadow-sm ring-1 ring-white/40 relative">
          {/* Language Toggle */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 hover:bg-orange-100 text-orange-600 font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Globe size={16} />
              <span>{language === 'ja' ? 'English' : '日本語'}</span>
            </button>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex flex-col items-center gap-3">
              <span className="text-gray-600 font-bold tracking-widest text-sm md:text-base uppercase opacity-90 transition-all duration-300">
                {t.subtitle}
              </span>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm leading-tight transition-all duration-300">
                {t.title}
              </h1>
            </div>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium transition-all duration-300">
              {language === 'ja' ? (
                <>高品質おなら音源が完全フリー！商用利用・加工もOK。<br className="hidden md:block" />視聴して気に入ったらすぐにダウンロード！</>
              ) : (
                <>High quality fart sounds, completely free! Commercial use allowed.<br className="hidden md:block" />Listen and download instantly!</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-white bg-orange-500 backdrop-blur-sm px-6 py-3 rounded-full shadow-md shadow-orange-500/20 ring-2 ring-white/50">
            <Cloud size={18} fill="currentColor" className="text-white" />
            <span>{sounds.length} {language === 'ja' ? 'Premium Sounds' : 'Sounds'}</span>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {sounds.map((sound) => (
            <SoundCard key={sound.id} sound={sound} language={language} />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
