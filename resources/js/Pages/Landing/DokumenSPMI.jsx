import { memo } from 'react';
import { Head, Link } from "@inertiajs/react";
import React from "react";

function DokumenSPMI({ dokumen }) {
    return (
        <div>
            <Head title="Dokumen SPMI" />
            <section className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Dokumen SPMI</h1>
                {dokumen && dokumen.data && dokumen.data.length > 0 ? (
                    <ul className="space-y-3">
                        {dokumen.data.map((d) => (
                            <li key={d.id} className="p-3 border rounded-lg">
                                <Link
                                    href={`/dashboard/dokumen/${d.id}/download`}
                                    className="text-primary-600 font-medium"
                                >
                                    {d.judul}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">Belum ada dokumen publik.</p>
                )}
            </section>
        </div>
    );
}

export default memo(DokumenSPMI);
