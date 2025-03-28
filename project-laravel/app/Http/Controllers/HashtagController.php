<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hashtag;

class HashtagController extends Controller
{
    public function getPostsByHashtag($tag)
    {
        $hashtag = Hashtag::where('tag', $tag)->first();

        if (!$hashtag) {
            return response()->json(['message' => 'Aucun post trouvé pour ce hashtag'], 404);
        }

        $posts = $hashtag->posts()->with(['user', 'media'])->latest()->get();

        return response()->json($posts);
    }
}
