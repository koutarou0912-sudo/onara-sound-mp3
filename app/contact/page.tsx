'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function ContactPage() {
    const { language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const t = {
        ja: {
            title: 'お問い合わせ',
            back: 'トップへ戻る',
            labels: {
                name: 'お名前',
                email: 'メールアドレス',
                message: 'メッセージ'
            },
            button: '送信する',
            sending: '送信中...',
            success: 'メッセージを受け付けました。ありがとうございます！'
        },
        en: {
            title: 'Contact',
            back: 'Back to Top',
            labels: {
                name: 'Name',
                email: 'Email',
                message: 'Message'
            },
            button: 'Send Message',
            sending: 'Sending...',
            success: 'Message received. Thank you!'
        }
    };

    const content = t[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            // Reset after showing success message
            setTimeout(() => setIsSent(false), 5000);
        }, 1500);
    };

    return (
        <main className="min-h-screen p-6 md:p-12 lg:p-20 bg-slate-50">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors font-medium">
                        <ArrowLeft size={20} />
                        {content.back}
                    </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-orange-100/50 border border-white/50">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">
                        {content.title}
                    </h1>

                    {isSent ? (
                        <div className="p-6 bg-green-50 text-green-700 rounded-xl border border-green-100 font-medium text-center animate-fade-in">
                            {content.success}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                                    {content.labels.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                                    {content.labels.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-slate-50 focus:bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-bold text-slate-700">
                                    {content.labels.message}
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold text-white text-lg tracking-wide shadow-lg transition-all duration-300 flex items-center justify-center gap-2",
                                    isSubmitting
                                        ? "bg-slate-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                                )}
                            >
                                {isSubmitting ? (
                                    content.sending
                                ) : (
                                    <>
                                        <Send size={20} />
                                        {content.button}
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <Footer />
            </div>
        </main>
    );
}
