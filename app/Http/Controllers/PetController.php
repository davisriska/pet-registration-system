<?php

    namespace App\Http\Controllers;

    use App\Address;
    use App\Category;
    use App\Http\Requests\Pets\Store;
    use App\Pet;
    use Auth;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
    use Illuminate\Support\Str;
    use Intervention\Image\Facades\Image;

    class PetController extends Controller {

        public function __construct() {
            $this->middleware('auth:api');
        }

        /**
         * Display a listing of the resource.
         *
         * @return Pet[]|\Illuminate\Database\Eloquent\Collection
         */
        public function index() {

            return Pet::where('user_id', Auth::id())->get();
        }

        /**
         * Store a newly created resource in storage.
         *
         * @param Store $request
         * @return array
         */
        public function store(Store $request) {

            $data = $request->validated();

            if (!isset($data['image']) || filter_var($data['image'], FILTER_VALIDATE_URL)) {
                abort(422);
            }

            $address = Address::find($data['address']);
            if (!$address) {
                $address = Address::create(['value' => $data['address']]);
            }

            $category = Category::findOrFail($data['category']);

            $image = Image::make($data['image']);
            $image_path = Str::random(40) . '.' . explode('/', $image->mime())[1];
            $image->save(Storage::disk('local')->path($image_path));

            $pet = Pet::create([
                                   'address_id'  => $address->id,
                                   'category_id' => $category->id,
                                   'name'        => $data['name'],
                                   'image_path'  => $image_path
                               ]);

            return ['success' => true];
        }

        /**
         * Update the specified resource in storage.
         *
         * @param  \Illuminate\Http\Request $request
         * @param  \App\Pet $pet
         * @return \Illuminate\Http\Response
         */
        public function update(Request $request, Pet $pet) {
            //
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  \App\Pet $pet
         * @return \Illuminate\Http\Response
         */
        public function destroy(Pet $pet) {
            //
        }

    }
