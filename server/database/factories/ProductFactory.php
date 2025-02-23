<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(0, 100),
            'image_url' => fake()->imageUrl(),
            'category_id' => fake()->randomElement(\App\Models\Categories::pluck('id')),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}
