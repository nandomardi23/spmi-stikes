import { memo } from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';

function BeritaDetail({ berita }) {
    return (
        <>
            <Head>
                <title>{`${berita.judul} - SPMI STIKES Hang Tuah`}</title>
                <meta name="description" content={berita.ringkasan || berita.judul} />
                <meta property="og:title" content={berita.judul} />
                <meta property="og:description" content={berita.ringkasan || berita.judul} />
                {berita.gambar && <meta property="og:image" content={`/storage/${berita.gambar}`} />}
                <meta property="og:type" content="article" />
            </Head>
            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <a href="/#berita" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 mb-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Kembali ke Beranda
                    </a>
                    {berita.gambar && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                            <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                        {berita.published_at && <span>{new Date(berita.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                        {berita.author && <span>• {berita.author.name}</span>}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{berita.judul}</h1>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: berita.konten }} />
                </div>
            </div>
        </>
    );
}


const PersistedBeritaDetail = memo(BeritaDetail);
PersistedBeritaDetail.layout = page => <LandingLayout>{page}</LandingLayout>;
export default PersistedBeritaDetail;

