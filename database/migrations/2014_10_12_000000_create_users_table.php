<?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreateUsersTable extends Migration {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up() {
            Schema::create('users', function (Blueprint $t) {
                $t->increments('id');
                $t->string('email')->unique();
                $t->string('password');
                $t->rememberToken();
                $t->timestamps();
                $t->softDeletes();
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down() {
            Schema::dropIfExists('users');
        }
    }
