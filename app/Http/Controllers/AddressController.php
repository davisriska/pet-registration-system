<?php

    namespace App\Http\Controllers;

    use App\Address;

    class AddressController extends Controller {

        public function __construct() {
            $this->middleware('auth:api');
        }

        /**
         * Display a listing of the resource.
         *
         * @return Address[]|\Illuminate\Database\Eloquent\Collection
         */
        public function index() {
            return Address::all();
        }

    }
