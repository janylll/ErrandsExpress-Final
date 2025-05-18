<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Get all posts, newest first
    public function index()
    {
        return Post::orderBy('created_at', 'desc')->get();
    }

    // Create a new post with validation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'deadline_date' => 'required|date',
            'deadline_time' => 'required|string',
            'destination' => 'required|string',
            'image_url' => 'nullable|string',
        ]);

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    // Delete a post by ID
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }

    // Mark a post as accepted by a runner
    public function accept($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 'accepted';
        $post->in_inbox = true;  // optional flag if you track runner inbox
        $post->save();

        return response()->json($post);
    }

    // Mark a post as completed by the runner
    public function complete($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 'runner_completed';
        $post->save();

        return response()->json($post);
    }
}
