<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $feedbacks = Feedback::latest()->paginate(10);
        return Inertia::render('Dashboard/Feedback/Index', [
            'feedbacks' => $feedbacks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tahun_akademik' => 'required|string',
            'responden' => 'required|string',
            'nilai_kepuasan' => 'required|numeric|min:0|max:100',
            'jumlah_responden' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        Feedback::create($validated);

        return redirect()->back()->with('success', 'Data kuesioner umpan balik berhasil ditambahkan.');
    }

    public function update(Request $request, Feedback $feedback)
    {
        $validated = $request->validate([
            'tahun_akademik' => 'required|string',
            'responden' => 'required|string',
            'nilai_kepuasan' => 'required|numeric|min:0|max:100',
            'jumlah_responden' => 'required|integer|min:1',
            'keterangan' => 'nullable|string',
        ]);

        $feedback->update($validated);

        return redirect()->back()->with('success', 'Data kuesioner umpan balik berhasil diperbarui.');
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return redirect()->back()->with('success', 'Data kuesioner umpan balik berhasil dihapus.');
    }
}
