<?php

    namespace App\Observers;

    use App\Pet;
    use Auth;

    class CreatorObserver {

        /**
         * Handle the User "created" event.
         *
         * @param Pet $user
         * @return void
         */
        public function creating(Pet $user) {
            $user->user_id = Auth::id();
        }

    }
