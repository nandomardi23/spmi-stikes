import { useState, useEffect , memo } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import Swal from 'sweetalert2';

const respondenTypes = [
    'Mahasiswa', 'Dosen', 'Tenaga Kependidikan', 'Alumni', 'Pengguna Lulusan / Mitra'
];

const kategoriLabels = {
    pengajaran: 'Pengajaran & Pembelajaran',
    fasilitas: 'Fasilitas & Sarana Prasarana',
    pelayanan: 'Pelayanan Akademik',
    kurikulum: 'Kurikulum & Kompetensi',
    manajemen: 'Manajemen & Tata Kelola',
    penelitian: 'Penelitian & Pengabdian',
};

const kategoriIcons = {
    pengajaran: '📚',
    fasilitas: '🏛️',
    pelayanan: '🤝',
    kurikulum: '📋',
    manajemen: '⚙️',
    penelitian: '🔬',
};

const currentYear = new Date().getFullYear();
const tahunOptions = [
    `${currentYear - 1}/${currentYear}`,
    `${currentYear}/${currentYear + 1}`,
];

function Kuesioner({ questions }) {
    const { flash } = usePage().props;
    const [step, setStep] = useState(0); // 0: info, 1: questions, 2: done
    const kategoris = Object.keys(questions || {});

    const { data, setData, post, processing, errors, reset } = useForm({
        responden_type: '',
        responden_name: '',
        responden_email: '',
        tahun_akademik: tahunOptions[tahunOptions.length - 1],
        answers: {},
        komentar: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setStep(2);
        }
    }, [flash]);

    const allQuestionsAnswered = () => {
        if (!questions || kategoris.length === 0) return false;
        const allIds = kategoris.flatMap(k => questions[k].map(q => q.id));
        return allIds.every(id => data.answers[id] !== undefined);
    };

    const setRating = (questionId, rating) => {
        setData('answers', { ...data.answers, [questionId]: rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kuesioner');
    };

    const StarRating = ({ questionId, value }) => (
        <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(questionId, star)}
                    className={`w-10 h-10 rounded-xl text-lg font-bold transition-all duration-200 ${
                        value >= star
                            ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 scale-110'
                            : 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-400 hover:scale-105'
                    }`}
                >
                    ★
                </button>
            ))}
            <span className="ml-2 text-xs text-gray-400 self-center font-medium">
                {value ? ['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik'][value] : ''}
            </span>
        </div>
    );

    // Step 2: Thank you
    if (step === 2) {
        return (
            <LandingLayout>
                <Head title="Terima Kasih - Kuesioner SPMI" />
                <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-white">
                    <div className="max-w-lg mx-auto text-center px-6">
                        <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Terima Kasih! 🎉</h1>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Respons Anda telah berhasil disimpan. Masukan Anda sangat berarti untuk peningkatan kualitas STIKES Hang Tuah Tanjungpinang.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a href="/" className="px-6 py-3 bg-linear-to-br from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800 transition">
                                Kembali ke Beranda
                            </a>
                            <button onClick={() => { reset(); setStep(0); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">
                                Isi Lagi
                            </button>
                        </div>
                    </div>
                </div>
            </LandingLayout>
        );
    }

    const hasQuestions = kategoris.length > 0;

    return (
        <LandingLayout>
            <Head>
                <title>Kuesioner Kepuasan - SPMI STIKES Hang Tuah</title>
                <meta name="description" content="Isi kuesioner kepuasan stakeholder SPMI STIKES Hang Tuah Tanjungpinang" />
            </Head>

            <div className="min-h-screen bg-linear-to-br from-primary-50/50 via-white to-primary-50/30 pt-24 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
                            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                            Kuesioner Terbuka
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                            Kuesioner Kepuasan Stakeholder
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Bantu kami meningkatkan mutu STIKES Hang Tuah Tanjungpinang. Jawaban Anda bersifat rahasia dan digunakan untuk evaluasi internal.
                        </p>
                    </div>

                    {!hasQuestions ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📋</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Kuesioner Belum Tersedia</h3>
                            <p className="text-gray-500 text-sm">Admin belum menambahkan pertanyaan kuesioner. Silakan kembali lagi nanti.</p>
                            <a href="/" className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition">Kembali ke Beranda</a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Step 0: Respondent Info */}
                            {step === 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="bg-linear-to-r from-primary-600 to-primary-700 p-6 text-white">
                                        <h2 className="text-xl font-bold">Identitas Responden</h2>
                                        <p className="text-primary-100 text-sm mt-1">Lengkapi data diri Anda sebelum mengisi kuesioner</p>
                                    </div>
                                    <div className="p-6 space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Jenis Responden <span className="text-red-500">*</span></label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {respondenTypes.map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setData('responden_type', type)}
                                                        className={`p-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                                                            data.responden_type === type
                                                                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                                                : 'border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.responden_type && <p className="mt-1.5 text-xs font-bold text-red-500">{errors.responden_type}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama <span className="text-gray-400 text-xs">(opsional)</span></label>
                                                <input
                                                    type="text"
                                                    value={data.responden_name}
                                                    onChange={(e) => setData('responden_name', e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                                    placeholder="Nama lengkap..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email <span className="text-gray-400 text-xs">(opsional)</span></label>
                                                <input
                                                    type="email"
                                                    value={data.responden_email}
                                                    onChange={(e) => setData('responden_email', e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Tahun Akademik <span className="text-red-500">*</span></label>
                                            <select
                                                value={data.tahun_akademik}
                                                onChange={(e) => setData('tahun_akademik', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none font-bold"
                                            >
                                                {tahunOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <button
                                                type="button"
                                                onClick={() => { if (data.responden_type) setStep(1); }}
                                                disabled={!data.responden_type}
                                                className="w-full py-3.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-bold rounded-xl disabled:opacity-50 transition shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800"
                                            >
                                                Mulai Mengisi Kuesioner →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Questions */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    {/* Progress */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-gray-500">Progress Pengisian</span>
                                            <span className="text-xs font-bold text-primary-600">
                                                {Object.keys(data.answers).length} / {kategoris.flatMap(k => questions[k]).length} pertanyaan
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                                                style={{ width: `${(Object.keys(data.answers).length / kategoris.flatMap(k => questions[k]).length) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {kategoris.map((kategori) => (
                                        <div key={kategori} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{kategoriIcons[kategori] || '📌'}</span>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{kategoriLabels[kategori] || kategori}</h3>
                                                        <p className="text-xs text-gray-500">Beri penilaian 1-5 bintang untuk setiap pertanyaan</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-gray-50">
                                                {questions[kategori].map((q, i) => (
                                                    <div key={q.id} className="px-6 py-5">
                                                        <p className="text-sm font-medium text-gray-700 mb-3">
                                                            <span className="text-primary-600 font-bold mr-2">{i + 1}.</span>
                                                            {q.pertanyaan}
                                                        </p>
                                                        <StarRating questionId={q.id} value={data.answers[q.id] || 0} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Comment */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Komentar / Saran <span className="text-gray-400 text-xs">(opsional)</span></label>
                                        <textarea
                                            rows={4}
                                            value={data.komentar}
                                            onChange={(e) => setData('komentar', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="Tuliskan saran atau masukan Anda untuk peningkatan mutu..."
                                        />
                                    </div>

                                    {/* Submit */}
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(0)}
                                            className="px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                                        >
                                            ← Kembali
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing || !allQuestionsAnswered()}
                                            className="flex-1 py-3.5 bg-linear-to-br from-primary-600 to-primary-700 text-white font-extrabold rounded-xl disabled:opacity-50 transition shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800"
                                        >
                                            {processing ? 'Mengirim...' : 'Kirim Respons Kuesioner'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </LandingLayout>
    );
}

export default memo(Kuesioner);
