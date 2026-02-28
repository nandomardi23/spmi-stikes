<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SurveyQuestion;
use App\Models\SurveyResponse;

class SurveyController extends Controller
{
    // ===========================
    // PUBLIC (no auth required)
    // ===========================

    public function publicForm()
    {
        $questions = SurveyQuestion::active()
            ->orderBy('kategori')
            ->orderBy('urutan')
            ->get()
            ->groupBy('kategori');

        return Inertia::render('Landing/Kuesioner', [
            'questions' => $questions,
        ]);
    }

    public function publicSubmit(Request $request)
    {
        $data = $request->validate([
            'responden_type' => 'required|string',
            'responden_name' => 'nullable|string|max:255',
            'responden_email' => 'nullable|email|max:255',
            'tahun_akademik' => 'required|string|max:20',
            'answers' => 'required|array',
            'answers.*' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:2000',
        ]);

        SurveyResponse::create($data);

        return redirect('/kuesioner')->with('success', 'Terima kasih! Respons Anda telah berhasil disimpan.');
    }

    // ===========================
    // ADMIN (dashboard, auth required)
    // ===========================

    public function adminIndex()
    {
        $questions = SurveyQuestion::orderBy('kategori')
            ->orderBy('urutan')
            ->paginate(20);

        $totalResponses = SurveyResponse::count();

        return Inertia::render('Dashboard/SurveyQuestions/Index', [
            'questions' => $questions,
            'totalResponses' => $totalResponses,
        ]);
    }

    public function adminStore(Request $request)
    {
        $data = $request->validate([
            'kategori' => 'required|string|max:100',
            'pertanyaan' => 'required|string',
            'urutan' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        SurveyQuestion::create($data);

        return redirect()->back()->with('success', 'Pertanyaan berhasil ditambahkan.');
    }

    public function adminUpdate(Request $request, SurveyQuestion $survey_question)
    {
        $data = $request->validate([
            'kategori' => 'required|string|max:100',
            'pertanyaan' => 'required|string',
            'urutan' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $survey_question->update($data);

        return redirect()->back()->with('success', 'Pertanyaan berhasil diperbarui.');
    }

    public function adminDestroy(SurveyQuestion $survey_question)
    {
        $survey_question->delete();
        return redirect()->back()->with('success', 'Pertanyaan berhasil dihapus.');
    }

    public function adminResponses(Request $request)
    {
        $questions = SurveyQuestion::active()->orderBy('kategori')->orderBy('urutan')->get();

        $responses = SurveyResponse::latest()
            ->paginate($request->input('per_page', 15))
            ->withQueryString();

        // Stats per responden type
        $allResponses = SurveyResponse::all();
        $statsByType = $allResponses->groupBy('responden_type')->map(function ($group, $type) use ($questions) {
            $avgPerQuestion = [];
            foreach ($questions as $q) {
                $ratings = $group->map(fn($r) => $r->answers[$q->id] ?? null)->filter()->values();
                if ($ratings->isNotEmpty()) {
                    $avgPerQuestion[$q->id] = round($ratings->avg(), 1);
                }
            }
            $overallAvg = !empty($avgPerQuestion) ? round(array_sum($avgPerQuestion) / count($avgPerQuestion), 1) : 0;
            return [
                'count' => $group->count(),
                'avg' => $overallAvg,
                'avg_per_question' => $avgPerQuestion,
            ];
        });

        return Inertia::render('Dashboard/SurveyResponses/Index', [
            'questions' => $questions,
            'responses' => $responses,
            'statsByType' => $statsByType,
            'totalResponses' => $allResponses->count(),
        ]);
    }

    public function adminDeleteResponse(SurveyResponse $response)
    {
        $response->delete();
        return redirect()->back()->with('success', 'Respons berhasil dihapus.');
    }
}
