<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function registerUser(Request $request)
{
    try {
        // Log tous les paramètres reçus
        Log::info('Données de registration:', $request->all());

        $validated = $request->validate([
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $salt = 'vive le projet tweet_academy';
        $passwordWithSalt = $validated['password'] . $salt;

        // Hashage avec RIPEMD-160 (génère exactement 40 caractères)
        $hashedPassword = hash('ripemd160', $passwordWithSalt);
        
        // Préparer les données de l'utilisateur
        $userData = [
            'username' => $validated['lastname'],
            'display_name' => $validated['lastname'],
            'email' => $validated['email'],
            'password_hash' => $hashedPassword,
        ];

        // Log les données avant création
        Log::info('Données utilisateur à créer:', $userData);

        // Création de l'utilisateur
        $user = User::create($userData);

        return response()->json(['message' => 'Utilisateur créé avec succès'], 201);
    } catch (\Exception $e) {
        Log::error('Erreur lors de l\'inscription : ' . $e->getMessage());
        Log::error('Trace de l\'erreur : ' . $e->getTraceAsString());

        return response()->json([
            'message' => 'Erreur lors de l\'enregistrement : ' . $e->getMessage(),
            'details' => $e->getTraceAsString()
        ], 500);
    }
}

public function login(Request $request)
{
    try {
        Log::info('Données de connexion reçues', [
            'email' => $request->email,
            'has_password' => $request->has('password')
        ]);

        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        Log::info('Validation réussie', $validated);

        $user = User::where('email', $validated['email'])->first();

        Log::info('Recherche utilisateur', [
            'user_found' => $user ? 'Oui' : 'Non',
            'email_recherche' => $validated['email']
        ]);

        if (!$user) {
            Log::warning('Utilisateur non trouvé', ['email' => $validated['email']]);
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $salt = 'vive le projet tweet_academy';
        $passwordWithSalt = $validated['password'] . $salt;

        $hashedPassword = hash('ripemd160', $passwordWithSalt);
        
        // Vérification du mot de passe avec le hachage
        if ($hashedPassword !== $user->password_hash) {
            Log::warning('Mot de passe incorrect', ['email' => $validated['email']]);
            return response()->json(['message' => 'Mot de passe incorrect'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email
            ]
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Erreur de validation', [
            'errors' => $e->errors(),
            'message' => $e->getMessage()
        ]);
        
        return response()->json([
            'message' => 'Erreurs de validation',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        Log::error("Erreur complète de connexion", [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'message' => 'Erreur technique',
            'error_details' => $e->getMessage()
        ], 500);
    }
}
    


public function updateProfile(Request $request)
{
    try {
        $user = $request->user(); // Récupérer l'utilisateur connecté
        
        Log::info("📝 Données reçues pour mise à jour :", [
            'raw' => $request->all(),
            'has_files' => [
                'profile_picture' => $request->hasFile('profile_picture') ? 'Oui' : 'Non',
                'cover_photo' => $request->hasFile('cover_photo') ? 'Oui' : 'Non'
            ]
        ]);

        $validated = $request->validate([
            'lastname' => 'nullable|string|max:255',
            'display_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:160',
            'location' => 'nullable|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'cover_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'theme_id' => 'nullable|integer'
        ]);

        Log::info("✅ Données validées :", $validated);

        $dataToUpdate = [];

        if (isset($validated['lastname'])) {
            $dataToUpdate['lastname'] = $validated['lastname'];
        }

        if (isset($validated['display_name'])) {
            $dataToUpdate['display_name'] = '@' . $validated['display_name'];
        }

        if (isset($validated['bio'])) {
            $dataToUpdate['bio'] = $validated['bio'];
        }

        if (isset($validated['location'])) {
            $dataToUpdate['location'] = $validated['location'];
        }

        //  Gestion des images
        $baseStorageUrl = config('app.url') . '/storage';

        if ($request->hasFile('profile_picture')) {
            $fileName = 'profile_' . $user->id . '_' . time() . '.' . 
                $request->file('profile_picture')->getClientOriginalExtension();
            $profilePicturePath = $request->file('profile_picture')
                ->storeAs('profile_pictures', $fileName, 'public');
            $dataToUpdate['profile_picture'] = $baseStorageUrl . '/' . $profilePicturePath;

            Log::info(" Nouvelle photo de profil sauvegardée : " . $dataToUpdate['profile_picture']);
        }

        if ($request->hasFile('cover_photo')) {
            $fileName = 'cover_' . $user->id . '_' . time() . '.' . 
                $request->file('cover_photo')->getClientOriginalExtension();
            $coverPhotoPath = $request->file('cover_photo')
                ->storeAs('cover_photos', $fileName, 'public');
            $dataToUpdate['cover_photo'] = $baseStorageUrl . '/' . $coverPhotoPath;

            Log::info(" Nouvelle photo de couverture sauvegardée : " . $dataToUpdate['cover_photo']);
        }

        //  Gestion du thème
        if ($request->has('theme_id')) {
            $themeId = (int) $request->input('theme_id');
            $dataToUpdate['theme_id'] = $themeId;

            Log::info("🎯 Nouveau theme_id reçu et converti : ", ['theme_id' => $themeId]);
        }

        Log::info("🛠️ Données finales avant update : ", $dataToUpdate);

        // Mise à jour de l'utilisateur
        $updateSuccess = $user->update($dataToUpdate);

        Log::info("✅ Résultat de update() :", [
            'update_success' => $updateSuccess ? 'Oui' : 'Non',
            'user_apres_update' => $user->fresh()
        ]);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->fresh()
        ]);

    } catch (\Exception $e) {
        Log::error("❌ Erreur lors de la mise à jour du profil :", [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'message' => 'Erreur lors de la mise à jour du profil',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function getUserProfile($id)
{
    \Log::info("Récupération du profil pour l'ID: " . $id); // 🔍 Vérification dans les logs

    // Vérifier si l'utilisateur est authentifié
    if (!auth()->check()) {
        return response()->json(['message' => 'Non authentifié'], 401);
    }

    // Récupérer l'utilisateur avec les comptages des abonnés et des abonnements
    $user = User::withCount(['followers', 'following'])->find($id);

    // Vérifier si l'utilisateur existe
    if (!$user) {
        \Log::error("Utilisateur non trouvé pour l'ID: " . $id);  // Log d'erreur si utilisateur non trouvé
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    \Log::info("Followers count pour l'utilisateur " . $user->id . ": " . $user->followers_count);  
    \Log::info("Following count pour l'utilisateur " . $user->id . ": " . $user->following_count);  

    // Retourner la réponse JSON avec les informations utilisateur et comptages
    return response()->json([
        'id' => $user->id,
        'lastname' => $user->lastname,
        'display_name' => $user->display_name,
        'email' => $user->email,
        'bio' => $user->bio,
        'location' => $user->location,
        'profile_picture' => $user->profile_picture,
        'cover_photo' => $user->cover_photo,
        'theme_id' => $user->theme_id,
        'is_following' => $user->followers()->where('id', auth()->id())->exists(),
        'followers_count' => $user->followers_count, 
        'following_count' => $user->following_count,  
    ]);
}





public function searchUsers(Request $request)
{
    $search = $request->query('q'); // Récupère le terme de recherche

    if (!$search) {
        return response()->json([]);
    }

    $users = User::where('display_name', 'like', "%$search%")
        ->limit(10)
        ->get(['id','display_name']);

    return response()->json($users);
}
public function getUserByUsername($username)
{
    $user = User::where('display_name', $username)->first();
    
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }
    
    // Retourner seulement les données nécessaires pour les mentions
    return response()->json([
        'id' => $user->id,
        'display_name' => $user->display_name,
    ]);
}



public function toggleFollow($id)
{
    $userToFollow = User::findOrFail($id);
    $user = auth()->user();  // Utilisateur connecté

    \Log::info("Utilisateur connecté : " . $user->id);
    \Log::info("Utilisateur à suivre : " . $userToFollow->id);

    // Toggle follow/unfollow
    if ($user->following->contains($userToFollow)) {
        \Log::info("Utilisateur déjà abonné, désabonnement.");
        $user->following()->detach($userToFollow);
    } else {
        \Log::info("Utilisateur non abonné, abonnement.");
        $user->following()->attach($userToFollow); 
    }

    return response()->json(['success' => true]);
}


public function getFollowers($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Utilisateur introuvable'], 404);
    }

    // Récupérer les followers (ceux qui suivent l'utilisateur)
    $followers = $user->followers()->get(['id', 'display_name', 'profile_picture']);

    return response()->json($followers);
}

public function getFollowing($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Utilisateur introuvable'], 404);
    }

    // Récupérer les following (ceux que l'utilisateur suit)
    $following = $user->following()->get(['id', 'display_name', 'profile_picture']);

    return response()->json($following);
}


public function areMutualFollowers($userId)
{
    $authUserId = auth()->id(); // Récupérer l'ID de l'utilisateur connecté

    $follows = \DB::table('follows')
        ->where('follower_id', $authUserId)
        ->where('following_id', $userId)
        ->exists();

    $followedBack = \DB::table('follows')
        ->where('follower_id', $userId)
        ->where('following_id', $authUserId)
        ->exists();

    return response()->json(['mutual' => $follows && $followedBack]);
}



}
