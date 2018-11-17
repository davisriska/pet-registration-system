<?php

    use App\Category;
    use Illuminate\Database\Seeder;

    class CategorySeeder extends Seeder {
        /**
         * Run the database seeds.
         *
         * @return void
         */
        public function run() {

            $categories = [
                'Alpacas',
                'Camels',
                'Cats',
                'Cows',
                'Dogs',
                'Donkeys',
                'Ferrets',
                'Goats',
                'Hedgehogs',
                'Horses',
                'Llamas',
                'Pigs',
                'Rabbits',
                'Red foxes',
                'Rodents',
                'Sheep',
                'Water Buffaloes',
                'Yaks',
                'Companion parrots',
                'Fowl',
                'Columbines',
                'Passerines',
                'Goldfish',
                'Koi',
                'Siamese fighting fish',
                'Barb',
                'Guppy',
                'Molly',
                'Mosquitofish',
                'Oscar',
                'Anteaters',
                'Bison',
                'Canidae',
                'Civets',
                'Deer',
                'Duikers',
                'Elephants',
                'Felidae',
                'Marsupials',
                'Mongoose',
                'Mustelids',
                'Primates',
                'Procyonidae',
                'Sloths',
                'Monotremes',
                'Companion',
                'Crows',
                'Ravens',
                'Magpies',
                'Toucans',
                'Birds of prey',
                'Ratites',
                'Iguanas',
                'Lizards',
                'Snakes',
                'Tortoises',
                'Turtles',
                'Frogs',
                'Newts',
                'Salamanders',
                'Toads',
                'Angelfish',
                'Cichlid',
                'Corydoras',
                'Danio',
                'Discus',
                'Gourami',
                'Live-bearer',
                'Loach',
                'Mbuna',
                'Rainbowfish',
                'Rasbora',
                'Tetra',
                'Plecostomus',
                'Otocinclus',
                'Blenny',
                'Boxfish',
                'Butterflyfish',
                'Chromis',
                'Clownfish',
                'Damsel',
                'Goby',
                'Tang',
                'Triggerfish',
                'Wrasse',
                'Ants',
                'Caterpillars',
                'Centipedes',
                'Shrimp',
                'Crabs and hermit crabs',
                'Millipedes',
                'Praying mantises',
                'Stick insects',
                'Sea-Monkeys',
                'Triops',
                'Tarantulas and other spiders'
            ];

            foreach ($categories as $category) {
                Category::firstOrCreate(['value' => $category]);
            }

        }
    }
