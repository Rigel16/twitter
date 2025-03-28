<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // Récupérer les messages entre deux utilisateurs
    public function getMessages($senderId, $receiverId)
    {
        // Vérifie que l'utilisateur est authentifié
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Récupérer les messages
        $messages = Message::where(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $senderId)
                  ->where('receiver_id', $receiverId);
        })
        ->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('sender_id', $receiverId)
                  ->where('receiver_id', $senderId);
        })
        ->orderBy('sent_at', 'asc')
        ->with('sender', 'receiver') 
        ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $request->validate([
            'receiver_id' => 'required|exists:users,id', 
            'content' => 'nullable|string',
            'media' => 'nullable|array',
        ]);
    
        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);
    
        if ($request->has('media') && is_array($request->media)) {
            $message->media()->attach($request->media);
        }
    
        return response()->json(['message' => 'Message envoyé avec succès', 'data' => $message], 201);
    }
    

    // Vérifier si deux utilisateurs sont des "suiveurs mutuels"
    public function areMutualFollowers($userId)
    {
        $user = Auth::user();

        // Vérifie si l'utilisateur authentifié suit l'utilisateur spécifié et vice versa
        $isMutual = $user->following()->where('following_id', $userId)->exists() &&
                    User::find($userId)->following()->where('following_id', $user->id)->exists();

        return response()->json(['is_mutual_followers' => $isMutual]);
    }

    public function getConversations()
    {
        $user = Auth::user();
        
        // Obtenir tous les ID uniques des utilisateurs avec lesquels l'utilisateur courant a échangé des messages
        $senderIds = Message::where('receiver_id', $user->id)
                            ->select('sender_id')
                            ->distinct()
                            ->pluck('sender_id');
                            
        $receiverIds = Message::where('sender_id', $user->id)
                              ->select('receiver_id')
                              ->distinct()
                              ->pluck('receiver_id');
                              
        $contactIds = $senderIds->merge($receiverIds)->unique();
        
        $conversations = [];
        
        // Pour chaque contact, trouver le dernier message échangé
        foreach ($contactIds as $contactId) {
            $lastMessage = Message::where(function($query) use ($user, $contactId) {
                    $query->where('sender_id', $user->id)
                          ->where('receiver_id', $contactId);
                })
                ->orWhere(function($query) use ($user, $contactId) {
                    $query->where('sender_id', $contactId)
                          ->where('receiver_id', $user->id);
                })
                ->orderBy('sent_at', 'desc')
                ->first();
                
            if ($lastMessage) {
                $contact = User::find($contactId);
                
                $conversations[] = [
                    'receiver_id' => $contact->id,
                    'username' => $contact->username,
                    'display_name' => $contact->display_name ?? $contact->username,
                    'last_message' => $lastMessage->content,
                    'last_message_time' => $lastMessage->sent_at->format('h:i A'),
                    'avatarUrl' => $contact->profile_picture ?? null,
                ];
            }
        }
        
        usort($conversations, function($a, $b) {
            return strtotime($b['last_message_time']) - strtotime($a['last_message_time']);
        });
        
        return response()->json($conversations);
    }

}
