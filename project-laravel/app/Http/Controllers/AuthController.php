<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\VerificationCodeMail;

class AuthController extends Controller
{
    public function sendVerificationCode(Request $request)
    {
        try {
            // Validation de l'email
            $request->validate([
                'email' => 'required|email',
            ]);

            $code = rand(100000, 999999); // Génération d'un code aléatoire

            Mail::to($request->email)->send(new VerificationCodeMail($code));

            Log::info("Code envoyé à : " . $request->email . " Code: " . $code);

            return response()->json([
                'message' => 'Code envoyé avec succès',
                'code' => $code, // merveille, jojo et ahmed c'est pas bon faudra qu'on revienne sur ca apres
            ]);

        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi du code : " . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur est survenue. Veuillez réessayer.',
            ], 500);
        }
    }
}
