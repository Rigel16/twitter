<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\SavedPost;
use App\Models\Comment;
use App\Models\Repost;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostInteractionController extends Controller
{
    /**
     * Ajouter ou retirer un like sur un post
     */
    public function like(Request $request, $postId)
    {
        try {
            $user = auth()->user();

            // Vérifier si le post existe
            $post = Post::where('post_id', $postId)->first();
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            // Vérifier si l'utilisateur a déjà liké ce post
            $existingLike = Like::where('user_id', $user->id)
                                ->where('post_id', $postId)
                                ->first();

            if ($existingLike) {
                // Supprimer le like
                Like::where('user_id', $user->id)
                    ->where('post_id', $postId)
                    ->delete();

                return response()->json([
                    'message' => 'Like removed',
                    'liked' => false // Indiquer que le post n'est plus liké
                ], 200);
            }

            // Ajouter un like
            Like::create([
                'user_id' => $user->id,
                'post_id' => $postId,
                'liked_at' => now()
            ]);

            return response()->json([
                'message' => 'Post liked successfully',
                'liked' => true // Indiquer que le post est liké
            ], 200);

        } catch (\Exception $e) {
            Log::error('Like error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Enregistrer ou retirer un post des favoris
     */
    public function savePost($postId)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Vérifier si le post existe
            $post = Post::where('post_id', $postId)->first();
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $savedPost = SavedPost::where('user_id', $user->id)
                            ->where('post_id', $postId)
                            ->first();

            if ($savedPost) {
                SavedPost::where('user_id', $user->id)
                ->where('post_id', $postId)
                ->delete();
                    return response()->json([
                    'message' => 'Post unsaved',
                    'saved' => false
                ], 200);
            }

            SavedPost::create([
                'user_id' => $user->id,
                'post_id' => $postId,
                'saved_at' => now()
            ]);

            return response()->json([
                'message' => 'Post saved successfully',
                'saved' => true
            ], 200);
        } catch (\Exception $e) {
            Log::error('SavePost error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function getSavedPosts()
{
    try {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Récupérer les IDs des posts sauvegardés
        $savedPostIds = SavedPost::where('user_id', $user->id)
            ->pluck('post_id')
            ->toArray();

        // Récupérer les posts complets
        $posts = Post::whereIn('post_id', $savedPostIds)
            ->with(['user', 'media'])
            ->get();

        // Ajouter les métadonnées
        foreach ($posts as $post) {
            $post->is_liked = Like::where('user_id', $user->id)
                ->where('post_id', $post->post_id)
                ->exists();
            $post->like_count = Like::where('post_id', $post->post_id)->count();
            $post->comment_count = Comment::where('post_id', $post->post_id)->count();
            $post->repost_count = Repost::where('post_id', $post->post_id)->count();
        }

        return response()->json($posts, 200);
    } catch (\Exception $e) {
        Log::error('GetSavedPosts error: ' . $e->getMessage());
        return response()->json([
            'message' => 'An error occurred: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
}


    /**
     * Ajouter un commentaire à un post
     */
    public function commentPost(Request $request, $postId)
    {
        try {
            $request->validate([
                'content' => 'required|string|max:255',
                'parent_comment_id' => 'nullable|exists:comments,id'
            ]);

            // Vérifier si le post existe
            $post = Post::where('post_id', $postId)->first();
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $comment = Comment::create([
                'user_id' => Auth::id(),
                'post_id' => $postId,
                'content' => $request->content,
                'parent_comment_id' => $request->parent_comment_id,
                'created_at' => now()
            ]);

            // Charger les infos de l'utilisateur pour faciliter l'affichage côté frontend
            $comment->load('user');

            return response()->json([
                'message' => 'Comment added successfully',
                'comment' => $comment,
                'comment_count' => Comment::where('post_id', $postId)->count()
            ], 201);
        } catch (\Exception $e) {
            Log::error('CommentPost error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Reposter ou annuler un repost
     */
    public function repostPost($postId)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Vérifier si le post existe
            $post = Post::where('post_id', $postId)->first();
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $existingRepost = Repost::where('user_id', $user->id)
                                ->where('post_id', $postId)
                                ->first();

            if ($existingRepost) {
                    // Supprimer le like
                    Repost::where('user_id', $user->id)
                        ->where('post_id', $postId)
                        ->delete();
                return response()->json([
                    'message' => 'Repost removed',
                    'reposted' => false,
                    'repost_count' => Repost::where('post_id', $postId)->count()
                ], 200);
            }

            Repost::create([
                'user_id' => $user->id,
                'post_id' => $postId,
                'reposted_at' => now()
            ]);

            return response()->json([
                'message' => 'Post reposted successfully',
                'reposted' => true,
                'repost_count' => Repost::where('post_id', $postId)->count()
            ], 200);
        } catch (\Exception $e) {
            Log::error('RepostPost error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}