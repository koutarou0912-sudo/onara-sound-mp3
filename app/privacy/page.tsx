'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
    const { language } = useLanguage();

    const t = {
        ja: {
            title: 'プライバシーポリシー',
            back: 'トップへ戻る',
            sections: [
                {
                    heading: 'Google AdSenseについて',
                    content: '当サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。これにより、当サイトや他サイトへのアクセスに関する情報（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。Cookieを無効にする設定や、Google AdSenseに関する詳細は「Googleポリシーと規約」をご覧ください。'
                },
                {
                    heading: '免責事項',
                    content: '当サイトの音源は無料でご利用いただけますが、著作権は放棄しておりません。音源の使用によって生じた、いかなるトラブル・損害等についても、当サイトは一切の責任を負いません。ご利用は自己責任でお願いいたします。'
                }
            ]
        },
        en: {
            title: 'Privacy Policy',
            back: 'Back to Top',
            sections: [
                {
                    heading: 'About Google AdSense',
                    content: 'This site uses "Google AdSense," a third-party advertising service. Advertisement distributors may use cookies to display ads tailored to user interests. This may involve using information regarding access to this and other sites (excluding names, addresses, email addresses, and phone numbers). For details on disabling cookies and more about Google AdSense, please refer to "Google Policies and Terms."'
                },
                {
                    heading: 'Disclaimer',
                    content: 'The sound sources on this site are free to use, but copyright is not waived. We assume no responsibility for any trouble or damage caused by the use of these sound sources. Please use them at your own risk.'
                }
            ]
        }
    };

    const content = t[language];

    return (
        <main className="min-h-screen p-6 md:p-12 lg:p-20 bg-slate-50">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors font-medium">
                        <ArrowLeft size={20} />
                        {content.back}
                    </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10 pb-4 border-b border-slate-100">
                        {content.title}
                    </h1>

                    <div className="space-y-10">
                        {content.sections.map((section, index) => (
                            <section key={index}>
                                <h2 className="text-xl font-bold text-slate-700 mb-4">
                                    {section.heading}
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
