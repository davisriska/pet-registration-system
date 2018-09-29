<?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreatePetsTable extends Migration {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up() {
            Schema::create('pets', function (Blueprint $t) {
                $t->increments('id');

                $t->string("name");

                $t->integer('user_id')->unsigned();
                $t->integer('category_id')->unsigned();
                $t->integer('address_id')->unsigned();

                $t->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down() {
            Schema::dropIfExists('pets');
        }
    }
