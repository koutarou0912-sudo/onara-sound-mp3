'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const { language } = useLanguage();

    const t = {
        ja: {
            copyright: '© 2026 Onara Sound MP3. すべてのおならの音素材が無料。',
            privacy: 'プライバシーポリシー',
            contact: 'お問い合わせ'
        },
        en: {
            copyright: '© 2026 Fart Sound MP3. All fart sound materials are free.',
            privacy: 'Privacy Policy',
            contact: 'Contact'
        }
    };

    const content = t[language];

    return (
        <footer className="pt-20 pb-10 text-center text-slate-500 text-sm font-medium transition-all duration-300">
            <div className="flex justify-center gap-6 mb-4">
                <Link href="/privacy" className="hover:text-orange-500 transition-colors">
                    {content.privacy}
                </Link>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                    {content.contact}
                </Link>
            </div>
            <p>{content.copyright}</p>
        </footer>
    );
}
