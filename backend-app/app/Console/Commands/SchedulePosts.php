<?php

namespace App\Console\Commands;

use App\Models\Post;
use DateTime;
use Illuminate\Console\Command;

class SchedulePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedule publish posts';

    /**
     * Execute the console command.
     */
    public function __construct()
    {
        parent::__construct();
    }
    public function handle()
    {
        $posts = Post::where('status', 'schedule')->get();
        $posts->each(function ($item) {
            $time = new DateTime($item->published_at);
            $currentTime = new DateTime();

            if ($time < $currentTime) {
                $item->status = "publish";
                $item->save();
            }
        });
    }
}
