<?php

namespace Database\Factories;

use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        $product = \App\Models\Product::inRandomOrder()->first();

        return [
            'order_id' => fake()->randomElement(\App\Models\Order::pluck('id')),
            'product_id' => $product->id,
            'quantity' => fake()->numberBetween(1, 5),
            'price' => $product->price,
        ];
    }
}
