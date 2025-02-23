<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '1234567890',
            'clerk_id' => 'clerk_admin_123',
            'role' => 'admin',
        ]);

        // Generate 50 users
        User::factory()->count(50)->create();
    }
}
