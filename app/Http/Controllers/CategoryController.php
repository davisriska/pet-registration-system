<?php

    namespace App\Http\Controllers;

    use App\Category;
    use Illuminate\Http\Request;

    class CategoryController extends Controller {

        public function __construct() {
            $this->middleware('auth:api');
        }

        /**
         * Display a listing of the resource.
         *
         * @return Category[]|\Illuminate\Database\Eloquent\Collection
         */
        public function index() {

            return Category::orderBy('value', 'asc')->get();
        }

        /**
         * Display the specified resource.
         *
         * @param  \App\Category $category
         * @return \Illuminate\Http\Response
         */
        public function show(Category $category) {
            //
        }

    }
