<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => fake()->randomElement(\App\Models\User::pluck('id')),
            'total_price' => 0, // Temporary placeholder
            'status' => fake()->randomElement(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded']),
        ];
    }
}
