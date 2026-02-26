import { Head } from "@inertiajs/react";
import React from "react";

export default function ProfilSPMI({ profil }) {
    return (
        <div>
            <Head title="Profil SPMI" />
            <section className="p-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Profil SPMI</h1>
                <div className="prose">
                    <h3>Visi</h3>
                    <p>{profil.visi || "Belum ada visi terpasang."}</p>
                    <h3>Misi</h3>
                    <p>{profil.misi || "Belum ada misi terpasang."}</p>
                </div>
            </section>
        </div>
    );
}
