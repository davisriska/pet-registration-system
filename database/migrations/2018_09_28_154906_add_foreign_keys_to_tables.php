<?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class AddForeignKeysToTables extends Migration {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up() {
            Schema::table('pets', function (Blueprint $t) {
                $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
                $t->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
                $t->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade')->onUpdate('cascade');
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down() {
            Schema::table('pets', function (Blueprint $t) {
                $t->dropForeign(['user_id']);
                $t->dropForeign(['category_id']);
                $t->dropForeign(['address_id']);
            });
        }
    }
