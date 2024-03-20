<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            Post::create([
                'title' => $faker->sentence,
                'slug' => $faker->slug,
                'content' => $faker->paragraph,
                'excerpt' => $faker->sentence,
                'thumb' => $faker->imageUrl(),
                'is_feature' => $faker->boolean,
                'author_id' => 1,
                'category_id' => $faker->randomElement([1, 2, 3]),
                'status' => 'publish',
                'tags' => $faker->words(3, true),
                'published_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}
