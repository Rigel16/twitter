<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Media;
use App\Models\PostMedia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Hashtag;
use App\Models\PostHashtag;


class PostController extends Controller
{
public function index()
{
    try {
        $userId = Auth::id(); // Récupérer l'ID de l'utilisateur connecté
        
        // Récupérer tous les posts avec leurs relations
        $posts = Post::with(['user', 'media', 'comments.user'])->latest()->get();
        
        // Récupérer tous les reposts
        $reposts = \App\Models\Repost::with(['user', 'post'])->latest()->get();
        
        $timeline = collect();

        foreach ($posts as $post) {
            // Ajouter les métadonnées au post
            $post->is_liked = \App\Models\Like::where('user_id', $userId)->where('post_id', $post->post_id)->exists();
            $post->is_saved = \App\Models\SavedPost::where('user_id', $userId)->where('post_id', $post->post_id)->exists();
            $post->is_reposted = \App\Models\Repost::where('user_id', $userId)->where('post_id', $post->post_id)->exists();
            $post->like_count = \App\Models\Like::where('post_id', $post->post_id)->count();
            $post->comment_count = \App\Models\Comment::where('post_id', $post->post_id)->count();
            $post->repost_count = \App\Models\Repost::where('post_id', $post->post_id)->count();
            
            // Récupérer les commentaires
            $post->comments = \App\Models\Comment::where('post_id', $post->post_id)
                ->with('user:id,username,profile_picture')
                ->latest()
                ->get();

            $post->is_repost = false;
            $timeline->push($post);
        }

        // Gérer les reposts
        foreach ($reposts as $repost) {
            $originalPost = $posts->where('post_id', $repost->post_id)->first();

            if ($originalPost) {
                $repostItem = new \stdClass();
                $repostItem->post_id = $repost->post_id;
                $repostItem->user = $repost->user;
                $repostItem->created_at = $repost->reposted_at;
                $repostItem->is_repost = true;
                $repostItem->repost_user_id = $repost->user_id;
                $repostItem->original_post = $originalPost;

                // Copier les métadonnées du post original
                $repostItem->is_liked = $originalPost->is_liked;
                $repostItem->is_saved = $originalPost->is_saved;
                $repostItem->is_reposted = $originalPost->is_reposted;
                $repostItem->like_count = $originalPost->like_count;
                $repostItem->comment_count = $originalPost->comment_count;
                $repostItem->repost_count = $originalPost->repost_count;
                $repostItem->comments = $originalPost->comments; // Inclure les commentaires

                $timeline->push($repostItem);
            }
        }

        $sortedTimeline = $timeline->sortByDesc(fn($item) => $item->created_at)->values();

        return response()->json($sortedTimeline, 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erreur lors de la récupération des posts',
            'details' => $e->getMessage()
        ], 500);
    }
}


    //Créer un post avec gestion des fichiers
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'required_without:media|string|max:140',
            'media' => 'required_without:content|array|nullable',
            'media.*' => 'file|mimes:jpeg,png,jpg,gif,mp4,webp,mov,|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Création du dossier s'il n'existe pas
        $storagePath = storage_path('app/public/media');
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        // Création du post
        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $request->content ?? '',
            'reply_to' => null,
        ]);

        //  Gestion des fichiers avec `move()`
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $destinationPath = storage_path('app/public/media');

                // Déplacement du fichier
                if ($file->move($destinationPath, $fileName)) {
                    Log::info(" Fichier sauvegardé dans : " . $destinationPath . '/' . $fileName);
                    
                    // Enregistrement en base de données
                    $media = Media::create([
                        'file_name' => $fileName,
                        'short_url' => Str::random(8),
                    ]);

                    PostMedia::create([
                        'post_id' => $post->post_id,
                        'media_id' => $media->media_id
                    ]);
                } else {
                    Log::error(" Échec du déplacement du fichier !");
                }
            }
        }

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }


}
