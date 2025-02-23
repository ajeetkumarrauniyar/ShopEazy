<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        Order::factory()
            ->count(50)
            ->create()
            ->each(function ($order) {
                // Attach 1-5 products to the order
                $products = \App\Models\Product::inRandomOrder()
                    ->limit(rand(1, 5))
                    ->get();

                $total = 0;
                foreach ($products as $product) {
                    $quantity = rand(1, 5);
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $product->price,
                    ]);
                    $total += $quantity * $product->price;
                }

                // Update order total
                $order->update(['total_price' => $total]);
            });
    }
}
