<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Repost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepostController extends Controller
{
    public function repost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,post_id',
        ]);

        $postId = $request->post_id;
        $userId = Auth::id();

        // Check if the user has already reposted this post
        $existingRepost = Repost::where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        if ($existingRepost) {
            return response()->json([
                'message' => 'You have already reposted this post',
            ], 409);
        }

        // Create a new repost
        $repost = new Repost();
        $repost->post_id = $postId;
        $repost->user_id = $userId;
        $repost->save();

        // Get the reposted post with its owner
        $post = Post::with('user')->findOrFail($postId);

        return response()->json([
            'message' => 'Post reposted successfully',
            'repost' => $repost,
            'post' => $post
        ], 201);
    }

    public function unrepost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,post_id',
        ]);

        $postId = $request->post_id;
        $userId = Auth::id();

        $repost = Repost::where('post_id', $postId)
            ->where('user_id', $userId)
            ->first();

        if (!$repost) {
            return response()->json([
                'message' => 'Repost not found',
            ], 404);
        }

        $repost->delete();

        return response()->json([
            'message' => 'Repost removed successfully',
        ], 200);
    }

    public function getRepostsByPost($postId)
    {
        $reposts = Repost::where('post_id', $postId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'reposts' => $reposts
        ]);
    }

    public function getRepostsByUser($userId = null)
    {
        if ($userId === null) {
            $userId = Auth::id();
        }

        $reposts = Repost::where('user_id', $userId)
            ->with(['post', 'post.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'reposts' => $reposts
        ]);
    }
}
