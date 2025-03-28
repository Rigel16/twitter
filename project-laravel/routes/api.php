<?php
use Illuminate\Support\Facades\Route;
Route::options('{any}', function () {
    return response()->json([], 204);
})->where('any', '.*');

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostInteractionController;
use App\Http\Controllers\HashtagController;


Route::middleware('auth:sanctum')->get('/posts', [PostController::class, 'index']);

Route::middleware('auth:sanctum')->post('/posts', [PostController::class, 'store']);
Route::get('/messages/{senderId}/{receiverId}', [MessageController::class, 'getMessages'])->middleware('auth:sanctum');

Route::post('/messages', [MessageController::class, 'sendMessage'])->middleware('auth:sanctum');
Route::get('/messages/conversations', [MessageController::class, 'getConversations'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->get('/mutual-follow/{userId}', [UserController::class, 'areMutualFollowers']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register-user', [UserController::class, 'registerUser']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->match(['PUT', 'POST'], '/user/update', [UserController::class, 'updateProfile']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Déconnexion réussie'], 200);
});

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'getUserProfile']);



use App\Http\Controllers\Api\TestController;
Route::get('/tests', [TestController::class, 'index']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/send-verification-code', [AuthController::class, 'sendVerificationCode']);

Route::get('/search-users', [UserController::class, 'searchUsers']);

Route::middleware('auth:sanctum')->get('/user-profile/{id}', [UserController::class, 'getUserProfile']);
Route::post('/follow/{id}', [UserController::class, 'toggleFollow'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user/{id}/followers', [UserController::class, 'getFollowers']);
Route::middleware('auth:sanctum')->get('/user/{id}/following', [UserController::class, 'getFollowing']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts/{postId}/like', [PostInteractionController::class, 'like']);
    Route::post('/posts/{postId}/save', [PostInteractionController::class, 'savePost']);
    Route::post('/posts/{postId}/comment', [PostInteractionController::class, 'commentPost']);
    Route::post('/posts/{postId}/repost', [PostInteractionController::class, 'repostPost']);
});
Route::get('/posts/{postId}/comments', [PostController::class, 'index']);
Route::middleware('auth:sanctum')->get('/bookmarks', [PostInteractionController::class, 'getSavedPosts']);

Route::middleware('auth:sanctum')->get('/hashtags/{tag}', [HashtagController::class, 'getPostsByHashtag']);

Route::middleware('auth:sanctum')->get('/user/by-username/{username}', [UserController::class, 'getUserByUsername']);